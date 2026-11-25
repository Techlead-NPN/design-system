# Request list / View switch

The toggle that switches the request list between table view and card view.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Swich` [sic] component (inside `Request Table`).

## Anatomy

| Part | Token(s) |
|---|---|
| Toggle container — fill, border, radius | `bg/secondary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8` |
| Active/inactive icon buttons | `text + icon/primary` (active) / `text + icon/tertiary` (inactive) |

## Variants

`Property 1`: `Table` / `card` — the two view modes.

## Behavior rules

- **Switches the entire request list between the table layout ([Table row](request-list-table-row.md)) and the [Request card](request-card.md) grid layout** — a global view preference, not per-row.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Component is named `Swich`** (typo for "Switch") — flagging for a rename, not renamed without confirmation.
- **`card` variant option is lowercase while `Table` is capitalized** — minor naming inconsistency, cosmetic only.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — part of the 511-fix `Request Table` pass.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — previously had no doc.
