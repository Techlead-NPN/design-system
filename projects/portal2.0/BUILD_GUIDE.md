# Portal 2.0 — Build Guide

How to build a Portal 2.0 screen from these docs. Read [`../../foundations/BUILD_GUIDE.md`](../../foundations/BUILD_GUIDE.md) first: it has the setup, the token-to-class mapping, and the rules that apply to every project. This page only adds what is specific to Portal 2.0.

There are about 90 docs here. Do not read them all — read the ones this page points to for your task.

## 1. Always

1. Import [`tokens.css`](tokens.css) after the Foundations tokens. Every color and text style comes from it.
2. Read [`DESIGN.md`](DESIGN.md) §2.1–2.2 (color naming and the accent rule) and §5 (accessibility rules). The token tables in §2–§3 are a reference for what each token is for; you don't need to memorise them.
3. **Start every desktop screen from the app shell**: [`patterns/app-shell.md`](patterns/app-shell.md). It defines the page backdrop, sidebar, header and the white content card that all page content sits inside. Getting this wrong is the most visible way a screen ends up looking unlike Portal 2.0.

## 2. Portal 2.0 color rules in short

- `accent-indigo` is the primary interactive color: primary buttons, selected states, focus rings, checked toggles.
- Keyboard focus is always the same: normal colors plus a 2px indigo ring outside the element (`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo`).
- The other nine accents (`sky`, `ocean`, `emerald`, `teal`, `sun`, `fuchsia`, `blossom`, `blush`, `peach`, `stone`) are decorative only — avatars, sidebar icons. Never use them to signal status.
- Status uses `danger`, `warning`, `success`, `info`, `idle`, `urgent`. Take background, text/icon and border from the **same** family, and never signal status by color alone.
- `-subtle` backgrounds are for badges and pills; `-subtle-A80` backgrounds are for toasts and alert banners.

## 3. Which docs to read for which task

| Building… | Read the pattern | Then the components it links to, mainly |
|---|---|---|
| Any page (the frame around it) | [`app-shell`](patterns/app-shell.md) | [`nav-header-navigation`](components/nav-header-navigation.md), [`content-area`](components/content-area.md) |
| Desktop navigation | [`sidebar-navigation`](patterns/sidebar-navigation.md) | `nav-*` component docs |
| Mobile navigation | [`mobile-bottom-navigation`](patterns/mobile-bottom-navigation.md) | [`nav-mobile-tab-item`](components/nav-mobile-tab-item.md), [`nav-mobile-top-bar`](components/nav-mobile-top-bar.md) |
| Home / dashboard | [`home-dashboard`](patterns/home-dashboard.md) | `home-*` component docs |
| A list or table of records | [`request-table`](patterns/request-table.md) | [`table`](components/table.md), `request-list-*` |
| A detail panel / slide-over | [`request-detail-slide-over`](patterns/request-detail-slide-over.md) | [`tab`](components/tab.md), `request-detail-*` |
| A create / edit form | [`create-form`](patterns/create-form.md) | [`text-input`](components/text-input.md), [`dropdown`](components/dropdown.md), [`radio-checkbox-card`](components/radio-checkbox-card.md), `create-form-*` |
| Notifications | [`notification-system`](patterns/notification-system.md) | `notification-*`, [`toast-alert`](components/toast-alert.md) |
| Profile / settings | [`profile-settings`](patterns/profile-settings.md) | `profile-*`, [`toggle`](components/toggle.md) |

For a screen that has no pattern doc, build it inside the app shell from the generic components below, and follow the closest pattern for layout rhythm.

