# Bottom Sheet

A panel that slides up from the bottom of the screen, used for confirmations and slotted content (forms, lists, or other arbitrary content passed in by the consuming screen).

Figma: [`✅ Bottom sheet`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## When to use each variant

- **`Type=Confirmation`** — the platform-wide system dialog for a user to proceed or cancel an action (e.g. a delete confirmation). Use this whenever the pattern is "confirm or back out," not a general-purpose form/content sheet.
- **`Type=Content`** — general slotted arbitrary content: forms, lists, pickers, anything that isn't specifically a proceed/cancel decision.

### `Type=Confirmation` anatomy is flexible

- **Title** — always present.
- **Detail** — optional. Include when the confirmation needs explanatory text; omit for simple cases.
- **Content Area / slot** — optional, and not just for `Type=Content`. A confirmation can use it to show contextual information relevant to the action — e.g. a delete confirmation showing the summary list of items or an image of what's about to be deleted.

## Sizing & scroll behavior

- **Max height: 80% of device screen height**, both variants.
- **Only the Content Area scrolls.** Header (Title/Detail/close) and the button footer stay pinned; they never scroll out of view.
- ⚠️ **Not yet reflected in the Figma component itself** — the current `Sheet` frame is a fixed 658px with no percentage-based height constraint, and `Content Area` has `clipsContent: false` with no scroll frame configured. The rules above are the intended spec; the static component hasn't been built to match yet (see Open gaps below).

## Dismissal

All of the following close the sheet — there's no single "correct" way, support all of them:

- Close (X) button, where present (`Type=Content`; `Type=Confirmation` has no X — see below)
- Tapping the backdrop scrim (bound to `overlay/overlay-default`)
- Swipe down
- Any action button in the footer (e.g. Cancel, Confirm)

Note `Type=Confirmation` has no visible close button in the current design — dismissal there relies on backdrop tap, swipe, or an action button.

## Button footer rules

The number of CTAs changes the layout — this is a **responsive rule to apply**, not something the static Figma component currently demonstrates beyond the 2-button case (see Open gaps).

| CTA count | Layout | Primary action position |
|---|---|---|
| 1 | Full width (fills the 358px row) | — |
| 2 | Horizontal, 50%/50% width split (default) | Right |
| 2, but label doesn't fit at 50% width | Falls back to vertical stack | Top |
| 3 | Always vertical stack | Top |

Vertical stacks use the same `Button` component and the same `spacing/3` (12px) gap as the horizontal layout, just stacked instead of side-by-side, full width.

### Button variant depends on content, not just position

The primary-position button isn't always the indigo primary variant — it depends on what the action does:

- **Destructive actions** (e.g. a delete confirmation) → the primary-position button uses the **destructive/danger** button variant, not indigo.
- **Non-destructive actions** → indigo primary variant, as shown in the current static component.

The secondary-position button (Cancel/Back) stays the neutral/outline variant regardless.

## Anatomy & tokens

| Part | Token(s) |
|---|---|
| Sheet background | `bg/primary` |
| Content Area corner radius | `border-radii/rounded-8` |
| IconButton / Button corner radius | `border-radii/rounded-6` |
| Button internal padding/gap | `spacing/1` (4px) and `spacing/2` (8px) |
| Group Buttons gap | `spacing/3` (12px) |
| Title text | `Body/Medium-semibold` |
| Detail text | `Body/Small-medium` |
| Button label text | `Body/Small-medium` |
| Backdrop scrim | `overlay/overlay-default` |
| Close icon | Vector stroke color bound correctly; the icon's own (invisible) background fill bound to `bg/primary` |

## OS chrome — do not rebind

Two elements are genuine iOS system UI, not part of this design system, and are correctly bound to Apple's own system color library rather than a Portal 2.0 token:

- **Grabber** (the drag handle pill) — `Fills - Vibrant/Primary`
- **Home Indicator** (the bottom bar) — `Labels/Primary`

Their *geometry* still follows this system's primitives as normal (both are `border-radii/rounded-infinite` for the pill shape) — only their *color* is intentionally exempt. See DESIGN.md §1 "Exception: OS chrome" for the general rule.

## The `.Slot Inner` placeholder

The dashed purple box labeled "Slot" inside Content Area is a documentation/placeholder convention, not a real design element — it marks where the consuming screen's actual content gets inserted. Don't rebind this to semantic tokens or treat it as a real visual bug.

## Open gaps (component doesn't yet match spec)

These are real mismatches between the usage rules above and what's currently built in Figma — flagging rather than silently fixing, since building them out is a bigger task than a token/binding pass:

- No percentage-based (80% of screen) height constraint on `Sheet` — currently a fixed 658px
- No scroll frame configured on `Content Area` despite content being spec'd as scrollable
- No 1-button (full width) variant built
- No 3-button (vertical stack) variant built
- No text-overflow → vertical-fallback logic built for the 2-button case

## Known token gaps (unbound, no Foundation match)

- `Grabber` top padding = 5px — falls between `spacing/1` (4px) and `spacing/1.5` (6px), no exact token
- Close icon's internal vector stroke weight = 1.1px — falls just outside `border-width/xs` (1px); likely an icon-glyph-specific value rather than a UI border, left as-is

## Changelog

- Fixed 11 corner-radius, 2 stroke-weight, 28 spacing, and 1 color binding across both variants to reference Foundation primitives/semantic tokens instead of raw values.
- Identified and correctly *excluded* the Grabber and Home Indicator from rebinding — they're OS chrome, not app design. This prompted the general "OS chrome" exception now documented in DESIGN.md §1.
- Documented usage/behavior rules (variant selection, sizing, dismissal, button-count layout, destructive-vs-primary button variant) that weren't previously written down anywhere — sourced directly from the design owner, not inferred from the file.
- Wrote the same usage rules into the Figma file's page Description field (previously just placeholder text) so designers working directly in Figma see them too, not just engineers/AI reading this doc. Also fixed that field's text style, which was bound to a foreign library style instead of our own `Body/Medium-regular`.
- Added granular Figma **annotations** (Dev Mode) pinned to the specific elements each rule governs — `Sheet` (max-height + dismissal), `Content Area` (scroll behavior), `Group Buttons` (CTA-count layout + destructive-variant rule), `Grabber`/`Home Indicator` (OS chrome reminder). These are read by AI design tooling (`get_design_context` explicitly prioritizes annotations as a hint source) in addition to being visible to designers in Dev Mode — the page Description covers the same ground for designers browsing in normal Design mode.
