# Request list / Viewbar

The bulk-actions bar that appears above the table when rows are selected.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Viewbar` component (inside `Request Table`).

## Anatomy

| Part | Token(s) |
|---|---|
| Bar — fill, border, radius | `bg/primary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8` |
| Selection count label | `text + icon/primary`, `Body/Small-medium` |
| Bulk action buttons | shared [Button](button.md) instances |
| Reset/clear link | `text + icon/tertiary`, `Body/Small-regular` |

## Variants

`Property 1`: `Default` / `Expande` [sic, "Expanded"] — likely collapsed vs. expanded action list. Two independent booleans control content: `show bulk` (bulk-action buttons visible) and `show reset` (reset/clear link visible).

## Behavior rules

- **Appears only when at least one row is selected** (single or [bulk](request-list-table-row.md) via `Multi Seclected` row state) — hidden otherwise.
- **`show reset` toggles a "Clear selection" affordance independently of the bulk actions** — a selection can be reset without necessarily showing bulk actions, and vice versa, per the two separate booleans.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`Expande` variant option is misspelled** ("Expanded") — flagging for a rename, not renamed without confirmation.
- **Exact difference between `Default`/`Expande` isn't visually obvious from the variant alone** — worth confirming what content differs between the two before treating this as fully specified.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — part of the 511-fix `Request Table` pass.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — previously had no doc.
