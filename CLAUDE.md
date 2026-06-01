# CLAUDE.md — joy-handle

joy-handle = a **personal work command board** (markdown + Claude commands; plus a read-only web viewer, see rule 5).
It answers fast: *"where is this task (which env), how far along, and why did I do it this way?"* when jumping between joy / joy-2 / joy-3.

**It is an INTERMEDIATE NOTEBOOK only.** The real work — plan / code / fix / test / review — runs IN the target repo (`../joy` etc.) using THAT repo's own commands & agents, never here. When I ask you to do something, switch into the matching repo and call its command; this hub only records a short summary + links afterward. Notes here are deliberately lighter than the repo's output.
Full rules: `README.md`. Card templates (per type): `tasks/_template-feature/` (`_meta.md` + `ba.md` + `plan.md` + `dev.md` + `review.md`) and `tasks/_template-bug/` (`_meta.md` + `fix.md` only — bug stays lean).

---

## Behavioral principles (always)

Bias toward **caution over speed**. For trivial work (typo, rename, one-line fix), use judgment.

### 1. Think before coding
Don't assume. Don't hide confusion. Surface tradeoffs.
- State assumptions explicitly. If unsure, **ask** — don't decide silently.
- Multiple options → name them with tradeoffs, don't pick quietly.
- Push back when warranted: if 30 lines solve it, don't write a 200-line abstraction.

### 2. Simplicity first
Minimum code that solves the problem. Nothing speculative.
- No features/"flexibility" I didn't ask for.
- No abstraction for single-use code. No error handling for impossible cases.
- Check: *"would a senior call this overcomplicated?"* If yes → rewrite smaller.

### 3. Surgical changes
Touch only what you must. Clean up only your own mess.
- Don't "while I'm here" edit surrounding code/format/comments.
- Match existing style. Spot old dead code → **mention it, don't delete**.

### 4. Goal-driven execution
Define measurable "done", then loop until it's met.
- "Fix bug" → "reproduce in test/log → fix → that case passes".
- "Add X" → "state acceptance criteria, confirm with a sample payload".

### 5. 🚫 joy-handle specifically — DON'T go too far
This is a **personal, minimal** tool. NO web/framework/infra/extra files unless I explicitly ask.
(It was once over-built into a Nextra site → scrapped.) Before adding any new file/concept, ask *"is this truly needed?"* first.

**Deliberate exception (asked for 2026-06):** a small **read-only** Next.js board in `/app`
(`app/`, `lib/`, `package.json`, `next.config.mjs`) that renders `tasks/*.md` as a kanban
for sharing with the team, deployed on Vercel. This is NOT scrap — it's the one approved web
layer. Markdown stays the source of truth; the web only *reads*. Keep it minimal: no backend,
no DB, no editing-on-web. Don't grow it beyond a viewer without asking.

---

## How the board works

- 1 task = 1 folder `tasks/<slug>/`. Content files differ by type — feature: `ba.md`+`plan.md`+`dev.md`+`review.md`; bug: just `fix.md`. The "kanban column" = the `status` field, split by `type`:
  feature `gather→verify→plan→coding→review→deploy→done`, bug `localize→reproduce→identify→fix→review→deploy→done`. `env` (local/staging/production) is tracked separately.
- **STATE must stay accurate and cheap to update** — this is the anti-drift rule, the root disease of the old md. Update `status/env/branch/mr/updated` after every meaningful step.
- **"What dev did" = link the MR/branch, do NOT hand-type it.** Git is the source of truth.
- Per card lenses → web board tabs, **per type**: feature = Phân tích (`ba.md`) / Plan (`plan.md`) / Theo dõi tiến độ (`dev.md`) / Review (`review.md`); bug = just Nguyên nhân & giải pháp (`fix.md`). Tab config lives in `lib/columns.js` (`TABS`).
- 2 flows: **feature** (verify→plan→loop small parts→review→deploy staging→fix bug) · **bug** (localize→reproduce→identify→fix→review→deploy→retest).
- Commands: `/board` · `/task-new` · `/task-work`.

## Multi-repo (Hub-orchestrates)

- Real code lives in `../joy`, `../joy-2` (pre-added in `settings.local.json`; add `../joy-3` once cloned). Each card's `repo:` says which clone it touches.
- **Execute in the repo, not in the hub.** For any real task, `/add-dir ../<repo>` and run that repo's already-tuned commands/agents there: `/plan` `/fix` `/test` `/review` `/lint-mr` `/translate` `/impact` `/browser-test`. The hub only gets the summary back.
- **Gathering sources** (the `gather`/`localize` step, creds in `.env`, gitignored): Notion=read tickets · Slack=read threads · GCP Cloud Logging=read error logs (project `avada-joy`) · Crisp=read support chats. These feed the *summary*, not code execution. Full per-step playbook: `.claude/commands/task-work.md`.
- **Joy's 5 expensive-mistake spots** (check while working): `shopId` scoping (multi-tenant) · webhook responds in ≤5s (heavy work → Pub/Sub) · Firestore index for compound queries · `/translate` for every new user-facing string · bulk 500+ items use the bulk API.
