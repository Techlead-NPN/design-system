# Mobile Bottom Navigation (pattern)

The primary mobile navigation — a floating pill-shaped tab bar (Home / Requests / Log) plus a floating "+" action button, sitting above the device's home indicator. The mobile equivalent of [Sidebar Navigation](sidebar-navigation.md).

Figma: [`📱 Navigation`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `navbar menu` and `Sticky_bar menu` components. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Composition

- [`menu`](../components/nav-mobile-tab-item.md) — the atom-level tab item (icon + label, selected/deselected), 3 instances make up the tab row (Home / Requests / Log)
- `navbar menu` — the component set that assembles 3 `menu` instances into the pill-shaped bar + floating "+" CTA, one built variant per active tab (`state=Home`/`Requests`/`Log`)
- `Sticky_bar menu` — wraps a `navbar menu` instance with the device's `Home Indicator` on top, representing how the bar actually sits at the bottom of a real screen

## Layout rules

- **Floating pill bar**: `bg/primary` fill, fully rounded (`border-radii/rounded-infinite`), sitting with margin above the device edge rather than spanning edge-to-edge — this is a floating bar, not a fixed-to-edge tab bar.
- **Floating "+" action button** sits to the right of the pill, separate from the 3 tabs — it's a persistent create-action shortcut, not a 4th tab.
- **`Home Indicator`** (the black pill at the very bottom) is genuine OS chrome (iOS's home indicator) — exempt from this system's color tokens per [`DESIGN.md`](../DESIGN.md)'s OS-chrome rule, correctly left on its own system reference.

## States

- **Active tab** = `state=Home` / `Requests` / `Log` on `navbar menu` — exactly one tab is selected at a time, driven by the current screen.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **The floating "+" button's drop shadow is bound to raw effect-primitive variables** (`base/black-A10`, `spread/s`, `blur/5xl`, `offset-x/md`) rather than one of this system's named effect styles (`shadow-sm`/`md`/`lg`/`xl`), which is the intended architecture per [`DESIGN.md`](../DESIGN.md) §4. No exact match exists among the named styles either — the button's shadow is an ambient, zero-offset glow (`offset (0,0)`, blur 24 + blur 7.5), while every named `shadow-*` style is a directional shadow with a positive Y-offset. Flagging rather than force-fitting a visually different style or inventing a new one without design-owner confirmation.

## Changelog

- Fixed a **duplicate corner-radius token** (`border-radii/rounded-infinite 2` → canonical `border-radii/rounded-infinite`) across `menu` and `navbar menu`.
- Bound previously-unbound `itemSpacing`/padding/`cornerRadius`/`strokeWeight` across both components (34 total fixes) via exact-value match against the spacing/radius primitive scale.
- No other foreign color tokens found — `navbar menu`/`Sticky_bar menu` were otherwise already using real semantic tokens (a cleaner starting point than most components audited so far).
- Verified visually before/after on both components — no rendering changes.
- **Related, not separately documented:** `Header_mobile` and `Footer_mobile` (also on this page) are real-usage composites that pair [`navigation bar`](../components/nav-mobile-top-bar.md) with page-specific content — a home-screen greeting + envelope illustration, and a Reject/Approve action pair, respectively. That bespoke content belongs to the future Home & Notification and Request detail page audits, not Navigation — same "document the reusable atom, treat the bespoke wrapper as an example" precedent as [Calendar](../components/calendar.md)'s Example section. Their token bindings were still fixed as part of this audit's full-rigor pass (duplicate radius token, unbound geometry) since they live on this page.
- Initial documentation — this pattern previously had no doc.
