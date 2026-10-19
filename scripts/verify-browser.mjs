import { build } from 'esbuild';
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { Context } from '@deepseek-ai/cordis';
import Storage from '@deepseek-ai/dsh-storage';
import * as JsonStorage from '@deepseek-ai/dsh-storage-json';
import * as StorageDomain from '@deepseek-ai/dsh-storage-domain';
import { apply } from '../dist/index.js';
const root = await mkdtemp(join(tmpdir(), 'dsh-library-browser-'));
const ctx = new Context(); let browser; let server;
try {
  await ctx.plugin(Storage);
  await ctx.plugin(JsonStorage, {root:join(root,'storage')});
  await ctx.plugin(StorageDomain, {backend:'json'});
  let route; const tools = [];
  ctx.provide('connection', {fetch:{register(value){route=value;return ()=>{};}}});
  ctx.provide('tools', {register(value){tools.push(value);return ()=>{};}});
  ctx.provide('systemPrompt', {});
  await ctx.plugin({name:'dsh-library-smoke',apply}, {root:join(root,'library')});
  assert.ok(route, 'full plugin registers connection route');
  assert.ok(tools.some(tool=>tool.name==='library_read'));
  const compiled = await build({stdin:{contents:`import React from 'react';import {createRoot} from 'react-dom/client';import {LibraryPanel} from './src/client/LibraryPanel.tsx';import {createLibraryClient} from './src/client/management.ts';import {createLibraryPreviewRegistry} from './src/client/preview-registry.ts';createRoot(document.getElementById('root')).render(React.createElement(LibraryPanel,{management:createLibraryClient({}),previewRegistry:createLibraryPreviewRegistry(),toggleNavigation(){},async startConversation(){}}));`,resolveDir:process.cwd(),loader:'tsx'},bundle:true,write:false,outdir:root,platform:'browser',format:'iife',loader:{'.css':'local-css'},plugins:[{name:'fixture-native-controls',setup(b){b.onResolve({filter:/^@deepseek-ai\/dsh-client-ui-primitives$/},()=>({path:'controls',namespace:'fixture'}));b.onLoad({filter:/.*/,namespace:'fixture'},()=>({contents:`import React from 'react';export const Button=React.forwardRef(({variant,size,...props},ref)=>React.createElement('button',{...props,ref}));export const Input=React.forwardRef((props,ref)=>React.createElement('input',{...props,ref}));`,resolveDir:process.cwd(),loader:'js'}));}}]});
  const js=compiled.outputFiles.find(file=>file.path.endsWith('.js')).text;
  const css=compiled.outputFiles.find(file=>file.path.endsWith('.css'))?.text??'';
  server=createServer(async(req,res)=>{try{
    if(req.url==='/app.js'){res.setHeader('content-type','text/javascript');res.end(js);return;}
    if(req.url===route.path){const parts=[];for await(const part of req)parts.push(part);const response=await route.fetch(new Request(`http://localhost${req.url}`,{method:'POST',headers:{'content-type':'application/json'},body:Buffer.concat(parts)}));res.writeHead(response.status,{'content-type':'application/json'});res.end(await response.text());return;}
    res.setHeader('content-type','text/html');res.end(`<html><head><style>body{margin:0;background:#121212;color:#eee;font-family:system-ui}${css}</style></head><body><div id="root"></div><script src="/app.js"></script></body></html>`);
  }catch(error){res.writeHead(500);res.end(String(error));}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL || 'chrome'});
  const page=await browser.newPage({viewport:{width:1360,height:900}});const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.getByRole('heading',{name:'资料库',exact:true}).waitFor();
  await page.locator('input[type=file]').setInputFiles({name:'验收资料.md',mimeType:'text/markdown',buffer:Buffer.from('# 验收资料\n\nLibraryBrowserUnique 本地导入检索验收。')});
  await page.getByText('验收资料.md',{exact:true}).first().waitFor();
  await page.getByText('验收资料.md',{exact:true}).first().click();
  await page.getByText('LibraryBrowserUnique 本地导入检索验收。',{exact:false}).first().waitFor();
  await page.reload();await page.getByText('验收资料.md',{exact:true}).first().waitFor();
  await page.getByRole('button',{name:'⌕ 搜索'}).click();
  const search=page.getByPlaceholder('搜索资料名称和内容');
  await search.fill('LibraryBrowserUnique');await search.press('Enter');
  await page.getByText('验收资料.md',{exact:true}).first().waitFor();
  await page.locator('.wd-library-results').getByText('验收资料.md',{exact:true}).waitFor();
  await page.locator('.wd-library-results').getByText('验收资料.md',{exact:true}).click();
  await page.getByText('LibraryBrowserUnique 本地导入检索验收。',{exact:false}).first().waitFor();
  await page.screenshot({path:process.env.LIBRARY_SCREENSHOT || join(root,'library.png'),fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('PASS: full Host registration, browser import, read, reload persistence and search.');
} finally {await browser?.close();if(server)await new Promise(resolve=>server.close(resolve));await ctx.fiber.dispose();await rm(root,{recursive:true,force:true});}
