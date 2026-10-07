# Scroll Area

The scrollbar thumb used inside custom-scrolled containers (panels, dropdowns, menus, etc.) — a simple pill-shaped indicator, not the full scroll-container mechanism itself.

Figma: [`✅ Scroll Area`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Spec

Measured from Figma on 2026-10-07. Where this section and the sections below disagree, this section is right.

Coded in [`components/src/layout/ScrollArea.tsx`](../../../components/src/layout/ScrollArea.tsx).

| Part | Value |
|---|---|
| Scrollbar thumb | 6px thick, `border-radii/rounded-4`, filled with `border/primary-subtle` |
| Track | none (transparent) |
| `Type` | `Vertical` (6px wide) or `Horizontal` (6px high) |

In code the browser draws the scrollbar, so its exact thickness varies by browser; the color and the missing track match.

## Anatomy

| Part | Token(s) |
|---|---|
| Thumb fill | `border/primary-subtle` |
| Thumb radius | `border-radii/rounded-4` |
| Thumb size | 6px thick × 48px long (fixed; length is a design reference, not a constraint — see Behavior rules) |

## Variants

`Type` = `Vertical` / `Horizontal` — orientation only, same fill/radius treatment either way.

## Behavior rules

- **This is the thumb only, not the track or the scroll container** — no track background, no arrows/buttons are part of this component. It's meant to be the custom-scrollbar indicator layered over a scrollable region's edge, in the style of a modern minimal/overlay scrollbar (e.g. macOS-style), not a classic OS scrollbar with a visible track.
- **Thumb length is dynamic in real usage** — the 48px shown here is just the reference/example length; actual thumb length should scale with the ratio of visible content to total scrollable content, same as any standard scrollbar.
- **Low-emphasis by design** — `border/primary-subtle` is one of the least visually prominent tokens in the system, appropriate for a scrollbar that should recede until needed, not compete with content.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found — fill and corner-radius were already correctly bound on both variants.

## Changelog

- **2026-10-07:** added the Spec section. No Figma changes were needed. First coded version added.
- Audited fill and corner-radius bindings on both variants — already fully correct, no fixes needed.
- Documented anatomy and behavior (in particular, that this is the thumb only, and that its length is meant to be dynamic in real usage) — not previously written down.
