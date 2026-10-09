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

## 3. Decisions

- **Portal 2.0's audit corrections apply here.** The PayGenix Figma file is an older copy of Portal 2.0's and still has the earlier values (for example lighter tertiary text and lighter status borders). The repo uses Portal 2.0's corrected values; where the Figma file disagrees, the repo is right.
- **Independent tokens.** Decided by the design owner on 2026-10-09: a Portal 2.0 color change must not reach PayGenix by itself.
- **No dark mode.** The Figma file defines dark values for some tokens; they are out of scope and not carried into `tokens.css`.

## 4. Not done yet

Compared with Portal 2.0's components, the PayGenix Figma file (`OGNevBxvmOopy3v0AilDdB`, read 2026-10-09) also has the following, none of which is coded or documented yet:

- **Different variants:** icon button with blue and danger accents; alert in large and small sizes.
- **New generic components:** tag input, check card, banners, table pagination, table cell types (link, balance, settlement status, number), auto-saved state, top navbar, flags, an illustration set.
- **Smaller value differences not yet reviewed:** menu container, tooltip, content dialog spacing, two extra small avatar sizes.
- **About 96 dashboard-specific components** (authentication, home, verify business, transaction, balance, report, webhook logs, activity, settings). These belong in the dashboard's app repo.
