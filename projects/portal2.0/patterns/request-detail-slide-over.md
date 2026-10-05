# Request Detail Slide-over (pattern)

The panel that opens when a request is selected from [Request Table](request-table.md): a 4-tab detail view (Information / Approval Flow / Comment / Activity log) with reject/approve actions always available.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Slide_request` component set — used here as the visual composition reference, not documented as a separate atom.  Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Composition

Built from already-documented atoms:
- [Slide-over shell](../components/request-detail-shell.md) — sticky header/footer, tab strip, prev/next navigation
- [Inline cell](../components/request-detail-inline-cell.md) — the label/value fields on the Information tab
- [Budget status summary](../components/request-detail-budget-status.md), [Content sections](../components/request-detail-sections.md) — the Information tab's Budget/General/Details/Item & Budget/References & Attachments sections
- [Approval step](../components/request-detail-approval-step.md), [Role tag](../components/request-detail-role-tag.md), [Status label](../components/request-detail-status-label.md), [Approval reason note](../components/request-detail-rejection-reason.md) — the Approval Flow tab
- [Approve & Reject dialog](../components/request-detail-approve-reject-dialog.md) — the confirmation shown when the footer's Reject/Approve buttons are pressed
- [Include comments in PDF toggle](../components/request-detail-print-comment.md) — part of the header's print/export action
- [Comment thread](../components/request-detail-comment-thread.md) — the Comment tab
- [Activity log (per-request)](../components/request-detail-activity-log.md) — the Activity log tab

## Layout rules

- **A persistent header stays above the tab strip on every tab**: request title, ID, requester avatar/name, request date, and the current [Status label](../components/request-detail-status-label.md), plus close/share/more-options icons.
- **The tab strip (`Information` / `Approval Flow` / `Comment (1)` / `Activity log`) sits directly below the header** — the Comment tab's label shows a live count badge (`Comment (1)` in the reference).
- **`Reject`/`Approve` buttons are pinned to the bottom on every tab**, per [Slide-over shell](../components/request-detail-shell.md)'s sticky footer — not just on the Approval Flow tab.

## Behavior rules

- **Information tab stacks, top to bottom: [Budget status summary](../components/request-detail-budget-status.md) → General → Details → Item & Budget → References & Attachments** — all read via [Content sections](../components/request-detail-sections.md), each independently collapsible (confirmed via the chevron on each section header).
- **Approval Flow tab is headed "Delegation of Authority (DOA)"** and lists each approver as a checklist: a filled checkmark for a completed step ([Status label](../components/request-detail-status-label.md) = `Submitted`, shown in green) versus an empty circle for a pending step (`Under Review`, shown in blue) — this is the first confirmed visual evidence of how [Status badge](../components/request-list-status-badge.md)'s `Draft` state and [Status label](../components/request-detail-status-label.md)'s `Submitted` state relate: they are almost certainly the *same* meaning (a step/request that has been submitted/moved forward) described with different words on the two components, reinforcing rather than resolving the naming-mismatch flag on both atom docs.
- **Each approval step shows an actor, a [Role tag](../components/request-detail-role-tag.md) (Verifier/Approver), and a relative timestamp** — [Approval reason note](../components/request-detail-rejection-reason.md) attaches only when that step includes a written comment.
- **Comment tab's composer sits below the thread**, not above — new comments append to the bottom, consistent with a standard chat-style thread.
- **Activity log entries show the exact chip content confirmed in the reference** (e.g. "Workflow (added), Workflow (removed), Form data (updated)") — validates [Activity log (per-request)](../components/request-detail-activity-log.md)'s documented `show activity?` boolean is what drives that chip's visibility.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **The `Draft`/`Submitted` status-naming mismatch (flagged on both [Status badge](../components/request-list-status-badge.md) and [Status label](../components/request-detail-status-label.md)) is reinforced, not resolved, by this reference screen** — worth a definitive answer from the design owner on whether these are meant to be the same state under two names, since the Approval Flow tab's checklist visual makes the distinction functionally important (it drives the checkmark vs. empty-circle rendering).
- **[Approve & Reject dialog](../components/request-detail-approve-reject-dialog.md)'s `Reject` action ships with an unconfigured second Button instance next to it**, and its stroke color traces back to an unmapped token (`transparent/light`) on the shared [Button](../components/button.md) main component itself — see that doc's Known Gaps, since the latter finding has file-wide blast radius beyond this pattern.
- See each linked atom doc's own Known Gaps for component-level issues (the possible duplicate `action`/`Action` role tag across this page and Create form, the `budget section` naming overlap with Create form's `Budget status`, the duplicate Activity-log build vs. Home's version, etc.) — not repeated here.

## Changelog

- **2026-08-20:** three more components — `Approval Flow_full` (desktop approval flow), `content_approval`/`Confirmation Approval` (the [Approve & Reject dialog](../components/request-detail-approve-reject-dialog.md)), and `dialog content_include comment in PDF` (the [Print PDF toggle](../components/request-detail-print-comment.md)) — were moved by the user from a separate, not-yet-audited "Request Detail" page into this page (renamed from "Request list" to "Request list & Detail" to reflect the merge). All three audited, fixed (51 total fixes), and documented on arrival; folded into this pattern doc's composition list.
- **Full token audit (2026-08-19):** part of the same ~2168-fix pass covering the whole Request list page — see [Request Table](request-table.md)'s changelog and each linked atom doc for specifics. This slide-over's `Requests expand` frame alone accounted for 1923 of those fixes across its 20 components, the single largest component group audited on this page.
- Verified visually before/after — no rendering changes.
- Documented composition, layout rules, and tab-by-tab behavior for the first time using the `Slide_request` reference screens — this pattern previously had no doc. Confirmed via screenshot that the reference is a fully-functional 4-tab assembly, not just a component grid.
