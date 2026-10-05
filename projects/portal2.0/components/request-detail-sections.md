# Request detail / Content sections

The read-only content sections that make up the "Request details" tab of the slide-over — General, Details, Item & Budget, and References & Attachments — each with a paired desktop and mobile implementation.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page. Desktop: `General Section`, `Detail section`, `Item Section`, `References & Attachments section` (inside `Info Content`). Mobile: `Requset Card_General`, `Requset Card_Details`, `Requset Card_Item & Budget`, `Requset Card_References & Attachments`, plus the `Requset Card` wrapper (inside `Requests expand`). Supporting atoms: `Item table row`, `File info`.

## Anatomy

| Part | Token(s) |
|---|---|
| Section card — fill, border, radius | `bg/primary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8` |
| Section title + collapse chevron | `text + icon/primary`, `Body/Medium-semibold` |
| `Item table row` — column header / value row | `Type=Header` (`text + icon/tertiary` labels) / `Type=Value` (`text + icon/primary` data) |
| `File info` — attachment row | file-type icon, filename (`text + icon/primary`), size/meta (`text + icon/tertiary`) |
| Field label/value pairs | `text + icon/tertiary` (label) / `text + icon/primary` (value), `Body/Small-regular`/`Body/Small-medium` |

## Variants

Each of the 8 section components (`Property 1` = `Default`/`Variant2`) and the `Requset Card` wrapper (`Property 1` = `Default`/`Empty`) is effectively a single content block — variant options are unrenamed generic Figma defaults rather than descriptive states (see Known gaps). `Item table row`'s `Type`: `Value`/`Header`.

## Behavior rules

- **Desktop and mobile are separately-built pairs covering the same 4 content areas**, not a single responsive component: `General Section`↔`Requset Card_General`, `Detail section`↔`Requset Card_Details`, `Item Section`↔`Requset Card_Item & Budget`, `References & Attachments section`↔`Requset Card_References & Attachments`. Keep both in sync when either changes.
- **`General`/`Detail` cover the request's core metadata** (title, company, request type, priority, dates — see [Inline cell](request-detail-inline-cell.md) for the underlying field atom used on desktop).
- **`Item & Budget` shows the itemized line-item table** (`Item table row`s) plus a total and coding fields — the full breakdown, distinct from the compact [Budget status summary](request-detail-budget-status.md).
- **`References & Attachments` lists linked requests/documents and uploaded files** (`File info` rows).
- **`Requset Card` (the mobile wrapper, `Default`/`Empty`) is the collapsible shell each mobile section renders inside** — `Empty` is its no-content state.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **All 8 section components (and the `Requset Card` wrapper) still use the generic unrenamed `Property 1` = `Default`/`Variant2` (or `Default`/`Empty`)** rather than descriptive variant names — same "never renamed after Figma's default" pattern seen elsewhere (e.g. [Filter_timeframe](home-timeframe-filter.md), Create form's [Action](create-form-approval.md)). What `Variant2` actually represents for each section isn't confirmed from Figma alone.
- **Naming drift between the desktop and mobile pair**: desktop uses "Section" (`General Section`, `Item Section`) while mobile uses "Requset Card_" (a misspelling of "Request") as a shared prefix — worth aligning naming convention between the pair.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — desktop sections + `Item table row`/`File info` fixed as part of the 1307-fix `Filter`/`Info Content`/`Header mobile` pass; mobile `Requset Card_*` sections fixed as part of the 1429-fix `Request card`/`Comment`/`Command Palette` pass.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, explicitly pairing the desktop and mobile implementations of each section in one doc — previously undocumented.
