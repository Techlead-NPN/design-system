# Design System

Design system documentation for all projects, mirroring how the Figma files are organised: one shared Foundations file, plus one design system file per project.

```
foundations/              shared by every project
├── FOUNDATIONS.md        token architecture, raw primitives, Tabler icons
├── BUILD_GUIDE.md        rules for building UI (Tailwind CSS v4)
├── tokens/               primitive values, as code (foundations.css)
└── workflow/             audit process and drift-check instructions
components/               coded React + Tailwind components, shared by every project
├── .storybook/           Storybook setup (uses the Portal 2.0 tokens)
└── src/                  one folder per component family, each with its stories
                           (button/, selection/, badge/, avatar/, divider/, toggle/, tooltip/, field/, menu/, calendar/, navigation/, feedback/, overlay/, table/, layout/)
projects/
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

It opens at http://localhost:6006. Each component family has an "All variants" style page and, where useful, a Playground with controls. Storybook renders with the Portal 2.0 tokens; to preview another project, change the last token import in `components/.storybook/storybook.css`.

## Adding a project

Create `projects/<name>/` with the same shape as `portal2.0/`. Its `tokens.css` maps its semantic tokens onto the Foundations primitives, and its `DESIGN.md` documents only what is specific to that project and links to Foundations for everything else. Follow [`foundations/workflow/AUDIT_WORKFLOW.md`](foundations/workflow/AUDIT_WORKFLOW.md) to audit and document its components.
