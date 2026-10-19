# PayGenix Merchant Dashboard — Design

The Merchant Dashboard is PayGenix's platform for merchants to register and monitor their payments. It is meant to look like Portal 2.0: both designs started from the same reference, and the design owner confirmed on 2026-10-09 that the shared look is intended.

This doc therefore states only what differs. For everything else, [`../portal2.0/DESIGN.md`](../portal2.0/DESIGN.md) applies as written, including the color rules, the text styles and the accessibility rules.

Values live in [`tokens.css`](tokens.css). It began as a copy of Portal 2.0's tokens (2026-10-09) and is independent: a later change in Portal 2.0 does not reach this project. If Portal 2.0 changes a shared value and PayGenix should follow, make the same change here on purpose.

## 1. What PayGenix sets differently

| Token | Portal 2.0 | PayGenix Merchant | Effect |
|---|---|---|---|
| `--badge-radius` | `border-radii/rounded-infinite` | `border-radii/rounded-4` | Badges have 4px corners instead of a full pill |
| `--table-row-height` | 36px | 32px | Table header and body rows are denser |

Both are intended PayGenix character, confirmed by the design owner.

## 2. What PayGenix adds

### Brand ramps (raw colors)

`brand/primary-50` … `brand/primary-950` (blue, `500` = `#4450f7`) and `brand/secondary-50` … `brand/secondary-950` (red, `500` = `#df0b0c`). They are raw colors: components never use them directly.

`bg/brand` points at `brand/primary-500`. It is used by the logo and the email template only. Interactive color is still `accent-indigo`, as in Portal 2.0.

### Chart colors

| Token | Value | Class |
|---|---|---|
| `bg/data visualize/accent-red` | `red/300` | `bg-data-visualize-accent-red` |
| `bg/data visualize/accent-blue` | `blue/300` | `bg-data-visualize-accent-blue` |
| `bg/data visualize/accent-orange` | `orange/300` | `bg-data-visualize-accent-orange` |
| `bg/data visualize/accent-amber` | `amber/300` | `bg-data-visualize-accent-amber` |
| `bg/data visualize/accent-cyan` | `cyan/300` | `bg-data-visualize-accent-cyan` |
| `bg/data visualize/accent-sky` | `sky/300` | `bg-data-visualize-accent-sky` |
| `bg/data visualize/accent-indigo` | `indigo/300` | `bg-data-visualize-accent-indigo` |
| `bg/data visualize/accent-fuchsia` | `fuchsia/300` | `bg-data-visualize-accent-fuchsia` |
| `bg/data visualize/accent-green` | `green/300` | `bg-data-visualize-accent-green` |

For chart shapes drawn as SVG, the same names work with `fill-` (`fill-data-visualize-accent-red`). Use them for chart series only, never for status.

### Small alert

PayGenix's Alert message has a `Size` property: `Large` is Portal 2.0's standard alert ([`toast-alert.md`](../portal2.0/components/toast-alert.md)), and `Small` is a compact one-line message attached to a field or an uploaded file, typically review feedback ("Image too blurry", "The provided information is inconsistent with the uploaded document(s)."). For a standalone notice, use Large.

| Part | Small |
|---|---|
| Box | 28px high, padding `spacing/1` (4px) top/bottom and `spacing/2` (8px) left/right, `border-radii/rounded-6`, fill the status's `-A80` background |
| Text | `Body/Mini-regular` (12px), in the status's text color |
| Icon | off by default; when on, the same 16px status icon as Large, `spacing/2` (8px) before the text |
| Action | none |

In code: `<Alert size="sm" status="warning">Image too blurry</Alert>` (`DSAlert` in an app). Add `icon` to show the icon.

### Table pagination

Sits under a table it controls (Transaction, Balance, Report, Webhook Logs), left-aligned with the table's 16px inset, on desktop and mobile. One 24px row of two groups, `spacing/6` (24px) apart:

| Part | Value |
|---|---|
| Left group, `spacing/2` (8px) gap | label "Items per page:", then a Small Primary/Default [Button](../portal2.0/components/button.md) showing the page size with a 14px `chevron-down` |
| Page-size menu | the standard [Menu](../portal2.0/components/menu-item.md) (`shadow-lg`), 48px wide, opening **upward**, left-aligned with the button, `spacing/1` (4px) above it. Options 15, 25, 50, 100; default 15 |
| Right group, `spacing/2` (8px) gap | the range "1–15 of 100" (first–last row shown, of the total), then ‹ and › as 24px Outline [Icon Buttons](../portal2.0/components/button.md) |
| Text | `Body/Small-medium`, `text + icon/primary` |

Behavior: ‹ is disabled on the first page and › on the last. Choosing a new page size closes the menu and returns to page 1. With no rows the range reads "0–0 of 0" and both arrows are disabled.

In code: `<TablePagination page={page} pageSize={size} total={total} onPageChange={setPage} onPageSizeChange={(s) => { setSize(s); setPage(1) }} />` (`DSTablePagination` in an app).

Figma (2026-10-19): the variant property was renamed `Property 1` → `State` (`Default` / `Open`); the label was corrected from "Item per page:"; the options were 10/25/50/100 although the default is 15, now 15/25/50/100; the 7px gaps were snapped to `spacing/2`; the menu now sits 4px above the button like other menus.

## 3. Decisions

- **Portal 2.0's audit corrections apply here.** The PayGenix Figma file is an older copy of Portal 2.0's and still has the earlier values (for example lighter tertiary text and lighter status borders). The repo uses Portal 2.0's corrected values; where the Figma file disagrees, the repo is right.
- **Independent tokens.** Decided by the design owner on 2026-10-09: a Portal 2.0 color change must not reach PayGenix by itself.
- **Alert message in the Figma file was aligned with Portal 2.0 on 2026-10-19:** its status property is now named `State` (it was `Type`), warning text and icon use `text + icon/warning` (amber, it was `urgent` orange), and all variants are vertically centered. The four `bg/*-subtle-A80` tokens now follow Portal 2.0's pattern: each points at its raw color (`blue/100`, `green/50`, `amber/100`, `red/100`) with 80% opacity, instead of at separate `*/opa-A80` raw colors (one of which, amber, had no transparency); those four raw colors were deleted.
- **No dark mode.** The `dark` mode was removed from the Figma file's `semantic color` collection on 2026-10-19; only `light` remains.

## 4. Not done yet

Compared with Portal 2.0's components, the PayGenix Figma file (`OGNevBxvmOopy3v0AilDdB`, read 2026-10-09) also has the following, none of which is coded or documented yet:

- **New generic components:** tag input, check card, banners, table cell types (link, balance, settlement status, number), auto-saved state, top navbar, flags, an illustration set.
- **Smaller value differences not yet reviewed:** menu container, tooltip, content dialog spacing, two extra small avatar sizes.
- **About 96 dashboard-specific components** (authentication, home, verify business, transaction, balance, report, webhook logs, activity, settings). These belong in the dashboard's app repo.
