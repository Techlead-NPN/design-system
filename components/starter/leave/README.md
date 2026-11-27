# Leave — starter app

A whole internal app built only from the design system package, in the Duo look. Copy this folder to start a new app. Storybook: **Starter app → Leave**.

It is a sample, not the real Leave app: the data is made up and there is no back end. What it shows is how the shell and the building blocks fit together into real pages.

## What's in it

| File | Page | Built from |
|---|---|---|
| [`LeaveApp.tsx`](LeaveApp.tsx) | The app: shell, menu, which page is open, dialogs and the toast | `DSWorkspaceShell layout="rail"`, `DSOverlay`, `DSApprovalDialog`, `DSConfirmationDialog`, `DSToast` |
| [`HomePage.tsx`](HomePage.tsx) | Home: waiting for you, leave left, your requests, next days off | `DSSectionCard`, `DSStatTiles`, `DSStatTile`, `DSItemList`, `DSItemRow`, `DSEmptyState`, `DSBadge` |
| [`RequestsPage.tsx`](RequestsPage.tsx) | My requests and Waiting for me: one page, two modes | `DSTabs variant="pill"`, `DSListToolbar`, `DSFilterChips`, `DSTable`, `DSListWithDetail`, `DSDetailPanel`, `DSFieldGrid`, `DSApprovalTimeline`, `DSEmptyState` |
| [`RequestForm.tsx`](RequestForm.tsx) | Request leave: details, then review with who approves | `DSFormPage`, `DSFormSection`, `DSDropdown`, `DSCalendar mode="range"`, `DSTextArea`, `DSApprovalTimeline` |
| [`data.ts`](data.ts) | Sample people, requests, balances and the approval flow | — |

## What works

- **The rail** opens expanded the first time and remembers whether the person collapsed it, in the `workspace_rail` cookie shared by every app under `techlead.com` ([`shell.md`](../../../workspace/shell.md)).
- **The account menu** (click the avatar): name and email, Profile, Sign out, the same in every workspace app. Search and the bell cover this app only ([`shell.md`](../../../workspace/shell.md)).
- **Home** counts come from the data. Each tile opens the matching list, already filtered.
- **Lists:** status tabs with counts, search, type chips. Click a row and the detail opens beside the list, which drops to No., Type and Status. Use the arrows to move through rows without closing it. A filter with no results shows its own empty state.
- **Approve and reject** (Waiting for me) open the confirm dialog. Rejecting needs a reason. The request then moves to Approved or Rejected, its approval flow updates, and a toast confirms.
- **Cancel** (My requests, while waiting) asks first, then marks the request Cancelled.
- **Request leave** checks the step before Next: type, dates, weekends only, more days than the balance allows. Review shows the values and the approvers. Send adds the request to My requests and opens it.

## Using it in a new app

1. Copy this folder into your app.
2. Replace `'../../src'` with `'@techlead-npn/design-system'` in every file (the names are the same `DS…` exports), and the app icon imports with your app's own icon.
3. Replace the `page` state in `LeaveApp.tsx` with your router. With separate pages per URL, give menu items an `href` and pass your router's link as `linkComponent` ([`shell.md`](../../../workspace/shell.md)).
4. Set the real addresses in `apps` (each app's `href`), delete `onOpenApp` and `onOpenLauncher`, and pass `launcherHref`. Keep `RAIL_COOKIE` and `WORKSPACE_DOMAIN` exactly as they are, so the rail choice is shared with the other apps.
5. Replace `data.ts` with your API. Keep the shapes the pages take, or change both together.
6. Import `themes/duo.css` and load Inter and IBM Plex Sans Thai ([`README.md`](../../../README.md)).

The starter is in Storybook and type-checked with the package, but it is not part of the package: nothing here is published.

## Gaps it found

The things the blocks couldn't do cleanly are listed in [`workspace/blocks.md`](../../../workspace/blocks.md#gaps-found-by-the-starter-app).
