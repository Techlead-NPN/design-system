# Profile Settings (pattern)

The account/profile settings area: an account switcher accessible from anywhere via [Workspace menu](../components/nav-workspace-menu.md), and the Profile settings page itself (photo, personal details, notification preferences).

Figma: [`Setting - Profile`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Atom_Profile` and `Profile` frames — used here as the visual composition reference. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Composition

Built from already-documented atoms:
- [Identity card](../components/profile-identity-card.md), [Account switcher](../components/profile-account-switcher.md) — the dropdown opened from [Workspace menu](../components/nav-workspace-menu.md)
- [Settings nav](../components/profile-settings-nav.md) — the left-rail sub-navigation once inside Settings
- [Mobile menu](../components/profile-mobile-menu.md) — the mobile equivalent, collapsing the above into one sheet
- [Photo zoom](../components/profile-photo-zoom.md), [Details form](../components/profile-details-form.md), [Notification channels](../components/profile-notification-channels.md) — the Profile settings page's own content

## Layout rules

- **Desktop splits account-switching and settings navigation into separate, independently-composable atoms** ([Identity card](../components/profile-identity-card.md) + [Account switcher](../components/profile-account-switcher.md) as a dropdown, [Settings nav](../components/profile-settings-nav.md) as a persistent sidebar) — **mobile collapses all of it into one scrollable sheet** ([Mobile menu](../components/profile-mobile-menu.md)). This is a many-to-one desktop/mobile relationship, not the usual 1:1 atom pairing seen elsewhere in the file (e.g. [Content sections](../components/request-detail-sections.md)).
- **The Profile settings page body stacks: cover banner + avatar → personal-info field grid → notification channels** — [Details form](../components/profile-details-form.md) covers the first two, [Notification channels](../components/profile-notification-channels.md) is a separate block below.

## Behavior rules

- **[Workspace menu](../components/nav-workspace-menu.md) is the entry point** — clicking it opens the [Account switcher](../components/profile-account-switcher.md) panel, which itself contains a shortcut into [Settings nav](../components/profile-settings-nav.md)'s Profile section.
- **[Photo zoom](../components/profile-photo-zoom.md) is used inline on the Profile page**, not a separate modal — dragging its slider recrops the avatar shown in [Details form](../components/profile-details-form.md) in real time.
- **[Settings nav](../components/profile-settings-nav.md)'s `Requests > Hidden` and `Settings > Notifications` sections aren't yet audited as their own pages** — only `Profile` has a built, documented page so far.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **A real structural bug was found and fixed in [Account switcher](../components/profile-account-switcher.md)**: its row atom had a broken hardcoded 7,895px height, ballooning the whole panel — see that doc's Known Gaps and Changelog for the full story.
- **[Notification channels](../components/profile-notification-channels.md) uses a locally-rebuilt toggle switch instead of the shared [Toggle](../components/toggle.md) component** — a drift risk, flagged not silently relinked.
- **A recurring `text + icon/tertiary` name-collision (bound to `#737373` instead of this system's `#a3a3a3`) was confirmed again on this page** ([Identity card](../components/profile-identity-card.md)), now seen on 3 separate pages file-wide — worth a dedicated investigation into which second collection is responsible, since a per-page name-based fix can't resolve it.
- See each linked atom doc's own Known Gaps for component-level issues (the `Text/Light` value-gap on [Settings nav](../components/profile-settings-nav.md), the negative-spacing overlap technique on [Details form](../components/profile-details-form.md), etc.) — not repeated here.

## Changelog

- **Full token audit (2026-08-20):** 655 total fixes across all 10 components on the `Setting - Profile` page (combined with `Setting - Activity log`, audited in the same pass) — see each linked atom doc's own changelog for specifics. Also fixed one genuine structural bug (not a token issue) — see [Account switcher](../components/profile-account-switcher.md).
- Verified visually before/after across all components — no rendering changes except the intentional height-bug fix, which was confirmed against the `Atom_Profile` reference composition.
- Documented composition, layout rules, and the desktop/mobile collapse relationship for the first time — this pattern previously had no doc.
