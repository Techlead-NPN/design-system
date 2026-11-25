# Navigation / Section Label

A small caps group header used to divide the sidebar's nav items into named sections (e.g. "Favorites", "Expense & Payment").

Figma: [`📱 Navigation`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Navigation/Section Label` component set (part of the Sidebar Menu Item catalog frame).

## Spec

Measured from the Figma component on 2026-10-05. Where this section and the tables below disagree, this section is right.

| Property | Value |
|---|---|
| Row height | 28px |
| Padding | `spacing/1` (4px) left, `spacing/0,5` (2px) right, none top/bottom |
| Chevron | 14px, `text + icon/tertiary`, placed **before** the label, `spacing/1` (4px) from it. `Default` = `icon/chevron-down`, `collab` = `icon/chevron-right` |
| Label | `Body/Mini-semibold`, `text + icon/tertiary` |

In the real sidebar the chevron is shown only on the collapsible group labels inside the Requests tree. The top-level "Favorites" heading has no chevron and is overridden to `Body/Mini-bold`, `text + icon/primary` — see [Sidebar Navigation](../patterns/sidebar-navigation.md).

## Anatomy

| Part | Token(s) |
|---|---|
| Row — padding, gap | `spacing/1` (4px) left padding, `spacing/0,5` (2px) right padding (Default/collab) or `spacing/1` (Loading), top/bottom = `spacing/0`, `spacing/2` (8px) gap to trailing content |
| Row — radius | `border-radii/rounded-4` |
| Label text | `text + icon/tertiary`, `Body/Mini-semibold` |
| Chevron icon | remote icon-library instance (`icon/chevron-down`), rotates per collapse state |
| Loading shimmer | local `Loading/light` paint style, same precedent as [Loading](loading.md) |

## Variants

`State` = `Default` / `collab` / `Loading`. Plus booleans `IconButton?` (default `true`) and text override `Label`. 3 built variants.

## Behavior rules

- **`collab` shows a right-pointing chevron instead of the collapse-down chevron** — used when the section represents a collapsed/foldable group rather than a static label, visually distinguishing "click to expand" sections from purely organizational ones. (Naming — "collab" — doesn't obviously convey this; flagged as worth a clearer name, not renamed without confirmation.)
- **`Loading` shows a shimmer placeholder** in place of the label text, consistent with [Workspace menu](nav-workspace-menu.md) and [Navigation item L1](nav-item-l1.md)'s loading treatment.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`collab` variant name doesn't describe its function** (a right-chevron "expand" affordance) — flagging for a possible rename (e.g. `Collapsed`) rather than assuming and renaming.

## Changelog

- **2026-10-05:** added the Spec section; a trial build from this doc placed the chevron after the label.
- No foreign color tokens found — this component was already clean apart from the legitimate `Loading/light` paint style.
- Bound previously-unbound padding (`spacing/1`/`spacing/0,5`/`spacing/0`), corner radius (`border-radii/rounded-4`), and the nested content-row's gap (8px → `spacing/2`) and padding across all 3 variants, plus corner radius on the `Loading` variant's skeleton shimmer rectangle.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — this component previously had no doc.
