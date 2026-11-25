# Home / Timeframe filter

The "Last 3 months ⚙" trigger and its dropdown panel, used to filter time-scoped dashboard widgets like [Widget/Procurement](home-dashboard-widgets.md).

Figma: [`📱 Home & Notification`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `content_timeframe_filter` (trigger) and `Filter_timeframe` (dropdown panel) components.

## Anatomy

| Part | Token(s) |
|---|---|
| Trigger label | `text + icon/tertiary`, `Body/Small-regular` |
| Dropdown panel — fill, border, radius, shadow | `bg/primary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8`, `shadow-lg` (a correctly-used named effect style — not raw variable-bound, unlike the gap flagged on [Mobile Bottom Navigation](../patterns/mobile-bottom-navigation.md)'s floating button) |
| Panel header | `text + icon/primary`, `Body/Small-medium` |
| Radio options | embedded radio instances (see [Radio button](radio-checkbox-card.md)) |

## Variants

`content_timeframe_filter` is a single fixed component (no variants — the trigger label text changes via content, not variant). `Filter_timeframe` has only one built variant (`Property 1=Default`) — the dropdown's open state; no closed/collapsed state is modeled as a separate variant (open/closed is presentational, driven by the app, not a Figma variant).

## Behavior rules

- **Options are mutually exclusive (radio, not checkbox)** — `Last 3 months` / `Last 6 months` / `All time`, matching [Radio button](radio-checkbox-card.md)'s single-select convention.
- **This is a reusable filter pattern**, not unique to Procurement — any dashboard widget scoped to a rolling time window should reuse this component rather than building a new filter UI.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`Filter_timeframe`'s `Property 1` variant property is a generic, unrenamed name** — same "never renamed after Figma's default" pattern seen on [Text Input](text-input.md)'s `Property 1`→`State` rename (done there at the user's request). Flagged here, not renamed without confirmation.

## Changelog

- No foreign color tokens found — both components were already using real semantic tokens and the correct named `shadow-lg` effect style (a clean example of the intended DESIGN.md §4 architecture).
- Bound 53 previously-unbound `itemSpacing`/padding/`cornerRadius`/`strokeWeight` values on `content_timeframe_filter`, and 12 on `Filter_timeframe`.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — neither component previously had a doc.
