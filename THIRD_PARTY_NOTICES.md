# Third-party notices

This plugin derives from WorkDSH, https://github.com/techflag/workdsh, commit
`b9a6c70973082465e42dc4dd3fa3bcdd794e4ec9`.
Copyright (c) 2026 Anywhere Labs. Licensed under MIT; the original license is
preserved in LICENSE. Extraction paths and adaptations are listed in UPSTREAM.json.

The local dsh-skills-master extraction identifies WorkDSH as its upstream and
includes Library contracts, but does not contain the full Library implementation.
This distribution extracts the implementation directly from the recorded WorkDSH revision.

Runtime dependencies JSZip, PDF.js, ExcelJS, Zod and PapaParse retain their own
licenses in their installed npm packages. Official DeepSeek Harness packages and
React are supplied through their published packages / the host module loader.
No Office plugin runtime or enterprise backend is included.
