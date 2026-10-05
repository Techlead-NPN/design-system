# Notification / Notification icons

The 4 type-indicator icons shown on each [notification card](notification-card.md) — communicates at a glance what kind of event the notification is about.

Figma: [`📱 Home & Notification`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Notification icons` component set.

## Anatomy

16×16px icon, color-coded by type (fixed per-type colors, part of the icon artwork — not independently token-bound, same treatment as other icon-library instances throughout this system).

## Variants

`Type` = `Comment / Mentioned` / `Reject` / `Approve` / `Need approval`. 4 built variants.

## Behavior rules

- **The icon type must match the notification's actual event** — this is the primary visual signal distinguishing notification kinds in a scan-heavy list (see [Notification](../patterns/notification-system.md)), don't reuse a mismatched type for convenience.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found.

## Changelog

- Bound 25 previously-unbound `itemSpacing`/padding/`cornerRadius` values across all 4 variants (the component-set's own organizational padding, not the icon artwork itself).
- No foreign color tokens found on this component directly.
- Verified visually before/after — no rendering changes.
- Documented for the first time — this component previously had no doc.
