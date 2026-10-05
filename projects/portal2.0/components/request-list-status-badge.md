# Request list / Status badge

The colored pill showing a request's workflow status, used in the table's Status column.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Status_Badge` component (inside `Request Table`).

## Anatomy

| Part | Token(s) |
|---|---|
| Pill — fill, text, radius | per-state color pair (see below), `Body/Small-medium`, `border-radii/rounded-infinite` |

## Variants

`Property 1` — 6 states: `Draft` (neutral/blue-gray), `Under review` (blue), `Need approval` (orange), `Approved` (green), `Rejected` (red), `Cancelled` (gray).

## Behavior rules

- **One state is shown per request row at a time** — reflects the request's current position in the approval workflow.
- **See [Status label (detail view)](request-detail-status-label.md) for the equivalent status indicator used inside the request-detail slide-over** — same underlying states, different visual treatment (pill badge here vs. a vertical colored-text list there) and a naming mismatch worth resolving (see Known gaps).

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **State-name mismatch with [Status label (detail view)](request-detail-status-label.md)**: this component's first state is `Draft`, while the detail-view equivalent's first state is `Submitted` — these may be the same workflow state named differently (a request that hasn't been submitted yet vs. one that has), or two genuinely different states depending on where in the flow a request sits. Flagging rather than assuming which is correct — worth confirming with the design owner since it affects which badge a "just-created, not-yet-submitted" request should show.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — part of the 511-fix `Request Table` pass.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, and flagged the naming mismatch against the detail-view status indicator — not previously compared.
