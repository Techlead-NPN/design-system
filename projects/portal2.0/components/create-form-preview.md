# Create Form / Preview

The read-only summary shown at the final step of the create-request flow, before submission — a recap of everything entered in Steps 1 and 2.

Figma: [`📱 Create form`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Information Preview` and `Approval Flow Preview` components.

## Anatomy

| Part | Token(s) |
|---|---|
| Section title | `Body/Medium-semibold`, `text + icon/primary` |
| Field label/value pairs | `Body/Small-regular` (label, `text + icon/tertiary`) / `Body/Small-medium` (value, `text + icon/primary`) |
| Card — fill, border, radius | `bg/primary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8` |

## Variants

Both are single fixed components — content varies by data, not variant.

## Behavior rules

- **`Information Preview` recaps General, Details, Item & Budget, and Reference & Attachments** — everything entered in [Step 1](../patterns/create-form.md), read-only.
- **`Approval Flow Preview` recaps the approval steps built in Step 2** — separate from `Information Preview` since it's a conceptually distinct part of the request (who approves it, vs. what's being requested).
- **This is the last chance to review before submission** — see [Create Form](../patterns/create-form.md) for where this sits in the overall 3-step flow.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found.

## Changelog

- Fixed foreign color tokens and bound previously-unbound `itemSpacing`/padding/`cornerRadius`: 24 fixes on `Information Preview`, 63 on `Approval Flow Preview`.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — neither component previously had a doc.
