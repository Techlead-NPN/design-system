# Request list / Filter chip

The selectable pill used for quick-filter options (e.g. request-type shortcuts above the table).

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `chip filter` component (inside `Filter`).

## Anatomy

| Part | Token(s) |
|---|---|
| Chip — fill, border, radius | `bg/secondary` (default) / `bg/accent-indigo-subtlest`-family (selected), `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-infinite` |
| Label | `text + icon/primary` (selected) / `text + icon/tertiary` (default), `Body/Small-medium` |

## Variants

`Mobile` boolean + `Property 1`: `Default` / `selected` / `Default_mobile` / `selected_mobile` — the mobile variants are baked into `Property 1` as separate named options rather than relying solely on the `Mobile` boolean to drive layout, which is redundant (see Known gaps).

## Behavior rules

- **Toggles a quick filter on/off** — selected state persists until tapped again or filters are reset via [Filter panel](request-list-filter-panel.md)'s clear action.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Redundant variant modeling**: both a `Mobile` boolean and `_mobile`-suffixed `Property 1` options exist to represent the same mobile/desktop split — one of the two mechanisms is likely dead weight. Flagging rather than removing either without confirming which one actually drives the published instances in use.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — part of the 1307-fix `Filter`/`Info Content`/`Header mobile` pass.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, and flagged the redundant mobile-variant modeling — previously undocumented.
