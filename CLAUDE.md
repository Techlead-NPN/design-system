# Design System

This repo is the design system for all projects: shared foundations plus one folder per project. See [README.md](README.md) for the layout.

## When building or changing UI

Before writing any UI code, read these two files, in order, and follow them:

1. `foundations/BUILD_GUIDE.md` — setup, token-to-class mapping, and rules for every project
2. `projects/<project>/BUILD_GUIDE.md` — which docs to read for the task (e.g. `projects/portal2.0/BUILD_GUIDE.md`, `projects/paygenix-merchant/BUILD_GUIDE.md`)

Stack is always Tailwind CSS v4. Values come only from `foundations/tokens/foundations.css` and `projects/<project>/tokens.css`; never invent a color, spacing or type value.

## When adding or changing a coded component

- Code lives in `components/src/<family>/`; export it from `components/src/index.ts`.
- Add or update its story in the same folder (`*.stories.tsx`) so it appears in Storybook.
- Check with `npm run typecheck` and `npm run build-storybook` in `components/`.

## When editing the docs

- The `.css` token files are the source of truth for values; keep the `.md` tables in sync with them.
- Shared content goes in `foundations/`; anything specific to one project stays in that project's folder.
- Process for auditing a component against Figma: `foundations/workflow/AUDIT_WORKFLOW.md`.
