# Profile / Mobile menu

The fully-assembled mobile account menu — combines the [Identity card](profile-identity-card.md), [Account switcher](profile-account-switcher.md), [Settings nav](profile-settings-nav.md), and sign-out actions into a single sheet, rather than separate desktop panels.

Figma: [`Setting - Profile`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `profile_mobile` component (inside `Atom_Profile`).

## Anatomy

| Part | Token(s) |
|---|---|
| Identity summary | same as [Identity card](profile-identity-card.md) |
| "Switch account" section | 2 account rows, same style as [Account switcher](profile-account-switcher.md)'s `Account list` |
| "Settings" section | `Profile` / `Notifications` rows with trailing chevrons |
| "Requests" section | `Hidden` row |
| "Account" section | `Add account` / `Log out` rows |

## Variants

Single fixed component — represents the whole mobile menu as one assembled sheet, not a set of independently-composable atoms like the desktop equivalent.

## Behavior rules

- **On mobile, the desktop's separate [Identity card](profile-identity-card.md) / [Account switcher](profile-account-switcher.md) / [Settings nav](profile-settings-nav.md) collapse into this single scrollable sheet** — confirms the general desktop/mobile pairing pattern seen throughout the app (e.g. [Content sections](request-detail-sections.md)), but here it's a many-to-one collapse rather than a 1:1 component pair.
- **Each row in the Settings/Requests sections has a trailing chevron**, implying tap-to-drill-in navigation (e.g. tapping `Profile` navigates to this same Profile settings page) — consistent with [Settings nav](profile-settings-nav.md)'s desktop equivalent.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found beyond what's already flagged on the individual desktop atoms this component's sections mirror.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — 77 fixes, part of the combined 655-fix pass across `Setting - Profile`/`Setting - Activity log`. One `itemSpacing=18` value (no matching primitive) left flagged.
- Verified visually before/after — no rendering changes.
- Documented anatomy and behavior rules for the first time, clarifying its relationship to the separate desktop atoms — previously undocumented.
