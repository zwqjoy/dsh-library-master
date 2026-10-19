window.__ModuleLoader__.load({id:'dsh-library-master',factory:function(require){const module={exports:{}};
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.tsx
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(client_exports);
var import_react4 = require("react");

// src/client/management.ts
var path = "/api/dsh-library-master";
var invoke = async (endpoint, payload, signal) => {
  const timeout = AbortSignal.timeout(6e4);
  const response = await fetch(path, { method: "POST", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ endpoint, payload }), signal: signal ? AbortSignal.any([signal, timeout]) : timeout });
  const result = await response.json();
  if (!result.ok) throw new Error(result.error?.message ?? "\u8D44\u6599\u5E93\u64CD\u4F5C\u5931\u8D25\u3002");
  return result.value;
};
var fileBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = () => reject(reader.error ?? new Error("\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25\u3002"));
  reader.onload = () => resolve(String(reader.result).split(",", 2)[1] ?? "");
  reader.readAsDataURL(file);
});
var decodeBase64 = (value) => {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
};
function createLibraryClient(_ctx, lifetime) {
  return {
    space: () => invoke("space", {}, lifetime),
    list: (parentId) => invoke("list", { parentId }, lifetime),
    createFolder: (name2, parentId) => invoke("create-folder", { name: name2, parentId }, lifetime),
    importFile: async (file, parentId) => invoke("import", { name: file.name, mediaType: file.type, parentId, base64: await fileBase64(file), operationId: crypto.randomUUID() }, lifetime),
    search: (query, filters = {}) => invoke("search", { query, ...filters }, lifetime),
    taskSelection: (sessionId) => invoke("task-selection", { sessionId }, lifetime),
    setTaskSelection: (sessionId, nodeIds) => invoke("set-task-selection", { sessionId, nodeIds }, lifetime),
    createDraft: (assetId, baseRevisionId) => invoke("create-draft", { assetId, baseRevisionId }, lifetime),
    updateDraft: (draftId, content, expectedRevision) => invoke("update-draft", { draftId, content, expectedRevision }, lifetime),
    publishDraft: (draftId, expectedRevision) => invoke("publish-draft", { draftId, expectedRevision }, lifetime),
    setAssetStatus: (assetId, status) => invoke("set-asset-status", { assetId, status }, lifetime),
    readText: (assetId, revisionId, signal) => invoke("read-text", { assetId, revisionId }, signal ? AbortSignal.any([...lifetime ? [lifetime] : [], signal]) : lifetime),
    readOriginal: async (assetId, revisionId) => decodeBase64((await invoke("read-original", { assetId, revisionId }, lifetime)).base64),
    rename: (nodeId, name2) => invoke("rename", { nodeId, name: name2 }, lifetime),
    move: (nodeId, parentId) => invoke("move", { nodeId, parentId }, lifetime),
    remove: (nodeId) => invoke("remove", { nodeId }, lifetime)
  };
}

// src/ui/components/Icon.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var paths = {
  panel: "M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zM9 4v16",
  search: "M16 16l5 5M18 10a8 8 0 11-16 0 8 8 0 0116 0",
  plus: "M12 5v14M5 12h14",
  chevron: "M7 10l5 5 5-5",
  back: "M15 19l-7-7 7-7",
  task: "M6 19l-3 2V9a9 9 0 119 9H6zM12 5v8M8 9h8",
  assistant: "M9 3h6M12 1v2M7 6h10a3 3 0 013 3v9a3 3 0 01-3 3H7a3 3 0 01-3-3V9a3 3 0 013-3zM9 10h.01M15 10h.01M8 17a4 4 0 018 0",
  project: "M8 9l8-4M8 12l8 6M8 11a3 3 0 11-6 0 3 3 0 016 0M21 4a3 3 0 11-6 0 3 3 0 016 0M21 19a3 3 0 11-6 0 3 3 0 016 0",
  experts: "M5 4h12a4 4 0 014 4v6a7 7 0 01-14 0v-3H5a3 3 0 010-6M13 11a2 2 0 11-4 0 2 2 0 014 0M19 11a2 2 0 11-4 0 2 2 0 014 0M11 17h5",
  skills: "M8 5L2 12l6 7M16 5l6 7-6 7M14 3l-4 18",
  connectors: "M9 15l6-6M9 6l2-2a4 4 0 016 6l-2 2M15 18l-2 2a4 4 0 01-6-6l2-2",
  library: "M12 5v16M12 5C8 2 4 3 2 4v15c4-2 7-1 10 2 3-3 6-4 10-2V4c-2-1-6-2-10 1",
  automation: "M5 3L2 6M19 3l3 3M6 19l-2 3M18 19l2 3M12 8v5l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0",
  apps: "M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z",
  more: "M3 3h6v6H3zM17 2v8M13 6h8M6 14l4 7H2zM21 18a4 4 0 11-8 0 4 4 0 018 0",
  settings: "M9 3l1-2h4l1 2 3 2 2 0 2 4-1 2v3l1 2-2 4h-2l-3 2h-6l-3-2H4l-2-4 1-2v-3L2 9l2-4h2zM16 12a4 4 0 11-8 0 4 4 0 018 0",
  folder: "M3 5h6l2 3h10v12H3z",
  close: "M6 6l12 12M18 6L6 18"
};
function Icon({ name: name2, size = 20 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: false, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: paths[name2] }) });
}

// src/ui/components/LogoMark.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");

// src/ui/components/Navigation.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");

// src/ui/components/Modal.tsx
var import_react = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
function Modal({ open, label, children, className = "", onClose }) {
  const dialog = (0, import_react.useRef)(null);
  const returnFocus = (0, import_react.useRef)(null);
  const onCloseRef = (0, import_react.useRef)(onClose);
  onCloseRef.current = onClose;
  (0, import_react.useEffect)(() => {
    if (!open) return;
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => dialog.current?.focus());
    const onKeyDown = (event) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key !== "Tab" || !dialog.current) return;
      const focusable = [...dialog.current.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),textarea:not(:disabled),select:not(:disabled),[tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) {
        event.preventDefault();
        dialog.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = previousOverflow;
      returnFocus.current?.focus();
    };
  }, [open]);
  if (!open) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "wd-dialog-backdrop", onMouseDown: (event) => {
    if (event.target === event.currentTarget) onClose();
  }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { ref: dialog, className: `wd-dialog ${className}`.trim(), role: "dialog", "aria-modal": "true", "aria-label": label, tabIndex: -1, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "wd-dialog-close", "aria-label": "\u5173\u95ED", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "m6 6 12 12M18 6 6 18" }) }) }),
    children
  ] }) });
}

// src/ui/styles/modal.ts
var modalCss = `
.wd-dialog-backdrop{position:fixed;inset:0;z-index:1200;display:grid;place-items:center;padding:24px;background:var(--dsw-alias-bg-mask-2)}
.wd-dialog{position:relative;box-sizing:border-box;width:min(720px,calc(100vw - 48px));max-height:calc(100dvh - 48px);overflow:auto;scrollbar-width:thin;scrollbar-color:var(--dsw-alias-border-l2) transparent;border:0;border-radius:16px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);box-shadow:var(--dsw-elevation-prominent);outline:none;font:14px/22px "PingFang SC","Microsoft YaHei",sans-serif;animation:wd-dialog-enter .16s ease-out}
.wd-dialog *{box-sizing:border-box}
.wd-dialog button{font:inherit;white-space:nowrap}
.wd-dialog>.wd-dialog-close{position:absolute;z-index:2;right:16px;top:16px;width:32px;height:32px;min-height:32px;padding:0;display:grid;place-items:center;border:0;border-radius:6px;background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer}
.wd-dialog-close svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round}
.wd-dialog-close:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.wd-dialog-close:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
@keyframes wd-dialog-enter{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
@media(prefers-reduced-motion:reduce){.wd-dialog{animation:none}}
@media(max-width:640px){.wd-dialog-backdrop{padding:12px}.wd-dialog{width:calc(100vw - 24px);max-height:calc(100dvh - 24px);height:auto;border-radius:12px}.wd-dialog>.wd-dialog-close{right:8px;top:8px;width:44px;height:44px;min-height:44px}}
`;

// src/ui/styles/tokens.ts
var tokens = {
  canvas: "#121212",
  sidebar: "#202020",
  card: "#242424",
  selected: "#3a3a3a",
  border: "#343434",
  text: "#e7e7e7",
  secondary: "#a5a5a5"
};

