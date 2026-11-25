# Navigation / Workspace menu

The workspace-switcher control at the top of [Sidebar Navigation](../patterns/sidebar-navigation.md) — shows the current workspace/app name and opens a switcher on click; also used for the "Exit Settings" back-navigation row.

Figma: [`📱 Navigation`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Workspace menu` component set (part of the Header catalog frame).

## Anatomy

| Part | Token(s) |
|---|---|
| Row — radius, padding, gap | `border-radii/rounded-4`, `spacing/1` (4px) left/right padding, `spacing/2` (8px) top/bottom padding, `spacing/2` (8px) gap |
| Row — hover fill | `bg/primary-hover` |
| Workspace name | `text + icon/primary` (App type) / `text + icon/secondary` ("Exit Settings" label, Settings type), `Body/Small-medium` |
| Logo/icon | local `logo TL` instance |
| Loading shimmer | local `Loading/light` paint style (not a variable binding — same precedent as [Loading](loading.md)'s gradient fills) |

## Variants

`State` = `Default` / `Hover` / `Loading`. `Type` = `App` (workspace name + logo) / `Settings` (an "Exit Settings" back-navigation row, no logo). 6 total, all built.

## Behavior rules

- **`Type=App` is the default resting state**; `Type=Settings` only appears when the sidebar is showing a settings sub-section, functioning as a back-navigation affordance rather than a switcher trigger in that context.
- **`Loading` shows a shimmer placeholder** in place of the workspace name while workspace data is being fetched — same shimmer treatment as other async-loading states in this system ([Section Label](nav-section-label.md), [Navigation item L1](nav-item-l1.md)).

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found beyond the fixed items below.

## Changelog

- Fixed two foreign color tokens (`Text/Primary` → `text + icon/primary`, `Text/Secondary` → `text + icon/secondary`) on the "Workspace name" text layer across variants, and one foreign hover-overlay token (`Transparent/Light`, a 4%-black overlay) → `bg/primary-hover` on the two `Hover` variants — same "Twenty library" contamination pattern found throughout the System Component audit.
- Bound previously-unbound `itemSpacing` (8px → `spacing/2`), padding (4px/8px → `spacing/1`/`spacing/2`), and `cornerRadius` (4px → `border-radii/rounded-4`) across all 6 variants, plus the nested Loading-shimmer sub-frame (padding top/bottom = 3px has no matching primitive on the 2px grid — left unbound, flagged).
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — this component previously had no doc.
