# Text Input

Two components: **Input/Text input** (single-line) and **Input/Text area** (multi-line, with a character counter). Both share the same `Title` → input box → hint-text anatomy and 7-state model as [Dropdown](dropdown.md).

Figma: [`✅ Text Input`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Anatomy

| Part | Token(s) |
|---|---|
| Title label | `text + icon/tertiary`, `Support/Label` |
| Input box — default border/fill | `bg/primary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-6` |
| Input box — focus border | `border/accent-indigo` |
| Input box — error border | `border/danger` |
| Input box — disabled fill/border | `bg/disabled` |
| Value text | `text + icon/primary`, `Body/Small-regular` |
| Placeholder text | `text + icon/tertiary` |
| Disabled value/placeholder text | `text + icon/disabled` |
| Hint/caption text | `text + icon/tertiary`, `Support/Caption` |
| Error caption text | `text + icon/danger` |
| **Text area only** — value/counter row gap | `spacing/2,5` (10px) |
| **Text area only** — character counter | `text + icon/tertiary`, `Support/Caption` |

## Variants

**Text input:** `State` = `Placeholder` / `Filled` / `Focus` / `Error Filled` / `Error Placeholder` / `Disabled Placeholder` / `Disabled Filled`. Plus `Prefix icon`/`Suffix icon`/`Prefix text`/`Suffix text` (independently toggleable) and `Label`/`Helper` (toggle the title/hint text).

**Text area:** same 7-state model under `State` (renamed from `Property 1`, see Changelog), plus `Helper`, `Counter`, and `Title` booleans.

## Behavior rules

- **Same state-precedence rules as [Dropdown](dropdown.md):** `Disabled` overrides interactivity entirely; `Error` can co-occur with either `Placeholder` or `Filled` (a field can be shown invalid whether or not it has a value yet); `Focus` represents active editing (border turns `accent-indigo`).
- **Text area's counter reflects a real character limit**, not just a running count — pair `Counter` with an actual max-length validation in the real input, don't show a counter that doesn't correspond to an enforced limit.
- **Text area's container max-height is 240px** (`spacing/60`) — grows from its default height as content is typed, caps at 240px, then scrolls internally. Chosen to comfortably fit the ~500-character budget implied by the counter (≈12 lines at `Body/Small-regular`'s 20px line-height) while staying clearly smaller than Dialog's 480px content-area ceiling, which reserves that size for a whole dialog's content, not a single field.
- **Prefix/suffix icon and text slots on Text input are independently toggleable** — a field can have a leading icon, trailing text (e.g. a unit suffix), both, or neither, per instance.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **No actual max-height/scroll constraint is built into the Figma component yet** for Text area's 240px cap — same "rule captured, not yet built" gap pattern as Bottom sheet and Dialog.
- Icon internals (prefix/suffix icon vector strokes) are left unbound — same precedent as other components (no exact Foundation match).

## Changelog

- **Text input:** audited fully clean on first pass — colors, text styles, padding, gap, corner-radius, and border-width were all already correctly bound. No fixes needed (same as Dropdown, Icon sidebar, Overlay, and Scroll Area).
- **Text area:** bound the value/counter row gap (previously raw `10`, unbound) to `spacing/2,5`, across all 7 variants. Colors and text styles were already fully correct.
- **User fix (2026-08-18):** renamed Text area's variant property from `Property 1` to `State`, matching every other multi-state component in this system — done directly, all 7 variant names updated automatically.
- **User decision (2026-08-18):** container max-height set at 240px (`spacing/60`) — see Behavior rules for rationale.
- Verified visually before/after on Text area — no rendering changes.
- Documented anatomy, variants, and behavior rules for both components — not previously written down.
