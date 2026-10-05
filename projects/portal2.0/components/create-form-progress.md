# Create Form / Progress indicator

The step header and progress bar shown at the top of the create-request form, tracking which of the flow's steps the user is on.

Figma: [`📱 Create form`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Form header` and `Form progress bar` components.

## Anatomy

| Part | Token(s) |
|---|---|
| Header title | `Body/Medium-semibold`, `text + icon/primary` |
| Progress track — fill | `border/primary-subtle` |
| Progress fill — fill | `bg/accent-indigo` |
| Progress track — radius | `border-radii/rounded-8` |

## Variants

`Form header` is a single fixed component. `Form progress bar` has `Breakpoint` = `Desktop` / `Mobile`, 2 built variants.

## Behavior rules

- **The progress bar's fill width represents step completion**, not time elapsed — it should jump between discrete positions as the user moves through [Create Form](../patterns/create-form.md)'s steps, not animate continuously.
- **`Form header` and `Form progress bar` are always paired** at the top of every step — see the separate `Progress bar` example frame on this page showing both composed together as they'd appear in a real screen.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found.

## Changelog

- Fixed foreign color tokens and bound previously-unbound `itemSpacing`/padding/`cornerRadius`: 5 fixes on `Form header`, 43 on `Form progress bar`.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — neither component previously had a doc.
