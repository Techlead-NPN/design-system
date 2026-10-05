# Request detail / Budget status summary

A compact glance-card showing available vs. requested budget and an in/out-of-budget indicator, distinct from the full itemized budget breakdown.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `budget section` component (inside `Requests expand`).

## Anatomy

| Part | Token(s) |
|---|---|
| Card — fill, border, radius | `bg/primary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8` |
| In/out of budget badge | `bg/success-subtle` + `text + icon/success` (in budget) or danger equivalent |
| Available / Requested amount rows | `text + icon/tertiary` (label), `text + icon/primary` (value), `Body/Small-regular`/`Body/Small-medium` |
| "as of" timestamp | `text + icon/tertiary`, `Body/Mini-regular` |

## Variants

Single fixed component — content varies by data (available amount, requested amount, in/out-of-budget state) rather than variant property.

## Behavior rules

- **A quick-glance summary, not the itemized breakdown** — see [Sections (Item & Budget)](request-detail-sections.md) for the full line-item table with quantities and unit prices. This component only shows the two headline totals plus a pass/fail indicator.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Possible cross-page naming collision with Create form's "Budget status"**: [Create form / Item & Budget](create-form-item-budget.md) documents two components both named "Budget status" (an 8-state and a 3-state version) used while building a request. This `budget section` component here may be a third, detail-view-specific rendering of the same underlying concept — flagging as worth reconciling across pages rather than assuming they're unrelated, since a vibe-coding read of "budget status" in isolation could easily conflate all three.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — part of the 1923-fix `Requests expand` pass.
- Verified visually before/after — no rendering changes.
- Documented anatomy and behavior rules for the first time, and flagged the possible cross-page naming collision with Create form's Budget status components — previously undocumented.
