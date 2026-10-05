# Home / Status card & Urgent badge

Two status-summary atoms used inside dashboard widgets: **Status card** (a count + label tile, e.g. "5 Under Review") and **Urgent badge** (a large highlighted count banner, e.g. "5 Requests" needing approval).

Figma: [`📱 Home & Notification`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Status card` and `Urgent badge` component sets.

## Status card

| Part | Token(s) |
|---|---|
| Tile — fill, radius | `bg/secondary` (default) / `bg/secondary-hover` (hover), `border-radii/rounded-8` |
| Count | `Body/Large-bold` (desktop) / `Body/Mini-medium` (mobile), color varies by `Status` |
| Label | `Body/Mini-medium` (desktop) / `Body/Small-medium` (mobile) |
| Status color | Draft = `text + icon/idle`, Approved = `text + icon/success`, Rejected = `text + icon/danger`, Under review = `text + icon/info` |

**Variants:** `Status` = `Draft` / `Rejected` / `Under review` / `Approved`. `State` = `Default` / `Hover` (Desktop only — no hover state built for Mobile, since mobile has no hover concept). `Breakpoint` = `Desktop` / `Mobile`. 12 built variants.

## Urgent badge

| Part | Token(s) |
|---|---|
| Banner — fill, radius | `bg/urgent-subtle` (default) / `bg/urgent-bolder` (hover), `border-radii/rounded-8` |
| Count | `Body/Large-bold`, `text + icon/success` |
| Label | `Body/Mini-medium`, `text + icon/success` |

**Variants:** `State` = `Default` / `Hover`. 2 built variants.

## Behavior rules

- **Status card's color always maps to the same status meaning system-wide** — Draft/Approved/Rejected/Under review use the same semantic colors as [request status elsewhere in the product](menu-item.md), don't reassign them per context.
- **Urgent badge uses success-green for its count despite the "urgent" name** — this is because it represents a positive/actionable count (e.g. requests you *can* act on), not a warning. The banner's background (`urgent-subtle`/`urgent-bolder`, an orange-toned "attention" surface) is what signals urgency, not the count's own color. Don't reassign the count color when reusing this pattern.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found beyond the fixed items below.

## Changelog

- Fixed foreign color tokens (same "Twenty library" pattern) and bound previously-unbound `itemSpacing`/padding/`cornerRadius` — 10 fixes on Status card, 1 on Urgent badge.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — neither component previously had a doc.
