# Navigation / Unfoldable Navigation Item list

A collapsible group wrapper combining a [Navigation item L1](nav-item-l1.md) "parent" row with a nested stack of [Navigation Item L2](nav-item-l2.md) children — the structure behind each collapsible section in [Sidebar Navigation](../patterns/sidebar-navigation.md) (e.g. "Expense & Payment").

Figma: [`📱 Navigation`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Navigation/Unfoldable Navigation Item list` component set (part of the Sidebar Menu Item catalog frame).

## Anatomy

Purely a compositional wrapper — no anatomy of its own beyond layout. All visible styling (color, radius, padding) belongs to the nested [Navigation item L1](nav-item-l1.md) and [Navigation Item L2](nav-item-l2.md)/[L2 Breadcrumb](nav-item-l2.md) instances it contains.

| Part | Token(s) |
|---|---|
| Outer gap/padding | `spacing/0` (inert — the wrapper's own layout has no visible gap/padding; bound for consistency, same precedent as [Toggle](toggle.md)'s inert gap) |
| `L2_Container` gap/padding | `spacing/0` (inert, same reasoning) |

## Variants

`State` = `Collapsed` (shows only the L1 parent row) / `Extended` (shows the parent row plus all nested L2 children). 2 total, all built.

## Behavior rules

- **`Collapsed`/`Extended` toggles via the parent L1 row's own chevron/click**, not a separate control on the wrapper itself — clicking the section header (e.g. "Expense & Payment") should flip this component's `State`.
- **No animation/transition is specified in Figma** for the collapse — implement with whatever the app's standard expand/collapse motion is; this doc doesn't prescribe one since it wasn't visible in the static design.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found — no foreign tokens on this wrapper's own layers (all color/type comes from its nested instances, already fixed at their own component level).

## Changelog

- No foreign color tokens found directly on this component — all contamination found in its nested L1/L2/Breadcrumb instances was fixed at those components' own definitions (see their respective docs) and inherits here automatically.
- Bound previously-unbound `itemSpacing`/padding (all `0`, inert) → `spacing/0` on the wrapper and its `L2_Container` sub-frame, across both `Collapsed`/`Extended` variants, for consistency with the rest of the system.
- Verified visually before/after — no rendering changes.
- Documented for the first time — this component previously had no doc.
