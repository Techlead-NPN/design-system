# App-specific parts — who has built what

Some parts are built inside one app instead of in the shared package, because only that app needs them (the rule: a part goes into the package once **two apps** need it). Their code lives in that app's own repo, which this repo can't see. This list is how everyone, people and AI tools alike, finds out a part already exists somewhere.

## Before you build a part the package doesn't have

1. Check the package first: [`components/src/`](../components/src/), the blocks in [`blocks.md`](blocks.md), and Storybook.
2. Then check the list below.
3. **If another app already has it, don't build a second one.** Say so: this is the second app that needs it, so the part should move into the package, shaped by both apps. Tell the design system team and the owning team. A prototype can use a simple stand-in until then, marked as one.
4. If nobody has it and only your app needs it, build it in your app with the theme's token classes (no invented colours or sizes), then **add a line here** in the same change.

## The list

| Part | What it does | Built in | Contact | Since | Notes |
|---|---|---|---|---|---|
| Org chart canvas | Zoomable, pannable tree of units, positions and people | Org Chart Studio | Org Chart Studio team | 2026-11 | Duo look. Its exact features aren't listed yet |
| Kanban board | Lanes by stage, a card per document | ProcureApp (purchasing "Overview") | ProcureApp team | 2026-11 | Seen in the super-app prototype |
| Budget card | Available vs requested amount, in or out of budget | ProcureApp, E-Approval | ProcureApp team | 2026-11 | Tied to purchasing ([`request-detail-budget-status`](../projects/e-approval/components/request-detail-budget-status.md)) |
| Dashboard customise | Choose which home widgets show | E-Approval, ProcureApp | E-Approval team | 2026-11 | [`home-dashboard-widgets`](../projects/e-approval/components/home-dashboard-widgets.md). Already in two apps: a candidate for the package |

Add a row when your app builds a part the package doesn't have. Remove it when the part moves into the package, and say in the Notes where it went.

**Other products:** PayGenix keeps its own list of dashboard-only parts in [`projects/paygenix-merchant/DESIGN.md`](../projects/paygenix-merchant/DESIGN.md#4-built-in-the-app-not-in-the-design-system).

## Changelog

- **2026-11-27:** first version: the org chart canvas, plus the three app-only parts from [`blocks.md`](blocks.md).
