# Design System

Design system documentation for all projects, mirroring how the Figma files are organised: one shared Foundations file, plus one design system file per project.

```
foundations/              shared by every project
├── FOUNDATIONS.md        token architecture, raw primitives, Tabler icons
├── BUILD_GUIDE.md        rules for building UI (Tailwind CSS v4)
├── tokens/               primitive values, as code (foundations.css)
└── workflow/             audit process and drift-check instructions
components/               coded React + Tailwind components, shared by every project
└── src/                  one folder per component family (button/, selection/, badge/ so far)
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

## Adding a project

Create `projects/<name>/` with the same shape as `portal2.0/`. Its `tokens.css` maps its semantic tokens onto the Foundations primitives, and its `DESIGN.md` documents only what is specific to that project and links to Foundations for everything else. Follow [`foundations/workflow/AUDIT_WORKFLOW.md`](foundations/workflow/AUDIT_WORKFLOW.md) to audit and document its components.
