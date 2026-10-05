# Home Dashboard (pattern)

The home page's customizable widget dashboard — a grid of cards summarizing the user's requests, approvals, and shortcuts, with a "Customize" flow for adding/removing widgets.

Figma: [`📱 Home & Notification`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Dashboard` component set (the full assembled composition — used here as the visual reference for this pattern, not documented as its own atom). Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Composition

Built entirely from already-documented atoms:
- [Widget title](../components/home-widget-title.md) — every card's shared header
- [Widget/MMB Quota card, Widget/Activity Log, Widget/Procurement, Widget/Your Requests, Widget/Need your approval, Widget/Recommend, Widget/Add widget, Widget customization](../components/home-dashboard-widgets.md) — the widget cards themselves and the management panel
- [Status card, Urgent badge, shortcut card, request type card, claim request, widget list](../components/home-widget-status.md), [home-widget-cards.md](../components/home-widget-cards.md) — the row-level content inside each widget
- [Home / Timeframe filter](../components/home-timeframe-filter.md) — the rolling-window filter used by time-scoped widgets
- [Home / Activity log row](../components/home-activity-log-row.md) — individual log entries inside the Activity Log widget
- [Illustration/widget](../components/illustration.md) — used inside `Widget/Add widget`'s empty-slot card, per the design owner's confirmed usage context ("widget customization feature on home page")

## Layout rules

- **Greeting header** ("Hi {name}", last-update timestamp) sits above the widget grid, paired with the "Customize" trigger that opens [Widget customization](../components/home-dashboard-widgets.md).
- **`Quick create`** is the first, non-removable widget — always present regardless of what the user has customized.
- **Widget order is user-controlled** via the customization panel's drag handles (seen on `Added` widget-list rows) — the dashboard reflects whatever order the user has arranged, not a fixed layout.
- **Responsive breakpoints**: `Breakpoint=Desktop` shows a 2-column grid of widgets; `Breakpoint=Mobile` stacks everything into a single column. Both are built as real variants on every widget card and on the `Dashboard` composition itself.

## Widget customization behavior

- Opens as a side panel (seen alongside the dashboard grid in the `Dashboard` composition's Mobile variant, and standalone for Desktop) split into **"Your widgets"** (currently on the dashboard) and **"Add widgets"** (available but not yet added).
- Only [widget list](../components/home-widget-cards.md) rows in the "Your widgets" section that aren't `Quick create` show a remove ("−") control — `Quick create` is permanent.
- Adding a widget moves its row from "Add widgets" to "Your widgets" (`Add=Unadd` → `Add=Added`); the "Add widgets" section shows an `Add=Empty` placeholder once every available widget has been added.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`Widget/Your Requests` has no `Breakpoint` variant** unlike every other widget card — flagged in [home-dashboard-widgets.md](../components/home-dashboard-widgets.md), may indicate it hasn't had its mobile-adaptation pass yet.
- **No confirmed maximum widget count or grid-column rule** beyond what's visible in the `Dashboard` reference composition — if a user adds many widgets, the exact wrapping/reflow behavior isn't specified anywhere in Figma. Flagging as an open question rather than inventing a rule.

## Changelog

- **Full token audit (2026-08-19):** all widget atoms and cards fixed as part of this pattern's dependency chain — see each linked atom doc's own changelog for specifics. Over 700 total token fixes across the whole Home & Notification page (this pattern + the [Notification system](notification-system.md)).
- Verified visually before/after using the `Dashboard` composition as the full-page reference — no rendering changes, confirming none of the ~700 token rebinds altered the actual layout.
- Documented composition, layout rules, and the widget-customization flow for the first time — this pattern previously had no doc. Written per the user's explicit split request: kept separate from the notification system, which is a different feature that happens to share this Figma page.
