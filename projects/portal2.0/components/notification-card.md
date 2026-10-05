# Notification / Noti_card

A single notification list item — [type icon](notification-icons.md), actor name, action text, linked request ID, description, timestamp, and an unread indicator dot.

Figma: [`📱 Home & Notification`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Noti_card` component set.

## Anatomy

| Part | Token(s) |
|---|---|
| Row — fill | `bg/primary` (read) / `bg/secondary-hover` (unread or hover — see Behavior rules) |
| Type icon | embedded [Notification icons](notification-icons.md) instance |
| Actor + action text | `text + icon/primary` (actor, bold via medium weight) / `text + icon/tertiary` (action verb), `Body/Small-medium` / `Body/Small-regular` |
| Request ID | `text + icon/primary`, `Body/Small-medium` |
| Description | `text + icon/tertiary`, `Body/Mini-regular` (fixed — was bound to a foreign Poppins-based `paragraph mini/regular` style, see Changelog) |
| Timestamp | `text + icon/tertiary`, `Support/Caption` |
| Unread dot | `bg/accent-indigo` |

## Variants

`read state` = `unread` / `read`. `navigate state` = `default` / `hover`. 4 built combinations.

## Behavior rules

- **`read state=unread` shows the indigo dot and a tinted background; `read state=read` shows neither** — this is the sole visual signal for read/unread status, don't add a second one (e.g. bold text) without confirming with the design owner first.
- **`navigate state=hover` is for the whole row being a click target** (navigates to the linked request) — the row, not just the request-ID text, is the interactive surface.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found beyond the fixed item below.

## Changelog

- **Fixed a foreign font/text-style contamination**: 4 "title request" text layers were bound to a `paragraph mini/regular` style using **Poppins**, not Inter — a different font family entirely, not just a wrong style name within the same family (the first time this specific issue — a whole foreign font family, not just foreign color/spacing tokens — has shown up in this audit). Rebound to `Body/Mini-regular` (12px Regular Inter), the closest real match by size and weight.
- Fixed a foreign color token (`Text/Tertiary` → `text + icon/tertiary`) and bound 105 previously-unbound `itemSpacing`/padding/`cornerRadius` values, plus a `paddingRight=32px` value on 2 variants that a first fix pass missed (the lookup table used didn't include the `spacing/8` primitive at first) — caught via a follow-up check, corrected to `spacing/8`.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — this component previously had no doc.
