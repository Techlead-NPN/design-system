# Home / Activity log row

The individual log-entry atom (avatar, actor name, action, request link, timestamp) and its timeline connector, used inside [Widget/Activity Log](home-dashboard-widgets.md).

Figma: [`📱 Home & Notification`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Activity log` component and `Component 1` (timeline indicator) component set.

## Anatomy

| Part | Token(s) |
|---|---|
| Avatar | embedded `Avatar` instance (see [Avatar](avatar.md)) |
| Actor name | `text + icon/primary`, `Body/Small-medium` |
| Action text | `text + icon/tertiary`, `Body/Small-regular` |
| Request ID (linked) | `text + icon/primary`, `Body/Small-medium` (bold-weight emphasis via the medium style, not a separate link color) |
| Timestamp | `text + icon/tertiary`, `Body/Mini-regular` |
| Timeline connector | `Component 1` instance — a vertical line + dot per entry, indicating chronological sequence |

## Variants

`Activity log` (the row) is a single fixed component, no variants — content varies by text override, not variant. `Component 1` (timeline indicator) has 2 variants: `Log timeline indicator=Frame 1400002001` / `Frame 1400002002` — two connector-line states (likely "has more entries below" vs. "last entry"), though the variant names themselves are unrenamed default Figma frame names rather than descriptive (e.g. `Continues` / `Last`).

## Behavior rules

- **Each row pairs one `Activity log` instance with one timeline-indicator instance** — the indicator is what visually threads the rows into a connected timeline; don't use the row atom without it in a real timeline context.
- **The action verb (commented on / approved / rejected) drives no color change on this atom** — unlike [Notification](../patterns/notification-system.md)'s icon-coded types, activity log entries are visually uniform regardless of action type. Confirm with the design owner if type-based color coding is wanted here too, since the notification system already has that pattern established.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`Component 1`'s two variant options are named after their original Figma frame names** (`Frame 1400002001`/`Frame 1400002002`) rather than something descriptive like `State=Continues`/`State=Last` — flagging for a possible rename, not renamed without confirmation.
- **Two other, separately-built "Activity log" implementations exist elsewhere in the file**: [Request detail / Activity log (per-request)](request-detail-activity-log.md) and [Settings / Activity log](settings-activity-log.md) — this widget row is the smallest-scope of the three (dashboard summary vs. one request vs. account-wide). Not duplicates to consolidate, but the naming collision is worth knowing about when searching the file.

## Changelog

- Fixed foreign color tokens (same "Twenty library" pattern) and bound previously-unbound `itemSpacing`/padding/`cornerRadius`/`strokeWeight` — 20 fixes on the `Activity log` row, 11 on the timeline indicator, plus 31 more on a related example frame on the same page showing two stacked instances.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — neither component previously had a doc.
