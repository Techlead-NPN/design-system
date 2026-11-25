# Workspace shell, app switcher and launcher

The frame every internal app sits in, the menu that switches between apps, and the page that lists them. Every internal app uses these as they are; an app only supplies its name, icon, sidebar menu and page content.

Status: **designed, not coded for apps yet.** A clickable prototype built from the coded components is in Storybook under **Workspace (draft) → App shell and switcher** ([`components/src/workspace/`](../components/src/workspace/)). Step 5 of the theme proposal turns it into components apps can import. Design reference: the "Company Workspace Portal" super-app prototype (November 2026).

Values below are Workspace theme tokens and Tailwind classes (see [`../foundations/BUILD_GUIDE.md`](../foundations/BUILD_GUIDE.md) §3).

## Flow

1. The person signs in and lands on the **launcher**: "Welcome to Portal", one card per app.
2. A card opens that app inside the **shell**.
3. Inside any app, the **grid button** at the top-left opens the **app switcher**: pick another app, or "All apps" to go back to the launcher.

## What each app supplies

| Item | Rule |
|---|---|
| Name | Short, in English, e.g. "ProcureApp", "HR Tools" |
| Icon | An illustration on a white rounded tile, square SVG, in the same style as the existing four (below). Used at 24, 32 and 56px |
| Sidebar menu | Its own items, as [Navigation item L1](../projects/e-approval/components/nav-item-l1.md) rows with tinted icon chips |
| Primary action | The one main action for the page, e.g. "Create request", in the header |

Nothing else changes per app: no theme, colour, header or sidebar of its own.

**App icons today** (from the super-app prototype): [`app-itsm.svg`](../components/src/workspace/assets/app-itsm.svg), [`app-procureapp.svg`](../components/src/workspace/assets/app-procureapp.svg), [`app-hr-tools.svg`](../components/src/workspace/assets/app-hr-tools.svg), [`app-accounting-tools.svg`](../components/src/workspace/assets/app-accounting-tools.svg). Use the files; never redraw an app icon. A new app needs a new icon from a designer in the same style.

## Shell

Builds on E-Approval's [App shell](../projects/e-approval/patterns/app-shell.md); this section replaces its top-left Workspace menu with the app switcher.

**Page:** `bg-secondary` backdrop, full height. Sidebar on the left, the right column takes the rest.

**Sidebar** — 244px wide, no fill, padding `px-2 py-4`. Top to bottom:

| # | Block | Spec |
|---|---|---|
| 1 | Brand row | 32px high (`h-8`). Grid button (below), `gap-1`, then the app's 24px icon, `gap-2`, and its name in `text-body-small-bold`, `text-primary`, with `px-1` around icon and name. The name truncates |
| 2 | Search | `mt-2`. 28px row, `rounded-4`, `p-1`: 16px search icon, "Search" in `text-body-small-medium text-secondary`, ⌘K chip at the right (16px high, `bg-secondary`, `border-primary`, `rounded-4`, `text-support-caption text-tertiary`) |
| 3 | App menu | `mt-3`. Navigation item L1 rows, `gap-0.5`. Selected row: `bg-accent-indigo-subtlest`, `text-accent-indigo`, `text-body-small-semibold`; its icon chip keeps its own colour |
| 4 | Help | Pinned to the bottom. 24px outline icon button, fully round, `bg-primary` |

**Right column** — padding `pt-4 pr-2 pb-2` (`pl-2` too when the sidebar is hidden), `gap-4` between header and card.

**Header** — 32px high, no fill. Left: sidebar toggle (24px ghost icon button), a vertical divider, the page title in `text-body-medium-semibold`. Right: the primary action (`Button`, primary, `accent="blue"`, 32px), a vertical divider, Notifications and Comments (32px ghost icon buttons, 20px icons), and the person's avatar (24px), which opens the account menu.

**Content card** — `bg-primary`, `border border-primary-subtle`, `rounded-8`, `p-4`. Fills the rest of the column and scrolls on its own.

