# joy-handle

My **personal** work command board. One place to quickly answer:
**"where is this task (which env), how far along, and why did I do it this way?"** — when jumping between joy / joy-2 / joy-3.

Source of truth = **markdown + a few Claude commands**. On top of that there's a
small **read-only web board** (`/app`, Next.js) that renders the same `tasks/*.md`
as a kanban — for sharing with the team. The markdown stays primary; the web is
only a viewer.

## Core principle (so it doesn't drift like the old md)

- **STATE** (column + env + MR + date) must always be correct and **cheap to update** → use `/board`, `/task-work`.
- **CONTEXT** = 3 lenses per card (BA / Reviewer / Dev).
- "What dev did" → link the **MR/branch**, do NOT hand-type it. Git is the source of truth.
- Each task = 1 folder `tasks/<slug>/`. Content files differ by type — feature: `ba.md`+`plan.md`+`dev.md`+`review.md`; bug: just `fix.md`. The "kanban column" = the `status` field.

## Columns (dev flow, split by type)

```
feature: gather → verify → plan → coding → staging → test-staging → review → production → done
bug:     localize → reproduce → identify → fix → production
```
`env` is separate: `local | staging | production` (a task can be "review done" yet have a "prod bug").

## Web board (read-only viewer)

Next.js app under `/app` reads the `tasks/<slug>/` folders **at build time** and
shows them as a kanban with a Feature/Bug toggle + repo filter. Click a card → its
own page at `/task/<slug>` (a **shareable link**). Tabs differ by type:
feature → Tổng hợp / Phân tích / Plan / Theo dõi tiến độ / Review; bug → Tổng hợp /
Nguyên nhân & giải pháp. Tab config: `lib/columns.js` (`TABS`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

**Deploy (Vercel):** import the repo on vercel.com (auto-detected as Next.js, no
config needed), or `npx vercel --prod`. **To update the board:** edit a card in
`tasks/`, commit & push → Vercel redeploys. Git stays the source of truth.

## Two flows

**feature** — gather → verify (against code) → plan → **build part by part (loop, split small — never change 50 files and commit at once)** → review → deploy staging → fix bug
**bug** — localize → reproduce → identify → fix → review → deploy → retest

## Commands

| Command | What it does |
|---------|--------------|
| `/board` | Scan `tasks/`, print the kanban by column + env |
| `/task-new` | Read a source (Notion/chat/idea) → summarize, ask back on unclear bits → create a card |
| `/task-work` | Pick a card → `add-dir` the matching repo → run the right flow → update the card |

## Multi-repo (Hub-orchestrates)

Open the session inside joy-handle, then `/add-dir ../joy ../joy-2 ../joy-3` to reach code in every repo in one go. Each card records `repo:` so you know which clone it touches.

> My raw input (original problem + wishes): see `BRIEF.md`.
