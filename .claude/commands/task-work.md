---
description: Continue a task — switch INTO the target repo to do the real work, then record a short summary here
argument-hint: [task name]
allowed-tools: Read, Glob, Grep, Edit, Bash
---

Task to work on: $ARGUMENTS

> **joy-handle is only an intermediate notebook.** The real work — plan, code, fix, test, review — happens IN the target repo (`../joy` / `../joy-2` / `../joy-3`) using THAT repo's own commands/agents, NOT here. This hub can't produce the full result; it only reads the card for context and writes a short summary back. Notes here are deliberately lighter than the repo's output.

## How to run a task

1. Open `tasks/<task>/` — read `_meta.md` + content files (feature: `ba.md`/`plan.md`/`dev.md`/`review.md`; bug: `fix.md`). Unclear which task? run `/board` then ask me.
2. `/add-dir ../<repo>` for the card's `repo:` if not added. **From here, work inside that repo.**
3. Walk the steps below **for the card's `type`**. Each step = one kanban column (`status`). When a step is done: do the work in the repo → write the short summary into the card → **bump `status` to the next column** + `updated` = today. Never jump columns silently.
4. Golden rules every step: small loops (NEVER 50 files in one commit) · link the MR/branch, don't hand-type code · check Joy's 5 expensive-mistake spots (`shopId` scoping · webhook ≤5s → Pub/Sub · Firestore index for compound queries · `/translate` every new user-facing string · bulk API for 500+ items).

### FEATURE workflow

| `status` | Where | Do (real work) | Record into card |
| --- | --- | --- | --- |
| **gather** | hub + sources | Gather & summarize the ask (sources via `.env`: Notion=ticket · Slack=thread · GCP Cloud Logging=error logs `avada-joy` · Crisp=support chat). State problem + goal. | `ba.md` (problem/goal) · sources in `_meta.md` |
| **verify** | repo | Grep/read the real code to check the source is actually true. Flag every source-vs-code conflict. | conflict table in `review.md` |
| **plan** | repo | Call **`/plan`** in the repo → split into small parts. | plan + checklist in `plan.md` |
| **coding** | repo | Build part by part, loop. `/translate` new strings, `/impact` if risky. | tick parts in `dev.md` · set `branch` |
| **review** | repo | Call **`/review`** + **`/lint-mr`**. | verdict + tradeoffs in `review.md` · set `mr` |
| **deploy** | repo | Deploy to staging. | `env: staging` |
| **done** | repo | Test passes. Any new bug found → spin a **separate bug card**. | `status: done` |

### BUG workflow

| `status` | Where | Do (real work) | Record into card |
| --- | --- | --- | --- |
| **localize** | repo | Narrow the failure from logs/Sentry/Crisp (GCP Cloud Logging via `.env`). Note symptom + which `env`. | symptom + env in `fix.md` |
| **reproduce** | repo | Reproduce the bug (note steps). | repro steps in `fix.md` |
| **identify** | repo | Find the root cause (read code + logs). | cause in `fix.md` |
| **fix** | repo | Call **`/fix`** → smallest safe fix. | solution in `fix.md` · set `branch` |
| **review** | repo | Call **`/review`** + **`/lint-mr`**. | set `mr` |
| **deploy** | repo | Deploy the fix. | update `env` |
| **done** | repo | Retest passes. | `status: done` |

Keep card updates cheap and accurate after every step — this is the anti-drift rule.
