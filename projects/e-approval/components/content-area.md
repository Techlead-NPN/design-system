# Content Area

Breakpoint-sized empty placeholder frame used for laying out screens in Figma — marks "real content goes here" at a given responsive breakpoint. This is a **Figma-authoring aid, not a shippable UI component** — it never appears in the actual product; it exists so designers can drop a correctly-sized canvas into a layout before filling it with real components.

Figma: [`✅ Content Area`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Anatomy

| Part | Token(s) |
|---|---|
| Frame width | 1280px (`Desktop`) / 390px (`Mobile`) — matches `breakpoint/lg`/`breakpoint/sm` in value, raw/not bound (see Known gaps) |
| Frame height | Not tokenized — see Known gaps |
| Frame fill/border | None — the frame itself is fully transparent, purely a sizing guide |
| "Slot" placeholder label | `text + icon/accent-indigo-subtle`, `Body/Small-medium` |

### Sub-components

- **Content Area** (`2490:22086`) — the component set. Variant: `Breakpoint` = `Desktop` (1280×768) / `Mobile` (390×844).
- **`.Slot Inner`** (`78:2118`) — a small reusable atom: just the centered "Slot" text label. Fills its parent completely (`layoutSizingHorizontal/Vertical: FILL`) and centers the label within itself, which is why "Slot" appears centered in the frame despite the outer frame's own alignment being top-left.

## Behavior rules

- **Never ships to production.** This component exists purely to help a designer block out a screen at the correct breakpoint width before real content replaces it — treat it as scaffolding, not a design-system primitive engineers need to implement.
- **Width is chosen to match breakpoint values, height is not.** The two variants exist specifically to line up with this system's `sm`/`lg` breakpoint primitives (there's no `Breakpoint=Tablet/md` variant, even though `breakpoint/md` exists as a token — see Known gaps). Height (768 / 844) is just a representative viewport height for each device class, not a governed value.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **No `Breakpoint=Tablet` variant**, even though `breakpoint/md` (768px) is a defined token in `DESIGN.md` §4 alongside `sm` and `lg`. Only the two ends of the range are built.
- **Height isn't bound to anything** — 768px (Desktop) and 844px (Mobile) are representative viewport heights (a common laptop screen, an iPhone 14-class device), not part of this system's token scale. Left unbound deliberately; there's no semantic "viewport height" primitive to point to.
- **Frame width is also left raw/unbound**, despite matching `breakpoint/lg`/`breakpoint/sm` exactly — per standing project rule, only gap, padding, corner-radius, and border-width get bound to sizing tokens; a component's own outer width/height are treated as layout decisions, not token-driven values, even where the number happens to match a primitive. (Confirmed 2026-08-17 — see [[feedback-component-audit-workflow]].)
- **Neither variant has a layout grid style applied**, despite the Foundations file defining real `Desktop`/`Tablet`/`Mobile` grid styles that pair cleanly with this component's own breakpoint widths (see [`DESIGN.md`](../DESIGN.md) §4) — checked via `gridStyleId`/`layoutGrids`, both empty. Since this component's whole purpose is breakpoint-sized layout scaffolding, it's the most natural place to apply the grid, but nothing does yet.

## Changelog

- **2026-08-18 (found while auditing [Dialog](dialog.md), which reuses this atom):** bound `.Slot Inner`'s own dashed-border stroke-width (previously raw `1`, unbound) to `border-width/xs` — missed on the original pass below. Fixed on the main component, so it also corrected every other instance of `.Slot Inner` across the file (including Dialog's Confirmation and Content variants).
- Fixed the wrapper frame's corner radius, which was bound to a variable also *named* `border-radii/rounded-8` but from a different, foreign source (different publish key than this system's Foundations primitive) — rebound to the correct local one. Purely a housekeeping fix; the radius was never actually visible (the frame has no fill or stroke).
- Fixed the "Slot" placeholder label: was using a completely foreign text style (`paragraph small/medium`, Poppins/SemiBold — not one of this system's 30 documented type styles) and a fully unbound raw color (`#c89dff`, no variable at all). Rebound to `Body/Small-medium` and `text + icon/accent-indigo-subtle` — same visual role (small, decorative, purple-family label), now on-system. Verified via screenshot that the fix reads correctly.
- Documented the component's actual purpose (Figma-only layout aid, not shippable UI) — not previously written down, and important context since it changes how strictly this component's tokens matter relative to shippable components.
