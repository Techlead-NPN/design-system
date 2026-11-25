# Request detail / Status label

The vertical colored-text status list used inside the request-detail slide-over — the detail-view counterpart to the table's status pill.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Request label status` component (inside `Requests expand`).

## Anatomy

| Part | Token(s) |
|---|---|
| Status text | per-state color, `Body/Small-medium` |

## Variants

`Property 1` — 6 states: `Submitted`, `Need Approval`, `Approved`, `Rejected`, `Cancelled`, `Under Review`.

## Behavior rules

- **Same underlying workflow states as [Status badge](request-list-status-badge.md)**, but rendered as plain colored text rather than a pill — used where the slide-over already has enough visual chrome that a full badge would be redundant.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **State-name mismatch with [Status badge](request-list-status-badge.md)**: this component's first state is `Submitted`, while the table badge's first state is `Draft` — see that doc's Known Gaps for the full note. Flagging here too since either doc could be read independently.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing — part of the 1923-fix `Requests expand` pass.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, and cross-referenced the naming mismatch against [Status badge](request-list-status-badge.md) — previously undocumented.
