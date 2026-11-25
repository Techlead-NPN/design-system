# Request detail / Role tag

The read-only Verifier/Approver role tag shown next to each approver in the request-detail approval flow.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `action` component (inside `Requests expand`).

## Anatomy

| Part | Token(s) |
|---|---|
| Icon | role-specific icon (document-check for Verifier, user-check for Approver) |
| Label | `text + icon/primary`, `Body/Small-regular` |

## Variants

`Property 1`: `Approver` / `Verifier`.

## Behavior rules

- **Displayed per step in [Approval step](request-detail-approval-step.md)**, identifying whether that approver's role is to verify or approve.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Likely duplicate of Create form's `Action` component**: [Create form / Approval section](create-form-approval.md) documents an `Action` component with the identical `Approver`/`Verifier` role-tag concept, used while *building* an approval flow. This `action` component here is the *read-only display* equivalent shown in the request-detail view — same concept, two separately-built components across two pages. Flagging as a candidate for consolidation into one shared component rather than assuming they should be merged without confirmation, since the build vs. display contexts may justify keeping them separate (e.g. one needs to be interactive/editable, the other doesn't).
- **`Property 1` is still the generic unrenamed variant property name**, not renamed to something like `Role` — same pattern flagged on the Create form equivalent.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — part of the 1923-fix `Requests expand` pass.
- Verified visually before/after — no rendering changes.
- Documented anatomy and behavior rules for the first time, and flagged the likely duplicate against Create form's `Action` component — previously undocumented.
