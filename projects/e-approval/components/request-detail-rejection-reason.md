# Request detail / Approval reason note

A note box attached to an approval-flow step, showing the approver's comment when approving or rejecting.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `reson` [sic] component (inside `Requests expand`).

## Anatomy

| Part | Token(s) |
|---|---|
| Note container — fill, border, radius | `bg/secondary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8` |
| Note text | `text + icon/primary`, `Body/Small-regular` — this component's `text + icon/tertiary` binding was found rebound to a foreign collection reusing our own token name (see Known gaps) |

## Variants

`Property 1`: `Approve` / `Rejection` — likely differ only in accent color (approve = green-tinted, rejection = red-tinted) attached to the same note layout.

## Behavior rules

- **Shown attached to an [Approval step](request-detail-approval-step.md) once that approver has acted**, surfacing their written justification — most relevant for `Rejection`, where a reason is typically expected.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Component is named `reson`** (typo for "reason") — flagging for a rename, not renamed without confirmation.
- **A genuine token-naming collision was found and left unfixed**: this component's text was bound to a variable literally named `text + icon/tertiary` — identical to our own canonical token name — but resolving to `#737373` instead of our token's actual `#a3a3a3`. This means a **different color collection is reusing our exact naming convention**, not a simple foreign-token case the standard rebind-by-name pass can safely catch (rebinding by name here would silently do nothing, since the name already matches). Flagging rather than force-rebinding by value, since it's unclear whether `#737373` was an intentional local override or contamination — worth a manual check in Figma's variables panel to see which collection this specific binding points to.

## Changelog

- Fixed other foreign color tokens and bound previously-unbound spacing/radius — part of the 1923-fix `Requests expand` pass. The `text + icon/tertiary` name-collision above was identified but deliberately left unresolved (see Known gaps).
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, and surfaced the token-naming-collision finding — previously undocumented.
