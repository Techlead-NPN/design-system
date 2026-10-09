# Design System

Design system documentation for all projects, mirroring how the Figma files are organised: one shared Foundations file, plus one design system file per project.

```
foundations/              shared by every project
├── FOUNDATIONS.md        token architecture, raw primitives, Tabler icons
├── BUILD_GUIDE.md        rules for building UI (Tailwind CSS v4)
├── tokens/               primitive values, as code (foundations.css)
└── workflow/             audit process and drift-check instructions
components/               coded React + Tailwind components, shared by every project
├── .storybook/           Storybook setup (one stylesheet per project, switched from the toolbar)
└── src/                  one folder per component family, each with its stories
                           (button/, selection/, badge/, avatar/, divider/, toggle/, tooltip/, field/, menu/, calendar/, navigation/, feedback/, overlay/, table/, layout/)
projects/
├── paygenix-merchant/    shares Portal 2.0's look: DESIGN.md and BUILD_GUIDE.md list what differs; tokens.css is its own full copy
└── portal2.0/            one folder per project
    ├── DESIGN.md         semantic tokens, text styles, accessibility, changelog
    ├── BUILD_GUIDE.md    which docs to read for which task
    ├── tokens.css        semantic colors and text styles, as code
    ├── components/       one doc per component
    ├── patterns/         composite structures built from components
    ├── assets/           exported SVGs (logo, illustrations)
    └── figma-snapshot.json   structural baseline of the project's Figma file
```

## Where to start

- [`foundations/FOUNDATIONS.md`](foundations/FOUNDATIONS.md) — read first; applies to every project.
- [`projects/portal2.0/DESIGN.md`](projects/portal2.0/DESIGN.md) — Portal 2.0.
- [`projects/paygenix-merchant/DESIGN.md`](projects/paygenix-merchant/DESIGN.md) — PayGenix Merchant Dashboard; shares Portal 2.0's look and lists only what differs.

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

It opens at http://localhost:6006. Each component family has an "All variants" style page and, where useful, a Playground with controls. The **Project** switch in the toolbar shows the same components with another project's tokens. To add a project to it, add a `project-<name>.css` in `components/.storybook/` and list it in `preview.ts`.

## Using the components in an app

The components build into a package, `@techlead-npn/design-system`, that carries the compiled components, their types and the token files. It is not published to a registry yet; until then, build it and install the packed file:

```bash
cd components
npm install
npm run build
npm pack
```

Then, in the app (React 19 or later, Tailwind CSS v4), install the `.tgz` that `npm pack` produced and set up the app's main stylesheet:

```css
@import "tailwindcss";
@import "@techlead-npn/design-system/tokens/foundations.css";
@import "@techlead-npn/design-system/tokens/portal2.0.css"; /* or paygenix-merchant.css */
@source "../node_modules/@techlead-npn/design-system/dist";
```

The `@source` line lets Tailwind see the classes the components use; adjust the path to where the stylesheet sits. The app loads the Inter font itself. Components are then imported by name:

```tsx
import { Button, TextInput } from '@techlead-npn/design-system'
```

## Adding a project

Create `projects/<name>/` with the same shape as `portal2.0/`. Its `tokens.css` maps its semantic tokens onto the Foundations primitives, and its `DESIGN.md` documents only what is specific to that project and links to Foundations for everything else. Follow [`foundations/workflow/AUDIT_WORKFLOW.md`](foundations/workflow/AUDIT_WORKFLOW.md) to audit and document its components.
