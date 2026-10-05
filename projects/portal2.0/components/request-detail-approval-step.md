# Request detail / Approval step

A single step indicator in the request's approval flow, plus its assembled desktop and mobile views.

Figma: [`📱 Request list & Detail`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Step` component (inside `Requests expand`), `Approval Flow_full` component (desktop, inside `Approval Flow`), `Approval Flow_mobile` component (inside `Requests expand`).

## Anatomy

| Part | Token(s) |
|---|---|
| Step marker (dot/icon) | filled `text + icon/accent-indigo` circle + checkmark (completed) / empty outline (pending), per-state color |
| Connector line | `border/primary-subtle`, or `text + icon/accent-indigo` between completed steps |
| Section heading ("Delegation of Authority (DOA)") | `text + icon/accent-indigo`, `Body/Small-semibold`, PDF-style icon prefix |
| Step label (approver name/role) | `text + icon/primary`, `Body/Small-medium` |
| [Status label](request-detail-status-label.md) per step | e.g. `Submitted` (`text + icon/success`), `Under Review` (`text + icon/accent-indigo`) |

## Variants

`Step`'s `Status`: `Active` (current step), `Defualt` [sic "Default"] (upcoming/not yet reached), `Disable`, `Need Approval`. `Approval Flow_full` (desktop) and `Approval Flow_mobile` are each a single fixed component — the assembled stack of `Step`s for their respective viewports.

## Behavior rules

- **Steps render in order down the approval chain, headed "Delegation of Authority (DOA)"** — confirmed via the `Approval Flow_full` reference: a completed step shows a filled indigo checkmark and a green [Submitted status label](request-detail-status-label.md); a pending step shows an empty outline circle and a blue [Under Review status label](request-detail-status-label.md). This is the clearest evidence yet that `Status_Badge`'s `Draft` state and `Request label status`'s `Submitted` state likely describe the same underlying state — see both docs' Known Gaps.
- **`Active` marks the step currently awaiting action, `Need Approval` may indicate a step blocked on the current user specifically, `Disable` a step not yet reachable.**
- **`Approval Flow_full` (desktop) and `Approval Flow_mobile` are a matched pair covering the same content**, per the established desktop/mobile pairing pattern used across this slide-over — see [Content sections](request-detail-sections.md) for other examples.
- **Each step embeds a [Role tag](request-detail-role-tag.md)** (Approver/Verifier) alongside the approver's name and a relative timestamp.
- **Approving or rejecting a step opens the [Approve & Reject dialog](request-detail-approve-reject-dialog.md)** — this component only renders the read state, not the confirmation flow.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`Defualt` is a misspelling** of "Default" — flagging for a rename, not renamed without confirmation.
- **Precise distinction between `Active`, `Need Approval`, and `Disable` isn't obvious from Figma alone** — worth confirming exact trigger conditions with the design owner before implementing state logic.

## Changelog

- **2026-08-20:** `Approval Flow_full` was moved by the user from a separate (not-yet-audited) "Request Detail" page into this page's own top-level `Approval Flow` frame, alongside two other newly-relocated components (see [Approve & Reject dialog](request-detail-approve-reject-dialog.md), [Print include comment in PDF](request-detail-print-comment.md)). Audited and fixed on arrival: 18 fixes (foreign duplicate-radius token, unbound spacing). Verified visually before/after — no rendering changes. Folded into this existing doc as the desktop counterpart to `Approval Flow_mobile`, and used its "Delegation of Authority (DOA)" reference to strengthen (not fully resolve) the `Draft`/`Submitted` status-naming question.
- Fixed foreign color tokens and bound previously-unbound spacing/radius on `Step`/`Approval Flow_mobile` — part of the 1923-fix `Requests expand` pass.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — previously undocumented.
