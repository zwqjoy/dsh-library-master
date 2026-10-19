import * as React from 'react';
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import { Icon } from '../ui/index.js';
import type { LibraryAsset, LibraryRevision, LibraryTreeEntry } from '../contracts/library.js';
import type { LibraryClient } from './management.js';
import { libraryPickerRequestedEvent } from './selection-events.js';

export type LibraryPickerEntry = Pick<LibraryTreeEntry, 'id' | 'name' | 'kind'> & { asset?: Pick<LibraryAsset, 'id' | 'kind' | 'status'>; revision?: Pick<LibraryRevision, 'id'>; folderPath?: string };

type Props = PropsRuntime<'conversation.input.left'> & {
  management: LibraryClient;
  openLibrary: () => void;
  addReference: (sessionId: string, entry: LibraryPickerEntry) => boolean;
};
const css = `
.wd-library-picker{display:flex;align-items:center}
.wd-library-picker-trigger{display:grid;place-items:center;width:36px;height:36px;padding:0;border:0;border-radius:10px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer}
.wd-library-picker-trigger:hover{background:var(--dsw-alias-interactive-bg-hover)}
.wd-library-select-dialog{box-sizing:border-box;width:min(640px,calc(100vw - 32px));height:min(620px,calc(100dvh - 48px));max-height:calc(100dvh - 48px);padding:0;border:1px solid var(--dsw-alias-border-l2,#ddd);border-radius:16px;background:var(--dsw-alias-bg-layer-1,#fff);color:var(--dsw-alias-label-primary,#222);box-shadow:0 16px 64px #0003;font:14px/22px system-ui,sans-serif;overflow:hidden}
.wd-library-select-dialog::backdrop{background:#0005}
.wd-library-select-shell{display:flex;flex-direction:column;height:100%;min-height:0}
.wd-library-select-header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px 12px}.wd-library-select-header h2{margin:0;font-size:20px}
.wd-library-select-close{display:grid;place-items:center;width:36px;height:36px;border:0;border-radius:8px;background:transparent;color:inherit;cursor:pointer}
.wd-library-select-search{margin:0 24px 12px;padding:10px 12px;border:1px solid var(--dsw-alias-border-l2,#ccc);border-radius:8px;background:var(--dsw-alias-bg-base,transparent);color:inherit;font:inherit;min-width:0}
.wd-library-select-path{padding:0 24px 8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary,#777)}
.wd-library-select-list{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;padding:0 16px 12px}
.wd-library-select-row{display:grid;grid-template-columns:36px minmax(0,1fr) auto;align-items:center;gap:12px;width:100%;padding:12px 8px;border:0;border-radius:8px;background:transparent;color:inherit;text-align:left;font:inherit;cursor:pointer}
.wd-library-select-row:hover,.wd-library-select-close:hover{background:var(--dsw-alias-interactive-bg-hover,#8881)}
.wd-library-select-row:disabled{opacity:.5;cursor:default}
.wd-library-select-copy{min-width:0}.wd-library-select-copy strong,.wd-library-select-copy small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wd-library-select-copy small{color:var(--dsw-alias-label-secondary,#777);font-size:12px}
.wd-library-select-footer{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 24px;border-top:1px solid var(--dsw-alias-border-l2,#ddd);color:var(--dsw-alias-label-secondary,#777)}
.wd-library-select-footer button,.wd-library-select-path button{padding:8px;border:0;background:transparent;color:inherit;font:inherit;cursor:pointer}
.wd-library-select-status{padding:24px;text-align:center;color:var(--dsw-alias-label-secondary,#777)}
.wd-library-select-dialog :focus-visible{outline:2px solid var(--dsw-alias-brand-primary,#3875e8);outline-offset:2px}
@media(max-width:560px){.wd-library-select-header{padding:16px}.wd-library-select-search{margin:0 16px 12px}.wd-library-select-footer{padding:12px 16px}}
`;
export function LibraryPicker({ sessionId, management, openLibrary, addReference }: Props) {
  const dialog = React.useRef<HTMLDialogElement>(null);
  const trigger = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [path, setPath] = React.useState<readonly LibraryPickerEntry[]>([]);
  const [rows, setRows] = React.useState<readonly LibraryPickerEntry[]>([]);
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const parentId = path.at(-1)?.id;
  const show = React.useCallback(() => { setPath([]); setQuery(''); setOpen(true); }, []);
  const close = () => { setOpen(false); };
  React.useEffect(() => {
    window.addEventListener(libraryPickerRequestedEvent, show);
    return () => window.removeEventListener(libraryPickerRequestedEvent, show);
  }, [show]);
  React.useEffect(() => {
    if (open) dialog.current?.showModal();
    else if (dialog.current?.open) { dialog.current.close(); trigger.current?.focus(); }
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true); setError(''); setRows([]);
    const timer = window.setTimeout(() => {
      const request = query.trim()
        ? management.search(query.trim()).then(hits => hits.map(hit => ({ id: hit.nodeId, name: hit.name, kind: 'asset' as const, asset: {id:hit.assetId,kind:hit.kind,status:'active' as const},revision:{id:hit.revisionId},folderPath:hit.folderPath })))
        : management.list(parentId);
      void request.then(items => { if (!cancelled) setRows(items); })
        .catch(cause => { if (!cancelled) setError(cause instanceof Error ? cause.message : '无法加载资料库，请重试。'); })
        .finally(() => { if (!cancelled) setLoading(false); });
    }, query.trim() ? 200 : 0);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [open, parentId, query, management]);
  const pick = (row: LibraryPickerEntry) => {
    if (row.kind === 'folder') { setPath(current => [...current, row]); return; }
    if (addReference(String(sessionId), row)) close();
    else setError('无法添加引用，请等待输入框就绪后重试。');
  };
  return <><style>{css}</style><div className="wd-library-picker">
    <button ref={trigger} type="button" className="wd-library-picker-trigger" aria-label="从资料库添加到对话" aria-haspopup="dialog" aria-expanded={open} title="从资料库添加到对话" onClick={show}><Icon name="library" size={22} /></button>
    <dialog ref={dialog} className="wd-library-select-dialog" aria-label="选择资料" onCancel={event => { event.preventDefault(); close(); }} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close(); } }}>
      <div className="wd-library-select-shell">
        <header className="wd-library-select-header"><h2>选择资料</h2><button className="wd-library-select-close" type="button" aria-label="关闭资料选择" onClick={close}><Icon name="close" /></button></header>
        <input className="wd-library-select-search" aria-label="搜索资料" placeholder="搜索全部资料的名称或正文" value={query} onChange={event => setQuery(event.currentTarget.value)} />
        <div className="wd-library-select-path">{query.trim() ? '全部资料 · 搜索结果' : parentId ? <><button type="button" onClick={() => setPath(current => current.slice(0, -1))}>← 返回</button> / {path.map(row => row.name).join(' / ')}</> : '我的资料'}</div>
        <div className="wd-library-select-list" aria-busy={loading}>
          {loading && <div className="wd-library-select-status" role="status">正在加载资料…</div>}
          {error && <div className="wd-library-select-status" role="alert">{error}</div>}
          {!loading && !error && !rows.length && <div className="wd-library-select-status">{query.trim() ? '没有找到匹配资料。' : '暂无资料，可在资料库中导入文件。'}</div>}
          {!loading && rows.map(row => <button className="wd-library-select-row" type="button" key={row.id} aria-label={`${row.kind === 'folder' ? '打开' : '添加'} ${row.name}`} onClick={() => pick(row)} disabled={row.kind !== 'folder' && (!row.asset || !row.revision || row.asset.status === 'disabled')}><Icon name={row.kind === 'folder' ? 'folder' : 'library'} /><span className="wd-library-select-copy"><strong>{row.name}</strong><small>{row.kind === 'folder' ? '文件夹' : [row.asset?.kind.toUpperCase(),row.folderPath].filter(Boolean).join(' · ')}</small></span><span>{row.kind === 'folder' ? '打开' : '添加'}</span></button>)}
        </div>
        <footer className="wd-library-select-footer"><span>选择一份资料添加到当前对话</span><button type="button" onClick={() => { close(); openLibrary(); }}>管理资料库 ↗</button></footer>
      </div>
    </dialog>
  </div></>;
}
