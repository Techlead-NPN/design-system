# Duo theme — foundations pass

Duo is the softer look chosen for new internal apps (November 2026). E-Approval keeps the Classic look (`workspace.css`). Both themes use the same components and the same token names ([`CONTRACT.md`](CONTRACT.md)); only the values differ.

This page records how the Duo draft was tied to Foundations. The theme file is [`duo.css`](duo.css). **Status: preview.** Colours, type and component shapes are validated; the icon-rail shell is still to come.

**Source:** the Duo Figma style guide ("Styleguide · Option B, Warm / Soft", file `CWIyerZWpc1pNJ6ZYyYJK3`, node `11:50`) and the Vercel prototypes employees voted on. The draft started from one visual reference and was not tied to Foundations; this pass does that.

## Decisions

| Topic | Decision | Why |
|---|---|---|
| Card corners | **16px** (`rounded-16`) | What employees saw in the prototype they chose; calmer in dense tables and forms than the style guide's 24px |
| Primary buttons | **`indigo-600`** (hover `indigo-700`) | White on `indigo-500` is 4.47:1, under the 4.5:1 minimum; `indigo-600` is 6.3:1. `indigo-500` stays for focus rings and highlights |
| Accent colours | **Reuse Classic's accents** | No new colours. Duo's purple, pink, blue, green and orange map to Classic's fuchsia, blossom, ocean, emerald and peach |
| Thai font | **Inter + IBM Plex Sans Thai** (proposed, to confirm) | Thai is the main language, so a web font keeps Thai the same on Mac and Windows (Linear does this; Notion and Claude fall back to system Thai). Plex is what the voted prototypes used. One line in `duo.css` to change |
| Weights | No 700; bold styles use 600, large headings 500–600 | Duo's style guide uses Medium and SemiBold only |

## Colour mapping

Every value is a Foundations primitive. "Draft" is the Figma style guide value.

**Neutrals** — snapped to the nearest step; the difference isn't visible.

| Token | Classic | Duo | Draft |
|---|---|---|---|
| `bg-secondary` (page backdrop) | `neutral-50` | `neutral-100` #F5F5F5 | bg/canvas #F3F3F3 |
| `bg-primary` (cards) | white | white | bg/surface #FFFFFF |
| `bg-primary-hover` | `neutral-100` | `neutral-50` #FAFAFA | bg/subtle #F8F8F8 |
| `bg-secondary-hover` | `neutral-100` | `neutral-200` #E5E5E5 | bg/muted #F1F1F1 |
| `bg-primary-inverse` (tooltips, dark pills) | `neutral-800` | `neutral-900` #171717 | brand/dark #1C1C1C |
| `text-primary` | `neutral-950` | `neutral-900` #171717 | text/primary #141414 |
| `text-secondary` | `neutral-700` | `neutral-600` #525252 (7.8:1) | text/secondary #5C5C5C |
| `text-tertiary` | `neutral-500` | `neutral-500` #737373 (4.7:1) | text/tertiary #8F8F8F — **3.2:1, fails**, so not used |
| `border-primary-subtle` / `border-primary` | `neutral-200` / `neutral-300` | same | border/default #ECECEC, border/strong #DEDEDE |

**Indigo**

| Token | Classic | Duo | Why |
|---|---|---|---|
| `bg-accent-indigo` (primary buttons, checked controls) | `indigo-500` | `indigo-600` | Contrast (decision above) |
| `bg-accent-indigo-bolder` (hover) | `indigo-600` | `indigo-700` | One step darker than the button |
| `text-accent-indigo` (selected rows, links) | `indigo-500` | `indigo-700` | The draft's own rule: "primary-strong for indigo text on soft backgrounds". `indigo-500` on `indigo-50` is 4.0:1; `indigo-700` is 7.1:1 |
| `bg-accent-indigo-subtlest`, `border-accent-indigo` (focus ring) | `indigo-50`, `indigo-500` | same | Exact match with the draft |

