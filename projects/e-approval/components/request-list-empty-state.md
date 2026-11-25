# Request list / Empty state

The "no results" placeholder shown when the table or card view has nothing to display (empty list or no filter matches).

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `No results` component (inside `Request Table`).

## Anatomy

| Part | Token(s) |
|---|---|
| Illustration | see [Illustration](illustration.md) — the `Empty state` asset |
| Heading | `text + icon/primary`, `Body/Medium-semibold` |
| Supporting text | `text + icon/tertiary`, `Body/Small-regular` |

## Variants

Single fixed component — no variants; copy is set by override depending on cause (empty list vs. no filter matches).

## Behavior rules

- **Shown in place of the table body/card grid when zero requests match the current view or filter** — see [Filter panel](request-list-filter-panel.md) for what can cause a zero-match state.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — part of the 511-fix `Request Table` pass.
- Verified visually before/after — no rendering changes.
- Documented anatomy and behavior rules for the first time — previously had no doc.
