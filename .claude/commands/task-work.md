---
description: Continue a task — switch INTO the target repo to do the real work, then record a short summary here
argument-hint: [task name]
allowed-tools: Read, Glob, Grep, Edit, Bash
---

Task to work on: $ARGUMENTS

> **joy-handle is only an intermediate notebook.** The real work — plan, code, fix, test, review — happens IN the target repo (`../joy` / `../joy-2` / `../joy-3`) using THAT repo's own commands/agents, NOT here. The hub only reads the card for context and records a short summary. Notes here are deliberately lighter than the repo's output.

## Two hard rules

1. **Status moves need MY approval.** Only **step 1** (`gather` for feature, `localize` for bug) may auto-advance. For **every other column**, do the work but **do NOT bump `status` until I explicitly say OK** — wait, even if the work looks done.
2. **Clarify before acting.** At each step make the work *more* concrete than the source — ask me back rather than assume. Each step = one kanban column; finishing a step means: do the work in the repo → write the short summary into the card → (with my OK) bump `status` to the next column + `updated` = today.

Golden checks every step: small loops (NEVER 50 files in one commit) · link the MR/branch, don't hand-type code · Joy's 5 expensive-mistake spots (`shopId` scoping · webhook ≤5s → Pub/Sub · Firestore index for compound queries · `/translate` every new user-facing string · bulk API for 500+ items).

## Setup
Open `tasks/<task>/`, read `_meta.md` + content files. `/add-dir ../<repo>` for the card's `repo:`. Unclear which task? run `/board` then ask me.

## FEATURE workflow

| `status` | Owner | Move | What to actually do | Record into card |
| --- | --- | --- | --- | --- |
| **gather** | 🤖 AI | **auto** | Fully gather + analyze the ask (sources via `.env`: Notion/Slack/GCP logs/Crisp). Compare roughly vs joy codebase, list questions for me to ask PO. | `ba.md` + sources in `_meta.md` |
| **verify** | 🤝 both | my OK | I answer your questions → you analyze feasibility, keep asking back until the requirement is clean and I'm satisfied. | conflicts/decisions in `review.md` |
| **plan** | 🤖 AI, I review | my OK | Write a detailed plan **as an `.md` file inside the joy repo**, **split into PHASES**. I review (can still ask back). | summary + repo plan link in `plan.md` |
| **coding** | 🤝 AI codes, I review+test | my OK | Do it **phase by phase**: code one phase → commit → I review → I test → next phase. | tick phases in `dev.md` · set `branch` |
| **staging** (Deploy staging) | 🤖 AI | my OK | Checkout branch, commit, deploy to staging. | `env: staging` |
| **test-staging** | 🧑 tester, 🤖 AI fixes | my OK | Tester tests on staging; each bug = a small coding loop you set up & fix. | note fixes in `dev.md` |
| **review** | 🧑 Techlead | my OK | Create `review.md` + commit it (so it deploys); I paste the doc for the Techlead to read. | finalize `review.md` · set `mr` |
| **production** | 🤖 AI | my OK | It's on production — monitor and fix bugs (especially heavy tags: sync/export). | note prod issues in `dev.md` |
| **done** | — | my OK | Stable on prod, monitoring over. | `status: done` |

## BUG workflow

| `status` | Owner | Move | What to actually do | Record into card |
| --- | --- | --- | --- | --- |
| **localize** | 🤖 AI | **auto** | Fully localize the failure (logs/Sentry/Crisp, GCP Cloud Logging). Give the repro method / where to check. | symptom + env in `fix.md` |
| **reproduce** | 🧑 me | my OK | I reproduce it myself, then tell you to move. | repro steps in `fix.md` |
| **identify** | 🤖 AI | my OK | Identify the root cause; **describe the bug clearly + propose the fix**. | cause + proposed fix in `fix.md` |
| **fix** | 🤖 AI, I review | my OK | On the repo: checkout a new branch, make the smallest fix; I review → move if I agree. | solution in `fix.md` · set `branch`/`mr` |
| **production** | 🧑 me | my OK | I test on production to confirm it's OK. | `status: production` when I confirm |

Keep card updates cheap and accurate — but never advance `status` past step 1 without my go-ahead.
