---
description: Continue a task — switch INTO the target repo to do the real work, then record a short summary here
argument-hint: [task name]
allowed-tools: Read, Glob, Grep, Edit, Bash
---

Task to work on: $ARGUMENTS

> **joy-handle is only an intermediate notebook.** The real work — plan, code, fix, test, review — happens IN the target repo (`../joy` / `../joy-2` / `../joy-3`) using THAT repo's own commands/agents, NOT here. This hub can't produce the full result; it only reads the card for context and writes back a short summary. Notes here are intentionally lighter than the repo's output.

1. Open the folder `tasks/<task>/` — read `_meta.md` (frontmatter) + content files (feature: `ba.md`/`plan.md`/`dev.md`/`review.md`; bug: just `fix.md`). If it's unclear which task, run `/board` then ask me.
2. **Switch into the target repo.** Per the card's `repo:`, `/add-dir ../<repo>` if not added yet (Hub-orchestrates). From here on, work *inside that repo* — its codebase and tuned commands are what actually matter.
3. **Do the actual work THERE, with the repo's own commands/agents** (`/plan`, `/fix`, `/test`, `/review`, `/lint-mr`, `/translate`, `/impact`, `/browser-test`...), following the flow per `type`:
   - **feature**: verify → plan → **build part by part, loop** (NEVER change 50 files and commit at once) → review → deploy staging → fix bug.
   - **bug**: localize → reproduce → identify → smallest fix → review → deploy → retest.
   - When I say "lên plan / fix / code / review ...", **call the matching command in the target repo** — do not try to generate the full result here.
4. **Then record a SHORT summary back into the card** (cheap, anti-drift):
   - in `_meta.md`: `status`, `env`, `branch`, `mr`, `updated` = today.
   - feature: tick done parts in `dev.md`, key decisions/tradeoffs in `review.md`; bug: update `fix.md`.
   - Link the MR/branch — do NOT hand-type "what code was written". Git in the target repo is the source of truth.
