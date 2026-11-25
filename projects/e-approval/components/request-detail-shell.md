# Request detail / Slide-over shell

The chrome that wraps the request-detail slide-over: sticky header/footer bars, the tab strip, and prev/next request navigation.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `sticky_slide`, `Tab_details`, `Navigation` components (inside `Requests expand`). See [Slide-over pattern](../patterns/request-detail-slide-over.md) for the fully assembled reference (`Slide_request`).

## Anatomy

| Part | Token(s) |
|---|---|
| `sticky_slide` bar — fill, border | `bg/primary`, `border/primary-subtle`, `border-width/xs` |
| Tab label (active) | `text + icon/primary`, `Body/Small-medium`, active-indicator underline |
| Tab label (inactive) | `text + icon/tertiary`, `Body/Small-regular` |
| Prev/next nav buttons | shared icon-button styling |

## Variants

`sticky_slide`'s `Property 1`: `Header` / `footer` [sic] — the two sticky bars (top and bottom of the slide-over). `Tab_details`'s `Tab`: `Request details` / `Approval Flow` / `Comment` / `Activity log` — the 4 tabs. `Navigation`'s `Property 1`: `Section Label` / `Variant2` — unrenamed generic option names for what is likely a labeled-vs-icon-only nav state.

## Behavior rules

- **`sticky_slide=Header` stays pinned to the top of the slide-over on scroll**, containing the request title/ID and prev/next `Navigation`; **`sticky_slide=footer` stays pinned to the bottom**, holding primary actions (e.g. approve/reject).
- **`Tab_details` switches the slide-over's body content** between [Inline cell](request-detail-inline-cell.md)-based request details, the approval flow ([Approval step](request-detail-approval-step.md)), the [comment thread](request-detail-comment-thread.md), and the [activity log](request-detail-activity-log.md).
- **`Navigation` moves between adjacent requests without closing the slide-over** — e.g. paging through a filtered list.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`sticky_slide`'s `footer` option is lowercase** while `Header` is capitalized — cosmetic naming inconsistency.
- **`Navigation`'s variant options are still the generic `Section Label`/`Variant2`**, not renamed to describe what they actually represent — same "never renamed after Figma's default" pattern flagged on other pages (e.g. [Filter_timeframe](home-timeframe-filter.md)).

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius/`strokeWeight` — part of the 1923-fix `Requests expand` pass.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, grouping the shell components together — previously undocumented.
