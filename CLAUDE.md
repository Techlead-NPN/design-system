# Design System

This repo is the design system for all projects: shared foundations, one theme per look (`themes/`), plus one folder per project. See [README.md](README.md) for the layout.

## When building or changing UI

Before writing any UI code, read these two files, in order, and follow them:

1. `foundations/BUILD_GUIDE.md` — setup, token-to-class mapping, and rules for every project
2. `projects/<project>/BUILD_GUIDE.md`, when the project has a folder — which docs to read for the task (e.g. `projects/e-approval/BUILD_GUIDE.md`, `projects/paygenix-merchant/BUILD_GUIDE.md`)

A new internal app (anything in the employee workspace) usually has no project folder yet: read `workspace/README.md` instead. New apps use the Duo look and start from the starter app in `components/starter/leave/`.

Before building any part the package doesn't have (a canvas, a board, a special card), check `workspace/app-parts.md`. If another app already built it, don't build a second one: tell the user it exists, in which app, and that a second app needing it means it should move into the package. A prototype may use a simple stand-in, marked as one. If nobody has it, build it in the app with theme tokens and add a row to that list.

Stack is always Tailwind CSS v4. Values come only from `foundations/tokens/foundations.css` and the project's theme in `themes/` (`themes/workspace.css` for the Classic look such as E-Approval, `themes/duo.css` for new apps on the Duo look, `themes/paygenix.css` for PayGenix; the project's `BUILD_GUIDE.md` says which); never invent a color, spacing or type value.

## When adding or changing a coded component

- Code lives in `components/src/<family>/`; export it from `components/src/index.ts` with a `DS` prefix (`export { Button as DSButton }`), types included. Files, stories and docs keep the plain name.
- Add or update its story in the same folder (`*.stories.tsx`) so it appears in Storybook.
- Check with `npm run typecheck` and `npm run build-storybook` in `components/`.
- Any change that alters what the package ships (components, their exports, or the token files) raises `version` in `components/package.json` in the same PR, using semver: patch for a fix that changes no API, minor for a new component, prop or token, major for a removal or rename that breaks an app. Run `npm version <x.y.z> --no-git-tag-version` in `components/` so the lockfile follows. Doc-only and Storybook-only changes do not bump it. After merging, a GitHub release tagged `v<x.y.z>` publishes it (see README "Releasing a new version").

## When editing the docs

- The `.css` token files are the source of truth for values; keep the `.md` tables in sync with them.
- Every theme in `themes/` defines the same token names as `themes/workspace.css` (`themes/CONTRACT.md`). A name added to `workspace.css` goes into every other theme in the same PR; `npm run check-themes` in `components/` checks it.
- Shared content goes in `foundations/`; anything specific to one project stays in that project's folder.
- Process for auditing a component against Figma: `foundations/workflow/AUDIT_WORKFLOW.md`.
