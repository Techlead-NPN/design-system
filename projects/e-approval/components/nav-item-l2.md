# Navigation / Navigation Item L2 & L2 Breadcrumb

A nested sub-item row (`Navigation Item L2`) shown inside a collapsible [Unfoldable Navigation Item list](nav-unfoldable-list.md), paired with a small tree-connector glyph (`L2 Breadcrumb`) that draws the indent line back to its parent L1 item.

Figma: [`📱 Navigation`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Navigation/Navigation Item L2` and `Navigation/L2 Breadcrumb` component sets (part of the Sidebar Menu Item catalog frame).

## Anatomy

### Navigation Item L2

| Part | Token(s) |
|---|---|
| Row — radius | `border-radii/rounded-4` |
| Row — padding | `spacing/2,5` (10px, no matching primitive found for the original `11px` left value — see Known gaps) right/top/bottom = `spacing/0,5`/`spacing/0` |
| Row — gap | `spacing/0` (inert — see [Toggle](toggle.md)'s precedent for binding inert gaps) |
| Icon (via `Icon type` instance-swap) | swappable icon-library instance |
| Label | `Body/Small-medium` |

### L2 Breadcrumb

| Part | Token(s) |
|---|---|
| Vertical connector line | `border/primary`, `border-width/xs` |
| Node dot/marker | `text + icon/tertiary` |

## Variants

**Navigation Item L2:** `State` = `Default` only (1 built variant so far). Plus text `Menu name`, `Icon type` (instance-swap), and booleans `Show Notification`, `Soon?`, `Button`, `Label?`, `View?`.

**L2 Breadcrumb:** `Selected?` × `Last?` × `IsActive?` (booleans expressed as variant options) — 5 built combinations, representing the connector line's shape depending on whether this is the last item in its group and whether the parent chain is active/selected.

## Behavior rules

- **L2 Breadcrumb is purely decorative** — it draws the tree-indent visual (vertical line + node), it isn't independently interactive. `Navigation Item L2` is the actual clickable row; `L2 Breadcrumb` sits to its left as a nested instance (see [Sidebar Navigation](../patterns/sidebar-navigation.md)'s composition).
- **`Last?=True` changes the connector shape** to close off the vertical line instead of continuing it — used on the final item in a group so the tree line doesn't visually extend past the last child.
- **Only one `State` (`Default`) is built for Navigation Item L2** despite the row being clickable — no `Hover`/`Selected` variants exist yet. Flagged, not fixed (a scope decision for the design owner, not a guess I should make).

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Navigation Item L2 has no `Hover` or `Selected` state built**, unlike its L1 counterpart — likely an intentional simplification (L2 items are less prominent) but not confirmed.
- **Original left padding (`11px`) has no matching spacing primitive** on this system's 2px grid (nearest are `spacing/2,5`=10px or `spacing/3`=12px) — left unbound rather than guessing which way to round.

## Changelog

- Fixed 7 foreign color-token instances on `L2 Breadcrumb` across its 5 variants (`Borders/Stronger` → `border/primary` on the connector line, `Text/Tertiary` → `text + icon/tertiary` on the node dot) — same "Twenty library" pattern found throughout this audit. **Correction during this pass:** the first fix attempt assumed a fixed fill=Text/Tertiary / stroke=Borders/Stronger mapping per rectangle, but 2 of the 5 variants had the mapping reversed (rectangle using the other rectangle's usual binding) — caught via a follow-up `get_variable_defs` check that still showed foreign tokens present, then fixed with a kind-agnostic pass (matching by variable name regardless of fill vs. stroke).
- `Navigation Item L2` had no foreign color tokens — already clean.
- Bound previously-unbound `itemSpacing`/padding/`cornerRadius` on Navigation Item L2's root, and `strokeWeight` on L2 Breadcrumb's connector rectangles (1px → `border-width/xs`).
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — neither component previously had a doc.
