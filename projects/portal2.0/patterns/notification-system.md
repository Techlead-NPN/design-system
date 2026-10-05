# Notification System (pattern)

The in-app notification panel — a dropdown/drawer listing recent events (approvals, comments, rejections) with read/unread tracking.

Figma: [`📱 Home & Notification`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Notification` component set. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Composition

- [Notification icons](../components/notification-icons.md) — the 4 type indicators (Comment/Mentioned, Reject, Approve, Need approval)
- [Noti_card](../components/notification-card.md) — the individual list item
- [Noti_content type](../components/notification-content-type.md) — the scrollable content area (populated list or empty states)
- `Notification` itself (this pattern's root) — the panel chrome: header, `All`/`Unread` tabs, "Mark all as read" action, and date-grouped sections (`Today`/`Yesterday`/`Older`)

## Layout rules

- **Notifications are grouped by relative date** (`Today`, `Yesterday`, `Older`) with a section label above each group — not a flat chronological list.
- **`All` / `Unread` tabs filter the same underlying list**, they aren't separate data sources — switching tabs should hide read notifications, not change what's fetched.
- **`Breakpoint=Desktop` (400px) / `Breakpoint=Mobile` (390px, full-width)** — on mobile this likely renders as a full-screen view rather than a dropdown, though the exact presentation (dropdown vs. screen vs. sheet) isn't specified in Figma beyond the two width variants.

## Behavior rules

- **"Mark all as read" clears the unread indicator dot on every card**, but doesn't remove them from the list or change the `Today`/`Yesterday`/`Older` grouping.
- **Each notification's icon type must match its actual event** (see [Notification icons](../components/notification-icons.md)) — this is the primary at-a-glance signal in a list that's otherwise fairly text-dense.
- **Clicking a notification card navigates to the linked request** (see [Noti_card](../components/notification-card.md)'s `navigate state`) — the request ID isn't just a text mention, it's the click target for the whole row.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Mobile presentation (dropdown vs. full-screen vs. sheet) isn't specified** — only a mobile-width variant exists, not a documented interaction pattern for how it's triggered/dismissed on small screens.

## Changelog

- **Fixed a foreign font-family contamination** on the panel's own "Notifications" header — bound to a `paragraph small/medium` style using **Poppins** (not Inter), rebound to `Body/Small-semibold` (the closest real match by size/weight). Same underlying issue as [Noti_card](../components/notification-card.md)'s description text — this appears to be a page-wide contamination source (a "Twenty"-style library that used Poppins as its default UI font), not an isolated typo.
- Bound 73 previously-unbound `itemSpacing`/padding/`cornerRadius` values on the panel root, plus all fixes documented in the 3 linked atom docs above (their own foreign-token and geometry fixes).
- Verified visually before/after — no rendering changes.
- Documented composition, layout rules, and behavior for the first time — this pattern previously had no doc. Written per the user's explicit split request: kept separate from the [Home Dashboard](home-dashboard.md) pattern, since notifications are a distinct feature that happens to share this Figma page.
