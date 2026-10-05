# Home / Widget row atoms

Four small, reusable list-row atoms that different dashboard widgets embed for their content: **shortcut card** (an icon+label quick-action tile, used in [Widget/Recommend](home-dashboard-widgets.md) and Quick create), **request type card** (a count-per-type row, used in [Widget/Procurement](home-dashboard-widgets.md)), **claim request** (a claim line-item row, used in [Widget/MMB Quota card](home-dashboard-widgets.md)), and **widget list** (an add/remove row, used in the [Widget customization](home-dashboard-widgets.md) panel).

Figma: [`📱 Home & Notification`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page.

## shortcut card

| Part | Token(s) |
|---|---|
| Row — fill, radius | `bg/secondary` (default) / `bg/secondary-hover` (hover), `border-radii/rounded-8` |
| Icon | swappable illustration instance (see [Illustration](illustration.md) — Request type set) |
| Title | `text + icon/primary`, `Body/Small-medium` |
| Description | `text + icon/tertiary`, `Body/Mini-regular` |

**Variants:** `State` = `Default` / `Hover` (Desktop only). `Breakpoint` = `Desktop` / `Mobile`. 3 built variants.

## request type card

| Part | Token(s) |
|---|---|
| Row — fill, radius | `bg/primary` (default) / `bg/primary-hover` (hover), `border-radii/rounded-4` |
| Code | `text + icon/primary`, `Body/Small-medium` |
| Label | `text + icon/tertiary`, `Body/Mini-regular` |
| Count | `text + icon/secondary`, `Body/Medium-Medium` |

**Variants:** `State` = `Default` / `Hover` (Desktop only). `Breakpoint` = `Desktop` / `Mobile`. 3 built variants.

## claim request

A single fixed component (no variants) — a two-line row (request ID + date, subtype + amount) used inside MMB Quota's "Recent claimed" list.

| Part | Token(s) |
|---|---|
| Request ID | `text + icon/tertiary`, `Body/Mini-regular` |
| Subtype | `text + icon/primary`, `Body/Small-medium` |
| Amount | `text + icon/primary`, `Body/Small-medium` |
| Date | `text + icon/tertiary`, `Body/Mini-regular` |

## widget list (item)

The add/remove row inside the [Widget customization](home-dashboard-widgets.md) panel's "Add widgets" section.

| Part | Token(s) |
|---|---|
| Row — fill, radius | `bg/secondary` (default) / `bg/secondary-hover` (hover), `border-radii/rounded-8` |
| Title | `text + icon/primary`, `Body/Small-medium` |
| Description | `text + icon/tertiary`, `Body/Mini-regular` |
| Add/remove button | embedded icon-button instance |

**Variants:** `Add` = `Unadd` / `Added` / `Empty` (drag handle shown once added). `State` = `Default` / `Hover`. 4 built combinations (not full cross-product — `Empty` has no `Hover` built).

## Behavior rules

- **shortcut card and request type card share the same Default/Hover/Breakpoint variant structure** — both are simple clickable dashboard rows, follow the same interaction convention (subtle background darken on hover, no hover state on mobile).
- **widget list's `Add=Unadd`/`Added`/`Empty` states drive the [Widget customization](home-dashboard-widgets.md) panel's add/remove flow** — `Unadd` shows a "+" (not yet added to the dashboard), `Added` shows a drag handle + "−" (already on the dashboard, can be removed or reordered), `Empty` is the "no more widgets to add" placeholder state.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found beyond the fixed items below.

## Changelog

- Fixed foreign color tokens (same "Twenty library" pattern) across all four components.
- Bound previously-unbound `itemSpacing`/padding/`cornerRadius`/`strokeWeight`: 17 fixes on shortcut card, 58 on request type card, 14 on claim request, 89 on widget list.
- Verified visually before/after on all four — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — none of these components previously had a doc.
