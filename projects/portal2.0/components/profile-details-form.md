# Profile / Details form

The main Profile settings page body: a cover banner with centered avatar, and a personal-info field grid (Full name, Job title, Company, Department, Email, Phone).

Figma: [`Setting - Profile`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `content profile` component (the full assembly) and `Additional Details Container` component (the field grid), both inside `Profile`.

## Anatomy

| Part | Token(s) |
|---|---|
| Cover banner | brand gradient fill (decorative, not a semantic token — same treatment as illustration art) |
| Avatar (large, centered, overlapping banner) | embedded [Avatar](avatar.md) instance, edit-pencil badge |
| Field label | `text + icon/tertiary`, `Support/Caption` |
| Field value | `text + icon/primary`, `Body/Small-regular` |

## Variants

Both components are single fixed instances — content is per-user data, not variant-driven.

## Behavior rules

- **`content profile` embeds `Additional Details Container` for its 2-column field grid** (Full name/Job title, Company/Department, Email/Phone) — the container is the reusable field-grid atom, `content profile` adds the banner and large avatar around it.
- **The avatar deliberately overlaps the bottom edge of the cover banner** — confirmed via negative `itemSpacing` values on the banner's layout (see Known gaps), not a bug; matches the visual seen in both the `Profile` page reference and the account-menu's [Identity card](profile-identity-card.md) styling.
- **[Photo zoom](profile-photo-zoom.md) is the control used to update this avatar image**, shown separately on the same `Profile` page.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Negative `itemSpacing` values found on 3 nested containers** (`Profile Header`: -48px, `Contact Info Container`: -28.17px, `Contact Info Column`: -25px) — these produce the intentional avatar-overlapping-banner effect confirmed visually, not bugs. Left unbound since the Foundation spacing scale has no negative-value primitives (by design — spacing tokens represent gaps, not overlaps). Flagging as a legitimate use case the token system doesn't currently model, in case a future "overlap"/negative-offset primitive is worth adding.
- **`content profile`'s outer frame has an unbound `cornerRadius=9`** with no matching primitive (scale jumps 8→10) — likely a default-wrapper artifact, same recurring pattern as elsewhere on this page.

## Changelog

- Fixed foreign color tokens (`primary-ci` → `text + icon/info`, `xx` → `bg/primary`, `Height/24px`-style bare-numbered spacing) and bound previously-unbound spacing/radius — 70 fixes on `content profile`, 22 on `Additional Details Container`. Part of the combined 655-fix pass across `Setting - Profile`/`Setting - Activity log`.
- Verified visually before/after — no rendering changes.
- Documented anatomy and behavior rules for the first time, and explained the negative-spacing values as intentional overlap rather than a bug — previously undocumented.
