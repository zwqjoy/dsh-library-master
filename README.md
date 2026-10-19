# dsh-library-master · 资料库

可独立安装的 DeepSeek Harness 个人资料库插件。把常用资料保存在本机，搜索内容，再将指定文档的固定修订添加到对话，让 AI 基于这些资料完成任务。

## 功能

- 文件夹、批量上传、新建 Markdown / TXT、重命名、移动、停用和删除。
- Markdown、TXT、HTML、PDF、DOCX、PPTX、CSV、XLSX 原件保存及文本提取。
- 按名称和正文搜索，按类型、来源、日期筛选；浏览最近资料与本地产物。
- 文本草稿、冲突检测、发布新修订；已添加到会话的引用固定到原修订。
- 侧边栏“资料库”、输入框资料选择器、`@` 资料引用、右侧资料预览。
- `library_search`、`library_read` 等 AI 工具；检索和读取限制在当前对话明确选择的资料内。

基于 WorkDSH 的 Library 插件提取。内部 contracts、UI 和表格文本提取已随源码封装，不依赖 dsh-skills-master、WorkDSH 身份插件或 Office 插件。

## 安装

要求 Node.js >=22.19.0，以及提供官方 storageDomain、connection、tools、systemPrompt 和相关 Client 服务的 Harness。构建和类型检查采用 DSH `0.2.1-rc.2`、Cordis `4.0.5`、React `19.2.4`；其他版本尚未验证。

```sh
git clone https://github.com/zwqjoy/dsh-library-master.git
cd dsh-library-master
npm ci
```

仓库包含预构建 `dist`。在 Harness 中打开 **插件 → 添加插件 → 安装第三方插件**，选择本仓库中包含 `package.json` 的目录，启用后新建会话。若宿主要求重启，重启后使用侧边栏“资料库”。宿主必须启用官方存储域及标准会话/输入框/侧边栏服务；本插件不会替换宿主服务。

## 使用

1. 打开“资料库”，点击“＋”上传文件或新建文档、文件夹。
2. 点击文档阅读提取文本；可搜索名称或正文。
3. 使用“添加到对话”或点击输入框的资料库图标，在居中弹窗中选择资料，然后提出任务。弹窗支持全库名称/正文搜索、文件夹浏览和独立滚动列表，按 Esc 或点击遮罩可关闭。
4. 修改资料先创建草稿，检查后发布。会话原有引用仍指向旧修订；需要新内容时重新添加。

数据原件和提取文本默认保存在 `$DSH_HOME/dsh-library-master`，未设置 DSH_HOME 时为 `~/.dsh/dsh-library-master`；索引和会话选择由宿主官方 storageDomain 的 `dsh_library_master` 域持久化。备份时应同时备份宿主存储和上述目录。卸载插件不会主动删除资料。

## 边界

这是本地个人插件，同一 Harness Profile 内共享本地身份和资料库，不提供企业多租户权限或云端同步。不自动迁移 WorkDSH 旧资料。

PDF 仅提取已有文本，不包含 OCR；复杂 Office 排版、图表和图片不进入检索文本。CSV/XLSX 提取有行列和单元格上限，公式只读取缓存值。DOCX/PPTX/CSV/XLSX 的富原件查看器属于可选扩展，未注册查看器时使用提取文本。HTML 使用隔离 iframe 预览。

默认单文件 50 MiB，原件修订累计 5 GiB，会话选择最多 200 项/32 MiB。删除会移除本地资料及修订，请先确认备份。

## 开发与验证

```sh
npm ci
npm run check
```

`check` 包含双端构建、TypeScript 检查、8 项存储/转换/修订/隔离测试，以及浏览器导入、阅读、页面刷新后保留和检索测试。浏览器测试默认使用已安装 Google Chrome；可通过 `PLAYWRIGHT_CHANNEL` 选择其他已安装渠道。

浏览器夹具运行真实插件 Host 注册、RPC 与存储；宿主原生 Button/Input 使用测试替身，不能证明官方桌面插件管理器安装、侧边栏集成或真实模型调用已通过。这些真实 Harness E2E 验收尚未执行。

来源与 MIT 授权见 [UPSTREAM.json](UPSTREAM.json)、[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 和 [LICENSE](LICENSE)。