// src/ui/styles/navigation.ts
var navigationCss = `
.wd-sidebar{height:100%;min-width:0;background:${tokens.sidebar};color:${tokens.text};font:14px/22px "PingFang SC","Microsoft YaHei",sans-serif;display:flex;flex-direction:column;overflow:hidden;border-right:1px solid ${tokens.border}}
.wd-sidebar *{box-sizing:border-box}.wd-sidebar button,.wd-sidebar input{font:inherit;color:inherit}
.wd-sidebar button{cursor:pointer}.wd-sidebar :focus-visible{outline:2px solid #ddd;outline-offset:-2px}
.wd-sidebar .wd-top-tools{height:46px;display:flex;align-items:center;justify-content:flex-end;padding:0 14px;gap:8px;flex:none}
.wd-icon-button{border:0;background:transparent;width:32px;height:32px;display:inline-grid;place-items:center;color:#aaa;border-radius:6px;flex:none}
.wd-sidebar .wd-brand-row{height:48px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;margin-bottom:20px;flex:none}
.wd-sidebar .wd-brand-row strong{font-size:18px;font-weight:600}.wd-sidebar .wd-discover{background:#343434;border:0;border-radius:18px;padding:4px 10px;display:flex;gap:3px;align-items:center;font-size:12px;color:#aaa}
.wd-sidebar .wd-main-nav{padding:0 10px;flex:none}.wd-nav-item{width:100%;display:flex;align-items:center;gap:4px;border:0;background:transparent;border-radius:8px;min-height:36px;margin:0 0 2px;padding:6px 8px;text-align:left;white-space:nowrap}
.wd-icon-slot{width:26px;display:inline-flex;align-items:center;flex:none;color:#b9b9b9}.wd-nav-item.is-active{background:${tokens.selected};font-weight:500}.wd-nav-item small{margin-left:auto;color:#a5a5a5;font-size:10px;font-weight:400}.wd-nav-item:disabled{cursor:not-allowed}.wd-sidebar button:hover:not(:disabled){background:#383838}
.wd-sidebar .wd-list-scroll{overflow:auto;min-height:0;flex:1;padding:0 10px 20px;scrollbar-width:thin}.wd-nav-group{margin-top:26px}.wd-nav-group summary{list-style:none;display:flex;align-items:center;gap:6px;color:#a5a5a5;font-size:12px;padding:0 10px 12px;cursor:pointer}.wd-nav-group summary::-webkit-details-marker{display:none}.wd-nav-group:not([open]) summary svg{transform:rotate(-90deg)}
.wd-sidebar .wd-task-row{border:0;background:transparent;border-radius:6px;width:100%;display:flex;align-items:center;text-align:left;gap:8px;padding:8px 10px;min-height:36px}.wd-task-row span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wd-task-row.is-active{background:#343434}.wd-sidebar .wd-help{font-size:12px;line-height:20px;color:#a5a5a5;padding:0 10px;margin:0}.wd-sidebar .wd-filter{margin:0 12px 12px;display:flex;gap:4px}.wd-filter input{min-width:0;width:100%;background:#292929;border:1px solid #454545;border-radius:6px;padding:6px 8px}.wd-sidebar .wd-footer{padding:12px 10px;flex:none}.wd-sidebar.is-collapsed .wd-top-tools{padding:0;justify-content:center}.wd-sidebar.is-collapsed .wd-main-nav{padding:0 8px}.wd-sidebar.is-collapsed .wd-footer{padding:8px}.wd-sidebar.is-collapsed .wd-nav-item{justify-content:center;padding:6px}.wd-sidebar.is-collapsed .wd-icon-slot{width:auto}
.wd-modal-backdrop{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:24px;background:rgba(0,0,0,.68);backdrop-filter:blur(2px)}
.wd-settings-modal{width:min(560px,calc(100vw - 32px));border:1px solid #444;border-radius:20px;background:#202020;color:${tokens.text};box-shadow:0 24px 80px rgba(0,0,0,.5);overflow:hidden}.wd-settings-modal header{display:flex;align-items:flex-start;justify-content:space-between;padding:28px 30px 18px}.wd-settings-modal h2{font-size:24px;line-height:32px;margin:3px 0 0}.wd-eyebrow{font-size:10px;letter-spacing:.18em;color:#777}.wd-modal-intro{margin:0;padding:0 30px 22px;color:#aaa;line-height:24px}.wd-setting-list{margin:0 30px;border:1px solid #3b3b3b;border-radius:12px;overflow:hidden}.wd-setting-list>div{display:flex;align-items:center;gap:14px;padding:16px}.wd-setting-list>div+div{border-top:1px solid #383838}.wd-setting-list svg{color:#aaa;flex:none}.wd-setting-list span{display:flex;flex-direction:column;gap:2px}.wd-setting-list strong{font-size:14px}.wd-setting-list small{color:#8f8f8f;font-size:12px}.wd-modal-note{margin:20px 30px 0;color:#888;font-size:12px;line-height:20px}.wd-settings-modal footer{display:flex;justify-content:flex-end;gap:10px;margin-top:26px;padding:18px 30px;border-top:1px solid #343434}.wd-button{border-radius:9px;padding:9px 16px;border:1px solid #464646}.wd-button-secondary{background:transparent;color:#ddd}.wd-button-primary{background:#eee;color:#171717;border-color:#eee;font-weight:600}.wd-button:hover{filter:brightness(1.08)}
@media(max-width:560px){.wd-sidebar .wd-nav-item,.wd-sidebar .wd-task-row,.wd-sidebar .wd-icon-button{min-height:44px}.wd-sidebar .wd-brand-row{margin-bottom:8px}.wd-sidebar .wd-main-nav{padding:0 6px}}
.wd-sidebar .wd-settings-modal .wd-button{flex:0 0 auto;width:auto}.wd-sidebar .wd-settings-modal .wd-button-secondary{background:transparent;color:#ddd}.wd-sidebar .wd-settings-modal .wd-button-primary{min-width:196px;background:#eee;color:#171717;border-color:#eee;font-weight:600}.wd-sidebar .wd-settings-modal .wd-button-primary:hover:not(:disabled){background:#fff;color:#111}
`;

