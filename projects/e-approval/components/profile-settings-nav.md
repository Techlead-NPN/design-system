# Profile / Settings nav

The left-rail sub-navigation shown inside the Settings area: a Back affordance plus Settings (Profile, Notifications) and Requests (Hidden) sections.

Figma: [`Setting - Profile`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Sidebar Settings` component (inside `Atom_Profile`).

## Anatomy

| Part | Token(s) |
|---|---|
| Back row | `icon/chevron-left`, `text + icon/secondary`, `Body/Small-medium` |
| Section label (Settings / Requests) | `Text/Light`-mapped `text + icon/tertiary` (see Known gaps), `Label/default` text style (left unbound, see Known gaps) |
| Nav row (Profile / Notifications / Hidden) | icon, `text + icon/primary`, `Body/Small-regular` |

## Variants

Single fixed component — no variants; a static list of the Settings area's sections.

## Behavior rules

- **`Back` exits the Settings area entirely**, distinct from [Workspace menu](nav-workspace-menu.md)'s own `Type=Settings` "Exit Settings" back-navigation row — this component is the sidebar's own internal nav, not the top-bar breadcrumb-style exit.
- **`Settings` groups `Profile` (this page) and `Notifications`** (not yet audited as a distinct page); **`Requests` groups `Hidden`** (hidden/archived requests, not yet audited).

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Section-label color bound to a foreign token named `Text/Light` (`#b3b3b3`)**, which has no exact equivalent in this system — mapped to the closest available token, `text + icon/tertiary` (`#a3a3a3`), a very close but not pixel-identical value. Flagging the small value discrepancy rather than treating it as a confirmed match.
- **Section-label text style `Label/default` (11px SemiBold) has no equivalent local text style** — same known gap as [Workspace menu](nav-workspace-menu.md)'s identical finding on the Navigation page; left unbound, only the color was fixed.
- **The frame has significant unused empty space below its content** (content occupies roughly the top third of the frame's declared height) — likely a leftover oversized canvas rather than intentional, though less severe than the confirmed [Account switcher](profile-account-switcher.md) height bug; flagging rather than resizing without being certain it's not deliberate room for future sections.

## Changelog

- Fixed foreign color token (`Text/Light` → `text + icon/tertiary`, flagged value gap) and bound previously-unbound spacing/radius — part of the combined 655-fix pass across `Setting - Profile`/`Setting - Activity log`. `Label/default` text style left unbound per established precedent.
- Verified visually before/after — no rendering changes.
- Documented anatomy and behavior rules for the first time — previously undocumented.
