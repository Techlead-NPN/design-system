# Request detail / Include comments in PDF toggle

A single checkbox option shown when exporting/printing a request to PDF, letting the user choose whether the comment thread is included in the export.

Figma: [`📱 Request list & Detail`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `dialog content_include comment in PDF` component (inside `Print include comment`). Built on the shared [Dialog](dialog.md) shell.

## Anatomy

| Part | Token(s) |
|---|---|
| Prompt copy | `text + icon/primary`, `Body/Small-regular` |
| Checkbox + label ("Include comments in PDF") | shared checkbox control, `text + icon/primary`, `Body/Small-regular` |

## Variants

Single fixed component — the checkbox's checked/unchecked state is a live interaction state, not a separate Figma variant.

## Behavior rules

- **Shown as part of a print/export-to-PDF flow for a request** — unchecked by default (per the reference), so PDF exports exclude comments unless explicitly opted in.
- **Relates to, but is distinct from, [Comment thread](request-detail-comment-thread.md)** — this toggle only controls whether that thread's content is included in a generated PDF, not the thread's own display in the slide-over.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Unbound `itemSpacing` of 11px** on the component's outer container, with no matching Foundation primitive (scale jumps `spacing/8`→`spacing/10`→`spacing/12`) — left unbound and flagged rather than snapped to a nearby value without confirmation. The same 11px gap was independently found on [Approve & Reject dialog](request-detail-approve-reject-dialog.md)'s `content_approval`, suggesting this may be a deliberate shared spacing choice rather than an accident — worth confirming with the design owner rather than assuming either way.
- **Whether this is presented as its own dialog, or as an option embedded within a larger "Export/Print" dialog, isn't shown in Figma** — the component here is just the checkbox content, not an assembled dialog frame with title/actions. Flagging as an open question for implementation.

## Changelog

- **2026-08-20:** component moved by the user from a separate (not-yet-audited) "Request Detail" page into this page's new top-level `Print include comment` frame, alongside two other newly-relocated components (see [Approval step](request-detail-approval-step.md), [Approve & Reject dialog](request-detail-approve-reject-dialog.md)) — the Figma page itself was renamed from "Request list" to "Request list & Detail" to reflect the merge.
- Fixed foreign color tokens and bound previously-unbound spacing/border: 14 fixes. One `itemSpacing=11` value left unbound and flagged (see Known gaps).
- Verified visually before/after — no rendering changes.
- Documented anatomy and behavior rules for the first time — previously undocumented.
