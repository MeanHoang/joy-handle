---
description: Turn a source (Notion/chat/idea) into one task card, asking back on unclear bits
argument-hint: [paste a source or describe the task]
allowed-tools: Read, Glob, Grep, Write
---

Source / description from me:
$ARGUMENTS

Goal: turn raw input (often messy, PO/BA-generated, unreliable) into **one clean task card**.

1. **Summarize** the problem + goal in my own words — don't copy the source verbatim.
2. **Verify quickly against real code** if needed: grep the relevant repo to check whether the source is actually true. FLAG conflicts into the "Reviewer lens".
3. **ASK BACK** on anything unclear before writing — don't guess. List the questions and wait for my answers.
4. Once clear, copy the template folder for the type → `tasks/<task-name>/` (lowercase, no diacritics, `-` separated) and fill its files:
   - **feature**: copy `tasks/_template-feature/`. Fill `_meta.md` (frontmatter: `status: gather`, `repo`, `env`, `updated` = today; sources under 📎) + `ba.md` (BA lens) + `plan.md` (plan, split small) + `dev.md` (Dev progress) + `review.md` (Reviewer lens + conflict table).
   - **bug**: copy `tasks/_template-bug/`. Fill `_meta.md` (frontmatter: `status: localize`, `env` = where the bug shows) + `fix.md` (nguyên nhân & giải pháp + retest progress). Bug stays lean — no separate BA/plan/dev/review files.

Don't create the file until I've answered all the questions.