**Hidden sidebar** — the toggle hides the sidebar completely. The grid button then moves into the header, right after the toggle, so switching apps always takes one click.

## App switcher

**Trigger** — 24px ghost icon button with a grid icon (`IconLayoutGrid`), first in the brand row. Label "Switch app"; it has `aria-haspopup="menu"` and `aria-expanded`.

**Panel** — the coded [`Menu`](../projects/e-approval/components/menu-item.md), 256px wide (`w-64`), 4px below the trigger, left edges aligned:

1. Group label "Switch app" (`MenuGroupLabel`).
2. One `MenuItem` per app the person can open, in a fixed order the workspace sets. Leading: the app's 32px icon, centred on the row. The current app is `selected` (indigo text and a check) with `aria-current`.
3. A divider (`Divider spacing="regular"`).
4. "All apps": leading 32px tile with `bg-secondary`, `border border-primary-subtle`, `rounded-8`, and a 16px grid icon in `text-secondary`. Opens the launcher.

**Behaviour**

- Click the trigger to open or close. When it opens, focus goes to the first app.
- Arrow Up and Down move through the rows and wrap around. Escape closes and returns focus to the trigger. A click outside closes it.
- Choosing a row closes the menu and opens that app on its Home page, or the launcher for "All apps".
- Apps the person has no access to are not listed.

## Launcher

Shown after sign-in and from "All apps".

- **Page:** `bg-primary`, full height. A 224px fade across the top (`h-56`), from `bg-accent-indigo-subtlest` to `bg-primary`.
- **Column:** centred, at most 720px wide, `pt-24`. The Techlead wordmark ([file](../projects/e-approval/assets/logo/techlead-wordmark-on-light.svg)), 56px high. Then "Welcome to Portal" in `text-heading-h5` (`mt-6`) and "Select an application to use." in `text-body-medium-regular text-secondary` (`mt-1`).
- **App grid:** `mt-10`, two columns (one on narrow screens), `gap-6`.
- **App card:** a button, 160px high, `rounded-12`, `border border-primary-subtle`, `bg-primary`. Centred: the app's 56px icon, `gap-4`, its name in `text-body-medium-semibold`. Hover: `border-primary` and `shadow-md`. Keyboard focus: the standard 2px indigo ring.
- **"Most used" ribbon:** on at most one card, in its top-right corner: `bg-accent-indigo`, `text-primary-inverse`, `text-support-caption`, `px-2 py-1`, corners `rounded-tr-12 rounded-bl-8`.

## Approval inside apps

Most internal apps have an approval workflow. The current assumption (not decided) is that approval becomes an engine that lives inside each app, rather than a separate E-Approval app. Its screens follow the shared request and approval patterns listed in [`README.md`](README.md).

## Open questions and known gaps

- **Mobile** is not designed yet (step 6 of the proposal).
- **Account menu:** what the avatar menu holds. E-Approval's [Account switcher](../projects/e-approval/components/profile-account-switcher.md) is the starting point.
- **Search and notifications:** does ⌘K search only the current app or the whole workspace, and does the bell show notifications from every app?
- **"Most used":** the rule that picks the app is not defined (for example, the app this person opened most in the last 30 days).
- **Ribbon contrast:** white on `bg-accent-indigo` is about 4.3:1, under the 4.5:1 that WCAG AA asks for 12px text. The same open issue as the white-on-indigo button label in [`button.md`](../projects/e-approval/components/button.md).
- **Launcher background:** the super-app prototype has a pattern of outlined triangles behind the fade. It needs exporting as an image asset before it can be used.
- **Avatar size:** the header uses the 24px avatar; the super-app prototype shows about 30px, and the design system has no 32px avatar yet.

## Changelog

- **2026-11-25:** first version, from the super-app prototype. Decided with the design owner: the grid-button switcher plus launcher; illustrated icons on white tiles; English labels; the current app marked with indigo text and a check, and standard menu sizes (40px rows, 32px icons), instead of the prototype's filled row and 48px rows.
