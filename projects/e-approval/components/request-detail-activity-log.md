# Request detail / Activity log (per-request)

The per-request activity timeline shown in the slide-over's Activity log tab — a separate, locally-built component from the dashboard's activity widget.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Log timeline indicator`, `Activity log`, `Logs list` components (inside `Activity log`).

## Anatomy

| Part | Token(s) |
|---|---|
| Timeline dot + connector | `bg/tertiary` (past) / `bg/accent-indigo` (latest) |
| Timestamp | `Support/Caption`, `text + icon/tertiary` |
| Actor avatar | embedded [Avatar](avatar.md) instance |
| Actor name | `text + icon/primary`, `Body/Small-medium` |
| Action text | `Body/Small-regular`, `text + icon/primary`/`text + icon/tertiary` mix per segment |
| Detail chip (e.g. field-change summary) | `bg/secondary`, `border-radii/rounded-8`, `text + icon/tertiary` |

## Variants

`Log timeline indicator` and `Activity log` share a `state` variant: `Past` / `Latest` — the most recent entry gets an accented dot (`bg/accent-indigo`) while earlier entries use a neutral one. `Activity log` additionally has two booleans: `show activity?` and `Not first log?`, controlling whether the action-detail chip renders and whether the entry shows a connector to a previous entry. `Logs list` is the assembled stack (single fixed component).

## Behavior rules

- **Same conceptual pattern as [Home / Activity log row](home-activity-log-row.md), but a separate build** — see Known gaps.
- **`Not first log?` suppresses the top connector line on the first entry in a list**, so the timeline doesn't show a dangling line above the earliest item.
- **`show activity?` toggles whether the optional detail chip (e.g. "Workflow (added), Form data (updated)") renders below the action line** — some log entries are just "created"/"approved" with no further detail.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Genuine duplicate of [Home / Activity log row](home-activity-log-row.md)**: both pages have a component named `Activity log` (and a paired timeline-indicator component) representing the same underlying concept — a per-entry activity-timeline row — but built independently on two different pages with different variant structures (Home's uses unrenamed `Frame 1400002001`/`Frame 1400002002` variant names and no extra booleans; this one correctly uses `state=Past`/`Latest` and has 2 additional booleans for connector/detail-chip visibility). This version is the more complete and better-named of the two. Flagging as a strong candidate for consolidating into one shared component (promoting this page's version to the canonical one) rather than merging without confirmation, since Home's version may already be in use elsewhere.
- **A third, still-different "Activity log" exists at [Settings / Activity log](settings-activity-log.md)** — a full account-wide table/card view, not a per-entry timeline row like this one or Home's. Different scope, not part of the same duplicate-consolidation question above, but worth knowing all three exist when searching the file by name.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius/`cornerRadius` — 11 fixes on `Log timeline indicator`, 71 on `Activity log`, 5 on `Logs list`. One `cornerRadius=5` value (no matching primitive) left flagged on both component-set frames — likely picked up from a default frame wrapper rather than meaningful, not force-mapped to a nearby primitive.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, and flagged the duplicate-build relationship with [Home / Activity log row](home-activity-log-row.md) — previously undocumented.