**Status** — darker text and paler backgrounds than Classic, so every badge passes 4.5:1.

| Status | Text | Background | Contrast | Draft text |
|---|---|---|---|---|
| Success | `emerald-700` | `emerald-50` | 5.2:1 | #1E8A4C |
| Warning | `amber-700` | `amber-50` | 4.8:1 | #B26A00 |
| Info | `blue-600` | `blue-50` | 4.8:1 | #2F63D6 |
| Danger | `red-700` | `red-50` | 5.9:1 | #C52A2A |
| Urgent | `orange-700` | `orange-50` | 4.9:1 | #C9561A |
| Idle | `teal-700` | `teal-50` | 5.3:1 | #0F7A6E |

Solid danger and info backgrounds use the 600 step so white text on them passes. Duo's chips have no visible outline, so the status borders that only badges and callouts use are soft (200 steps). `border-danger` stays strong (`red-600`) because checkboxes and radios use it for their error state; a badge-only border token would let the error badge go soft too.

Success uses **emerald**, not Foundations' `green`: Foundations' green is lime-leaning (`green-700` is olive), while the draft's green is emerald.

> Classic's status badges have the opposite problem: `green-500` on `green-50` is 1.9:1 and `amber-500` on `amber-100` 1.9:1. That's out of scope here (E-Approval keeps Classic), but worth a separate fix.

**Accents** — unchanged from Classic (decision above).

## Type

Duo's 11 draft styles fill the same 30 text-style names the components use. Sizes are Classic's; Duo changes weight and letter spacing.

| Draft style | Text style | Duo value |
|---|---|---|
| Display 40/48 Medium | `text-heading-h3` | 40/44, 500, −0.5px |
| Greeting 32/40 SemiBold | `text-heading-h4` | 32/44, 600, −0.5px |
| (page title in the prototype, 24/32 SemiBold) | `text-heading-h5` | 24/34, 600 |
| Heading 20/28 Medium | `text-heading-h6` | 20/28, 500 |
| Title / Subtitle / Body Large 16/24 | `text-body-medium-medium` / `-regular` | 16/24 |
| Body Medium / Body 14/22 | `text-body-small-medium` / `-regular` | 14/**20** |
| Caption Medium / Caption 12/18 | `text-body-mini-medium` / `-regular` | 12/**20** |
| Overline 11/16 SemiBold | `text-support-caption` (12/16) or `text-body-mini-semibold` | 12px |

**Snapped, to revisit after the Thai font test:** the draft's 22px and 18px line heights and the 11px overline aren't in Foundations, so they use the nearest existing values (20px, 20px, 12px). Taller line heights help Thai tone marks; if Thai looks cramped in testing, add `line-height` primitives for 18 and 22px to Foundations rather than hard-coding them.

Display and `h1`–`h2` keep Classic's sizes at weight 600; the draft doesn't use sizes above 40px.

## Shapes and sizes

Since package 0.11.0 the components read their shapes from component tokens ([`COMPONENT_TOKENS.md`](COMPONENT_TOKENS.md)), so Duo now has pill buttons (36px / 28px), 44px fields with 12px corners, pill search fields, pill chips, 16px cards with the soft `shadow-xs` shadow, 12px menus and 48px table rows. Tabs have `variant="pill"` and `variant="segmented"` for Duo's two tab styles.

**Still to come:** the icon-rail shell (`layout="rail"`), cards placed straight on the page, and the large page title. That's the Duo shell step.

## Changelog

- **2026-11-26 (0.11.0):** component tokens added; Duo's shapes and sizes now come from the theme. Fields 44px, soft card shadow, table rows 48px, field corners 12px and pill search fields decided with the design owner.

- **2026-11-26:** first pass. Decisions above made with the design owner; `duo.css` added as a preview theme and to Storybook's Theme switch.
