# Profile / Notification channels

The notification-preferences toggle list on the Profile settings page: In-app, Email, and Microsoft Teams notifications.

Figma: [`Setting - Profile`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Notification channels` component (inside `Profile`).

## Anatomy

| Part | Token(s) |
|---|---|
| Section title + description | `text + icon/primary`, `Body/Medium-semibold` / `text + icon/tertiary`, `Body/Small-regular` |
| Channel row — icon, label, description | `text + icon/primary`, `Body/Small-medium` (label) / `text + icon/tertiary` (description) |
| Toggle switch | see Known gaps — locally rebuilt, not the shared [Toggle](toggle.md) component |

## Variants

Single fixed component — 3 channel rows (In-app, Email, Microsoft Teams), each independently toggleable.

## Behavior rules

- **Each channel toggles independently** — no dependency between In-app/Email/Microsoft Teams shown in Figma.
- **All 3 shown enabled (blue/on) in the reference** — default-on, per the screenshot.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **The toggle switches here are a locally-rebuilt plain `FRAME`, not instances of the shared, already-documented [Toggle](toggle.md) component.** Confirmed via `getMainComponentAsync()` returning null (not an `INSTANCE` at all). This means any future update to the canonical Toggle component (color, size, animation) won't propagate here — a genuine drift risk. Flagging as a candidate to relink to the real Toggle component rather than fixing silently, since swapping a hand-built frame for a component instance changes the node structure non-trivially and is worth confirming with the design owner first.
- **The toggle's rounded-pill corner radii (80px, 60px on nested "Toggle"/"switch" frames) don't match any Foundation radius primitive** — expected, since a toggle pill's radius is typically `height / 2`, not a fixed step on the primitive scale; left unbound and flagged rather than force-matched to `rounded-infinite`.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — 61 fixes. Part of the combined 655-fix pass across `Setting - Profile`/`Setting - Activity log`. One `cornerRadius=9` (no matching primitive, likely a wrapper artifact) plus the two pill-radius values above left flagged.
- Verified visually before/after — no rendering changes.
- Documented anatomy and behavior rules for the first time, and surfaced the locally-rebuilt-Toggle drift risk — previously undocumented.
