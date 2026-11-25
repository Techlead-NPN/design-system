# Request card

The card-layout alternative to the request table row, for desktop and mobile — shown when [View switch](request-list-view-switch.md) is set to `card`.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `[D] Request Card` and `[M]Requset Card` [sic] components (inside `Request card`).

## Anatomy

| Part | Token(s) |
|---|---|
| Card — fill, border, radius | `bg/primary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8` |
| Title / request ID | `text + icon/primary`, `Body/Small-medium` |
| [Company chip](request-list-company-chip.md) | embedded instance |
| [Status badge](request-list-status-badge.md) | embedded instance |
| Checkbox (bulk-select, desktop) | shared checkbox control |

## Variants

`[D] Request Card` (desktop) `State`: `Default`, `Hover`, `Selected`, `Loading`, `Bulk selected`. `[M]Requset Card` (mobile) `State`: `Default`, `Hover`, `Long Presse` [sic], `Selected`, plus a `Checkbox?` boolean for bulk-select visibility.

## Behavior rules

- **Desktop and mobile are a matched pair covering the same content**, laid out for their respective viewports — desktop uses a persistent checkbox for bulk select, mobile reveals the checkbox via `Checkbox?` (typically triggered by the `Long Presse` gesture state, standard mobile long-press-to-select pattern).
- **`Loading` (desktop-only variant) is the skeleton state** while card data is fetched — no equivalent listed on mobile; confirm whether mobile needs one too.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`[M]Requset Card` is a misspelling** of "Request Card" — flagging for a rename, not renamed without confirmation. Also note this is a different component from the same-named `Requset Card` wrapper documented in [Content sections](request-detail-sections.md) — two unrelated components share the "Requset Card" name across this page, worth disambiguating in Figma (e.g. rename one to reduce confusion when searching the file).
- **`Long Presse` is a misspelling** of "Long Press" — flagging for a rename.
- **Mobile has no `Loading` state** while desktop does — confirm if this is intentional or a gap.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius/`strokeWeight` — part of the 1429-fix `Request card`/`Comment`/`Command Palette` pass.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, pairing the desktop and mobile cards in one doc, and flagged the naming collision with the unrelated `Requset Card` wrapper in [Content sections](request-detail-sections.md) — previously undocumented.
