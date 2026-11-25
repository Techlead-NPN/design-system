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
| Label text — style | `Support/Caption` |

No variants — a single fixed component, always rendering the literal key combination as text.

## Behavior rules

- **Purely a visual hint, not an interactive element** — it communicates the keyboard shortcut for the action next to it (search) but isn't itself clickable.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Component name is `Shortcut contaienr`** — a typo in the Figma layer/component name itself. Flagging rather than renaming without confirmation, same policy as [Steps](steps.md)'s "Progressing" fix (which *was* renamed because the user explicitly asked).

## Changelog

- **2026-10-07:** the "⌘K" label switched from a foreign 11px style (`Label/default`) to the existing `Support/Caption`, at the design owner's request. The chip is 24×20px with the label inside a 16px-high box.
- Fixed the chip's foreign fill (`Transparent/Lighter`, a 2%-black overlay) → `bg/secondary`, border (`Borders/Stronger`) → `border/primary`, and label text color (`Text/Tertiary`) → `text + icon/tertiary`.
- Bound previously-unbound left/right padding (2px → `spacing/0,5`), corner radius (4px → `border-radii/rounded-4`), border width (1px → `border-width/xs`), and the outer container's gap (8px → `spacing/2`).
- Verified visually before/after — no rendering changes.
- Documented anatomy and behavior for the first time — this component previously had no doc.
