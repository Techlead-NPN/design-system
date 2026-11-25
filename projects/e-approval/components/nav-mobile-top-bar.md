# Navigation / navigation bar (mobile top bar)

The mobile equivalent of [Header Navigation](nav-header-navigation.md) — a compact top bar with 3 layout modes: default back/title, profile/workspace header, and an active search field.

Figma: [`📱 Navigation`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `navigation bar` component set (part of the mobile Header catalog frame).

## Anatomy

| Part | Token(s) |
|---|---|
| Bar — fill | `bg/primary` |
| Bar — padding | `spacing/2` (8px) top/bottom |
| Label | `text + icon/secondary` / `text + icon/primary`, `Body/Small-medium` |
| Right-icon slot gap/padding | `spacing/4` (16px) |
| Border (Search variant's input) | `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-6` |
| Workspace label on colored surface (Profile variant) | `text + icon/primary-inverse` (fixed — was a raw white color, see Changelog) |

## Variants

`type` = `Default` (back chevron + centered title + 2 placeholder icon slots) / `Profile` (logo + workspace name + 2 icon slots + status badge) / `Search` (search input + Cancel action). Plus booleans `logo far right?`, `logo second from right?` (both default on). 3 built variants.

## Behavior rules

- **`Default` is for drilled-in mobile screens** (has a back chevron), **`Profile` is the app-level home/workspace header** (no back chevron, shows the workspace identity + status), **`Search` replaces the whole bar with an active search field** — these are mutually exclusive top-bar modes for a single screen, not stackable.
- **The 2 dotted-outline icon slots seen in `Default`/`Profile`** in the raw component are placeholder/unbuilt icon instances — real screens should swap in actual icon buttons (e.g. search, notification) per context; they don't render as empty circles in practice.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Root gap (`35px`) between the left and right groups has no matching spacing primitive** — left unbound, same gap found on [Header Navigation](nav-header-navigation.md).

## Changelog

- Fixed a **bare-numbered-name token bug**: two variables literally named `"2"` and `"4"` (not `spacing/2`/`spacing/4`) were bound in place of the real tokens, same value (8px/16px) but wrong source — same "Twenty library bare-number" pattern previously found on [Divider](divider.md)'s spacing. Rebound to `spacing/2`/`spacing/4`.
- Fixed a foreign raw-white color (`Color`, `#ffffff`, an unnamed/generic token) on the `Profile` variant's workspace label → `text + icon/primary-inverse`.
- Fixed a **duplicate corner-radius token** (`border-radii/rounded-infinite 2`) → canonical `border-radii/rounded-infinite`.
- Bound 44 previously-unbound `itemSpacing`/padding/`cornerRadius`/`strokeWeight` values via exact-value match, across all 3 variants.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — this component previously had no doc.
