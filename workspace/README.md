# Workspace — parts shared by every internal app

Employees use one workspace with many internal apps: E-Approval today, then apps such as Org chart studio, Contract management, Procureapp (PR/PO), Room booking and Leave. They should feel like one product. Three things make that happen. (Approval is expected to become an engine inside each app rather than a separate app; this is not decided yet.)

1. **One theme.** Every internal app imports [`../themes/workspace.css`](../themes/workspace.css). No internal app gets a theme or palette of its own.
2. **One shell.** Every app sits in the same frame: sidebar, top bar, workspace switcher, profile and notifications.
3. **Shared patterns.** Most of these apps are request-and-approval apps, like E-Approval. They reuse the same list, form, detail and approval patterns instead of inventing new ones.

## Where the shared parts are today

The shell and the patterns were designed for E-Approval, the first app, so their docs still live in [`../projects/e-approval/`](../projects/e-approval/). They are the starting point for every new internal app. Read them as the workspace standard, but skip what is specific to E-Approval: its request types, budget fields, illustrations and menu items.

A doc moves into this folder once a second app uses it and its E-Approval-only parts have been taken out. Until then, this page is the index.

### Shell

**Start with [`shell.md`](shell.md)**: the shell, app switcher and launcher every internal app uses, with a clickable prototype in Storybook. The E-Approval docs below are the detail it builds on.

| Part | Doc | Status |
|---|---|---|
| Page frame: backdrop, sidebar, header, content card | [`app-shell.md`](../projects/e-approval/patterns/app-shell.md) | Documented, not coded |
| Desktop sidebar | [`sidebar-navigation.md`](../projects/e-approval/patterns/sidebar-navigation.md) | Documented, not coded. Its menu items are E-Approval's |
| App switcher and launcher | [`shell.md`](shell.md) | Designed, prototype in Storybook, not coded for apps. Replaces E-Approval's top-left Workspace menu |
| Top bar | [`nav-header-navigation.md`](../projects/e-approval/components/nav-header-navigation.md) | Documented, not coded |
| Mobile bottom navigation | [`mobile-bottom-navigation.md`](../projects/e-approval/patterns/mobile-bottom-navigation.md) | Documented, not coded. Its tabs are E-Approval's |
| Mobile top bar | [`nav-mobile-top-bar.md`](../projects/e-approval/components/nav-mobile-top-bar.md) | Documented, not coded |
| Notifications | [`notification-system.md`](../projects/e-approval/patterns/notification-system.md) | Documented, not coded |
| Profile and account switcher | [`profile-settings.md`](../projects/e-approval/patterns/profile-settings.md) | Documented, not coded |

### Request and approval patterns

| Pattern | Doc | Fits |
|---|---|---|
| Request list: table or cards, filters, bulk actions | [`request-table.md`](../projects/e-approval/patterns/request-table.md) | Procureapp, Contract management, Leave |
| Create a request: tabbed form, approvers, preview | [`create-form.md`](../projects/e-approval/patterns/create-form.md) | Procureapp, Contract management, Leave |
| Request detail with approve and reject | [`request-detail-slide-over.md`](../projects/e-approval/patterns/request-detail-slide-over.md) | Any app with an approval step |
| Approval flow steps | [`request-detail-approval-step.md`](../projects/e-approval/components/request-detail-approval-step.md) | Any app with an approval step |
| Approve and reject dialog | [`request-detail-approve-reject-dialog.md`](../projects/e-approval/components/request-detail-approve-reject-dialog.md) | Any app with an approval step |

The coded generic components (Button, Table, Dialog, …) are already shared by every app; they live in [`../components/`](../components/).

**Building blocks** (section card, stat tiles, list toolbar, detail panel, approval timeline, form page, …) sit between components and pages. [`blocks.md`](blocks.md) lists the ones E-Approval and ProcureApp share and the order to build them.

## Building a new internal app

1. Follow [`../foundations/BUILD_GUIDE.md`](../foundations/BUILD_GUIDE.md) and import `themes/workspace.css`.
2. Start every screen from the shell in [`shell.md`](shell.md), and supply what it lists: name, icon, sidebar menu, primary action.
3. For a request or approval screen, start from the matching pattern above before designing anything new.
4. Create `projects/<app>/` for what only that app has (its own patterns, its menu items). It needs no `tokens.css`.
