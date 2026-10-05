# [DS] Portal 2.0 — Design System Reference

This document is the source of truth for how design tokens and styles work in Portal 2.0. It's written for three audiences at once: designers, engineers implementing tokens in code, and AI tools generating or modifying designs from this spec ("vibe design"). If a rule here isn't followed, treat it as a bug.

It covers only what is specific to Portal 2.0. Everything shared across projects — the token architecture, raw primitives, and icon set — lives in [`../../foundations/FOUNDATIONS.md`](../../foundations/FOUNDATIONS.md). Read that first.

**Values live in code:** [`tokens.css`](tokens.css) holds the semantic colors (§2) and text styles (§3) as Tailwind CSS v4 tokens and is the source of truth for the values. To build a screen, start at [`BUILD_GUIDE.md`](BUILD_GUIDE.md).

Figma source: [`✅ Color`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) and [`✅ Typography`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) pages of the Portal 2.0 file. Primitives come from the shared **Foundations** file (`n9KB4M3kiVBxwWJPe1HGyB`).

---

## 1. Token Architecture

Defined once for all projects in [Foundations §1](../../foundations/FOUNDATIONS.md#1-token-architecture) — the two-layer model, the binding rule (color binds to semantic tokens; spacing, radii, border-width and shadows bind to Foundation primitives directly), and the OS chrome exception.

In this project:

- **Foundations file** (shared): raw color, sizing, and typography primitives, plus effect and grid styles. Icons are **Tabler Icons**.
- **Portal 2.0 file** (this project): semantic color tokens that alias Foundation primitives (§2), the 30 text styles (§3), plus all components (§7).

**If you're an AI tool reading this to generate a design:** never invent a hex value or a spacing number. Always resolve to an existing token name from the tables below or from Foundations.

---

## 2. Color

### 2.1 Naming convention

- Category prefix: `text + icon/`, `bg/`, `border/`, `overlay/`
- Tier suffixes follow increasing emphasis: `-subtlest` → `-subtler` → `-subtle` → *(base)* → `-bolder`
- State suffixes: `-hover`, `-inverse`, `-disabled`
- `-A80` suffix = the same color at 80% opacity (used for toast/alert banners specifically, distinct from the solid `-subtle` variant used for badges/pills)

### 2.2 The accent color rule (important)

Ten "accent" colors exist: `sky`, `ocean`, `emerald`, `teal`, `sun`, `fuchsia`, `blossom`, `blush`, `peach`, `stone`, plus `indigo`.

**Nine of them carry no meaning whatsoever.** They exist purely for visual variety — avatar initials, sidebar icons, notification icon tints — so that adjacent items in a list are visually distinguishable. **Do not** assign status or semantic meaning to them (e.g. don't use `accent-blush` because it's reddish and you want "danger-adjacent" — use the actual `danger` tokens).

**`accent-indigo` is the one exception.** It is Portal 2.0's brand color (the original brand blue/navy), repurposed as the primary interactive color — primary buttons, selected states, focus rings, checked toggles, calendar selection. Treat it as a distinct, meaningful token, not as "just another accent."

### 2.3 Text + Icon (26 tokens)

| Token | Value | Usage |
|---|---|---|
| `text + icon/primary` | `#0a0a0a` | Primary text and icons — headings, body copy |
| `text + icon/secondary` | `#404040` | Secondary text and icons — supporting copy, helper text |
| `text + icon/tertiary` | `#a3a3a3` | Tertiary text — metadata, timestamps, placeholder text ⚠️ *see §5* |
| `text + icon/primary-inverse` | `#fafafa` | Primary text/icons on dark or bold backgrounds |
| `text + icon/secondary-inverse` | `#e5e5e5` | Secondary text/icons on dark or bold backgrounds |
| `text + icon/disabled` | `#d4d4d4` | Text/icons in a disabled state (exempt from contrast requirements) |
| `text + icon/danger` | `#ef4444` | Critical information — error messages |
| `text + icon/warning` | `#f59e0b` | Caution — warning messages |
| `text + icon/info` | `#3b82f6` | Informational / in-progress states |
| `text + icon/success` | `#6ecd32` | Favorable outcome — success messages |
| `text + icon/idle` | `#14b8a6` | Idle/inactive status (e.g. offline indicator) — chosen to read as neutral without colliding with gray, which is already used for "cancelled" |
| `text + icon/accent-indigo` | `#6366f1` | Brand-reinforcing text/icons — logos, primary actions |
| `text + icon/accent-indigo-subtle` | `#818cf8` | Indigo accent at lighter weight than base |
| `text + icon/accent-indigo-bolder` | `#4f46e5` | Text/icons on hover/focus of accent-indigo elements |
| `text + icon/urgent` | `#f97316` | Text/icons on urgent-priority badges |
| `text + icon/danger-bolder` | `#dc2626` | Text on danger buttons in hover/focus state |
| `text + icon/accent-sky` | `#0ea5e9` | Decorative — avatar initials, sidebar icons |
| `text + icon/accent-ocean` | `#2563eb` | Decorative |
| `text + icon/accent-emerald` | `#10b981` | Decorative |
| `text + icon/accent-teal` | `#14b8a6` | Decorative |
| `text + icon/accent-sun` | `#facc15` | Decorative |
| `text + icon/accent-fuchsia` | `#c026d3` | Decorative |
| `text + icon/accent-blossom` | `#ec4899` | Decorative |
| `text + icon/accent-blush` | `#f43f5e` | Decorative |
| `text + icon/accent-peach` | `#f97316` | Decorative |
| `text + icon/accent-stone` | `#78716c` | Decorative — default sidebar/nav icon color when no other accent is assigned |

### 2.4 Background (38 tokens)

| Token | Value | Usage |
|---|---|---|
| `bg/primary` | `#ffffff` | Default background for pages and primary surfaces |
| `bg/primary-inverse` | `#262626` | Bold dark background — tooltips, inverse panels |
| `bg/primary-hover` | `#f5f5f5` | Primary surface, hovered state |
| `bg/secondary` | `#fafafa` | Secondary surfaces — panels, nested cards |
| `bg/secondary-hover` | `#f5f5f5` | Secondary surface hover — tag chips, hovered cards |
| `bg/secondary-inverse` | `#404040` | Dark background on bold surfaces — tooltips |
| `bg/tertiary` | `#d4d4d4` | Tertiary surfaces — nested panels, more separation |
| `bg/tertiary-inverse` | `#525252` | Tertiary surface on inverse layouts *(currently unused in components)* |
| `bg/disabled` | `#f5f5f5` | Backgrounds of disabled elements |
| `bg/danger-subtle` | `#ffe2e2` | Subtle danger background — error banners |
| `bg/warning-subtle` | `#fef3c7` | Subtle warning background |
| `bg/success-subtle` | `#f0faea` | Subtle success background |
| `bg/info-subtle` | `#dbeafe` | Subtle info background |
| `bg/info-subtle-A80` | `#eff6ff` @80% | Semi-transparent info background — toasts, alert banners |
| `bg/success-subtle-A80` | `#f0faea` @80% | Semi-transparent success background — toasts, alerts |
| `bg/warning-subtle-A80` | `#fffbeb` @80% | Semi-transparent warning background — toasts, alerts |
| `bg/danger-subtle-A80` | `#fef2f2` @80% | Semi-transparent danger background — toasts, alerts |
| `bg/danger` | `#ef4444` | Danger button, default state ⚠️ *see §5* |
| `bg/danger-bolder` | `#dc2626` | Danger button, hover state |
| `bg/info` | `#3b82f6` | Informational background *(currently unused)* |
| `bg/idle-subtle` | `#ccfbf1` | Idle status badge background |
| `bg/urgent-subtle` | `#fff7ed` | Urgent priority badge, default state |
| `bg/urgent-bolder` | `#ffedd5` | Urgent priority badge, hover state |
| `bg/accent-indigo` | `#6366f1` | **Primary interactive background** — primary buttons, selected radio/checkbox, toggle-on, calendar date selection, progress steps |
| `bg/accent-indigo-subtlest` | `#eef2ff` | Lightest indigo tint — hover/focus/selected states on buttons and nav |
| `bg/accent-indigo-subtler` | `#a5b4fc` | Stronger indigo tint than subtlest *(currently unused)* |
| `bg/accent-indigo-bolder` | `#4f46e5` | Primary button hover background |
| `bg/brand` | `#4450f7` | Legacy direct brand reference, outside the accent-indigo system *(currently unused)* |
| `bg/accent-sky` | `#e0f2fe` | Decorative avatar/icon background tint |
| `bg/accent-ocean` | `#dbeafe` | Decorative |
| `bg/accent-emerald` | `#d1fae5` | Decorative |
| `bg/accent-teal` | `#ccfbf1` | Decorative |
| `bg/accent-sun` | `#fef9c3` | Decorative |
| `bg/accent-fuchsia` | `#fae8ff` | Decorative |
| `bg/accent-blossom` | `#fce7f3` | Decorative |
| `bg/accent-blush` | `#ffe4e6` | Decorative |
| `bg/accent-peach` | `#ffedd5` | Decorative |
| `bg/accent-stone` | `#f5f5f4` | Decorative — default icon container fill |

### 2.5 Border (20 tokens)

| Token | Value | Usage |
|---|---|---|
| `border/primary` | `#d4d4d4` | Visually group/separate UI elements — card outlines, dividers |
| `border/primary-bolder` | `#a3a3a3` | Stronger emphasis than default, still neutral |
| `border/primary-subtle` | `#e5e5e5` | Decorative dividers — no contrast requirement |
| `border/disabled` | `#f5f5f5` | Borders of disabled elements |
| `border/danger` | `#ef4444` | Invalid input fields |
| `border/warning` | `#f59e0b` | Fields needing review |
| `border/success` | `#6ecd32` | Validated input fields |
| `border/info` | `#60a5fa` | Informational/in-progress state |
| `border/accent-indigo` | `#6366f1` | Focused primary actions, brand emphasis |
| `border/accent-indigo-bolder` | `#4f46e5` | Status badge borders (e.g. "Under review") |
| `border/accent-sky` | `#bae6fd` | Decorative icon container border |
| `border/accent-ocean` | `#bfdbfe` | Decorative |
| `border/accent-emerald` | `#a7f3d0` | Decorative |
| `border/accent-teal` | `#99f6e4` | Decorative |
| `border/accent-sun` | `#fef08a` | Decorative |
| `border/accent-fuchsia` | `#f5d0fe` | Decorative |
| `border/accent-blossom` | `#fbcfe8` | Decorative |
| `border/accent-blush` | `#fecdd3` | Decorative |
| `border/accent-peach` | `#fed7aa` | Decorative |
| `border/accent-stone` | `#e7e5e4` | Decorative — default icon border color |

### 2.6 Overlay (1 token)

| Token | Value | Usage |
|---|---|---|
| `overlay/overlay-default` | `rgba(0,0,0,0.25)` | Background scrim behind modals and dialogs |

---

## 3. Typography

Family: **Inter**, all weights. 30 styles total.

| Style | Weight | Size | Line-height | Letter-spacing |
|---|---|---|---|---|
| `Display/Desktop` | Bold | 72px | 90px (125%) | -1.5px |
| `Display/Tablet` | Bold | 72px | 90px (125%) | -1.5px |
| `Display/Mobile` | Bold | 56px | 72px (129%) | -1px |
| `Heading/H1` | Bold | 56px | 72px (129%) | -1px |
| `Heading/H2` | Bold | 48px | 60px (125%) | -0.5px |
| `Heading/H3` | Bold | 40px | 44px (110%) | 0px |
| `Heading/H4` | Bold | 32px | 44px (138%) | 0px |
| `Heading/H5` | Bold | 24px | 34px (142%) | 0px |
| `Heading/H6` | Bold | 20px | 28px (140%) | 0px |
| `Body/Large-regular` | Regular | 18px | 28px (156%) | 0px |
| `Body/Large-medium` | Medium | 18px | 28px (156%) | 0px |
| `Body/Large-semibold` | Semi Bold | 18px | 28px (156%) | 0px |
| `Body/Large-bold` | Bold | 18px | 28px (156%) | 0px |
| `Body/Medium-regular` | Regular | 16px | 24px (150%) | 0px |
| `Body/Medium-medium` | Medium | 16px | 24px (150%) | 0px |
| `Body/Medium-semibold` | Semi Bold | 16px | 24px (150%) | 0px |
| `Body/Medium-bold` | Bold | 16px | 24px (150%) | 0px |
| `Body/Small-regular` | Regular | 14px | 20px (143%) | 0px |
| `Body/Small-medium` | Medium | 14px | 20px (143%) | 0px |
| `Body/Small-semibold` | Semi Bold | 14px | 20px (143%) | 0px |
| `Body/Small-bold` | Bold | 14px | 20px (143%) | 0px |
| `Body/Mini-regular` | Regular | 12px | 20px (167%) | 0px |
| `Body/Mini-medium` | Medium | 12px | 20px (167%) | 0px |
| `Body/Mini-semibold` | Semi Bold | 12px | 20px (167%) | 0px |
| `Body/Mini-italic` | Italic | 12px | 20px (167%) | 0px |
| `Body/Mini-bold` | Bold | 12px | 20px (167%) | 0px |
| `Body/Tiny-italic` | Italic | 10px | 16px (160%) | 0px |
| `Body/Tiny-regular` | Regular | 10px | 16px (160%) | 0px |
| `Support/Label` | Medium | 14px | 20px (143%) | 0px |
| `Support/Caption` | Regular | 12px | 16px (133%) | 0px |

*Note: earlier documentation referenced "Geist" as the typeface in a page description — that was stale copy. Inter is the correct and only family in use.*

---

## 4. Spacing, Radii & Effects (Foundation primitives)

These are bound **directly** by components — no semantic layer (see §1). The scales themselves (`spacing/*`, `border-width/*`, `border-radii/*`, `breakpoint/*`, `font-size/*`, `line-height/*`, `letter-spacing/*`), the `shadow-sm/md/lg/xl` effect styles, the Desktop/Tablet/Mobile grid styles, the color primitives, and the Tabler icon set are documented in [Foundations §2–§3](../../foundations/FOUNDATIONS.md#2-primitives). What follows is only how Portal 2.0 uses them.

**Spacing rhythm:** the raw scale is a strict 4px base (`spacing/N` = N × 4px, including half-steps like `spacing/0,5` = 2px), but real usage across every component audited in this project follows two informal rhythms rather than treating all 35 steps as equally likely:

- **Roomy spacing** (card/section padding, layout gaps, page margins) clusters on an implicit 8px rhythm: `spacing/2` (8px), `spacing/4` (16px), `spacing/6` (24px), `spacing/8` (32px), `spacing/16` (64px), `spacing/20` (80px).
- **Tight spacing** (icon-to-label gaps, dense list rows, chip/badge internals) drops to the odd-numbered 4px steps or half-steps: `spacing/0,5` (2px), `spacing/1` (4px), `spacing/1,5` (6px), `spacing/2,5` (10px), `spacing/3` (12px), `spacing/3,5` (14px).

Neither rhythm is enforced by Figma or named as a distinct scale in the Foundations file — it's an observed convention from auditing every page in this file, not a structural rule the token system encodes. When choosing a value for new spacing, default to the 8px-rhythm steps for anything roomy; reach for the tighter odd/half steps only in genuinely dense UI.

**Grid styles:** not yet applied to any frame checked in this file, including [Content Area](components/content-area.md) (the natural candidate, since its two variants are sized to exactly `breakpoint/lg`/`sm`) — a real gap: the grid exists and pairs cleanly with the breakpoint scale, but nothing currently wires a frame to it via Figma's own layout-grid mechanism.

---

## 5. Accessibility (WCAG)

### Rules

- **Text & icon contrast:** `text/primary` and `text/secondary` on `bg/primary`/`bg/secondary` must meet 4.5:1 (WCAG AA body text). `text/tertiary` may drop to 3:1 for de-emphasized metadata only, never primary content. `text/disabled` is exempt.
- **Inverse text** (`primary-inverse`, `secondary-inverse`) is only valid on `bg/primary-inverse` or bold/`-bolder` backgrounds — never on light backgrounds.
- **Background tiers:** `-subtle` backgrounds (badges, pills, tags) don't need to pass contrast against the page themselves, but text/icon on top of them does. Bold/default backgrounds (buttons, banners) must pass 3:1 against the surrounding surface.
- **Status colors:** always pair background, text/icon, and border from the *same* status family — never mix. Never convey status by color alone; pair with an icon or label.
- **Accent colors:** the 9 decorative accents must never imply state or urgency. `accent-indigo` is reserved for primary/interactive use only.

### Known gaps (documented, not yet fixed)

| Pairing | Ratio | Needs | Note |
|---|---|---|---|
| `text/tertiary` on `bg/primary` | 2.52:1 | 3:1 | Under the relaxed bar for metadata/placeholder text |
| `text/danger` on `bg/danger-subtle` | 3.09:1 | 4.5:1 | Same shortfall pattern on `text/warning` (1.93:1), `text/success` (1.87:1), `text/info` (3.01:1) — fine for short badge labels, fails if used for longer text |
| White text on `bg/danger` (default button) | 3.76:1 | 4.5:1 | The **hover** state (`bg/danger-bolder`, 4.83:1) actually passes — the resting state is less accessible than hover, which is backwards |
| White text on `bg/accent-indigo` (primary button) | 4.47:1 | 4.5:1 | Fails by a hair — borderline in practice |

---

## 6. Changelog & Rationale

| Change | From → To | Why |
|---|---|---|
| Idle status color | Gray → `text+icon/idle` (`#14b8a6`, teal) | Gray was already claimed by the "cancelled" status; teal reads as neutral/calm without the collision |
| Brand token | `brand/primary-500` → `accent-indigo` family | Consolidated the original brand blue/navy into the accent-indigo naming, and expanded its role to be the system's primary interactive color (buttons, selection, focus) rather than a single flat "brand" swatch |
| `border/primary-default` → `border/primary` | Label correction | Card was labeled with a suffix that didn't match its actual bound variable |
| `bg/disabled-subtle` → `bg/disabled` | Label correction | Same pattern — no `-subtle` variant of this token actually exists |
| Various orphaned variable rebinds | `text+icon/idle`, `bg/disabled`, `border/primary-subtle`, `text+icon/brand`→`accent-indigo`, `border/brand`→`accent-indigo` | These cards were bound to deleted variable IDs; rebound to the current live equivalents |
| `Body/Large-meduum` → `Body/Large-medium` | Typo fix | Fixed at the source (the live text style name itself) |
| Added `Body/Tiny-regular` (10px, Inter Regular) | New style | Avatar-initial text at 16px avatar size used a custom 10px/Regular text with no bound style; formalized it as a named type-scale entry instead of leaving it ad-hoc |
| Avatar component: removed 12px/14px size variants | Deleted, instances migrated to 16px | Confirmed via developer + real-component cross-check that 16px is the actual size in use; 55 existing instances across Table, Request list, and Activity log were swapped to 16px before the old variants were deleted. Scoped to the round `Avatar` variant only — the square-shaped `Square` variant's 12px/14px sizes were left untouched (separately confirmed in active use) |

---

## 7. Components

Component-level documentation (anatomy, variants, token usage per component, and any component-specific rationale) lives separately in [`components/`](components/), one file per component, rather than in this doc — token references stay here as the single source of truth, components reference tokens by name rather than repeating values.

- [`components/avatar.md`](components/avatar.md)
- [`components/bottom-sheet.md`](components/bottom-sheet.md)
- [`components/breadcrumb.md`](components/breadcrumb.md)
- [`components/button.md`](components/button.md)
- [`components/calendar.md`](components/calendar.md)
- [`components/chips-tag-badge.md`](components/chips-tag-badge.md)
- [`components/content-area.md`](components/content-area.md)
- [`components/divider.md`](components/divider.md)
- [`components/dropdown.md`](components/dropdown.md)
- [`components/icon-sidebar.md`](components/icon-sidebar.md)
- [`components/loading.md`](components/loading.md)
- [`components/menu-item.md`](components/menu-item.md)
- [`components/overlay.md`](components/overlay.md)
- [`components/dialog.md`](components/dialog.md)
- [`components/radio-checkbox-card.md`](components/radio-checkbox-card.md)
- [`components/toggle.md`](components/toggle.md)
- [`components/tooltip.md`](components/tooltip.md)
- [`components/scroll-area.md`](components/scroll-area.md)
- [`components/steps.md`](components/steps.md)
- [`components/tab.md`](components/tab.md)
- [`components/table.md`](components/table.md)
- [`components/text-input.md`](components/text-input.md)
- [`components/toast-alert.md`](components/toast-alert.md)
- [`components/nav-workspace-menu.md`](components/nav-workspace-menu.md)
- [`components/nav-shortcut-container.md`](components/nav-shortcut-container.md)
- [`components/nav-section-label.md`](components/nav-section-label.md)
- [`components/nav-item-l1.md`](components/nav-item-l1.md)
- [`components/nav-item-l2.md`](components/nav-item-l2.md)
- [`components/nav-unfoldable-list.md`](components/nav-unfoldable-list.md)
- [`components/nav-header-navigation.md`](components/nav-header-navigation.md)
- [`components/nav-mobile-tab-item.md`](components/nav-mobile-tab-item.md)
- [`components/nav-mobile-top-bar.md`](components/nav-mobile-top-bar.md)
- [`components/logo.md`](components/logo.md) — includes real exported SVG assets in `assets/logo/`, not just a text description
- [`components/illustration.md`](components/illustration.md) — includes 15 real exported SVG assets in `assets/illustrations/`, not just a text description
- [`components/home-widget-title.md`](components/home-widget-title.md)
- [`components/home-widget-status.md`](components/home-widget-status.md)
- [`components/home-widget-cards.md`](components/home-widget-cards.md)
- [`components/home-timeframe-filter.md`](components/home-timeframe-filter.md)
- [`components/home-activity-log-row.md`](components/home-activity-log-row.md)
- [`components/home-dashboard-widgets.md`](components/home-dashboard-widgets.md)
- [`components/notification-icons.md`](components/notification-icons.md)
- [`components/notification-card.md`](components/notification-card.md)
- [`components/notification-content-type.md`](components/notification-content-type.md)
- [`components/create-form-request-type.md`](components/create-form-request-type.md)
- [`components/create-form-priority.md`](components/create-form-priority.md)
- [`components/create-form-progress.md`](components/create-form-progress.md)
- [`components/create-form-general-details.md`](components/create-form-general-details.md)
- [`components/create-form-item-budget.md`](components/create-form-item-budget.md)
- [`components/create-form-reference-attachments.md`](components/create-form-reference-attachments.md)
- [`components/create-form-approval.md`](components/create-form-approval.md)
- [`components/create-form-preview.md`](components/create-form-preview.md)
- [`components/request-list-table-row.md`](components/request-list-table-row.md)
- [`components/request-list-company-chip.md`](components/request-list-company-chip.md)
- [`components/request-list-status-badge.md`](components/request-list-status-badge.md)
- [`components/request-list-viewbar.md`](components/request-list-viewbar.md)
- [`components/request-list-view-switch.md`](components/request-list-view-switch.md)
- [`components/request-list-empty-state.md`](components/request-list-empty-state.md)
- [`components/request-detail-inline-cell.md`](components/request-detail-inline-cell.md)
- [`components/request-detail-shell.md`](components/request-detail-shell.md)
- [`components/request-detail-approval-step.md`](components/request-detail-approval-step.md)
- [`components/request-detail-rejection-reason.md`](components/request-detail-rejection-reason.md)
- [`components/request-detail-status-label.md`](components/request-detail-status-label.md)
- [`components/request-detail-budget-status.md`](components/request-detail-budget-status.md)
- [`components/request-detail-sections.md`](components/request-detail-sections.md)
- [`components/request-detail-comment-thread.md`](components/request-detail-comment-thread.md)
- [`components/request-detail-role-tag.md`](components/request-detail-role-tag.md)
- [`components/request-card.md`](components/request-card.md)
- [`components/request-list-filter-chip.md`](components/request-list-filter-chip.md)
- [`components/request-list-filter-panel.md`](components/request-list-filter-panel.md)
- [`components/request-list-header-mobile.md`](components/request-list-header-mobile.md)
- [`components/request-detail-activity-log.md`](components/request-detail-activity-log.md)
- [`components/command-palette.md`](components/command-palette.md)
- [`components/keyboard-shortcuts-manual.md`](components/keyboard-shortcuts-manual.md)
- [`components/request-detail-approve-reject-dialog.md`](components/request-detail-approve-reject-dialog.md)
- [`components/request-detail-print-comment.md`](components/request-detail-print-comment.md)
- [`components/profile-identity-card.md`](components/profile-identity-card.md)
- [`components/profile-account-switcher.md`](components/profile-account-switcher.md)
- [`components/profile-settings-nav.md`](components/profile-settings-nav.md)
- [`components/profile-mobile-menu.md`](components/profile-mobile-menu.md)
- [`components/profile-photo-zoom.md`](components/profile-photo-zoom.md)
- [`components/profile-details-form.md`](components/profile-details-form.md)
- [`components/profile-notification-channels.md`](components/profile-notification-channels.md)
- [`components/settings-activity-log.md`](components/settings-activity-log.md)

## 8. Patterns

Composite structures assembled from multiple already-documented components — layout rules, states, and composition, not a token-by-token anatomy table (see each pattern doc for why). Lives in `patterns/`.

- [`patterns/app-shell.md`](patterns/app-shell.md)
- [`patterns/sidebar-navigation.md`](patterns/sidebar-navigation.md)
- [`patterns/mobile-bottom-navigation.md`](patterns/mobile-bottom-navigation.md)
- [`patterns/home-dashboard.md`](patterns/home-dashboard.md)
- [`patterns/create-form.md`](patterns/create-form.md)
- [`patterns/notification-system.md`](patterns/notification-system.md)
- [`patterns/request-table.md`](patterns/request-table.md)
- [`patterns/request-detail-slide-over.md`](patterns/request-detail-slide-over.md)
- [`patterns/profile-settings.md`](patterns/profile-settings.md)

---

*Known open items: the accent-color family (sky/ocean/emerald/etc.) currently has no documented rule against reuse across adjacent items in the same list — worth revisiting if visual collisions become a problem. Dark mode values exist for all semantic color tokens but are not documented here.*
