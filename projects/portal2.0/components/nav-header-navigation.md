# Navigation / Header Navigation

The desktop top header bar — back button, page title or breadcrumb trail on the left; primary CTA, notification/comment icon buttons, and a status badge on the right.

Figma: [`📱 Navigation`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Header Navigation` component set (part of the Header catalog frame, alongside [Workspace menu](nav-workspace-menu.md) and [Shortcut container](nav-shortcut-container.md)).

## Anatomy

| Part | Token(s) |
|---|---|
| Left group gap | `spacing/1` (4px) |
| Page name / breadcrumb arrow | `text + icon/primary`, `Body/Medium-semibold` (page name) |
| Breadcrumb item (editable) | `border-radii/rounded-4` |
| Actions group gap | `spacing/2` (8px) |
| Icon action buttons | embedded `Action Button 2`/`Action Button 4` instances (bell, comment) |
| Primary CTA | embedded `Button/Button` instance (see [Button](button.md)) |
| Avatar | embedded `Avatar` instance, `border-radii/rounded-infinite` (see [Avatar](avatar.md)) |
| Status badge ("ON") | embedded `Badge` instance, `border-radii/rounded-infinite` |
| Loading shimmer | remote skeleton-library instance — out of scope, same as [Navigation item L1](nav-item-l1.md)'s loading state |

## Variants

`Type` = `Index` (page title only) / `Breadcrumb` (multi-level path, e.g. "Level / Level") / `Full Loading` (shimmer placeholder for the whole bar). `Breakpoint` = `Desktop` / `Mobile`. Plus booleans `Module icon?`, `Partition?` (default on), `CTA1?`/`CTA2?`/`CTA3?`. 4 built combinations: `Index×Desktop`, `Breadcrumb×Desktop`, `Full Loading×Desktop`, `Index×Mobile`.

## Behavior rules

- **`Index` vs `Breadcrumb` is a page-depth decision**: `Index` for a flat/top-level page (just a title), `Breadcrumb` when the user has drilled into a nested view and needs a path back up — same pattern as [Breadcrumb](breadcrumb.md) elsewhere in the system.
- **`Full Loading` replaces the entire bar with a shimmer**, not just individual pieces — used while the page context (title, actions) is still being resolved.
- **Only one `Breakpoint=Mobile` variant is built (`Index`)** — no mobile `Breadcrumb` or `Full Loading` variant exists yet. Flagged, not built (a scope gap for the design owner to confirm, not a guess I should make).

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **No `Breakpoint=Mobile` variant for `Breadcrumb` or `Full Loading`** — only `Index` has a mobile counterpart.
- **Left/right group gap (`35px`) has no matching spacing primitive** on this system's 4px-based scale — left unbound rather than guessing which primitive to round to.
- **`⏳Loading...` shimmer is a remote (external library) component** — its internals (including a `3px` padding value) are out of scope to rebind, same precedent as every other remote-component finding in this audit.

## Changelog

- Fixed a foreign color token (`Text/Primary` → `text + icon/primary`, 4 instances across "Page name" and "Breadcrumb Arrow" text/icon layers) — same "Twenty library" pattern found throughout this audit.
- Fixed a **duplicate corner-radius token**: 6 instances (`Avatar`, `Badge` across 3 variants) were bound to `border-radii/rounded-infinite 2` — an accidental second copy of the canonical `border-radii/rounded-infinite` token, same value (`9999`) but a different variable ID. Rebound to the canonical token. Worth checking for elsewhere in the file — this is a token-hygiene issue distinct from the usual foreign-library contamination.
- Bound 229 previously-unbound `itemSpacing`/padding/`cornerRadius`/`strokeWeight` values across all 4 variants via an exact-value match against this system's spacing/radius primitive scale — covering the root bar, breadcrumb sub-frames, action-button instances, and more. A handful of off-grid values (`35px` gap, `2px`/`3px` on a remote loading component) had no matching primitive and were left unbound, flagged above.
- Verified visually before/after on all 4 variants — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — this component previously had no doc.
