# Table

Six components that assemble into a data table: two header cells (**Table Column header**, **Table First Column header**) and four body-cell variants (**Field first column**, **column**, **Simple text (no chip)**, **Simple text underlined (no chip)**).

Figma: [`✅ Table`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Shared anatomy

| Part | Token(s) |
|---|---|
| Cell fill | `bg/primary` (default/loading), `bg/primary-hover` (hover) |
| Cell border (right + bottom, forming the grid) | `border/primary-subtle`, `border-width/xs` |
| Header label | `text + icon/tertiary`, `Body/Small-medium` |
| Cell value | `text + icon/primary`, `Body/Small-regular` |
| Read-only/secondary cell value | `text + icon/secondary` |
| Cell padding | `spacing/2` (8px) top/left/bottom, `spacing/1` (4px) right — asymmetric, tighter gutter before a trailing suffix icon |
| Checkbox (row selection) | Instances of [Checkbox button](radio-checkbox-card.md) (`Type=Not-Selected/Selected/Half`, `Label=None`), scaled to 14×14px to fit the row |
| Empty-state skeleton bar | Reuses the [Loading](loading.md) shimmer component |

## Table Column header / Table First Column header

The header row's cells — label + sort indicator (up/down arrows), optional prefix icon. **Table First Column header** additionally leads with a select-all checkbox and is a single fixed component (not a variant set) rather than sharing `Table Column header`'s `State` axis.

**Variants (Column header only):** `State` = `Default` / `Hover` / `On Click`. Plus `Prefix icon`, `Sort`, `Show Label & Menu` booleans.

## Field first column / column

The two main body-cell types — `Field first column` leads with a row-selection checkbox (pairs with `Table First Column header`); `column` doesn't, and adds an optional trailing suffix icon instead.

**Variants (both):** `State` = `Default` / `Hover` / `Selected` / `Loading`. `Empty?` = `True` / `False` (renders the [Loading](loading.md) skeleton bar in place of real content).

## Simple text (no chip) / Simple text underlined (no chip)

Compact text-only cells for denser tables. The underlined variant reads as a link/clickable value (underline matches the text color); the plain variant doesn't.

**Variants:** `State` = `Default` / `Read-Only` / `Loading` (plain), plus `hover` *(sic — lowercase, see Known gaps)* (underlined only).

## Behavior rules

- **Use `Field first column` / `Table First Column header` specifically for the row-selection column** — the checkbox pairing between the two is intentional; don't mix a plain `column` into the first position if row selection is enabled, or the header checkbox will have nothing to align with.
- **`Empty?=True` is for a genuinely empty cell value** (no data for that row/column), rendered as a skeleton bar — distinct from `State=Loading`, which represents the whole row still being fetched. A cell can be `Empty` without the table being in a loading state (e.g. an optional field with no value).
- **Reach for `Simple text (no chip)` variants when a table doesn't need row selection, hover affordance, or icons** — they're the leaner option for dense, read-heavy tables (e.g. financial/data-dense views) where the full `column`/`Field first column` chrome would add unnecessary visual weight.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`Simple text underlined (no chip)`'s hover variant is named lowercase `hover`**, breaking convention with every other `State` property in this system (`Hover`, capitalized). Flagging rather than renaming — same reasoning as Steps' analogous `state` property finding: a global rename, not done without confirmation.
- **The header's select-all checkbox can now show a true indeterminate state** (`Type=Half`, added to Checkbox button 2026-08-18) for "some but not all rows selected" — not yet wired up to any real selection-count logic in the static Figma component, since that's an interaction behavior, not a design-time property.
- **This page embeds instances of a `remote` (external library) `IconButton/Floating Icon Button` component** (a row-action icon button, in `Field first column` and `column`'s hover states) — it isn't part of this file at all, so there's no main component here to fix, and it has no dedicated page of its own anywhere in this system. Fixed its bindings as **instance-level overrides** on the 3 instances used within Table (see Changelog) rather than at the source, since the source is a library file this project doesn't own/edit. Worth a decision on whether this component should be adopted into this design system properly (with its own page) rather than staying an external dependency.
- Several skeleton-placeholder wrappers ("Placeholder", "Loading") have 3px top/bottom padding that doesn't cleanly map to the `spacing/*` scale — left unbound, same pattern as Divider's off-scale values.
- Icon internals (sort arrows, checkmark, chevron vector strokes) are left unbound — same precedent as other components (no exact Foundation match).

## Changelog

- **User-directed consolidation (2026-08-18):** relinked all 9 embedded row-selection checkboxes (`Table First Column header` ×1, `Field first column` ×8) from a separate "bare" checkbox component (previously on the Toggle & Checkbox page, no longer used here) to [Checkbox button](radio-checkbox-card.md) — the canonical checkbox for this system. Resized each instance to 14×14px (Checkbox button's native size is 24×24) to preserve existing row spacing. See `radio-checkbox-card.md` for the full consolidation writeup.
- This page had by far the heaviest foreign-token contamination found in this audit so far — roughly a dozen distinct stray tokens (`Text/Primary`, `Text/Secondary`, `Text/Tertiary`, `Text/Light`, `Background/Primary`, `Borders/Stronger`, `Base/Medium` text style, plus `bg/accent-stone` misused as a neutral hover fill) spread across all 6 components. All rebound to this system's real equivalents (`text + icon/primary`/`secondary`/`tertiary`, `bg/primary`, `border/primary`, `Body/Small-medium`, `bg/primary-hover`) — same "Twenty library leftover" pattern seen throughout this audit, just far more of it in one place.
- Bound padding, gap, corner-radius, and border-width (previously raw, unbound) to `spacing/1`/`spacing/2`/`spacing/2,5`, `border-radii/rounded-4`, and `border-width/xs` — 179 individual bindings across all 6 components.
- **User fix (2026-08-18):** the embedded `IconButton/Floating Icon Button` instances (3, across `Field first column` and `column`) had a foreign fill (`Transparent/primary`, translucent white), foreign border (`Transparent/Light`), a raw unbound shadow effect, and a foreign icon stroke color (`Text/Tertiary`). Confirmed the component itself is `remote` (from an external library file, not part of this project) — there's no local main component to fix at the source. Applied instance-level overrides instead: fill → `bg/primary`, border → `border/primary-subtle`, icon stroke → `text + icon/tertiary`, and the shadow effect → `shadow-sm` (the closest of this system's 4 named effect styles; the original had an extra background-blur layer with no equivalent, so this is an approximation, not an exact match).
- Verified visually before/after on all 6 components — no rendering changes.
- Documented anatomy, variants, and behavior rules (in particular the `Field first column`/`Table First Column header` pairing and the `Empty?` vs `Loading` distinction) — not previously written down.
