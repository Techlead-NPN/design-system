# Notification / Noti_content type

The scrollable content area inside the [Notification panel](../patterns/notification-system.md) — either a stack of [Noti_card](notification-card.md) rows, or an empty state.

Figma: [`📱 Home & Notification`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Noti_content type` component set.

## Anatomy

| Part | Token(s) |
|---|---|
| Container | `bg/primary` |
| Card list | stacked [Noti_card](notification-card.md) instances |
| Empty state | icon + message, `text + icon/tertiary`, `Body/Small-regular` |

## Variants

`state` = `Default` (populated list) / `All empty` (no notifications at all) / `unread empty` (has read notifications, but none unread — shown under the "Unread" tab). 3 built variants.

## Behavior rules

- **`All empty` and `unread empty` are distinct states with different messaging**, not the same empty-state graphic reused — `All empty` means the user has never received a notification, `unread empty` means everything has already been read. Match the copy to which is actually true; don't default to one for both cases.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found.

## Changelog

- Bound 21 previously-unbound `itemSpacing`/padding/`cornerRadius` values across all 3 variants.
- No foreign color tokens found directly on this component (foreign styling was in its nested `Noti_card` instances, fixed at that component's own definition — see [notification-card.md](notification-card.md)).
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — this component previously had no doc.