**Generic components** (usable on any screen): [`avatar`](components/avatar.md), [`bottom-sheet`](components/bottom-sheet.md), [`breadcrumb`](components/breadcrumb.md), [`button`](components/button.md), [`calendar`](components/calendar.md), [`chips-tag-badge`](components/chips-tag-badge.md), [`content-area`](components/content-area.md), [`dialog`](components/dialog.md), [`divider`](components/divider.md), [`dropdown`](components/dropdown.md), [`icon-sidebar`](components/icon-sidebar.md), [`loading`](components/loading.md), [`menu-item`](components/menu-item.md), [`overlay`](components/overlay.md), [`radio-checkbox-card`](components/radio-checkbox-card.md), [`scroll-area`](components/scroll-area.md), [`steps`](components/steps.md), [`tab`](components/tab.md), [`table`](components/table.md), [`text-input`](components/text-input.md), [`toast-alert`](components/toast-alert.md), [`toggle`](components/toggle.md), [`tooltip`](components/tooltip.md).

**App components** are the ones prefixed `nav-`, `home-`, `request-`, `create-form-`, `notification-`, `profile-` and `settings-`. They belong to a specific Portal 2.0 feature; reuse one only for that same purpose.

**Coded components so far** (import these, don't rebuild them): `Button`, `IconButton`, `Checkbox`, `Radio`, `RadioCard`, `Badge`, `Chip`, `Avatar`, `SquareAvatar`, `SidebarIcon`, `Divider`, `Toggle`, `ToggleCard`, `Tooltip`, `TextInput`, `TextArea`, `Menu`, `MenuGroupLabel`, `MenuItem`, `Dropdown`, `Calendar`, `Tabs`, `Tab`, `Breadcrumb`, `Steps`, `StepIndicator`, `Toast`, `Alert`, `Callout`, `Overlay`, `ConfirmationDialog`, `ContentDialog`, `BottomSheet`, `Table`, `TableRow`, `TableHeaderCell`, `TableCell`, `TableSelectCell`, `Loading`, `ScrollArea` from [`components/src/`](../../components/src/).

**Docs with a measured Spec section and reference image so far:** [`sidebar-navigation`](patterns/sidebar-navigation.md), [`request-table`](patterns/request-table.md), [`nav-item-l1`](components/nav-item-l1.md), [`nav-section-label`](components/nav-section-label.md), [`request-list-table-row`](components/request-list-table-row.md), [`request-list-status-badge`](components/request-list-status-badge.md), [`request-list-company-chip`](components/request-list-company-chip.md), [`create-form-priority`](components/create-form-priority.md), [`button`](components/button.md), [`radio-checkbox-card`](components/radio-checkbox-card.md), [`chips-tag-badge`](components/chips-tag-badge.md), [`avatar`](components/avatar.md), [`icon-sidebar`](components/icon-sidebar.md), [`divider`](components/divider.md), [`toggle`](components/toggle.md), [`tooltip`](components/tooltip.md), [`text-input`](components/text-input.md), [`dropdown`](components/dropdown.md), [`menu-item`](components/menu-item.md), [`calendar`](components/calendar.md), [`tab`](components/tab.md), [`breadcrumb`](components/breadcrumb.md), [`steps`](components/steps.md), [`dialog`](components/dialog.md), [`bottom-sheet`](components/bottom-sheet.md), [`toast-alert`](components/toast-alert.md), [`table`](components/table.md), [`loading`](components/loading.md), [`scroll-area`](components/scroll-area.md), [`overlay`](components/overlay.md), plus the layout numbers in [`app-shell`](patterns/app-shell.md). The other docs list tokens and rules but not sizes; expect to ask for missing measurements when building from them.

## 4. Assets

- **Logo:** use the SVG files in [`assets/logo/`](assets/logo/), as described in [`components/logo.md`](components/logo.md). Never redraw the logo.
- **Illustrations:** use the SVG files in [`assets/illustrations/`](assets/illustrations/), as described in [`components/illustration.md`](components/illustration.md).
- **Icons:** Tabler Icons. A name like `icon/circle-dashed` in a doc is the Tabler icon `circle-dashed`.

## 5. Not available yet

- **Dark mode.** The token file is light mode only. Do not build a dark theme.
- **A mobile or tablet app shell.** Only the desktop shell is designed. Mobile navigation components exist, but how the page frame adapts on small screens is undecided — ask before building it.
