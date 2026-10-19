import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('dist', {recursive:true});
await build({entryPoints:['src/index.ts'],outfile:'dist/index.js',bundle:true,format:'esm',platform:'node',target:'node22',packages:'external'});
const client = await build({entryPoints:['src/client.tsx'],bundle:true,write:false,format:'cjs',platform:'browser',target:'es2022',external:['react','react/jsx-runtime','@deepseek-ai/dsh-client-ui-primitives']});
await writeFile('dist/client.browser.js', `window.__ModuleLoader__.load({id:'dsh-library-master',factory:function(require){const module={exports:{}};\n${client.outputFiles[0].text}\nreturn module.exports;}});\n`);