// src/ui/components/Controls.tsx
var React = __toESM(require("react"), 1);
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
var import_jsx_runtime5 = require("react/jsx-runtime");
var Button = React.forwardRef(
  function Button2({ variant = "outline", type = "button", tone, size = "md", id: suppliedId, ...props }, ref) {
    const generatedId = React.useId();
    const id = suppliedId ?? generatedId;
    React.useImperativeHandle(ref, () => document.getElementById(id), [id]);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_dsh_client_ui_primitives.Button, { id, type, variant, size, "data-wd-control": "button", "data-size": size, "data-tone": tone, ...props });
  }
);
var Input = React.forwardRef(
  function Input2({ className = "", id: suppliedId, ...props }, ref) {
    const generatedId = React.useId();
    const id = suppliedId ?? generatedId;
    React.useImperativeHandle(ref, () => document.getElementById(id), [id]);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_dsh_client_ui_primitives.Input, { id, "data-wd-control": "input", className: `wd-form-input ${className}`, ...props });
  }
);
function Select({ className = "", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("select", { "data-wd-control": "select", className: `wd-form-select ${className}`, ...props });
}
function Textarea({ className = "", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("textarea", { "data-wd-control": "textarea", className: `wd-form-textarea ${className}`, ...props });
}

// src/ui/styles/controls.ts
var controlsCss = `
[data-wd-control="button"]{box-sizing:border-box;height:36px;min-height:36px;white-space:nowrap;flex-shrink:0}
[data-wd-control="button"][data-size="sm"]{height:28px;min-height:28px}


[data-wd-control="button"][data-tone="danger"]{color:var(--dsw-alias-state-error-primary)}
.wd-form-input{min-width:0;max-width:100%;box-sizing:border-box;height:36px}
.wd-form-input input{box-sizing:border-box;min-width:0;height:100%;min-height:0;font-size:14px;line-height:20px}
.wd-form-select,.wd-form-textarea{box-sizing:border-box;max-width:100%;min-width:0;border:0;border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);box-shadow:var(--dsw-elevation-soft);font:inherit;font-size:14px;line-height:20px}
.wd-form-select{height:36px;min-height:36px;padding:0 12px;cursor:pointer;color-scheme:inherit}
.wd-form-textarea{display:block;width:100%;min-height:100px;padding:10px 12px;resize:vertical}
.wd-form-textarea::placeholder{color:var(--dsw-alias-label-tertiary)}
.wd-form-select:focus-visible,.wd-form-textarea:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.wd-form-select:disabled,.wd-form-textarea:disabled{opacity:.5;cursor:not-allowed}
.wd-form-select[aria-invalid=true],.wd-form-textarea[aria-invalid=true]{outline:1px solid var(--dsw-alias-state-error-primary)}
`;

// src/client/LibraryPanel.tsx
var React2 = __toESM(require("react"), 1);
var import_react2 = require("react");

// src/client/styles.ts
var libraryCss = `${modalCss}
${controlsCss}



.wd-library{--bg:var(--dsw-alias-bg-base);--line:var(--dsw-alias-border-l2);--muted:var(--dsw-alias-label-tertiary);--hover:var(--dsw-alias-interactive-bg-hover);--text:var(--dsw-alias-label-primary);display:grid;grid-template-columns:292px minmax(0,1fr)}
.wd-library{height:100%;min-height:0;background:var(--bg);color:var(--text);font:14px/1.5 "PingFang SC","Microsoft YaHei",sans-serif}.wd-library *{box-sizing:border-box}.wd-library button,.wd-library input,.wd-library textarea{font:inherit;color:inherit}
.wd-library-sidebar{display:flex;flex-direction:column;border-right:1px solid var(--line)}
.wd-library-sidebar{min-height:0;background:var(--dsw-alias-bg-base)}.wd-library-sidebar>header{display:flex;align-items:center;gap:10px}.wd-library-sidebar>header{height:70px;padding:0 18px}.wd-library-sidebar h1{margin:0}.wd-library-sidebar h1{font-size:24px}.wd-library-nav-toggle{display:none}.wd-library-nav{display:grid;gap:3px}.wd-library-nav{padding:0 12px 18px}.wd-library-nav button{text-align:left;display:flex;align-items:center;gap:12px;cursor:pointer}.wd-library-nav button{height:42px;padding:0 12px;border:0;border-radius:8px;background:transparent;font-size:15px}.wd-library-nav button:hover,.wd-library-nav button.active{background:var(--hover)}.wd-library-section-title{display:flex;align-items:center;justify-content:space-between}.wd-library-section-title{padding:10px 18px 8px;color:var(--muted)}.wd-library-section-title button{width:28px;cursor:pointer}.wd-library-section-title button{height:28px;border:0;background:transparent;border-radius:6px;font-size:20px}.wd-library-section-title button:hover{background:var(--hover)}
.wd-library-tree{flex:1;overflow:auto}
.wd-library-tree{min-height:0;padding:0 8px 20px}.wd-library-tree-row{display:flex;align-items:center;cursor:pointer;gap:6px}.wd-library-tree-row{height:37px;border-radius:7px;padding-right:6px}.wd-library-tree-row:hover,.wd-library-tree-row.selected{background:var(--hover)}.wd-library-tree-row.disabled{opacity:.52}.wd-library-disclosure,.wd-library-more{cursor:pointer}.wd-library-disclosure,.wd-library-more{border:0;background:transparent}.wd-library-disclosure{width:18px}.wd-library-disclosure{padding:0;color:var(--dsw-alias-label-tertiary)}.wd-library-kind{flex:0 0 22px;width:22px;display:grid;place-items:center}.wd-library-kind{height:22px;border-radius:5px;background:#3778df;color:white;font-size:10px;font-weight:700}.wd-library-kind.kind-folder{background:transparent;font-size:16px}.wd-library-kind.kind-pdf{background:#df4b4b}.wd-library-kind.kind-docx{background:#3478d4}.wd-library-kind.kind-pptx{background:#e7772d}.wd-library-kind.kind-text{background:#7e6bd6}.wd-library-name{min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wd-library-more{opacity:0;color:var(--dsw-alias-label-tertiary);padding:2px 5px;border-radius:5px}.wd-library-tree-row:hover .wd-library-more,.wd-library-tree-row.selected .wd-library-more{opacity:1}.wd-library-more:hover{background:var(--dsw-alias-interactive-bg-hover)}.wd-library-sidebar footer{border-top:1px solid var(--line)}.wd-library-sidebar footer{padding:14px 18px;color:var(--dsw-alias-label-dimmed);font-size:12px}.wd-library-upload{position:absolute;width:1px;pointer-events:none}.wd-library-upload{height:1px;opacity:0}
.wd-library-content{min-width:0;overflow:auto;position:relative}
.wd-library-content{min-height:0;background:var(--dsw-alias-bg-base)}.wd-library-document-header{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);backdrop-filter:blur(12px)}.wd-library-document-header{height:64px;padding:0 30px;background:var(--dsw-alias-bg-base)}.wd-library-document-header>div{min-width:0;display:flex;align-items:center;gap:10px}.wd-library-document-header span{max-width:42vw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wd-library-document-header span,.wd-library-document-header b{color:var(--dsw-alias-label-tertiary);font-weight:400}.wd-library-document-header strong{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wd-library-document-header em{font-style:normal}.wd-library-document-header em{color:#e9ad5e;border:1px solid #72552c;border-radius:12px;padding:1px 8px;font-size:12px}.wd-library-head-actions button{cursor:pointer}.wd-library-head-actions button{border:0;background:transparent;border-radius:7px;padding:7px 10px}.wd-library-head-actions button:hover{background:var(--hover)}.wd-library-document-body{height:calc(100% - 64px);min-height:540px;padding:30px clamp(24px,4vw,64px);background:var(--dsw-alias-bg-base)}.wd-library-document-body[data-kind="html"],.wd-library-document-body[data-kind="pptx"]{padding:18px}.wd-library-document-body[data-kind="docx"],.wd-library-document-body[data-kind="pdf"]{padding:24px}
.wd-library-conversion-warning{max-width:920px;margin:0 auto 14px}
.wd-library-conversion-warning{padding:12px 14px;border:1px solid #76532b;border-radius:8px;background:#2d2519;color:#e6bd77}.wd-library-original{max-width:980px;margin:0 auto}.wd-library-original{min-height:calc(100vh - 170px);border:1px solid #d8d8d5;border-radius:3px;background:#fff;padding:48px 64px;color:#272727;box-shadow:0 4px 22px #0005}.wd-library-original.markdown{max-width:960px}.wd-library-original.text{max-width:960px}.wd-library-original pre{margin:0;white-space:pre-wrap;word-break:break-word}.wd-library-original pre{font:15px/1.85 "PingFang SC","Microsoft YaHei",sans-serif}.wd-library-meta{margin-bottom:30px}.wd-library-meta{color:var(--dsw-alias-label-tertiary);font-size:12px}.wd-library-markdown{font:16px/1.85 "PingFang SC","Microsoft YaHei",sans-serif}.wd-library-markdown h1{margin:0 0 30px}.wd-library-markdown h1{font-size:34px;line-height:1.3}.wd-library-markdown h2{margin:38px 0 14px}.wd-library-markdown h2{font-size:26px;line-height:1.4}.wd-library-markdown h3{margin:30px 0 10px}.wd-library-markdown h3{font-size:21px}.wd-library-markdown h4,.wd-library-markdown h5,.wd-library-markdown h6{margin:24px 0 8px}.wd-library-markdown h4,.wd-library-markdown h5,.wd-library-markdown h6{font-size:17px}.wd-library-markdown p{margin:0 0 16px}.wd-library-markdown ul{margin:4px 0 20px}.wd-library-markdown ul{padding-left:26px}.wd-library-markdown li{margin:5px 0}.wd-library-markdown code{padding:2px 5px;border-radius:4px;background:var(--dsw-alias-bg-layer-2);color:#bd3154;font:13px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace}.wd-library-markdown .md-code{overflow:auto}.wd-library-markdown .md-code{padding:18px;border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}.wd-library-markdown .md-code code{padding:0;background:transparent;color:inherit}.wd-library-markdown hr{border-top:1px solid var(--dsw-alias-border-l2);margin:30px 0}.wd-library-markdown hr{border:0}.wd-library-pdf,.wd-library-office-preview,.wd-library-html{display:block;width:100%;overflow:hidden}.wd-library-pdf,.wd-library-office-preview,.wd-library-html{height:100%;min-height:calc(100vh - 112px);border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:white}.wd-library-html{border-radius:5px}.wd-library-office-preview>section{height:100%!important;min-height:0!important}.wd-library-document-body[data-kind="docx"] .wd-library-office-preview{max-width:1180px;margin:0 auto}.wd-library-document-body[data-kind="pptx"] .wd-library-office-preview{border-radius:8px}.wd-library-editor{display:flex;flex-direction:column}.wd-library-editor{height:calc(100vh - 132px)}.wd-library-editor-bar{display:flex;align-items:center;gap:12px;margin-bottom:12px}.wd-library-editor-bar span{margin-right:auto}.wd-library-editor-bar span{color:var(--muted)}.wd-library-editor-bar button,.wd-library-welcome button,.wd-library-list-view form button{cursor:pointer}.wd-library-editor-bar button,.wd-library-welcome button,.wd-library-list-view form button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);border-radius:7px;padding:7px 13px}.wd-library-editor-bar button.primary,.wd-library-list-view form button{background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-inverted);border-color:var(--dsw-alias-border-l2)}.wd-library-diff{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}.wd-library-diff{height:32%;min-height:150px}.wd-library-diff section{min-width:0;display:flex;flex-direction:column;overflow:hidden}.wd-library-diff section{border:1px solid var(--line);border-radius:9px;background:var(--dsw-alias-bg-layer-1)}.wd-library-diff b{border-bottom:1px solid var(--line)}.wd-library-diff b{padding:8px 12px;font-size:12px;color:var(--dsw-alias-label-tertiary)}.wd-library-diff pre{flex:1;overflow:auto;margin:0;white-space:pre-wrap;word-break:break-word}.wd-library-diff pre{padding:12px;font:12px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace}.wd-library-editor textarea{flex:1;width:100%;resize:none}.wd-library-editor textarea{border:1px solid var(--line);border-radius:10px;background:var(--dsw-alias-bg-layer-1);padding:24px;font:14px/1.75 ui-monospace,SFMono-Regular,Menlo,monospace}
.wd-library-welcome{display:grid;place-content:center;justify-items:center;text-align:center}
.wd-library-welcome{height:100%;color:var(--dsw-alias-label-tertiary)}.wd-library-welcome-icon{width:58px;display:grid;place-items:center}.wd-library-welcome-icon{height:58px;border-radius:14px;background:var(--dsw-alias-bg-layer-2);font-size:27px}.wd-library-welcome h2{margin:18px 0 2px}.wd-library-welcome h2{color:var(--dsw-alias-label-primary)}.wd-library-welcome p{margin:0 0 20px}.wd-library-list-view{max-width:900px;margin:0 auto}.wd-library-list-view{padding:58px 44px}.wd-library-list-view h2{margin:0 0 22px}.wd-library-list-view h2{font-size:28px}.wd-library-list-view form{display:flex;gap:10px;margin-bottom:10px}.wd-library-list-view :is(input,.wd-form-input){flex:1}.wd-library-list-view input{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:9px;padding:11px 14px;outline:none}.wd-library-list-view input:focus{border-color:var(--dsw-alias-border-l2)}.wd-library-filters{display:flex;gap:8px;align-items:center;margin-bottom:22px}.wd-library-filters select,.wd-library-filters label{border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-tertiary);padding:7px 10px}.wd-library-filters label{display:flex;align-items:center;gap:7px}.wd-library-filters :is(input,.wd-form-input){width:130px}.wd-library-filters input{border:0;padding:0;background:transparent}.wd-library-results{border-top:1px solid var(--line)}.wd-library-results>button{width:100%;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--line);text-align:left;cursor:pointer}.wd-library-results>button{padding:14px 8px;border:0;background:transparent}.wd-library-results>button:hover{background:var(--dsw-alias-bg-layer-1)}.wd-library-results>button>span:nth-child(2){display:grid;gap:3px;min-width:0;flex:1}.wd-library-results strong{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wd-library-results small{color:var(--dsw-alias-label-tertiary)}.wd-library-excerpt{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:680px}.wd-library-excerpt{color:var(--dsw-alias-label-tertiary);font-size:12px}.wd-library-results i{font-style:normal}.wd-library-results i{color:var(--dsw-alias-label-dimmed);font-size:20px}.wd-library-state{margin:40px auto;max-width:620px;text-align:center}.wd-library-state{padding:32px;border:1px dashed var(--dsw-alias-border-l2);border-radius:12px;color:var(--dsw-alias-label-tertiary)}
.wd-library-popover{position:fixed;z-index:20;width:196px}
.wd-library-popover{padding:6px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-2);box-shadow:0 14px 38px rgba(0,0,0,.42)}.wd-library-popover button{display:block;width:100%;text-align:left;cursor:pointer}.wd-library-popover button{border:0;background:transparent;border-radius:6px;padding:9px 10px}.wd-library-popover button:hover{background:var(--dsw-alias-interactive-bg-hover)}.wd-library-popover button.danger{color:#ff7979}.wd-library-popover hr{border-top:1px solid var(--dsw-alias-border-l2);margin:5px}.wd-library-popover hr{border:0}.wd-library-toast{position:fixed;top:76px;right:24px;z-index:15;max-width:440px}.wd-library-toast{padding:11px 16px;border-radius:8px;background:#21382c;color:#a9e5c3;box-shadow:0 8px 30px var(--dsw-alias-bg-mask-2)}.wd-library-toast.error{background:#452424;color:#ffb0b0}.wd-dialog.library-action-dialog,.wd-dialog.library-move-dialog{width:min(500px,calc(100vw - 48px))}.wd-dialog.library-action-dialog,.wd-dialog.library-move-dialog{padding:28px}.library-action-dialog h2,.library-move-dialog h2{margin:0 40px 8px 0}.library-action-dialog h2,.library-move-dialog h2{font-size:20px}.library-action-dialog p,.library-move-dialog p{margin:0 0 22px}.library-action-dialog p,.library-move-dialog p{color:var(--dsw-alias-label-tertiary)}.library-action-dialog label{display:grid;gap:8px}.library-action-dialog label{color:var(--dsw-alias-label-secondary)}.library-action-dialog :is(input,.wd-form-input){width:100%}.library-action-dialog input{height:42px;padding:0 12px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);outline:none}.library-action-dialog input:focus{border-color:#7c9ee8;box-shadow:0 0 0 2px #4269b844}.library-dialog-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:24px}.library-dialog-actions button{min-width:78px;cursor:pointer}.library-dialog-actions button{border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);padding:8px 16px}.library-dialog-actions button.primary{background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-inverted);border-color:var(--dsw-alias-border-l2)}.library-dialog-actions button.danger{background:#b94242;border-color:#b94242;color:var(--dsw-alias-label-primary)}.library-move-targets{overflow:auto;display:grid;gap:4px}.library-move-targets{max-height:45vh}.library-move-targets button{display:flex;align-items:center;gap:9px;width:100%;text-align:left;cursor:pointer}.library-move-targets button{border:0;border-radius:7px;background:transparent;color:var(--dsw-alias-label-primary);padding:10px}.library-move-targets button:hover{background:var(--dsw-alias-interactive-bg-hover)}.library-move-targets span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.library-move-targets i{font-style:normal}.library-move-targets i{color:var(--dsw-alias-label-tertiary)}
@media(max-width:760px){.wd-library{grid-template-columns:1fr}.wd-library-sidebar{display:none}.wd-library-document-body{padding:18px}.wd-library-list-view{padding:28px 18px}.wd-library-nav-toggle{display:block}}



`;

// src/client/LibraryPanel.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var icon = (entry) => entry.kind === "folder" ? "\u{1F4C1}" : entry.asset?.kind === "pdf" ? "PDF" : entry.asset?.kind === "docx" ? "W" : entry.asset?.kind === "pptx" ? "P" : entry.asset?.kind === "html" ? "</>" : entry.asset?.kind === "text" ? "T" : "M";
function LibraryPanel({ management, previewRegistry, toggleNavigation, startConversation }) {
  const [tree, setTree] = (0, import_react2.useState)([]);
  const [selected, setSelected] = (0, import_react2.useState)();
  const [expanded, setExpanded] = (0, import_react2.useState)(/* @__PURE__ */ new Set());
  const [view, setView] = (0, import_react2.useState)("library");
  const [query, setQuery] = (0, import_react2.useState)("");
  const [searchKind, setSearchKind] = (0, import_react2.useState)("");
  const [searchSource, setSearchSource] = (0, import_react2.useState)("");
  const [searchAfter, setSearchAfter] = (0, import_react2.useState)("");
  const [hits, setHits] = (0, import_react2.useState)([]);
  const [content, setContent] = (0, import_react2.useState)("");
  const [originalUrl, setOriginalUrl] = (0, import_react2.useState)("");
  const [officePreview, setOfficePreview] = (0, import_react2.useState)();
  const [htmlPreview, setHtmlPreview] = (0, import_react2.useState)("");
  const [draft, setDraft] = (0, import_react2.useState)();
  const [draftContent, setDraftContent] = (0, import_react2.useState)("");
  const [menu, setMenu] = (0, import_react2.useState)();
  const [moving, setMoving] = (0, import_react2.useState)();
  const [dialog, setDialog] = (0, import_react2.useState)();
  const [folderTargets, setFolderTargets] = (0, import_react2.useState)([]);
  const [notice, setNotice] = (0, import_react2.useState)("");
  const [error, setError] = (0, import_react2.useState)("");
  const [busy, setBusy] = (0, import_react2.useState)(true);
  const upload = (0, import_react2.useRef)(null);
  const uploadParent = (0, import_react2.useRef)(void 0);
  const officeHost = (0, import_react2.useRef)(null);
  const clearOriginal = (0, import_react2.useCallback)(() => setOriginalUrl((old) => {
    if (old) URL.revokeObjectURL(old);
    return "";
  }), []);
  (0, import_react2.useEffect)(() => () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
  }, [originalUrl]);
  (0, import_react2.useEffect)(() => {
    const close = () => setMenu(void 0);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);
  (0, import_react2.useEffect)(() => {
    if (!officePreview || !officeHost.current) return;
    let dispose = () => {
    };
    let cancelled = false;
    void previewRegistry.mount(officeHost.current, officePreview).then((next) => {
      if (cancelled) next();
      else dispose = next;
    }).catch((cause) => setError(cause instanceof Error ? cause.message : "\u539F\u4EF6\u9884\u89C8\u5931\u8D25\u3002"));
    return () => {
      cancelled = true;
      dispose();
    };
  }, [officePreview, previewRegistry]);
  const loadTree = (0, import_react2.useCallback)(async () => {
    const walk = async (parentId) => Promise.all((await management.list(parentId)).map(async (row) => row.kind === "folder" ? { ...row, children: await walk(row.id) } : row));
    setBusy(true);
    setError("");
    try {
      setTree(await walk());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u8BFB\u53D6\u8D44\u6599\u5931\u8D25\u3002");
    } finally {
      setBusy(false);
    }
  }, [management]);
  (0, import_react2.useEffect)(() => {
    void loadTree();
  }, [loadTree]);
  const flatten = (rows) => rows.flatMap((row) => [row, ...row.children ? flatten(row.children) : []]);
  const allEntries = flatten(tree);
  const findById = (id) => allEntries.find((row) => row.id === id);
  const open = async (entry) => {
    setMenu(void 0);
    setError("");
    setNotice("");
    setDraft(void 0);
    setOfficePreview(void 0);
    setHtmlPreview("");
    clearOriginal();
    if (entry.kind === "folder") {
      setExpanded((old) => {
        const next = new Set(old);
        next.has(entry.id) ? next.delete(entry.id) : next.add(entry.id);
        return next;
      });
      return;
    }
    setSelected(entry);
    setView("library");
    setContent("");
    if (entry.asset?.status === "disabled") return;
    try {
      const revisionId = entry.revision?.id ?? hits.find((hit) => hit.nodeId === entry.id)?.revisionId;
      if (entry.revision?.conversionStatus === "ready") setContent(await management.readText(entry.asset.id, revisionId));
      if (entry.asset?.kind === "pdf") {
        const bytes = await management.readOriginal(entry.asset.id, revisionId);
        setOriginalUrl(URL.createObjectURL(new Blob([bytes], { type: "application/pdf" })));
      }
      if (entry.asset?.kind === "html") {
        const bytes = await management.readOriginal(entry.asset.id, revisionId);
        setHtmlPreview(new TextDecoder().decode(bytes));
      }
      if ((entry.asset?.kind === "docx" || entry.asset?.kind === "pptx" || entry.asset?.kind === "csv" || entry.asset?.kind === "xlsx") && previewRegistry.canOpen(entry.asset.kind)) {
        const bytes = await management.readOriginal(entry.asset.id, revisionId);
        setOfficePreview({ name: entry.name, kind: entry.asset.kind, bytes });
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u8BFB\u53D6\u8D44\u6599\u5931\u8D25\u3002");
    }
  };
  const runSearch = async (nextView = "search", nextQuery = query) => {
    setView(nextView);
    setSelected(void 0);
    clearOriginal();
    setBusy(true);
    setError("");
    try {
      setHits(await management.search(nextQuery, nextView === "outputs" ? { sources: ["task"] } : nextView === "search" ? { ...searchKind ? { kinds: [searchKind] } : {}, ...searchSource ? { sources: [searchSource] } : {}, ...searchAfter ? { updatedAfter: (/* @__PURE__ */ new Date(`${searchAfter}T00:00:00`)).toISOString() } : {} } : {}));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u641C\u7D22\u5931\u8D25\u3002");
    } finally {
      setBusy(false);
    }
  };
  const createFolder = async (name2, parentId) => {
    try {
      await management.createFolder(name2, parentId);
      await loadTree();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u65B0\u5EFA\u6587\u4EF6\u5939\u5931\u8D25\u3002");
    }
  };
  const createText = async (kind, name2, parentId) => {
    const extension = kind === "markdown" ? ".md" : ".txt";
    const finalName = name2.toLowerCase().endsWith(extension) ? name2 : `${name2}${extension}`;
    try {
      await management.importFile(new File([kind === "markdown" ? `# ${finalName.slice(0, -extension.length)}
` : "\n"], finalName, { type: kind === "markdown" ? "text/markdown" : "text/plain" }), parentId);
      await loadTree();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u65B0\u5EFA\u8D44\u6599\u5931\u8D25\u3002");
    }
  };
  const files = async (list) => {
    if (!list?.length) return;
    setBusy(true);
    try {
      for (const file of list) await management.importFile(file, uploadParent.current);
      await loadTree();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u5BFC\u5165\u6587\u4EF6\u5931\u8D25\u3002");
    } finally {
      setBusy(false);
      uploadParent.current = void 0;
      if (upload.current) upload.current.value = "";
    }
  };
  const remove = async (entry) => {
    try {
      await management.remove(entry.id);
      if (selected?.id === entry.id) setSelected(void 0);
      await loadTree();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u5220\u9664\u5931\u8D25\u3002");
    }
  };
  const rename = async (entry, name2) => {
    try {
      await management.rename(entry.id, name2);
      if (selected?.id === entry.id) setSelected({ ...selected, name: name2 });
      await loadTree();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u91CD\u547D\u540D\u5931\u8D25\u3002");
    }
  };
  const addToTask = async (entry) => {
    setMenu(void 0);
    setError("");
    try {
      await startConversation(entry);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u65B0\u5EFA\u5BF9\u8BDD\u5931\u8D25\u3002");
    }
  };
  const setStatus = async (entry) => {
    if (!entry.asset) return;
    const status = entry.asset.status === "disabled" ? "active" : "disabled";
    try {
      const next = await management.setAssetStatus(entry.asset.id, status);
      if (selected?.id === entry.id) setSelected(next);
      await loadTree();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u66F4\u65B0\u72B6\u6001\u5931\u8D25\u3002");
    }
  };
  const entryPath = (entry) => {
    const names = [entry.name];
    let parentId = entry.parentId;
    const seen = /* @__PURE__ */ new Set();
    while (parentId && !seen.has(parentId)) {
      seen.add(parentId);
      const parent = findById(parentId);
      if (!parent) break;
      names.unshift(parent.name);
      parentId = parent.parentId;
    }
    return `\u6211\u7684\u8D44\u6599 / ${names.join(" / ")}`;
  };
  const beginMove = (entry) => {
    setMoving(entry);
    setFolderTargets([{ label: "\u6211\u7684\u8D44\u6599\uFF08\u6839\u76EE\u5F55\uFF09" }, ...allEntries.filter((row) => row.kind === "folder").map((row) => ({ id: row.id, label: entryPath(row) }))]);
  };
  const move = async (parentId) => {
    if (!moving) return;
    try {
      await management.move(moving.id, parentId);
      setMoving(void 0);
      await loadTree();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u79FB\u52A8\u5931\u8D25\u3002");
    }
  };
  const beginEdit = async () => {
    if (!selected?.asset) return;
    try {
      const next = await management.createDraft(selected.asset.id, selected.revision?.id);
      setDraft(next);
      setDraftContent(next.content);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u521B\u5EFA\u8349\u7A3F\u5931\u8D25\u3002");
    }
  };
  const publishDraft = async () => {
    if (!draft) return;
    try {
      const saved = draftContent === draft.content ? draft : await management.updateDraft(draft.id, draftContent, draft.revision);
      const next = await management.publishDraft(saved.id, saved.revision);
      setSelected(next);
      setContent(draftContent);
      setDraft(void 0);
      await loadTree();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u53D1\u5E03\u5931\u8D25\u3002");
    }
  };
  const downloadOriginal = async () => {
    if (!selected?.asset) return;
    try {
      const bytes = await management.readOriginal(selected.asset.id, selected.revision?.id);
      const url = URL.createObjectURL(new Blob([bytes], { type: selected.asset.mediaType }));
      const link = document.createElement("a");
      link.href = url;
      link.download = selected.name;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1e3);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u8BFB\u53D6\u539F\u4EF6\u5931\u8D25\u3002");
    }
  };
  const showMenu = (event, state) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenu({ ...state, x: Math.max(8, Math.min(rect.left, window.innerWidth - 204)), y: Math.max(8, Math.min(rect.bottom + 5, window.innerHeight - (state.create ? 198 : 246))) });
  };
  const submitDialog = async () => {
    if (!dialog) return;
    const current = dialog;
    const value = current.value.trim();
    if ((current.kind === "create-markdown" || current.kind === "create-text" || current.kind === "create-folder" || current.kind === "rename") && !value) return;
    setDialog(void 0);
    switch (current.kind) {
      case "create-markdown":
        await createText("markdown", value, current.parentId);
        break;
      case "create-text":
        await createText("text", value, current.parentId);
        break;
      case "create-folder":
        await createFolder(value, current.parentId);
        break;
      case "rename":
        await rename(current.entry, value);
        break;
      case "remove":
        await remove(current.entry);
        break;
      case "status":
        await setStatus(current.entry);
        break;
    }
  };
  const Tree = ({ rows, depth = 0 }) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(React2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: `wd-library-tree-row${selected?.id === row.id ? " selected" : ""}${row.asset?.status === "disabled" ? " disabled" : ""}`, style: { paddingLeft: 12 + depth * 16 }, onClick: () => void open(row), children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { className: "wd-library-disclosure", tabIndex: -1, children: row.kind === "folder" ? expanded.has(row.id) ? "\u2304" : "\u203A" : "" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: `wd-library-kind kind-${row.asset?.kind ?? "folder"}`, children: icon(row) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "wd-library-name", children: row.name }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { className: "wd-library-more", "aria-label": `${row.name} \u66F4\u591A\u64CD\u4F5C`, onClick: (event) => showMenu(event, { entry: row }), children: "\u2022\u2022\u2022" })
    ] }),
    row.kind === "folder" && expanded.has(row.id) ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Tree, { rows: row.children ?? [], depth: depth + 1 }) : null
  ] }, row.id)) });
  const resultEntries = hits.map((hit) => findById(hit.nodeId)).filter((row) => Boolean(row));
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { className: "wd-library", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("style", { children: libraryCss }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("aside", { className: "wd-library-sidebar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("header", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { className: "wd-library-nav-toggle", onClick: toggleNavigation, children: "\u2630" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h1", { children: "\u8D44\u6599\u5E93" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("nav", { className: "wd-library-nav", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { className: view === "search" ? "active" : "", onClick: () => {
          setView("search");
          setSelected(void 0);
        }, children: [
          "\u2315 ",
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u641C\u7D22" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { className: view === "recent" ? "active" : "", onClick: () => void runSearch("recent", ""), children: [
          "\u25F7 ",
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u6700\u8FD1" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { className: view === "outputs" ? "active" : "", onClick: () => void runSearch("outputs", ""), children: [
          "\u25B1 ",
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u672C\u5730\u4EA7\u7269" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "wd-library-section-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u6211\u7684\u8D44\u6599" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { "aria-label": "\u65B0\u5EFA\u6216\u5BFC\u5165", onClick: (event) => showMenu(event, { create: true }), children: "\uFF0B" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "wd-library-tree", onClick: () => setView("library"), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Tree, { rows: tree }) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("footer", { children: "\u672C\u5730\u8D44\u6599\u5E93 \xB7 \u4EC5\u5F53\u524D\u8BBE\u5907" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("input", { ref: upload, className: "wd-library-upload", type: "file", multiple: true, accept: ".md,.markdown,.txt,.html,.htm,.pdf,.docx,.pptx,.csv,.xlsx", onChange: (event) => void files(event.currentTarget.files) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("main", { className: "wd-library-content", children: [
      notice ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "wd-library-toast success", children: notice }) : null,
      error ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "wd-library-toast error", children: error }) : null,
      selected ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("header", { className: "wd-library-document-header", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: entryPath(selected).replace(` / ${selected.name}`, "") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("b", { children: "/" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: selected.name }),
            selected.asset?.status === "disabled" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("em", { children: "\u5DF2\u505C\u7528" }) : selected.revision?.conversionStatus === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("em", { children: "\u8F6C\u6362\u5931\u8D25" }) : selected.revision?.conversionStatus === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("em", { children: "\u8F6C\u6362\u4E2D" }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "wd-library-head-actions", children: [
            isEditable(selected) ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { onClick: () => void beginEdit(), children: "\u7F16\u8F91" }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", onClick: () => void downloadOriginal(), children: "\u4E0B\u8F7D" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", "aria-label": "\u66F4\u591A\u64CD\u4F5C", onClick: (event) => showMenu(event, { entry: selected }), children: "\u2022\u2022\u2022" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "wd-library-document-body", "data-kind": selected.asset?.kind, children: [
          selected.revision?.conversionWarnings.length ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "wd-library-conversion-warning", role: "note", children: selected.revision.conversionWarnings.join(" ") }) : null,
          selected.revision?.conversionStatus === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "wd-library-conversion-warning", children: "\u539F\u4EF6\u5DF2\u5B89\u5168\u4FDD\u5B58\uFF0C\u4F46\u68C0\u7D22\u6587\u672C\u8F6C\u6362\u5931\u8D25\uFF0C\u56E0\u6B64\u6682\u4E0D\u53EF\u641C\u7D22\u3002\u4ECD\u53EF\u9884\u89C8\u6216\u4E0B\u8F7D\u539F\u4EF6\u3002" }) : null,
          draft ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "wd-library-editor", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "wd-library-editor-bar", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "\u7F16\u8F91\u8349\u7A3F" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u53D1\u5E03\u540E\u751F\u6210\u65B0\u7684\u53EA\u8BFB\u4FEE\u8BA2" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { onClick: () => setDraft(void 0), children: "\u53D6\u6D88" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { variant: "primary", className: "primary", onClick: () => void publishDraft(), children: "\u53D1\u5E03\u65B0\u7248\u672C" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "wd-library-diff", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("b", { children: "\u5F53\u524D\u4FEE\u8BA2" }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("pre", { children: draft.content })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("b", { children: "\u8349\u7A3F\u9884\u89C8" }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("pre", { children: draftContent })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Textarea, { "aria-label": "\u8349\u7A3F\u5185\u5BB9", value: draftContent, onChange: (event) => setDraftContent(event.currentTarget.value) })
          ] }) : selected.asset?.status === "disabled" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "wd-library-state", children: "\u8FD9\u4EFD\u8D44\u6599\u5DF2\u505C\u7528\u3002\u91CD\u65B0\u542F\u7528\u540E\u624D\u80FD\u67E5\u770B\u6216\u7528\u4E8E\u4EFB\u52A1\u3002" }) : originalUrl ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("iframe", { className: "wd-library-pdf", title: selected.name, src: originalUrl }) : htmlPreview ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("iframe", { className: "wd-library-html", title: selected.name, sandbox: "allow-scripts", srcDoc: isolatedHtml(htmlPreview) }) : officePreview ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { ref: officeHost, className: "wd-library-office-preview" }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("article", { className: `wd-library-original ${selected.asset?.kind ?? ""}`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "wd-library-meta", children: [
              "\u4FEE\u8BA2 ",
              selected.revision?.number ?? 1,
              " \xB7 ",
              selected.asset?.kind === "docx" || selected.asset?.kind === "pptx" ? "Office \u539F\u59CB\u9884\u89C8\u4E0D\u53EF\u7528\uFF0C\u663E\u793A\u68C0\u7D22\u6587\u672C" : "\u539F\u59CB\u5185\u5BB9"
            ] }),
            selected.asset?.kind === "markdown" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(MarkdownDocument, { content }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("pre", { children: content })
          ] })
        ] })
      ] }) : view === "search" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "wd-library-list-view", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", { children: "\u641C\u7D22" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("form", { onSubmit: (event) => {
          event.preventDefault();
          void runSearch("search");
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Input, { autoFocus: true, value: query, onChange: (event) => setQuery(event.currentTarget.value), placeholder: "\u641C\u7D22\u8D44\u6599\u540D\u79F0\u548C\u5185\u5BB9" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { type: "submit", children: "\u641C\u7D22" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "wd-library-filters", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Select, { "aria-label": "\u8D44\u6599\u7C7B\u578B", value: searchKind, onChange: (event) => setSearchKind(event.currentTarget.value), children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "", children: "\u5168\u90E8\u7C7B\u578B" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "markdown", children: "Markdown" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "text", children: "TXT" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "html", children: "HTML" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "pdf", children: "PDF" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "docx", children: "Word" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "pptx", children: "PowerPoint" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "csv", children: "CSV" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "xlsx", children: "Excel" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Select, { "aria-label": "\u8D44\u6599\u6765\u6E90", value: searchSource, onChange: (event) => setSearchSource(event.currentTarget.value), children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "", children: "\u5168\u90E8\u6765\u6E90" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "upload", children: "\u4E0A\u4F20\u5BFC\u5165" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "created", children: "\u65B0\u5EFA\u8D44\u6599" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "task", children: "\u672C\u5730\u4EA7\u7269" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("label", { children: [
            "\u66F4\u65B0\u65E5\u671F\u4ECE ",
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Input, { type: "date", value: searchAfter, onChange: (event) => setSearchAfter(event.currentTarget.value) })
          ] })
        ] }),
        busy ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "wd-library-state", children: "\u6B63\u5728\u641C\u7D22\u2026" }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ResultList, { rows: resultEntries, hits, open })
      ] }) : view === "recent" || view === "outputs" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "wd-library-list-view", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", { children: view === "recent" ? "\u6700\u8FD1" : "\u672C\u5730\u4EA7\u7269" }),
        busy ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "wd-library-state", children: "\u6B63\u5728\u8BFB\u53D6\u2026" }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ResultList, { rows: resultEntries, hits, open })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "wd-library-welcome", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "wd-library-welcome-icon", children: "\u25A4" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", { children: "\u6211\u7684\u8D44\u6599" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: "\u4ECE\u5DE6\u4FA7\u9009\u62E9\u8D44\u6599\uFF0C\u5728\u8FD9\u91CC\u67E5\u770B\u539F\u59CB\u5185\u5BB9\u3002" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { onClick: (event) => showMenu(event, { create: true }), children: "\u65B0\u5EFA\u6216\u5BFC\u5165\u8D44\u6599" })
      ] })
    ] }),
    menu ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "wd-library-popover", style: { left: menu.x, top: menu.y }, onClick: (event) => event.stopPropagation(), children: menu.create ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", onClick: () => {
        setDialog({ kind: "create-markdown", parentId: menu.parentId, value: "\u672A\u547D\u540D\u6587\u6863.md" });
        setMenu(void 0);
      }, children: "\u65B0\u5EFA\u6587\u6863\uFF08.md\uFF09" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", onClick: () => {
        setDialog({ kind: "create-text", parentId: menu.parentId, value: "\u672A\u547D\u540D\u6587\u672C.txt" });
        setMenu(void 0);
      }, children: "\u65B0\u5EFA\u6587\u672C\uFF08.txt\uFF09" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", onClick: () => {
        setDialog({ kind: "create-folder", parentId: menu.parentId, value: "\u65B0\u5EFA\u6587\u4EF6\u5939" });
        setMenu(void 0);
      }, children: "\u65B0\u5EFA\u6587\u4EF6\u5939" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("hr", {}),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", onClick: () => {
        uploadParent.current = menu.parentId;
        upload.current?.click();
        setMenu(void 0);
      }, children: "\u4E0A\u4F20\u548C\u5BFC\u5165" })
    ] }) : menu.entry ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
      menu.entry.kind === "folder" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", onClick: (event) => showMenu(event, { create: true, parentId: menu.entry.id }), children: "\u5728\u6B64\u65B0\u5EFA\u6216\u5BFC\u5165" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("hr", {})
      ] }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", onClick: () => void addToTask(menu.entry), children: "\u6DFB\u52A0\u5230\u65B0\u5BF9\u8BDD" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("hr", {}),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", onClick: () => {
        beginMove(menu.entry);
        setMenu(void 0);
      }, children: "\u79FB\u52A8\u5230\u2026" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", onClick: () => {
        setDialog({ kind: "rename", entry: menu.entry, value: menu.entry.name });
        setMenu(void 0);
      }, children: "\u91CD\u547D\u540D" }),
      menu.entry.asset ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", onClick: () => {
        menu.entry.asset?.status === "disabled" ? void setStatus(menu.entry) : setDialog({ kind: "status", entry: menu.entry, value: "" });
        setMenu(void 0);
      }, children: menu.entry.asset.status === "disabled" ? "\u91CD\u65B0\u542F\u7528" : "\u505C\u7528" }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "danger", onClick: () => {
        setDialog({ kind: "remove", entry: menu.entry, value: "" });
        setMenu(void 0);
      }, children: "\u5220\u9664" })
    ] }) : null }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ActionModal, { dialog, setDialog, submit: () => void submitDialog() }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Modal, { open: Boolean(moving), label: moving ? `\u79FB\u52A8\u201C${moving.name}\u201D` : "\u79FB\u52A8\u8D44\u6599", className: "library-move-dialog", onClose: () => setMoving(void 0), children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("h2", { children: [
        "\u79FB\u52A8\u201C",
        moving?.name,
        "\u201D"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: "\u9009\u62E9\u65B0\u7684\u4FDD\u5B58\u4F4D\u7F6E" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "library-move-targets", children: moving ? folderTargets.filter((target) => target.id !== moving.id).map((target) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Button, { onClick: () => void move(target.id), children: [
        "\u{1F4C1} ",
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: target.label }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("i", { children: "\u203A" })
      ] }, target.id ?? "root")) : null }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "library-dialog-actions", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { onClick: () => setMoving(void 0), children: "\u53D6\u6D88" }) })
    ] })
  ] });
}
var isEditable = (entry) => entry?.asset?.status !== "disabled" && (entry?.asset?.kind === "markdown" || entry?.asset?.kind === "text");
function ResultList({ rows, hits, open }) {
  const typeName = { markdown: "Markdown", text: "TXT", html: "HTML", pdf: "PDF", docx: "Word", pptx: "PowerPoint", csv: "CSV", xlsx: "Excel" };
  return rows.length ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "wd-library-results", children: rows.map((row) => {
    const hit = hits.find((value) => value.nodeId === row.id);
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { type: "button", onClick: () => void open(row), children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: `wd-library-kind kind-${row.asset?.kind ?? "folder"}`, children: icon(row) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: row.name }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("small", { children: [
          row.asset ? typeName[row.asset.kind] : "\u6587\u4EF6\u5939",
          " \xB7 ",
          hit?.folderPath ?? "\u6211\u7684\u8D44\u6599",
          " \xB7 \u4FEE\u8BA2 ",
          row.revision?.number ?? 1,
          " \xB7 ",
          row.revision?.conversionStatus === "ready" ? "\u53EF\u641C\u7D22" : row.revision?.conversionStatus === "failed" ? "\u8F6C\u6362\u5931\u8D25" : "\u8F6C\u6362\u4E2D"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("small", { children: [
          row.asset?.source === "task" ? "\u672C\u5730\u4EA7\u7269" : row.asset?.source === "created" ? "\u65B0\u5EFA\u8D44\u6599" : "\u4E0A\u4F20\u5BFC\u5165",
          " \xB7 ",
          new Date(row.updatedAt).toLocaleString(),
          hit?.location ? ` \xB7 ${hit.location}` : ""
        ] }),
        hit?.excerpt ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "wd-library-excerpt", children: hit.excerpt }) : null
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("i", { children: "\u203A" })
    ] }, row.id);
  }) }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "wd-library-state", children: "\u6CA1\u6709\u627E\u5230\u8D44\u6599\u3002" });
}
function ActionModal({ dialog, setDialog, submit }) {
  const input = dialog && ["create-markdown", "create-text", "create-folder", "rename"].includes(dialog.kind);
  const title = !dialog ? "" : dialog.kind === "create-markdown" ? "\u65B0\u5EFA Markdown \u6587\u6863" : dialog.kind === "create-text" ? "\u65B0\u5EFA TXT \u6587\u672C" : dialog.kind === "create-folder" ? "\u65B0\u5EFA\u6587\u4EF6\u5939" : dialog.kind === "rename" ? "\u91CD\u547D\u540D" : dialog.kind === "remove" ? "\u5220\u9664\u8D44\u6599" : "\u505C\u7528\u8D44\u6599";
  const entry = dialog && "entry" in dialog ? dialog.entry : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Modal, { open: Boolean(dialog), label: title || "\u8D44\u6599\u64CD\u4F5C", className: "library-action-dialog", onClose: () => setDialog(void 0), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("form", { onSubmit: (event) => {
    event.preventDefault();
    submit();
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", { children: title }),
    input && dialog ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("label", { children: [
      "\u540D\u79F0",
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Input, { autoFocus: true, value: dialog.value, onChange: (event) => setDialog({ ...dialog, value: event.currentTarget.value }) })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: dialog?.kind === "remove" ? `\u5220\u9664\u201C${entry?.name}\u201D\u53CA\u5176\u672C\u5730\u4FEE\u8BA2\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002` : `\u505C\u7528\u201C${entry?.name}\u201D\u540E\uFF0C\u5B83\u5C06\u4E0D\u518D\u53C2\u4E0E\u641C\u7D22\u548C\u4EFB\u52A1\u5F15\u7528\u3002` }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "library-dialog-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { type: "button", onClick: () => setDialog(void 0), children: "\u53D6\u6D88" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { variant: "primary", tone: dialog?.kind === "remove" ? "danger" : void 0, className: dialog?.kind === "remove" ? "danger" : "primary", type: "submit", children: dialog?.kind === "remove" ? "\u5220\u9664" : dialog?.kind === "status" ? "\u505C\u7528" : "\u786E\u5B9A" })
    ] })
  ] }) });
}
function MarkdownDocument({ content }) {
  const rows = content.replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let code;
  let list = [];
  const flushList = () => {
    if (list.length) {
      blocks.push(/* @__PURE__ */ (0, import_jsx_runtime6.jsx)("ul", { children: list.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: inlineMarkdown(item) }, index)) }, `list-${blocks.length}`));
      list = [];
    }
  };
  rows.forEach((row, index) => {
    if (/^```/.test(row)) {
      if (code) {
        blocks.push(/* @__PURE__ */ (0, import_jsx_runtime6.jsx)("pre", { className: "md-code", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("code", { children: code.join("\n") }) }, `code-${index}`));
        code = void 0;
      } else {
        flushList();
        code = [];
      }
      return;
    }
    if (code) {
      code.push(row);
      return;
    }
    const heading = /^(#{1,6})\s+(.+)$/.exec(row);
    if (heading) {
      flushList();
      const level = heading[1].length;
      blocks.push(React2.createElement(`h${level}`, { key: `h-${index}` }, inlineMarkdown(heading[2])));
      return;
    }
    const bullet = /^[-*+]\s+(.+)$/.exec(row);
    if (bullet) {
      list.push(bullet[1]);
      return;
    }
    flushList();
    if (/^---+$/.test(row.trim())) blocks.push(/* @__PURE__ */ (0, import_jsx_runtime6.jsx)("hr", {}, `hr-${index}`));
    else if (row.trim()) blocks.push(/* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: inlineMarkdown(row) }, `p-${index}`));
  });
  flushList();
  if (code) blocks.push(/* @__PURE__ */ (0, import_jsx_runtime6.jsx)("pre", { className: "md-code", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("code", { children: code.join("\n") }) }, "code-last"));
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "wd-library-markdown", children: blocks });
}
function inlineMarkdown(value) {
  const parts = value.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => part.startsWith("`") ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("code", { children: part.slice(1, -1) }, index) : part.startsWith("**") ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: part.slice(2, -2) }, index) : part);
}
function isolatedHtml(source) {
  const policy = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: blob:; media-src data: blob:; font-src data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src 'none'; frame-src 'none';">`;
  return /<head(?:\s[^>]*)?>/i.test(source) ? source.replace(/<head(?:\s[^>]*)?>/i, (match) => `${match}${policy}`) : `${policy}${source}`;
}

// src/client/LibraryPicker.tsx
var React3 = __toESM(require("react"), 1);

// src/client/selection-events.ts
var libraryPickerRequestedEvent = "workdsh:library-picker-requested";

// src/client/LibraryPicker.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var css = `
.wd-library-picker{position:relative;display:flex;align-items:center}
.wd-library-picker-trigger{display:grid;place-items:center;width:36px;height:36px;padding:0;border:0;border-radius:10px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer}
.wd-library-picker-trigger:hover,.wd-library-picker-trigger[aria-expanded="true"]{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.wd-library-popover{position:absolute;z-index:90;left:0;bottom:calc(100% + 10px);width:336px;max-height:min(430px,60vh);overflow:auto;padding:8px;border-radius:15px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);box-shadow:var(--dsw-elevation-panel);font:14px/20px "PingFang SC","Microsoft YaHei",sans-serif}
.wd-library-row{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:8px;padding:8px 5px;border-radius:10px}.wd-library-row:hover{background:var(--dsw-alias-interactive-bg-hover)}
.wd-library-main{display:grid;grid-template-columns:38px minmax(0,1fr);gap:10px;align-items:center;min-width:0;border:0;background:transparent;color:inherit;text-align:left;font:inherit;padding:0;cursor:pointer}
.wd-library-mark{display:grid;place-items:center;width:38px;height:38px;border-radius:10px;background:var(--dsw-alias-interactive-bg-hover)}
.wd-library-copy{min-width:0}.wd-library-copy strong,.wd-library-copy small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wd-library-copy small{margin-top:2px;color:var(--dsw-alias-label-secondary);font-size:11px}
.wd-library-action,.wd-library-manage,.wd-library-back{border:0;background:transparent;color:inherit;cursor:pointer;font:inherit;padding:6px 8px;border-radius:8px}.wd-library-action:disabled{opacity:.5;cursor:default}
.wd-library-manage{display:flex;gap:8px;width:100%;margin-top:6px;padding:10px 9px;border-top:1px solid var(--dsw-alias-border-l2);border-radius:0;text-align:left}.wd-library-manage:hover{background:var(--dsw-alias-interactive-bg-hover)}
.wd-library-status{padding:12px;color:var(--dsw-alias-label-secondary)}
@media(max-width:560px){.wd-library-popover{position:fixed;left:12px;right:12px;bottom:86px;width:auto}}
`;
function LibraryPicker({ sessionId, management, openLibrary, addReference }) {
  const root = React3.useRef(null);
  const trigger = React3.useRef(null);
  const [open, setOpen] = React3.useState(false);
  const [path2, setPath] = React3.useState([]);
  const [rows, setRows] = React3.useState([]);
  const [loading, setLoading] = React3.useState(false);
  const [error, setError] = React3.useState("");
  const parentId = path2.at(-1)?.id;
  React3.useEffect(() => {
    const show = () => {
      setPath([]);
      setOpen(true);
    };
    window.addEventListener(libraryPickerRequestedEvent, show);
    return () => window.removeEventListener(libraryPickerRequestedEvent, show);
  }, []);
  React3.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    setRows([]);
    void management.list(parentId).then((items) => {
      if (!cancelled) setRows(items);
    }).catch((cause) => {
      if (!cancelled) setError(cause instanceof Error ? cause.message : "\u65E0\u6CD5\u52A0\u8F7D\u8D44\u6599\u5E93\uFF0C\u8BF7\u91CD\u8BD5\u3002");
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [open, parentId, management]);
  React3.useEffect(() => {
    if (!open) return;
    const outside = (event) => {
      if (!root.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  const pick = (row) => {
    if (row.kind === "folder") {
      setPath((current) => [...current, row]);
      return;
    }
    if (addReference(String(sessionId), row)) setOpen(false);
    else setError("\u65E0\u6CD5\u6DFB\u52A0\u5F15\u7528\uFF0C\u8BF7\u7B49\u5F85\u8F93\u5165\u6846\u5C31\u7EEA\u540E\u91CD\u8BD5\u3002");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("style", { children: css }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "wd-library-picker", ref: root, children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { ref: trigger, type: "button", className: "wd-library-picker-trigger", "aria-label": "\u4ECE\u8D44\u6599\u5E93\u6DFB\u52A0\u5230\u5BF9\u8BDD", "aria-haspopup": "dialog", "aria-expanded": open, title: "\u4ECE\u8D44\u6599\u5E93\u6DFB\u52A0\u5230\u5BF9\u8BDD", onClick: () => {
        setPath([]);
        setOpen((value) => !value);
      }, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon, { name: "library", size: 22 }) }),
      open && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "wd-library-popover", role: "dialog", "aria-label": "\u8D44\u6599\u5E93", children: [
        parentId && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("button", { className: "wd-library-back", type: "button", onClick: () => setPath((current) => current.slice(0, -1)), children: [
          "\u2190 \u8FD4\u56DE \xB7 ",
          path2.at(-1)?.name
        ] }),
        loading && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "wd-library-status", role: "status", children: "\u6B63\u5728\u52A0\u8F7D\u8D44\u6599\u2026" }),
        error && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "wd-library-status", role: "alert", children: error }),
        !loading && !error && !rows.length && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "wd-library-status", children: "\u6682\u65E0\u8D44\u6599\uFF0C\u53EF\u5728\u8D44\u6599\u5E93\u4E2D\u5BFC\u5165\u6587\u4EF6\u3002" }),
        rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "wd-library-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("button", { className: "wd-library-main", type: "button", onClick: () => pick(row), disabled: row.kind !== "folder" && (!row.asset || !row.revision), children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "wd-library-mark", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon, { name: row.kind === "folder" ? "folder" : "library" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "wd-library-copy", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("strong", { children: row.name }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("small", { children: row.kind === "folder" ? "\u6587\u4EF6\u5939" : row.asset?.kind.toUpperCase() })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { className: "wd-library-action", type: "button", "aria-label": `${row.kind === "folder" ? "\u6253\u5F00" : "\u6DFB\u52A0"} ${row.name}`, disabled: row.kind !== "folder" && (!row.asset || !row.revision), onClick: () => pick(row), children: row.kind === "folder" ? "\u6253\u5F00" : "\u6DFB\u52A0" })
        ] }, row.id)),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("button", { className: "wd-library-manage", type: "button", onClick: () => {
          setOpen(false);
          openLibrary();
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { "aria-hidden": "true", children: "\u2197" }),
          "\u7BA1\u7406\u8D44\u6599\u5E93"
        ] })
      ] })
    ] })
  ] });
}

// src/client/LibraryReferencePage.tsx
var import_react3 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
function LibraryReferencePage({ management, previewRegistry, useTabInfo }) {
  const info = useTabInfo();
  const params = info.tab.navigation.params;
  const [html, setHtml] = (0, import_react3.useState)("");
  const [text, setText] = (0, import_react3.useState)("");
  const [url, setUrl] = (0, import_react3.useState)("");
  const [office, setOffice] = (0, import_react3.useState)();
  const [error, setError] = (0, import_react3.useState)("");
  const officeHost = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(() => {
    setHtml("");
    setText("");
    setOffice(void 0);
    setError("");
    setUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return "";
    });
    if (!params?.assetId || !params.revisionId) {
      setError("\u8D44\u6599\u5F15\u7528\u4E0D\u5B8C\u6574\u3002");
      return;
    }
    let active = true;
    const run = async () => {
      try {
        if (params.kind === "html" || params.kind === "pdf" || params.kind === "docx" || params.kind === "pptx" || params.kind === "csv" || params.kind === "xlsx") {
          const bytes = await management.readOriginal(params.assetId, params.revisionId);
          if (!active) return;
          if (params.kind === "html") setHtml(new TextDecoder().decode(bytes));
          else if (params.kind === "pdf") setUrl(URL.createObjectURL(new Blob([bytes], { type: "application/pdf" })));
          else if (previewRegistry.canOpen(params.kind)) setOffice({ name: params.name ?? "\u8D44\u6599", kind: params.kind, bytes });
          else setText(await management.readText(params.assetId, params.revisionId));
        } else setText(await management.readText(params.assetId, params.revisionId));
      } catch (cause) {
        if (active) setError(cause instanceof Error ? cause.message : "\u8D44\u6599\u8BFB\u53D6\u5931\u8D25\u3002");
      }
    };
    void run();
    return () => {
      active = false;
    };
  }, [management, params?.assetId, params?.revisionId, params?.kind, params?.name, info.tab.navigation.revision]);
  (0, import_react3.useEffect)(() => {
    if (!office || !officeHost.current) return;
    let dispose = () => {
    };
    let active = true;
    void previewRegistry.mount(officeHost.current, office).then((next) => {
      if (active) dispose = next;
      else next();
    }).catch((cause) => setError(cause instanceof Error ? cause.message : "\u539F\u4EF6\u9884\u89C8\u5931\u8D25\u3002"));
    return () => {
      active = false;
      dispose();
    };
  }, [office, previewRegistry]);
  (0, import_react3.useEffect)(() => () => {
    if (url) URL.revokeObjectURL(url);
  }, [url]);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { "aria-label": "\u8D44\u6599\u5F15\u7528\u9884\u89C8", style: { height: "100%", display: "flex", flexDirection: "column", background: "var(--dsw-alias-bg-base)", color: "var(--dsw-alias-label-primary)" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("header", { style: { padding: "12px 16px", borderBottom: "0.5px solid var(--dsw-alias-border-l2)", fontWeight: 600 }, children: params?.name ?? "\u8D44\u6599\u9884\u89C8" }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: error ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { style: { padding: 24, color: "var(--dsw-alias-state-error-primary)" }, children: error }) : html ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("iframe", { title: params?.name, sandbox: "allow-scripts", srcDoc: isolateHtml(html), style: { width: "100%", height: "100%", border: 0, background: "#fff" } }) : url ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("iframe", { title: params?.name, src: url, style: { width: "100%", height: "100%", border: 0 } }) : office ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { ref: officeHost, style: { height: "100%" } }) : text ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("pre", { style: { margin: 0, padding: 24, whiteSpace: "pre-wrap", overflowWrap: "anywhere", fontFamily: "inherit", lineHeight: 1.7 }, children: text }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { style: { padding: 24, color: "var(--dsw-alias-label-tertiary)" }, children: "\u6B63\u5728\u8BFB\u53D6\u8D44\u6599\u2026" }) })
  ] });
}
function isolateHtml(source) {
  const policy = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: blob:; media-src data: blob:; font-src data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src 'none'; frame-src 'none';">`;
  return /<head(?:\s[^>]*)?>/i.test(source) ? source.replace(/<head(?:\s[^>]*)?>/i, (match) => `${match}${policy}`) : `${policy}${source}`;
}

// src/client/preview-registry.ts
function createLibraryPreviewRegistry() {
  const handlers = /* @__PURE__ */ new Map();
  const listeners = /* @__PURE__ */ new Set();
  let revision = 0;
  const changed = () => {
    revision += 1;
    for (const listener of listeners) listener();
  };
  return {
    register(kinds, mount) {
      for (const kind of kinds) handlers.set(kind, mount);
      changed();
      return () => {
        for (const kind of kinds) if (handlers.get(kind) === mount) handlers.delete(kind);
        changed();
      };
    },
    canOpen(kind) {
      return kind === "docx" || kind === "pptx" ? handlers.has(kind) : false;
    },
    async mount(target, input) {
      const handler = handlers.get(input.kind);
      if (!handler) throw new Error("library/preview-unavailable");
      return await handler(target, input) ?? (() => void 0);
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getRevision() {
      return revision;
    }
  };
}

// src/client.tsx
var name = "dsh-library-master-client";
var inject = ["slots", "layout", "connection", "sessions", "workspaces", "conversation", "inputTriggers", "sidebarRightTabs", "sidebarRight", "uiWorkspace"];
function apply(ctx) {
  const lifetime = new AbortController();
  ctx.effect(() => () => lifetime.abort(), "workdsh.library.client");
  const management = createLibraryClient(ctx, lifetime.signal);
  const previewRegistry = createLibraryPreviewRegistry();
  ctx.provide("dshLibraryPreview", previewRegistry);
  const sessions = ctx.sessions;
  const waitForInput = (milliseconds) => new Promise((resolve, reject) => {
    lifetime.signal.throwIfAborted();
    const abort = () => {
      window.clearTimeout(timer);
      reject(lifetime.signal.reason);
    };
    const timer = window.setTimeout(() => {
      lifetime.signal.removeEventListener("abort", abort);
      resolve();
    }, milliseconds);
    lifetime.signal.addEventListener("abort", abort, { once: true });
  });
  const encodeRef = (value) => encodeURIComponent(JSON.stringify(value));
  const decodeRef = (value) => JSON.parse(decodeURIComponent(value));
  const referenceOf = (value) => ({ source: "dsh-library-master", ref: encodeRef(value), label: value.name, appearance: "file", clipboardText: `@\u8D44\u6599\u5E93/${value.name}` });
  const insertReference = (sessionId, value) => {
    const binding = sessions.binding(sessionId);
    if (!binding) return false;
    const input = ctx.conversation.input.for(binding.ctx);
    const state = input.state.getSnapshot();
    const offset = state.draft.length;
    const scoped = { ...value, sessionId };
    const inserted = binding.ctx.bail(binding.ctx, "slash/input-insert-reference", { reference: referenceOf(scoped), span: { start: offset, end: offset, draftRev: state.draftRev } }) === true;
    if (inserted) void management.taskSelection(sessionId).then((current) => management.setTaskSelection(sessionId, [.../* @__PURE__ */ new Set([...current.map((row) => row.nodeId), value.nodeId])])).catch(() => []);
    return inserted;
  };
  ctx.on("workdsh/composer-handoff", async (handoff) => {
    const selected = await management.taskSelection(handoff.sourceSessionId);
    const referenced = handoff.references.filter((reference) => reference.source === "dsh-library-master").map((reference) => decodeRef(reference.ref).nodeId);
    await management.setTaskSelection(handoff.targetSessionId, [.../* @__PURE__ */ new Set([...selected.map((row) => row.nodeId), ...referenced])]);
    for (const reference of handoff.references) {
      if (reference.source !== "dsh-library-master") continue;
      const value = decodeRef(reference.ref);
      reference.ref = encodeRef({ ...value, sessionId: handoff.targetSessionId });
    }
  });
  const currentSessionId = () => {
    const state = sessions.list.getSnapshot();
    return state.ids.map((id) => state.byId[id]).find((row) => (row.retainedBy.mainView ?? 0) > 0)?.id;
  };
  const resolveWorkspace = () => {
    const currentId = currentSessionId();
    const state = sessions.list.getSnapshot();
    const workspaces = ctx.workspaces.list.getSnapshot().items;
    return (currentId ? workspaces.find((row) => row.sessionIds.includes(currentId)) : void 0) ?? workspaces.find((row) => row.path === (currentId ? state.byId[currentId]?.cwd : void 0)) ?? workspaces[0];
  };
  const startConversation = async (entry) => {
    if (!entry.asset || !entry.revision) throw new Error("\u6587\u4EF6\u5939\u4E0D\u80FD\u6DFB\u52A0\u5230\u5BF9\u8BDD\u3002");
    const workspace = resolveWorkspace();
    if (!workspace) throw new Error("\u8BF7\u5148\u9009\u62E9\u5DE5\u4F5C\u7A7A\u95F4\u3002");
    const sessionId = await sessions.create({ workspaceId: workspace.workspaceId, cwd: workspace.path });
    ctx.uiWorkspace.openSession(sessionId);
    ctx.layout.selectPanel(null);
    const value = { assetId: entry.asset.id, revisionId: entry.revision.id, nodeId: entry.id, name: entry.name, kind: entry.asset.kind };
    await waitForInput(150);
    for (let attempt = 0; attempt < 40; attempt++) {
      if (insertReference(String(sessionId), value)) return;
      await waitForInput(25);
    }
    throw new Error("\u65B0\u5BF9\u8BDD\u8F93\u5165\u6846\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");
  };
  const source = {
    trigger: "@",
    name: "dsh-library-master",
    order: 30,
    showGroupTitle: false,
    candidates: async (_session, request) => {
      if (!request.query.trim()) {
        const collect = async (parentId) => (await Promise.all((await management.list(parentId)).map((row) => row.kind === "folder" ? collect(row.id) : Promise.resolve(row.asset && row.revision ? [{ assetId: row.asset.id, revisionId: row.revision.id, nodeId: row.id, name: row.name, kind: row.asset.kind }] : [])))).flat();
        const values = await collect();
        return values.map((value) => ({ name: value.name, label: value.name, description: value.kind.toUpperCase(), icon: "file", value: encodeRef(value) }));
      }
      const hits = await management.search(request.query).catch(() => []);
      return hits.map((hit) => ({ name: hit.name, label: hit.name, description: [hit.folderPath, hit.excerpt].filter(Boolean).join(" \xB7 "), icon: "file", value: encodeRef(hit) }));
    },
    onPick: (pick) => {
      if (!pick.candidate.value) return void 0;
      const value = decodeRef(pick.candidate.value);
      const sessionId = String(pick.session.sessionId);
      void management.taskSelection(sessionId).then((current) => management.setTaskSelection(sessionId, [.../* @__PURE__ */ new Set([...current.map((row) => row.nodeId), value.nodeId])])).catch(() => []);
      return { insert: referenceOf({ ...value, sessionId }) };
    },
    openReference: (session, reference) => {
      const value = decodeRef(reference.ref);
      void ctx.sidebarRight.openTabIn(session.sessionId, "dsh-library-master-preview", { params: { assetId: value.assetId, revisionId: value.revisionId, name: value.name, kind: value.kind } });
      return true;
    },
    codec: {
      clipboardText: (ref) => `@\u8D44\u6599\u5E93/${decodeRef(ref).name}`,
      serialize: async (ref) => {
        const value = decodeRef(ref);
        if (value.sessionId) {
          const current = await management.taskSelection(value.sessionId);
          if (!current.some((row) => row.nodeId === value.nodeId)) await management.setTaskSelection(value.sessionId, [...current.map((row) => row.nodeId), value.nodeId]);
        }
        return `@\u8D44\u6599\u5E93/${value.name}`;
      }
    }
  };
  ctx.effect(() => ctx.inputTriggers.registerSource(source));
  ctx.effect(() => {
    const openTranscriptReference = (event) => {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest("a,button");
      if (!trigger) return;
      const href = trigger.getAttribute("href") ?? "";
      const marker = [href, trigger.getAttribute("title"), trigger.getAttribute("aria-label")].filter(Boolean).join(" ");
      const label = (trigger.textContent ?? "").trim();
      const path2 = decodeURIComponent(marker.replace(/^file:\/\//, ""));
      if (!path2.includes("\u8D44\u6599\u5E93/") && !marker.includes("%E8%B5%84%E6%96%99%E5%BA%93")) return;
      const name2 = label || path2.split("/").filter(Boolean).at(-1) || "";
      if (!name2) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      void management.search(name2).then((hits) => {
        const hit = hits.find((row) => row.name === name2) ?? hits[0];
        const sessionId = currentSessionId();
        if (!hit || !sessionId) return;
        return ctx.sidebarRight.openTabIn(sessionId, "dsh-library-master-preview", { params: { assetId: hit.assetId, revisionId: hit.revisionId, name: hit.name, kind: hit.kind } });
      }).catch(() => void 0);
    };
    document.addEventListener("click", openTranscriptReference, true);
    return () => document.removeEventListener("click", openTranscriptReference, true);
  }, "workdsh.library.transcriptReferences");
  ctx.effect(() => ctx.sidebarRightTabs.register({ id: "dsh-library-master-preview", kind: "dsh-library-master-preview", title: () => "\u8D44\u6599\u9884\u89C8" }));
  ctx.slots.inject("sidebar.right.pane.tab", () => ctx.slots.register({ name: "sidebar.right.pane.tab", key: "dsh-library-master-preview", inject: () => ({ management, previewRegistry }) }, LibraryReferencePage));
  ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({ name: "sidebar.panellist", id: "dsh-library-master", label: "\u8D44\u6599\u5E93", order: 31 }, () => (0, import_react4.createElement)("span", { "aria-hidden": true }, "\u25A4")));
  ctx.slots.inject("main", () => ctx.slots.register({ name: "main", key: "dsh-library-master", inject: () => ({ management, previewRegistry, toggleNavigation: () => ctx.layout.toggleSidebar(), startConversation }) }, LibraryPanel));
  ctx.slots.inject("conversation.input.left", () => ctx.slots.register({
    name: "conversation.input.left",
    id: "dsh-library-master-picker",
    order: 35,
    inject: () => ({ management, openLibrary: () => ctx.layout.selectPanel("dsh-library-master"), addReference: (sessionId, entry) => entry.asset && entry.revision ? insertReference(sessionId, { assetId: entry.asset.id, revisionId: entry.revision.id, nodeId: entry.id, name: entry.name, kind: entry.asset.kind }) : false })
  }, LibraryPicker));
}

return module.exports;}});
