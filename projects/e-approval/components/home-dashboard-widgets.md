# Home / Dashboard widgets

The 7 dashboard widget cards a user can add to their home page, plus the panel for managing which ones are shown. Every widget shares the same [Widget title](home-widget-title.md) header pattern and card chrome; each documented as its own section below since their content differs.

Figma: [`📱 Home & Notification`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page. See [Home Dashboard](../patterns/home-dashboard.md) for how these compose into the actual home screen.

## Shared card chrome

| Part | Token(s) |
|---|---|
| Card — fill, border, radius | `bg/primary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8` |
| Header | embedded [Widget title](home-widget-title.md) instance |
| Content padding | `spacing/4` (16px) |

## Widget/MMB Quota card

Shows the user's remaining My Mix Benefit balance and a "Recent claimed" list of [claim request](home-widget-cards.md) rows.

**Variants:** `Breakpoint` = `Desktop` / `Mobile`. 2 built variants.

## Widget/Activity Log

Shows the 3 most recent [Activity log rows](home-activity-log-row.md) with a "See all" link.

**Variants:** `Breakpoint` = `Desktop` / `Mobile`. 2 built variants.

## Widget/Procurement

Shows per-type request counts ([request type card](home-widget-cards.md) rows: PR, PO, MRR, PAY) with a [timeframe filter](home-timeframe-filter.md) trigger in the header.

**Variants:** `Breakpoint` = `Desktop` / `Mobile`. 2 built variants.

## Widget/Your Requests

Shows [Status card](home-widget-status.md) counts (Draft/Under review/Approved/Rejected) for the current user's own requests, with an "All time" filter trigger.

**Variants:** 1 built variant (nested inside a wrapper frame — no `Breakpoint` split visible in the current build, unlike the other widgets; see Known gaps).

## Widget/Need your approval

Shows an [Urgent badge](home-widget-status.md) with the count of requests awaiting the current user's approval.

**Variants:** `Breakpoint` = `Desktop` / `Mobile`. 2 built variants.

## Widget/Recommend

Shows [shortcut card](home-widget-cards.md) rows — quick links to frequently-used actions.

**Variants:** `Breakpoint` = `Desktop` / `Mobile`. 2 built variants.

## Widget/Add widget

A single fixed component (no variants) — the empty-slot card at the end of the widget list, prompting the user to add another widget. Embeds an [Illustration/widget](illustration.md) instance and a [Button/Button](button.md) instance.

## Widget customization

The panel (opened via the home page's "Customize" trigger) for adding/removing/reordering widgets, using [widget list](home-widget-cards.md) rows split into "Your widgets" (currently shown, some not removable — e.g. Quick Create) and "Add widgets" (available to add) sections.

**Variants:** `Breakpoint` = `Desktop` / `Mobile`. 2 built variants.

## Behavior rules

- **Every widget's header uses the shared [Widget title](home-widget-title.md) atom** with a widget-specific accent color and icon — don't build a one-off header when adding a new widget type.
- **`Quick create` is not removable from the dashboard** (shown without a remove control in Widget customization's "Your widgets" list) — it's treated as a permanent, non-optional widget, unlike the others which can be added/removed freely.
- **Widgets that support a rolling time window (Procurement) expose a [timeframe filter](home-timeframe-filter.md) trigger in their header**; widgets scoped to "right now" (Need your approval, Your Requests default to "All time") don't need one unless explicitly time-scoped.
- **`Widget/Add widget` always appears as the last card** in the dashboard's widget list — it's the persistent "add more" affordance, not a widget itself.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`Widget/Your Requests` has no `Breakpoint` variant split** — every other widget card has explicit Desktop/Mobile variants, but this one is a single build nested inside an extra wrapper frame (`Frame 4282`), suggesting it may not have gotten the same mobile-adaptation pass as the rest. Flagging for the design owner to confirm whether a mobile variant is planned.
- **A handful of `title & supporting` sub-frames inside Widget/Recommend and shortcut card have a `-4px` itemSpacing** (a negative gap, meaning intentional text overlap/tightening) — left unbound since no primitive represents negative spacing; this may be intentional (tight leading between a title and its supporting text) rather than a mistake, but wasn't confirmed.

## Changelog

- Fixed foreign color tokens (`Text/Primary`/`Text/Tertiary`, `base/black`, `border/primary-default`, plus a duplicate `border-radii/rounded-infinite 2` token) across all 8 components — same "Twenty library" + in-house-duplicate patterns found throughout this audit.
- Bound 336 previously-unbound `itemSpacing`/padding/`cornerRadius`/`strokeWeight` values across all 8 components via exact-value match against the spacing/radius primitive scale.
- Verified visually before/after on all 8 — no rendering changes. The "Dashboard" component set on this page (not documented separately — see [Home Dashboard](../patterns/home-dashboard.md)) shows all these widgets assembled together and was used as the composition reference.
- Documented anatomy, variants, and behavior rules for the first time — none of these components previously had a doc.
