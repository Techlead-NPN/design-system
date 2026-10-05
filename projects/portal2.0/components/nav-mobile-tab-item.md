# Navigation / menu (mobile tab item)

A single tab item — icon and label — used inside the [mobile bottom navigation](../patterns/mobile-bottom-navigation.md) bar.

Figma: [`📱 Navigation`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `menu` component set (part of the mobile Header catalog frame).

## Anatomy

| Part | Token(s) |
|---|---|
| Selected pill — fill, radius | `bg/accent-indigo-subtlest`, `border-radii/rounded-infinite` |
| Selected — icon/label color | `text + icon/accent-indigo` |
| Deselected — icon/label color | `text + icon/primary` |
| Label | `Support/Caption` |
| Icon/label gap | `spacing/1` (4px) |

## Variants

`state` = `deselected` / `selected`. Plus `Icon outline` / `Icon solid` (instance-swap props — deselected uses the outline icon, selected swaps to the filled/solid version). 2 built variants.

## Behavior rules

- **Selected state swaps the icon style (outline → solid) as well as color** — both signals move together, not just a color change, giving a stronger active/inactive contrast than color alone.
- **This is the atom-level tab item** — see [Mobile Navigation](../patterns/mobile-bottom-navigation.md) for how 3 of these compose into the actual bottom nav bar with a floating action button.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found beyond the fixed item below.

## Changelog

- Fixed a **duplicate corner-radius token** (`border-radii/rounded-infinite 2`, an accidental second copy of the canonical `border-radii/rounded-infinite` token) on the selected-state pill → rebound to the canonical token.
- Bound previously-unbound `itemSpacing`/padding/`cornerRadius` (4 fixes) via exact-value match against this system's spacing/radius scale.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — this component previously had no doc.
