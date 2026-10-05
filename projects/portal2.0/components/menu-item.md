# Menu item

Four row variants for use inside dropdown/menu panels (`Informative`, `Shortcut`, `Single Selection`, `Multi Selection`), plus three supporting atoms that compose menu panels around them (`MenuComponents/Header`, `MenuComponents/Dropdown Header`, `MenuComponents/Menu Search`).

Figma: [`✅ Menu item`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Menu item row variants

| Part | Token(s) |
|---|---|
| Row gap (icon/checkbox to text, text to trailing element) | `spacing/2` (8px) |
| Title | `text + icon/primary`, `Body/Small-regular` |
| Supporting text | `text + icon/secondary`, `Support/Caption` |
| Title/supporting-text vertical gap | `spacing/0,5` (2px) |
| Row radius (hover/selected background) | `border-radii/rounded-6` |
| Hover background | `bg/primary-hover` |
| Selected text (Single/Multi Selection) | `text + icon/accent-indigo` |
| Selected fill — Multi Selection checkbox | `bg/accent-indigo` |
| Disabled text | `text + icon/disabled` |

### Variants

All four share `State` = `Default` / `Disabled` / `Hover`, with `Single Selection` and `Multi Selection` adding a 4th state, `Selected`.

- **Informative** (`72:6352`) — icon + title + supporting text + trailing chevron. A navigational row (tapping it drills into another screen), not a selection control. `Prefix Icon`/`Suffix Icon`/`Supporting Text` are independently toggleable.
- **Shortcut** (`72:6353`) — icon + title + a trailing 2-key badge pair (e.g. a keyboard shortcut hint). No supporting-text option.
- **Single Selection** (`72:6354`) — icon + title + supporting text; `Selected` turns the text `accent-indigo` and adds a trailing checkmark. Use for "pick one" menu lists (radio-equivalent, without a visible radio control).
- **Multi Selection** (`72:6355`) — a real checkbox (an instance of [Checkbox button](radio-checkbox-card.md), not just a checkmark) leads each row; `Selected` fills the checkbox `bg/accent-indigo` and turns the text `accent-indigo`. Use for "pick any number" menu lists.

## Supporting components

| Component | Purpose | Variants |
|---|---|---|
| **`MenuComponents/Header`** (`2090:1815`) | Menu panel title bar — a "Menu name" label with an optional leading nav control | `Navigation` = `None` / `Back` (‹) / `Close` (✕) |
| **`MenuComponents/Dropdown Header`** (`214:58727`) | Section/group label row within a menu list (e.g. "Descending") | `State` = `Default` / `Hover` |
| **`MenuComponents/Menu Search`** (`214:58561`) | Search input for filtering a menu panel's items | `Type` = `Placeholder` / `Filled`; `Cta?` = adds a trailing search-icon button |

All three sit at the same 1px-bottom-divider treatment (`border/primary-subtle`, `border-width/xs`) separating them from the list below.

## Behavior rules

- **Choosing a row variant is a control-type decision, not a styling one:** `Informative` navigates away, `Single Selection`/`Multi Selection` change a value in place, `Shortcut` documents a keyboard binding (and is typically non-interactive or triggers the same action the shortcut does). Don't reach for `Informative`'s chevron as a generic "trailing icon" — it specifically implies navigation.
- **A full menu panel composes `MenuComponents/Header` (top) + optionally `MenuComponents/Menu Search` + `MenuComponents/Dropdown Header` as section labels + a stack of Menu item rows** — see the DS page's `Menu Item` and `Menu_Search` frames for worked examples of this composition (those two frames are reference assemblies, not separate components).
- **`MenuComponents/Header`'s `Navigation=Back` vs `Close`** communicate different exit affordances — `Back` implies returning to a parent menu (nested navigation), `Close` implies dismissing the panel entirely. Pick based on whether the panel is nested or top-level.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Typo in an internal layer name:** Multi Selection's checkbox wrapper is named "Checkbok area" (missing the "x"). Purely a layer name, not a variant property — doesn't affect instances or the properties panel, so lower priority than a variant-property typo, but noted for cleanup.
- Icon internals (prefix/suffix/checkmark vector strokes, ~1.1px) are left unbound — same precedent as other components (no exact Foundation match).

## Changelog

- **User-directed consolidation (2026-08-18):** relinked Multi Selection's 4 embedded checkboxes from a separate "bare" checkbox component (previously on the Toggle & Checkbox page) to [Checkbox button](radio-checkbox-card.md) — the canonical checkbox for this system. Resized each instance to 14×14px to preserve the row layout. See `radio-checkbox-card.md` for the full consolidation writeup.
- **MenuComponents/Header:** fixed the bottom-divider border color (bound to stray `Borders/Light`, the recurring foreign-library token) → `border/primary-subtle`; bound gap/padding (raw `Spacing/4px`-named foreign tokens) → `spacing/1`/`spacing/2`; bound the bottom-divider width → `border-width/xs`; **unbound** the `Navigation=Close` variant's outer height, which was bound to a foreign `Height/32px` token — per project convention, outer width/height are never token-bound, so this was removed rather than rebound (value unchanged, still raw `32`).
- **MenuComponents/Dropdown Header:** fixed the "Descending" label's text style — was using a completely unnamed/foreign style (`Base/Small/Regular`, 12px Inter Regular but with a non-standard line-height) rather than this system's `Support/Caption` — rebound. Fixed the `Hover` state's background fill, previously a raw translucent black overlay (`Transparent/Light`, 4% black) inconsistent with how every other hover state in this system is built — rebound to the same `bg/primary-hover` solid fill used everywhere else (Menu item rows, Dropdown, etc.), for visual consistency across hover states. Bound gap/padding → `spacing/1`/`spacing/2`.
- **MenuComponents/Menu Search:** fixed the border color (stray `Borders/Light` again) → `border/primary-subtle`; bound padding/gap (foreign `Spacing/8px`-named tokens) → `spacing/2`/`spacing/1,5`/`spacing/1`; bound the bottom-divider width → `border-width/xs`.
- **All 4 Menu item row variants:** bound row gap (previously raw `8`, unbound) → `spacing/2`; Shortcut's title/supporting-text gap → `spacing/0,5`; Multi Selection's checkbox border (previously raw `1`, unbound) → `border-width/xs`, and its checkbox/icon-area internal gaps (`10`) → `spacing/2,5`.
- Verified visually before/after on all 7 components — no rendering changes.
- Documented anatomy, variants, and the menu-panel composition pattern (Header + Search + Dropdown Header labels + Menu item rows) — not previously written down. Identified `Menu Item` (singular) and `Menu_Search` as pre-assembled reference examples rather than distinct components, matching the pattern used for Calendar's Example section.
