# Request detail / Inline cell

A family of read/inline-edit field components used throughout the request-detail slide-over: label + value, with loading and empty states baked in.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `InlineCell/Text`, `InlineCell/teg`, `InlineCell/company`, `InlineCell/  Text Area (Figma only)` components (inside `Requests expand`).

## Anatomy

| Part | Token(s) |
|---|---|
| Label | `text + icon/tertiary`, `Body/Small-regular` |
| Value (text) | `text + icon/primary`, `Body/Small-medium` |
| Value (tag, `/teg`) | embedded chip/tag instance |
| Value (company, `/company`) | embedded [Company chip](request-list-company-chip.md) instance |
| Value (text area) | multi-line `text + icon/primary`, `Body/Small-regular` |

## Variants

All 4 share the same variant shape: a `Label` text property (the field's label override), a `Label?`/`Label` boolean (show/hide label), and a `State` variant with 4 options: `Default`, `Empty` (or `Empty Hover` on the Text Area variant), `Content Loading...`, `Metadata Loading`.

| Component | Purpose |
|---|---|
| `InlineCell/Text` | plain text value (e.g. request title, description) |
| `InlineCell/teg` [sic "tag"] | tag/chip value (e.g. request type, priority) |
| `InlineCell/company` | company value, embeds [Company chip](request-list-company-chip.md) |
| `InlineCell/Text Area` | multi-line text value (e.g. a longer description field) |

## Behavior rules

- **Two independent loading states**: `Content Loading...` skeletons the value only; `Metadata Loading` skeletons the label too — use `Metadata Loading` when the field's label itself is still resolving (e.g. a dynamic field name from a request-type schema), `Content Loading...` when only the value is pending.
- **`Empty` renders a placeholder/dash instead of a value** — distinct from loading, used once data has resolved but the field genuinely has no value.
- **Used throughout [Request details](request-detail-shell.md)'s `Request details` tab** to lay out the request's field data as a label/value grid.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`InlineCell/teg` is a typo** for "tag" — flagging for a rename, not renamed without confirmation since it's referenced by name elsewhere in the file.
- **`InlineCell/  Text Area (Figma only)` has stray leading whitespace and a parenthetical "(Figma only)" suffix** in its component name — likely an internal Figma-authoring note left in the shipped name; flagging for cleanup.
- **The Text Area variant's boolean is named `Label?` while the other three use `Label`** for the same show/hide-label purpose — minor naming inconsistency.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius/`strokeWeight` — part of the 1923-fix `Requests expand` pass covering all 20 components in that frame.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, and grouped all 4 into one doc as a family — previously undocumented.
