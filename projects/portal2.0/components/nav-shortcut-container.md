# Navigation / Shortcut container

A small keyboard-shortcut hint chip (e.g. "⌘K") shown next to the sidebar's search field.

Figma: [`📱 Navigation`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Shortcut contaienr` component *(component name has a typo in Figma itself — see Known gaps)*.

## Anatomy

| Part | Token(s) |
|---|---|
| Chip — fill | `bg/secondary` |
| Chip — border | `border/primary`, `border-width/xs` |
| Chip — radius, padding, gap | `border-radii/rounded-4`, `spacing/0,5` (2px) left/right padding, `spacing/2` (8px) gap from the container |
| Label text — color | `text + icon/tertiary` |
| Label text — style | unbound, flagged (see Known gaps) |

No variants — a single fixed component, always rendering the literal key combination as text.

## Behavior rules

- **Purely a visual hint, not an interactive element** — it communicates the keyboard shortcut for the action next to it (search) but isn't itself clickable.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Component name is `Shortcut contaienr`** — a typo in the Figma layer/component name itself. Flagging rather than renaming without confirmation, same policy as [Steps](steps.md)'s "Progressing" fix (which *was* renamed because the user explicitly asked).
- **The "⌘K" label's text style is bound to a foreign, non-standard style** (`Label/default` — 11px Semi Bold, 100% line-height, Inter) with no equivalent in this system's type scale (closest by size are `Body/Tiny-*` at 10px or `Support/Caption` at 12px, neither an exact match). Left unbound rather than force-fitting a visually-different style; the label's *color* was still fixed independently since fill and text-style are separate bindings.

## Changelog

- Fixed the chip's foreign fill (`Transparent/Lighter`, a 2%-black overlay) → `bg/secondary`, border (`Borders/Stronger`) → `border/primary`, and label text color (`Text/Tertiary`) → `text + icon/tertiary`.
- Bound previously-unbound left/right padding (2px → `spacing/0,5`), corner radius (4px → `border-radii/rounded-4`), border width (1px → `border-width/xs`), and the outer container's gap (8px → `spacing/2`).
- Verified visually before/after — no rendering changes.
- Documented anatomy and behavior for the first time — this component previously had no doc.
