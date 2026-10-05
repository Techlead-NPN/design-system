# Navigation / Navigation item L1

A top-level sidebar row — icon, label, and optional trailing count badge or "Soon" tag. The most-repeated atom in [Sidebar Navigation](../patterns/sidebar-navigation.md).

Figma: [`📱 Navigation`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Navigation/Navigation item L1` component set (part of the Sidebar Menu Item catalog frame).

## Anatomy

| Part | Token(s) |
|---|---|
| Row — radius, padding, gap | `border-radii/rounded-4`, `spacing/1` (4px) padding all sides, `spacing/1` gap |
| Icon/label gap | `spacing/2` (8px) |
| Label | `Body/Small-medium`, color varies by state (see Behavior rules) |
| Label wrapper padding | `spacing/1` (4px) right only |
| Icon | embedded `Sidebar icons` instance — per-item accent color (Peach/Sky/Ocean/Stone seen), not yet standardized (see [Sidebar Navigation](../patterns/sidebar-navigation.md)'s Known gaps) |
| Count badge | embedded `Badge` instance (`State=Info`) — not yet separately documented |
| Notification dot | embedded `Badge noti` instance — not yet separately documented |
| Trailing icon button | embedded `IconButton/Icon Button` instance (Ghost style) — already token-clean, same component used in [Callout](toast-alert.md) |
| Loading shimmer | remote skeleton-library instance (`Phase=1, LightMode?=True`) — out of scope, see Known gaps |

## Variants

`State` = `Default` / `Hover` / `Selected` / `Loading...`. Plus text `Menu name`, and booleans `Text`, `Show Notification`, `Label?`, `More`. 4 built variants.

## Behavior rules

- **`Selected` marks the current page/section** — filled indigo-subtle background with indigo icon/label color, same selected treatment convention as [Menu item](menu-item.md).
- **`Hover` and `Selected` are mutually exclusive in practice** — hovering a selected row shouldn't visually compound the two states; there's no combined `Hover+Selected` variant, matching this system's usual convention of not building every state cross-product when one is clearly dominant.
- **The trailing slot is contextual**: a count `Badge` (e.g. "13"), a notification dot (`Badge noti`), or an `IconButton` (e.g. a row-level action) — only one is expected at a time, driven by which boolean prop (`Show Notification`, `More`) is on.
- **`Loading...` renders a full-row shimmer** in place of icon+label, via a remote skeleton component — used while nav data is being fetched.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Per-item icon accent color** (Peach/Sky/Ocean/Stone seen in real usage) doesn't have a documented rule for which color applies to which item — flagged in [Sidebar Navigation](../patterns/sidebar-navigation.md), needs a decision from the design owner.
- **`Sidebar icons`, `Badge`, and `Badge noti`** are embedded sub-atoms not yet audited or documented on their own — out of the scope agreed for this pass (which covered the 7 sidebar-specific atoms). Their token bindings were spot-fixed where trivial (see Changelog) but not fully audited.
- **The `Loading...` shimmer is a remote (external library) component** — its internals are out of scope to rebind, same precedent as [Table](table.md)'s `IconButton/Floating Icon Button`.

## Changelog

- No foreign color tokens found on this component's own layers (only the legitimate `Loading/light` paint style) — the row structure itself was already using real semantic tokens.
- Bound previously-unbound `itemSpacing`/`cornerRadius` on the row (4px → `spacing/1` / `border-radii/rounded-4`), the icon/label gap (8px → `spacing/2`), and the label wrapper's right padding (4px → `spacing/1`) across all 4 variants, plus the `Loading...` variant's own padding.
- **Correction during this pass:** an initial fix mistakenly bound the label wrapper's left/top/bottom padding (all `0`) to `spacing/1` (`4px`) along with the right side — caught and corrected back to `spacing/0` for those three sides before it shipped, since only the right padding was actually `4px` in the original design.
- Fixed a real instance-override gap on the embedded `Badge` (count pill): `strokeWeight` was unbound despite the Badge component itself being properly token-bound — same "instance override resets the binding" pattern seen on [Toast & Alert message](toast-alert.md)'s embedded Button/Chips instances. Bound to `border-width/xs`.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — this component previously had no doc.
