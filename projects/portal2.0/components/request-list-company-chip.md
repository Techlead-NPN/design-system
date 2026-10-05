# Request list / Company chip &amp; avatar

Two presentations of the same "which company" concept: a labeled chip (icon + company name) for table cells, and a bare circular avatar for compact contexts like the filter panel's multi-select stack.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Chips_company` component (inside `Request Table`) and `Avatar company` component (inside `Filter`).

## Anatomy

| Part | Token(s) |
|---|---|
| `Chips_company` — icon + label, fill, border, radius | `bg/secondary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-infinite`, `text + icon/primary`, `Body/Small-medium` |
| `Avatar company` — circular icon only | company brand mark, no text, `border-radii/rounded-infinite` |

## Variants

Both share the same 3-company set, but with different option labels: `Chips_company`'s `Property 1` = `MarDee` / `Techlead Next` / `PayGenix` (full names); `Avatar company`'s `Property 1` = `MD` / `TL` / `PG` (initials — same 3 companies, abbreviated variant naming).

## Behavior rules

- **`Chips_company` is used in the request table's Company column** — full name + icon, readable at a glance in a row.
- **`Avatar company` is used in the Filter panel's Company multi-select** (see [Filter panel](request-list-filter-panel.md)) — compact, icon-only, meant to be shown in a stacked/grid group where many companies are selectable at once and a full-name chip would be too wide.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Inconsistent variant-option naming between the two components for the same 3 companies** (`MarDee`/`Techlead Next`/`PayGenix` vs `MD`/`TL`/`PG`) — not a bug, but worth aligning naming convention (e.g. both use full names, or both use initials as the property value with full name in a description) for easier cross-referencing.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius: part of the 511-fix `Request Table` pass (`Chips_company`) and the 1307-fix `Filter`/`Info Content`/`Header mobile` pass (`Avatar company`, 33 fixes).
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, and clarified the two components are related-but-distinct (not accidental duplicates) — neither previously had a doc.
