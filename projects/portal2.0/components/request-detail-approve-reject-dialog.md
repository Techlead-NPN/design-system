# Request detail / Approve &amp; Reject dialog

The confirmation dialog shown when a user acts on an [Approval step](request-detail-approval-step.md) — one variant for approving, one for rejecting, each with an optional/required comment field.

Figma: [`📱 Request list & Detail`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `content_approval` and `Confirmation Approval` components (inside `Approve & Reject dialog`). Built on the shared [Dialog](dialog.md) shell.

## Anatomy

| Part | Token(s) |
|---|---|
| Dialog card — fill, radius, shadow | `bg/primary`, `border-radii/rounded-8`, `shadow-lg` |
| Title | `text + icon/primary`, `Body/Medium-semibold` |
| Body copy | `text + icon/secondary`, `Body/Small-regular` |
| Comment/reason textarea — border, radius | `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-6`, placeholder `text + icon/tertiary` |
| Character counter | `text + icon/tertiary`, `Support/Caption` |
| Primary action button | embedded [Button](button.md) instance — `Approve` (Outline/Default) or `Reject` (Primary/Danger) |

## Variants

`Confirmation Approval`'s `Property 1`: `Approval` / `Reject`. `content_approval` is a single fixed component representing the shared comment-field layout used inside both.

## Behavior rules

- **`Approval`'s comment field is explicitly optional** ("Enter comment here (optional)"); **`Reject`'s reason field is implied required** ("Please provide a reason and confirm to proceed", placeholder "Enter reason here" with no "(optional)" suffix) — confirm the required/optional distinction is actually enforced in the built product, since Figma can't encode form validation.
- **Both variants cap input at 250 characters**, shown via a live `0 / 250` counter.
- **Confirming triggers the same underlying action the corresponding [Approval step](request-detail-approval-step.md) button represents** — this dialog is the confirm-before-you-commit step, not a separate flow.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **A second, unconfigured [Button](button.md) instance ships alongside the real action on both variants** — literally labeled `Button Text: "Button"` (`Hierachy=Primary`, `Accent=Blue`), sitting next to the real `Approve`/`Reject` button in each `CTA` row. This reads as leftover scaffolding (an unfinished secondary action, e.g. a `Cancel`) rather than an intentional second button — flagging rather than deleting or relabeling without confirmation.
- ~~The real `Reject` button had its stroke bound to a variable named `transparent/light`~~ — **resolved 2026-08-20**: traced and confirmed the variable was already orphaned (deleted from the file's active collection, not enumerable via `getLocalVariablesAsync`, yet still resolvable — and still bound — via its old ID on 16 Button master-component variants). Per user instruction, cleaned up all 16 dangling bindings on the shared [Button](button.md) component's `✅ Buttons` page — see that page's changelog for the full list. No variable to actually delete remained; the fix was clearing the orphaned references and setting the same `rgba(0,0,0,0.04)` value as a static (unbound) color, preserving appearance exactly.
- **`content_approval`'s outer container has an unbound `itemSpacing` of 11px** with no matching Foundation primitive (the scale jumps from `spacing/8` to `spacing/10` to `spacing/12`) — left unbound and flagged rather than snapped to a nearby value without confirmation.
- **`Confirmation Approval`'s `cornerRadius` of 5px** on the component-set frame itself has no matching primitive (4 vs. 6) — likely inherited from a default frame wrapper rather than meaningful, same as the similar flagged case on [Activity log](request-detail-activity-log.md).

## Changelog

- **2026-08-20:** components moved by the user from a separate (not-yet-audited) "Request Detail" page into this page's new top-level `Approve & Reject dialog` frame, alongside two other newly-relocated components (see [Approval step](request-detail-approval-step.md), [Print include comment in PDF](request-detail-print-comment.md)) — the Figma page itself was renamed from "Request list" to "Request list & Detail" to reflect the merge.
- **2026-08-20, follow-up:** at the user's request, cleaned up the orphaned `transparent/light` binding found on this dialog's `Reject` button — see Known gaps for what the trace found, and [`button.md`](button.md)'s changelog for the full 16-instance fix on the shared Button component.
- Fixed foreign duplicate-radius tokens and bound previously-unbound spacing/`strokeWeight`: 8 fixes on `content_approval`, 11 on `Confirmation Approval`. Two non-matching flagged values remain unresolved: `itemSpacing=11`, `cornerRadius=5` (see Known gaps).
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, and surfaced two real findings (the unconfigured second Button instance, and the now-resolved orphaned `transparent/light` binding) — previously undocumented.
