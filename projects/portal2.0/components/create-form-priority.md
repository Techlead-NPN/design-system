# Create Form / Priority

The priority-level control shown while creating a request — a dropdown selector plus supporting status-badge atoms used elsewhere the priority value is displayed (e.g. list/table rows).

Figma: [`📱 Create form`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Sticky button`, `Priority status`, `InlineCell/Status badge` components.

## Anatomy

| Part | Token(s) |
|---|---|
| Priority status — fill, radius | `bg/secondary`, `border-radii/rounded-4` |
| Priority label | `Body/Small-medium`, color per level |
| Sticky button | `bg/primary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-6` — a persistent form-footer action bar |

## Variants

`Priority status`: `Level` = `Low` / `High` / `Medium` / `No priority`. Plus boolean `dropdown?` (whether the chevron/dropdown affordance shows). 4 built variants. `Sticky button` and `InlineCell/Status badge` are single fixed components.

## Behavior rules

- **`Sticky button` is the persistent action bar at the bottom of the create-form flow** (Save/Next/Submit-style controls) — stays pinned regardless of scroll position within the form.
- **`InlineCell/Status badge` is the compact, read-only rendering of a priority value** (e.g. inside a table cell), distinct from `Priority status` which is the interactive picker — don't swap one for the other.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found beyond the fixed items below.

## Changelog

- Fixed foreign color tokens and a couple of foreign-named spacing tokens (`Height/24px`, `Spacing/4px` — bare CSS-custom-property-style names holding the same values as our `spacing/6` and `spacing/1`, wrong source) — bound 7 fixes on `Sticky button`, 5 on `Priority status`, 10 on `InlineCell/Status badge`.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — none of these components previously had a doc.
