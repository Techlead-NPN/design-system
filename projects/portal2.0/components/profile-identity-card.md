# Profile / Identity card

The compact avatar + name + role + company summary shown at the top of the account/profile menu.

Figma: [`Setting - Profile`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `header_profile` component (inside `Atom_Profile`).

## Anatomy

| Part | Token(s) |
|---|---|
| Avatar | embedded [Avatar](avatar.md) instance |
| Name | `text + icon/primary`, `Body/Medium-semibold` |
| Role (job title) | `text + icon/secondary`, `Body/Small-regular` |
| Company chip | `bg/secondary-hover`, `border-radii/rounded-6`, `text + icon/secondary` |

## Variants

`Property 1`: `Desktop` / `Mobile` — same content, laid out for each context.

## Behavior rules

- **Sits at the top of the [Account switcher](profile-account-switcher.md) panel** — this card is not itself clickable/interactive in the reference; it's a read-only identity summary above the switchable account list.
- **Also appears embedded, twice-stacked, in a composition example on the `Atom_Profile` reference frame** — likely illustrating before/after account-switch states, not a distinct variant.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **A second instance of the recurring `text + icon/tertiary` name-collision was found here** (on nested "Line 2" text nodes): the bound variable is literally named `text + icon/tertiary` but resolves to `#737373`, not this system's canonical `#a3a3a3` for that name. This is now confirmed on 3 separate pages (also [Approval reason note](request-detail-rejection-reason.md) on Request list) — a real, recurring second collection reusing our exact token naming. Left unfixed and flagged, same reasoning as the first occurrence: a name-based rebind can't fix a collision where the name already matches ours.

## Changelog

- Fixed foreign color tokens (`primary-ci`, `xx`) and bound previously-unbound spacing/radius — part of a combined 655-fix pass across the `Setting - Profile` and `Setting - Activity log` pages. One `cornerRadius=5` value (no matching primitive) left flagged, likely a default-frame-wrapper artifact seen recurring across this page.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, and surfaced the recurring `text + icon/tertiary` collision — previously undocumented.
