# Create Form / General & Details sections

The first two form sections in Step 1 of the create-request flow: **General** (company, request type, title, request date, priority) and **Details** (product type, shipping address, date needed, phone, vendor count).

Figma: [`📱 Create form`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Form Title`, `Form/General`, `Form/Details` components.

## Anatomy

| Part | Token(s) |
|---|---|
| Section title | `Body/Medium-semibold`, `text + icon/primary` |
| Fields | embedded [Text Input](text-input.md), [Dropdown](dropdown.md), [Radio button](radio-checkbox-card.md) instances |
| Section card — fill, border, radius | `bg/primary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8` |

## Variants

`Form Title` (the shared section-header atom, used above both General and Details): booleans `Optional?`, `Sub-paragraph?`. `Form/General`: `Breakpoint` = `Desktop`/`Mobile`, plus boolean `Back date calendar?`. `Form/Details`: `Breakpoint` = `Desktop`/`Mobile`, plus booleans `Shipping address?`, `Recommend vendors?`.

## Behavior rules

- **`Form Title` is the shared section-header atom** reused across every form section on this page (General, Details, Item & Budget, Reference & Attachments, Approval) — don't build a new header style per section.
- **`Back date calendar?` on Form/General controls whether the "Select backdate" field appears** — only relevant when the user has chosen the "Backdate" request-date option over "Current date".
- **`Recommend vendors?` on Form/Details is a suggestion field, not a requirement** — it's optional supporting content for procurement-style requests, not present on every request type.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found.

## Changelog

- Fixed foreign color tokens and bound previously-unbound `itemSpacing`/padding/`cornerRadius`/`strokeWeight`: 20 fixes on `Form Title`, 75 on `Form/General`, 101 on `Form/Details`.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — none of these components previously had a doc.
