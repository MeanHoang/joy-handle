---
description: Start/continue a task — add-dir the repo, run the right flow, update the card
argument-hint: [task name]
allowed-tools: Read, Glob, Grep, Edit, Bash
---

Task to work on: $ARGUMENTS

1. Open the folder `tasks/<task>/` — read `_meta.md` (frontmatter) + the content files (feature: `ba.md`/`plan.md`/`dev.md`/`review.md`; bug: just `fix.md`). If it's unclear which task, run `/board` then ask me.
2. Per the card's `repo:`, remind me to `/add-dir ../<repo>` if not added yet (Hub-orchestrates). The real code lives in that repo.
3. Run the **right flow per `type`**:
   - **feature**: verify → plan → **build part by part, loop** (NEVER change 50 files and commit at once) → review → deploy staging → fix bug.
   - **bug**: localize → reproduce → identify → smallest fix → review → deploy → retest.
   - Use Joy's existing commands/agents (`/plan`, `/fix`, `/test`, `/review`, `/lint-mr`, `/translate`...).
4. **After every meaningful step, update the card** (cheap, anti-drift):
   - in `_meta.md`: `status`, `env`, `branch`, `mr`, `updated` = today.
   - tick the done parts in `dev.md`; note any open bug + env.
5. Do NOT hand-type "what code was written" — only link the MR/branch. Git is the source of truth.
