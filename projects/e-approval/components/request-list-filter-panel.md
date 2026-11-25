# Request list / Filter panel

The button that opens filtering, and the assembled filter panel itself (Company, Status, Priority, Request date) — see [Filter panel screenshot reference](request-list-company-chip.md) for the Company multi-select's [Avatar](request-list-company-chip.md) usage.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Filter` component (trigger button), `content_filter` component (the panel), `filter hader` [sic] and `Chips type` components (inside `Header mobile`, the mobile filter/type-tab bar).

## Anatomy

| Part | Token(s) |
|---|---|
| `Filter` trigger — fill, border, radius | `bg/primary`/`bg/secondary` (Filled), `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8` |
| `content_filter` panel — fill, border, radius | `bg/primary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8` |
| Section heading (Company/Status/Priority/Request date) | `text + icon/primary`, `Body/Small-medium`, plus a "Clear" link (`text + icon/tertiary`) |
| Company row | embedded [Avatar company](request-list-company-chip.md) instances |
| Status row | embedded [Status badge](request-list-status-badge.md)-style checkboxes |
| Priority row | icon + label per priority level |
| Request date | Start/End date inputs |

## Variants

`Filter`'s `Property 1`: `Default` / `Filled` (has active filters applied — likely swaps the trigger's icon/badge to indicate active state). `content_filter`'s `Property 1`: `Desktop` / `Mobile` — the two panel layouts. `filter hader`'s `Property 1`: `Request page` / `Request details` — the mobile filter bar shown on the list vs. inside the detail view. `Chips type`'s `Property 1`: `Default` / `Select` — a request-type filter chip's unselected/selected state (used alongside [Filter chip](request-list-filter-chip.md), for request-type-specific quick filters).

## Behavior rules

- **`Filter` opens `content_filter`** — a dropdown/panel on desktop, likely a full-screen sheet on `Mobile`.
- **Each section (Company/Status/Priority/Request date) can be cleared independently** via its own "Clear" link, confirmed visually.
- **`filter hader`'s two states reflect where mobile filtering is being triggered from** — the main Request page list vs. within an individual Request details view (e.g. filtering activity log or comments within a specific request).

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`filter hader` is a misspelling** of "filter header" — flagging for a rename, not renamed without confirmation.
- **Whether `Filter`'s `Filled` state shows a count of active filters or just a generic "has filters" indicator** isn't specified in Figma — flagging as an open question.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — part of the 1307-fix `Filter`/`Info Content`/`Header mobile` pass.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, grouping the trigger, panel, and mobile filter-bar components into one doc — previously undocumented.
