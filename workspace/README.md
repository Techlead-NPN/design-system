# Workspace — parts shared by every internal app

Employees use one workspace with many internal apps: E-Approval today, then apps such as Org chart studio, Contract management, Procureapp (PR/PO), Room booking and Leave. They should feel like one product. Three things make that happen. (Approval is expected to become an engine inside each app rather than a separate app; this is not decided yet.)

1. **A shared theme.** Each internal app imports one of the two workspace looks: [`../themes/classic.css`](../themes/classic.css) (Classic, as E-Approval) or [`../themes/duo.css`](../themes/duo.css) (Duo, for new apps; see [`../themes/DUO.md`](../themes/DUO.md)). No app gets a theme or palette of its own.
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
| Shell, app switcher, sidebar menu and launcher | [`shell.md`](shell.md) | **Coded** (0.9.0): `DSWorkspaceShell`, `DSAppSwitcher`, `DSSidebarNav`, `DSAppLauncher`. Replaces E-Approval's top-left Workspace menu. Duo apps use `layout="rail"` (0.12.0) |
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

## Status colours

Every app shows its records' status with `DSBadge`. Apps name their own states, but pick the colour by **what the state means**, from this table, so the same colour means the same thing in every app. The first column is the `state` prop. E-Approval's request states are the source; the other examples show how other apps map theirs.

| `state` | Means | E-Approval | Examples in other apps |
|---|---|---|---|
| `warning` | Waiting for someone to act (approve, verify, sign) | Need approval | Waiting for approval |
| `accent` | Being worked on or happening now | Under review | In progress, Meeting in progress, Being signed |
| `info` | Started but not sent yet | Draft | Draft |
| `urgent` | Sent back to the requester to change | Revising | Changes requested |
| `success` | Approved, confirmed or done well | Approved | Confirmed, Signed, Paid |
| `error` | Rejected or failed | Rejected | Rejected, Payment failed |
| `idle` | Finished or no longer active, nothing wrong | — | Done (a past booking), Expired, Archived |
| `disabled` | Cancelled or withdrawn | Cancelled | Cancelled |

Keep one colour per meaning in a list: if two states would share a colour and need telling apart, say so rather than borrowing a decorative accent. Status never relies on colour alone: the badge always has its label.

## Building a new internal app

1. Follow [`../foundations/BUILD_GUIDE.md`](../foundations/BUILD_GUIDE.md) and import `themes/duo.css` (new apps; `themes/classic.css` for the Classic look).
2. Your app is its own site on its own subdomain (e.g. `leave.techlead.com`), with single sign-on; the app switcher links to the other apps ([`shell.md`](shell.md)).
3. Start from the **starter app**, [`components/starter/leave/`](../components/starter/leave/README.md): a working Duo app made only from the package. Copy it and replace its pages and data.
4. Wrap every screen in `DSWorkspaceShell` ([`shell.md`](shell.md)) and supply what it lists: name, icon, sidebar menu, primary action.
5. For a request or approval screen, start from the matching pattern above before designing anything new.
6. Create `projects/<app>/` for what only that app has (its own patterns, its menu items). It needs no `tokens.css`.
7. Before building a part the package doesn't have, check [`app-parts.md`](app-parts.md): another app may already have it. When you build one, add it there.
