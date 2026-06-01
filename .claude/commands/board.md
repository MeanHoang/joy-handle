---
description: Scan tasks/ and print the kanban by column + env
allowed-tools: Read, Glob, Bash
---

Read every task folder in `tasks/` (skip `_template/`); each card's frontmatter lives in `tasks/<slug>/_meta.md`.

For each card, read the frontmatter: `title, type, status, env, repo, branch, mr, updated`.

Print a **compact kanban**, split by `type`, grouped by `status` in column order:
- **feature**: `gather → verify → plan → coding → review → deploy → done`
- **bug**: `localize → reproduce → identify → fix → review → deploy → done`

One line per card:
`- [<type>] <title> · 📦<repo> · 🌐<env> · <mr or branch or "—"> · <updated>`

Then a quick warning list (if any):
- cards with `env: production` whose `status` is not `done` (a prod bug left hanging)
- cards whose `updated` is far in the past vs today (possible drift)

Only print the board, don't modify any file.
