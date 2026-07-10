---
layout: layout.html
title: AI Skill
---

# AI Agent Skill

Dile Components ships an [Agent Skill](https://skills.sh/) so AI coding agents (Claude Code and other tools compatible with the open skills format) can install and use this library correctly — picking the right package, importing components the right way, and looking up real component APIs instead of guessing them.

## Install

If your coding agent supports the [skills](https://github.com/vercel-labs/skills) CLI, install it straight from this repository:

```bash
npx skills add Polydile/dile-components
```

This adds the skill to your project so your agent can use it automatically whenever you ask it to build or edit UI with Dile Components.

## What the skill does

- Maps each `@dile/*` package (`ui`, `crud`, `editor`, `utils`, `lib`, `iconlib`, `icons`) to what it's for, so the agent installs only what it actually needs.
- Shows the install → import → use flow for a Dile Components web component.
- Points the agent to [llms.txt](/llms.txt) and the matching markdown doc page before writing any component-specific code, so props, events and slots come from the real docs instead of being guessed.
- Links out to [theming](/theming/) and the demo sources for deeper customization questions.

## Source

The skill definition lives in this repository at [`skills/dile-components/SKILL.md`](https://github.com/Polydile/dile-components/blob/master/skills/dile-components/SKILL.md), next to the code it documents, so it stays up to date together with the library.
