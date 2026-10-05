# Request list / Table row

The header row and body row that make up the desktop request table.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Table row header` and `Table row content` components (inside the `Request Table` frame).

## Anatomy

| Part | Token(s) |
|---|---|
| Row container — fill, border | `bg/primary`, `border/primary-subtle`, `border-width/xs` |
| Column label (header) | `text + icon/tertiary`, `Body/Small-medium` |
| Cell value | `text + icon/primary`, `Body/Small-regular` |
| Checkbox (bulk-select) | shared checkbox control |
| Embedded status/company chips | see [Status badge](request-list-status-badge.md), [Company chip](request-list-company-chip.md) |

## Variants

`Table row header` is a single fixed component. `Table row content` has 5 states via `Property 1`: `Default`, `Hover`, `Multi Seclected` [sic], `loding` [sic], `Selected`.

## Behavior rules

- **`Hover` previews row interactivity before a click; `Selected` is a single-row selection (e.g. row click); `Multi Seclected` is the bulk-checkbox state** — distinct from `Selected`, since bulk selection shows the checkbox checked while single selection may just highlight the row. Confirm the exact trigger for `Selected` vs `Multi Seclected` with the design owner since Figma doesn't encode click-target semantics.
- **`loding` is a skeleton/placeholder row** shown while table data is being fetched — see [No results](request-list-empty-state.md) for the complementary zero-results state.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`Multi Seclected` and `loding` are misspellings** of "Multi Selected" and "Loading" — flagging for a rename, not renamed without confirmation since it's a live variant name referenced elsewhere.

## Changelog

- Fixed foreign color tokens and bound previously-unbound `itemSpacing`/padding/`cornerRadius`/`strokeWeight` across both components — part of a combined 511-fix pass on the whole `Request Table` frame (8 components).
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — neither component previously had a doc.
