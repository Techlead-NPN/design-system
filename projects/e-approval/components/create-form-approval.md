# Create Form / Approval section

The approval-flow builder — assigning verifiers/approvers per step, with an AI-suggested flow option.

Figma: [`📱 Create form`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Action`, `list_name_step`, `Fields/Select`, `Approval Flow` components.

## Anatomy

| Part | Token(s) |
|---|---|
| Approver row | embedded `Avatar` instance, name, position (see [Avatar](avatar.md)) |
| Role tag | `Action` instance (Verifier/Approver) |
| Select field | embedded [Dropdown](dropdown.md) instance |
| AI suggestion card | `bg/accent-indigo-subtlest`-family fill, purple gradient icon (`AI Gradient` — a local **paint style**, not a variable binding; same precedent as [Loading](loading.md)'s gradients) |

## Variants

`Action`: `Property 1` = `Approver`/`Verifier` — a role tag, unrenamed generic variant property name. `list_name_step`: boolean `Avatar?`, text `Employer name`, `Position` — a single approver row. `Fields/Select`: `State` = `Default`/`Hover`/**`Hove`** (see Known gaps — a real typo, not a third state), `Breakpoint` = `Desktop`/`Mobile`. `Approval Flow`: `Breakpoint` = `Desktop`/`Mobile` — the fully assembled section.

## Behavior rules

- **The "AI suggestion" card proposes a pre-filled approval flow based on similar past requests** — `Apply suggestion` accepts it wholesale, `Ignore` dismisses it and leaves the manual "Approval step" builder empty. It's a suggestion, not a requirement.
- **Each approval step pairs a "Select approver" field with a role field (Verifier/Approver)** via the `Action` tag — a step isn't complete until both are set.
- **Steps can be added indefinitely** via "Add approval step" — there's no confirmed maximum, and the Desktop variant shows drag handles on each step, implying steps are also reorderable.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`Fields/Select`'s `State` variant has a genuine typo**: the three options are `Default`, `Hover`, and `Hove` — the third is a misspelled duplicate of `Hover`, not a real third state (compare to [Home Dashboard](../patterns/home-dashboard.md)'s `Widget/MMB Quota card` etc., which correctly have no such duplicate). Flagging rather than deleting/renaming without confirmation — worth a quick fix once confirmed, since it's functional cruft (an extra, broken variant option) not just cosmetic.
- **`Action`'s variant property is still named the generic `Property 1`**, not renamed to something like `Role` — same "never renamed after Figma's default" pattern flagged elsewhere ([Filter_timeframe](home-timeframe-filter.md), etc.).

## Changelog

- Fixed foreign color tokens and bound previously-unbound `itemSpacing`/padding/`cornerRadius`: 17 fixes on `Action`, 17 on `list_name_step`, 139 on `Fields/Select`, 108 on `Approval Flow`.
- Left the foreign `brand/primary-100`/`200`/`300` color ramp and the `AI Gradient` paint style untouched — the former is a genuine 3-step tint ramp with no single equivalent token to rebind to (flagging rather than guessing which step maps where), the latter is legitimate local gradient-style usage, not a binding gap.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — none of these components previously had a doc.
