# Home / Widget title

The shared header row every dashboard widget card uses — an icon, a title, and optional trailing filter/action controls.

Figma: [`📱 Home & Notification`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Widget title` component set.

## Anatomy

| Part | Token(s) |
|---|---|
| Icon container | `bg/accent-*` family (per widget's assigned accent color), `border-radii/rounded-4` |
| Title | `text + icon/secondary`, `Body/Medium-semibold` (desktop) / `Body/Small-semibold` (mobile) |
| Icon/title gap | `spacing/2` (8px) |

## Variants

`Breakpoint` = `Desktop` / `Mobile`. 2 built variants.

## Behavior rules

- **Every `Widget/X` dashboard card embeds a `Widget title` instance** — this is the shared, consistent header pattern across the whole widget system ([Widget/MMB Quota card](home-dashboard-widgets.md), [Widget/Procurement](home-dashboard-widgets.md), etc.). Don't build a one-off header for a new widget; reuse this component.
- **The icon's accent color is assigned per-widget** (e.g. pink for MMB Quota, blue for Procurement, orange for Need Your Approval) — see [Home Dashboard pattern](../patterns/home-dashboard.md) for the per-widget color assignment, since it's not derivable from this atom alone.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found beyond the fixed items below.

## Changelog

- Fixed foreign color tokens (`Text/Primary`/`Text/Secondary`/`Text/Tertiary` → `text + icon/primary`/`secondary`/`tertiary`, same "Twenty library" pattern found throughout this audit) and bound 21 previously-unbound `itemSpacing`/padding/`cornerRadius`/`strokeWeight` values across both variants.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — this component previously had no doc.
