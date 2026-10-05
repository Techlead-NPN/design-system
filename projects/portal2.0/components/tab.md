# Tab & Tab/Content

**Tab/Content** is the reusable label unit (icon + text + optional badge). **Tab** wraps it with tab-bar-specific chrome (the selected-state underline) — every `Tab` variant embeds a `Tab/Content` instance internally, so fixes to `Tab/Content`'s main component apply inside `Tab` too.

Figma: [`✅ Tab & Tab/Content`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Tab/Content

| Part | Token(s) |
|---|---|
| Label — default | `text + icon/secondary`, `Body/Small-medium` |
| Label — selected | `text + icon/accent-indigo` |
| Hover background | `bg/primary-hover`, `border-radii/rounded-6` |
| Padding | `spacing/2` (8px) horizontal, `spacing/1` (4px) vertical |
| Icon/text gap | `spacing/1` (4px) |
| Prefix/suffix icon | Independently toggleable boolean slots, `INSTANCE_SWAP` |
| Badge | Boolean-toggleable, embeds a [Badge](chips-tag-badge.md) instance |

**Variants:** `State` = `Default` / `Selected` / `Hover`. `Size` = `24px` / `32px` (row height only — same padding/type scale either way).

## Tab

| Part | Token(s) |
|---|---|
| Selected underline — color | `text + icon/accent-indigo` |
| Selected underline — weight | `border-width/xs` (1px) |
| Row gap | `spacing/2` (8px) |

**Variants:** `State` = `Default` / `Selected` / `Unselected` *(mislabeled, see Known gaps)`. `More` = `False` only (incomplete axis, see Known gaps).

## Behavior rules

- **`Tab` is for a horizontal tab bar** (adds the underline chrome); **`Tab/Content` alone** is for anywhere a similar label needs to live without tab-bar semantics (e.g. a segmented control, a filter pill row) — don't reach for the full `Tab` wrapper if there's no underline/tab-bar context.
- **The "+N More" overflow control is built as a `Tab` instance**, not a separate component — its content (icon, suffix chevron, "+N More" text) is entirely produced by overriding a `Tab/Content` instance's text and toggling its suffix icon. When a tab bar overflows, use this same pattern (a `Tab/Content` instance with overridden "+N More" text + chevron suffix) rather than inventing a new overflow treatment.
- **`Size=24px` vs `32px` follows the density of the surrounding UI**, same convention as other size-scaled components in this system — no content-based rule beyond that.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Mislabeled variant:** `Tab`'s `State=Unselected` variant does not actually render an "unselected tab" — its embedded `Tab/Content` instance has its text overridden to "+4 More" and a chevron suffix icon added, making it the tab-bar's overflow/"more tabs" indicator, not a genuine unselected-tab state. (An unselected-but-visible tab is what `State=Default` already represents.) Flagging rather than renaming — same reasoning as prior mislabeled-variant findings, not done without confirmation given it's a global rename.
- **`Tab`'s `More` variant property has only one option (`False`)** — same "incomplete axis" pattern seen in Badge's `Weight` property. Not a bug, just unfinished; there's no way to distinguish "this Tab's More button is active" via variant today.
- Icon internals (chevron/icon vector strokes) are left unbound — same precedent as other components (no exact Foundation match).

## Changelog

- **User fix (2026-08-18):** the selected-tab underline was 1.5px, which didn't match this system's only border-width primitive (`border-width/xs`, 1px). Changed to 1px and bound to `border-width/xs`, rather than leaving it unbound as a gap.
- Bound padding (previously raw `8`/`4`, unbound) → `spacing/2`/`spacing/1`, and gap (previously raw `8`/`4`, unbound) → `spacing/2`/`spacing/1` — across all 3 `Tab` variants and all 6 `Tab/Content` variants (48 individual bindings total).
- Verified colors and text styles were already fully and correctly bound on both components — no color-binding bugs found here.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and the Tab/Tab-Content relationship (including the "+N More" overflow pattern) — not previously written down.
