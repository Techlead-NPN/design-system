# Overlay

A full-screen scrim shown behind modals, dialogs, and bottom sheets to dim the underlying content and focus attention on the overlaid surface.

Figma: [`✅ Overlay`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page (nested under a "Confirmation Dialog" example header). Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Anatomy

| Part | Token(s) |
|---|---|
| Scrim fill | `overlay/overlay-default` (`rgba(0,0,0,0.25)`) |

That's the entire component — a single full-bleed rectangle with one fill token. No border, radius, padding, or gap.

## Variants

`Breakpoint` = `Desktop` (1280×832) / `Mobile` (390×844) — sized to match this system's breakpoint reference dimensions, same as [Content Area](content-area.md). No content difference between the two; the variant exists purely so the DS page can show the scrim at both reference sizes.

## Behavior rules

- **Always sits behind the overlaid surface, in front of everything else** — standard modal-scrim stacking, no special z-index rules beyond that.
- **Covers the full viewport**, not just the area behind the dialog — dims the entire page, including any fixed headers/navigation.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found — the fill was already correctly bound to `overlay/overlay-default` on both variants (via a nested `Rectangle 1` on `Desktop`, directly on the frame for `Mobile` — a minor structural inconsistency between the two, but both resolve to the same correct token, so no functional issue).

## Changelog

- Audited fill binding and sizing on both variants — already fully correct, no fixes needed.
- Documented anatomy and behavior — not previously written down.
