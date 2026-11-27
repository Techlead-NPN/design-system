# Design System

Design system documentation for all projects: shared Foundations, one theme per look, and one folder per project. Internal apps use one of two workspace looks, Classic (`workspace.css`, E-Approval) or Duo (`duo.css`, new apps); another brand (PayGenix) or a client gets its own theme on the same components.

```
foundations/              shared by every project
├── FOUNDATIONS.md        token architecture, raw primitives, Tabler icons
├── BUILD_GUIDE.md        rules for building UI (Tailwind CSS v4)
├── tokens/               primitive values, as code (foundations.css)
└── workflow/             audit process and drift-check instructions
themes/                   semantic colors and text styles, as code; every theme defines the same token names
├── workspace.css         Classic: the look of E-Approval and other apps that keep it
├── duo.css               Duo (preview): the softer look for new internal apps; DUO.md has the decisions
├── paygenix.css          PayGenix; began as a copy of workspace.css and is independent of it
└── CONTRACT.md           the rule every theme follows, and the check that enforces it
workspace/                the shell and request/approval patterns every internal app shares (README.md is the index)
components/               coded React + Tailwind components, shared by every project
├── .storybook/           Storybook setup (one stylesheet per theme, switched from the toolbar)
└── src/                  one folder per component family, each with its stories
                           (button/, selection/, badge/, avatar/, divider/, toggle/, tooltip/, field/, menu/, calendar/, navigation/, feedback/, overlay/, table/, layout/)
projects/
├── paygenix-merchant/    uses themes/paygenix.css: DESIGN.md and BUILD_GUIDE.md list what differs from E-Approval
└── e-approval/           one folder per project (E-Approval, formerly Portal 2.0; uses themes/workspace.css)
    ├── DESIGN.md         what the semantic tokens and text styles are for, accessibility, changelog
    ├── BUILD_GUIDE.md    which docs to read for which task
    ├── components/       one doc per component
    ├── patterns/         composite structures built from components
    ├── assets/           exported SVGs (logo, illustrations)
    └── figma-snapshot.json   structural baseline of the project's Figma file
```

## Where to start

- [`foundations/FOUNDATIONS.md`](foundations/FOUNDATIONS.md) — read first; applies to every project.
- [`workspace/README.md`](workspace/README.md) — building a new internal app: the shared shell and patterns.
- [`projects/e-approval/DESIGN.md`](projects/e-approval/DESIGN.md) — E-Approval, the first internal app.
- [`projects/paygenix-merchant/DESIGN.md`](projects/paygenix-merchant/DESIGN.md) — PayGenix Merchant Dashboard; shares E-Approval's look and lists only what differs.

## Building UI from these docs

Start at [`foundations/BUILD_GUIDE.md`](foundations/BUILD_GUIDE.md), then the project's own `BUILD_GUIDE.md`. The `.css` token files hold the values; the `.md` docs explain how to use them.

## Viewing the coded components

The coded components have a Storybook: a browsable catalogue with every component, its variants and states.

**Live:** https://techlead-npn.github.io/design-system/ — rebuilt and published automatically whenever a change to the components or tokens is merged into `main` (see `.github/workflows/storybook.yml`).

To run it on your own machine:

```bash
cd components
npm install
npm run storybook
```

It opens at http://localhost:6006. Each component family has an "All variants" style page and, where useful, a Playground with controls. The **Theme** switch in the toolbar shows the same components with another theme's tokens. To add a theme to it, add a `theme-<name>.css` in `components/.storybook/` and list it in `preview.ts`.

## Using the components in an app

The components build into a package, `@techlead-npn/design-system`, that carries the compiled components, their types and the token files. It is published to GitHub Packages at https://github.com/orgs/Techlead-NPN/packages. GitHub Packages needs a token even to install, so give the app an `.npmrc` that points the `@techlead-npn` scope there:

```ini
@techlead-npn:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

`NPM_TOKEN` is a personal access token with `read:packages`. For an app built in GitHub Actions, also give its repo Read access under the package's **Manage Actions access** setting. Then install it:

```bash
npm install @techlead-npn/design-system   # or: bun add @techlead-npn/design-system
```

The app needs React 19 or later and Tailwind CSS v4. Set up the app's main stylesheet:

```css
@import "tailwindcss";
@import "@techlead-npn/design-system/tokens/foundations.css";
@import "@techlead-npn/design-system/tokens/duo.css"; /* duo.css: new internal apps; workspace.css: E-Approval (Classic); paygenix.css: PayGenix */
@source "../node_modules/@techlead-npn/design-system/dist";
```

Pick one theme file per app; the components are the same in all of them. A Duo app also uses `DSWorkspaceShell layout="rail"` and starts from the [starter app](components/starter/leave/README.md). The `@source` line lets Tailwind see the classes the components use; adjust the path to where the stylesheet sits. Before 0.7.0 the theme files were called `tokens/portal2.0.css` and `tokens/paygenix-merchant.css`; those paths still work as aliases and will be removed in 1.0.0. The app loads its fonts itself: Inter, plus IBM Plex Sans Thai for apps on the Duo theme (e.g. from `@fontsource-variable/inter` and `@fontsource/ibm-plex-sans-thai`). Every component and type is exported with a `DS` prefix, so it is easy to tell apart from an app's own component of the same name. Import only the ones you use:

```tsx
import { DSButton, DSTextInput } from '@techlead-npn/design-system'
import type { DSButtonProps } from '@techlead-npn/design-system'

<DSButton>Save</DSButton>
<DSTextInput label="Title" />
```

The docs and Storybook use the plain names (Button, Text input); in code, add the prefix.

## Releasing a new version

1. Bump `version` in `components/package.json` (semver) in the PR with the change, and merge it into `main`.
2. Create a GitHub release whose tag is that version with a `v` prefix (`v0.3.0`).
3. `.github/workflows/publish.yml` typechecks, builds and publishes it. It fails if the tag and `package.json` disagree, and npm refuses a version that is already published.

## Adding a project

Create `projects/<name>/` with the same shape as `e-approval/`. An internal app uses one of the two workspace looks, `themes/duo.css` for new apps or `themes/workspace.css` (Classic, as E-Approval), and needs no tokens of its own; a new internal app starts from [`workspace/README.md`](workspace/README.md). A product with a different brand gets its own theme: copy `themes/workspace.css` to `themes/<brand>.css`, keep every token name and change the values, then run `npm run check-themes` in `components/` (see [`themes/CONTRACT.md`](themes/CONTRACT.md)). A client's theme stays in the client's private repo, not in this public one. The project's `DESIGN.md` documents only what is specific to it and links to Foundations for everything else. Follow [`foundations/workflow/AUDIT_WORKFLOW.md`](foundations/workflow/AUDIT_WORKFLOW.md) to audit and document its components.
