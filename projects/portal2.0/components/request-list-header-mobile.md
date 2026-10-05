# Request list / Mobile header

The mobile top bar for the request list: title, notification/profile icons, tab strip (All / Need Your Approval / Under review), and quick-filter chip row.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `header Requests` component (inside `Header mobile`). Built from [Filter chip](request-list-filter-chip.md), [Filter panel](request-list-filter-panel.md)'s `Chips type`, and shared nav icon components.

## Anatomy

| Part | Token(s) |
|---|---|
| Bar — fill | `bg/primary` |
| Page title | `text + icon/primary`, `Body/Large-semibold` (or equivalent heading style) |
| Tab strip (All / Need Your Approval / Under review) | active: `text + icon/brand` + underline; inactive: `text + icon/tertiary` |
| Notification/profile icons | shared icon-button styling |
| Quick-filter chip row | embedded [Filter chip](request-list-filter-chip.md) instances |
| Search bar | embedded search-input styling |

## Variants

Single fixed assembled component — no variant property; represents the mobile Request list screen's header as a complete reference (confirmed via screenshot: status bar, "Requests" title, search/notification/avatar icons, tab strip with a "2" badge on "Need Your Approval," and a horizontally-scrolling chip row).

## Behavior rules

- **The tab strip filters the list by approval-relevance** (All / requests needing the current user's approval / requests under review) — distinct from the [Filter panel](request-list-filter-panel.md)'s more granular Company/Status/Priority/Date filtering, which layers on top.
- **The chip row provides one-tap request-type shortcuts**, complementing rather than replacing the full filter panel.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found — this is a fully assembled reference screen rather than a reusable atom, so no variant/naming issues apply the way they do to individual components.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — part of the 1307-fix `Filter`/`Info Content`/`Header mobile` pass.
- Verified visually before/after — no rendering changes.
- Documented anatomy and behavior rules for the first time, using the assembled screen as its own reference — previously undocumented.
