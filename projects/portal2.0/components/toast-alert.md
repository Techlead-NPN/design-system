# Toast notification, Alert message, & Callout

Three status/feedback components sharing one Figma page, all keyed by the same four semantic states (success, error/danger, info, warning) but at different levels of visual weight and persistence: **Toast notification** (a temporary, dismissible popup), **Alert message** (a persistent inline banner strip), and **Callout** (a persistent, bordered content card with a headline + supporting text).

Figma: [`✅ Toast & Alert message`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Spec

Measured from Figma on 2026-10-07, then tidied with the design owner; Figma was updated to match. Where this section and the sections below disagree, this section is right.

Coded in [`components/src/feedback/Toast.tsx`](../../../components/src/feedback/Toast.tsx) (`Toast`, `Alert`, `Callout`).

All three use the same four statuses. Each status has one icon (16px) and one color family:

| Status | Icon | Icon color | `-A80` background | Border |
|---|---|---|---|---|
| Info | `icon/info-circle` | `text + icon/info` | `bg/info-subtle-A80` | `border/info` |
| Success | `icon/circle-check` | `text + icon/success` | `bg/success-subtle-A80` | `border/success` |
| Warning | `icon/alert-triangle` | `text + icon/warning` | `bg/warning-subtle-A80` | `border/warning` |
| Danger / Error | `icon/circle-x` | `text + icon/danger` | `bg/danger-subtle-A80` | `border/danger` |

The `-A80` tokens are 80% transparent. In Figma the fill of a toast or alert shows "80%": that is the token's own opacity, so leave it as it is.

**Toast notification** — floats over the page.

![Toast notification](../assets/reference/toast.png)

| Part | Value |
|---|---|
| Box | 450px wide, padding `spacing/2` (8px), `border-radii/rounded-6`, fill the status's `-A80` background, no border |
| Effect | `shadow-lg`, the same style as menus, dialogs and the calendar card |
| Left | status icon, then `spacing/1` (4px), then title and description `spacing/1` (4px) apart |
| Title | `Body/Small-medium`, `text + icon/secondary` |
| Description (optional) | `Support/Caption`, `text + icon/tertiary` |
| Right, `spacing/4` (16px) from the text | optional Small Ghost [Button](button.md), then a 24px close button with `icon/x` |

**Alert message** — an inline banner.

![Alert message, Full and Short](../assets/reference/alert.png)

| Part | Value |
|---|---|
| Box | padding `spacing/2` (8px), `spacing/2` (8px) between parts, `border-radii/rounded-6`, fill the status's `-A80` background, no border or shadow |
| Text | `Body/Small-regular`, in the status's **text** color (not neutral) |
| Action (optional) | Small Primary/Default [Button](button.md) |
| `Type=Full` | one row, 40px high: icon, text, action at the right edge |
| `Type=Short` | the action drops to a second row, right-aligned (for narrow containers; 327px in the reference) |

**Callout** — a boxed note.

![Callout](../assets/reference/callout.png)

| Part | Value |
|---|---|
| Box | padding `spacing/3` (12px), `spacing/1` (4px) between rows, `border-radii/rounded-8`, fill `bg/secondary`, `border-width/xs` border in the status's border color |
| Title row | status icon, `spacing/2` (8px), title in `Body/Small-medium`, `text + icon/primary`, then a 24px Ghost close [Icon Button](button.md) |
| Body (optional) | `Body/Small-regular`, `text + icon/tertiary`, indented 24px so it lines up with the title |
| Action (optional) | Small Ghost Button, right-aligned on its own row |

## Toast notification

450×56px (base, grows with content). A temporary popup that appears in response to a user action or system event and auto-dismisses or is manually closed.

| Part | Token(s) |
|---|---|
| Card — fill | `bg/success-subtle-A80` / `bg/danger-subtle-A80` / `bg/info-subtle` / `bg/warning-subtle-A80` per `Type` |
| Card — radius, padding, gap | `border-radii/rounded-6`, `spacing/2` (8px) padding, `spacing/4` (16px) gap between icon+text and CTA/close |
| Status icon | remote icon-library instance (`icon/circle-check`, `icon/circle-x`, `icon/info-circle`, `icon/alert-triangle`) — color follows the icon's own instance, not a local token |
| Icon/text gap | `spacing/1` (4px) |
| Title | `text + icon/secondary`, `Body/Small-medium` |
| Description | `text + icon/tertiary`, `Support/Caption` |
| CTA | embedded `Button/Button` instance (see [Button](button.md)) |
| Close button | remote instance (`State=Default, Container=24px, Color=Secondary`) — external icon-button library component, no local main component to edit |

**Variants:** `Type` = `Warning` / `Success` / `Error` / `Info`. Plus booleans `Description?`, `Close btn?`, `CTA button?` (all default `true`) and text overrides `Title`, `Description`. 4 built variants, all combinations reachable via the booleans.

## Alert message

512×40px (base row, grows if `Sub text?` is on). A persistent inline banner — sits in the page flow rather than floating, for messages the user should notice but doesn't need to dismiss.

| Part | Token(s) |
|---|---|
| Bar — fill | `bg/success-subtle-A80` / `bg/danger-subtle-A80` / `bg/info-subtle-A80` / `bg/warning-subtle-A80` per `Type` |
| Bar — radius, padding, gap | `border-radii/rounded-6`, `spacing/2` (8px) padding/gap between icon and text |
| Status icon | remote icon-library instance, same set as Toast |
| Text | `text + icon/success` / `danger` / `info` / `warning` (color follows `Type`), `Body/Small-regular` |
| Icon-frame inset | `spacing/2,5` (10px) — inert single-child gap, bound for consistency with the rest of the system |
| CTA | embedded `Button/Button` instance, `Hierarchy=Primary` |

**Variants:** `Type` = `Success` / `Danger` / `Info` / `Warning`. Plus booleans `Icon?`, `Sub text?` (default off), `Button?`, and text override `Text`. 4 built variants.

## Callout

512×120px (base, grows with H2/tag content). A persistent, bordered card for longer-form contextual explanations — the heaviest-weight of the three, used when a message needs a headline, a supporting sentence, and optionally a "Learn more" link or tags.

| Part | Token(s) |
|---|---|
| Card — fill | `bg/secondary` |
| Card — border | `border/info` / `success` / `warning` / `danger` per `State` |
| Card — radius, padding, border-width, gap | `border-radii/rounded-8`, `spacing/3` (12px) padding, `border-width/xs`, `spacing/1` (4px) outer gap |
| Status icon | remote icon-library instance, same set as Toast/Alert |
| Title row gap (icon + H1 + close) | `spacing/2` (8px) |
| H1 | `text + icon/primary`, `Body/Small-medium` |
| H2 | `text + icon/secondary`, `Body/Small-regular` |
| H2 → tag row gap | `spacing/2,5` (10px) |
| Tag row → top inset | `spacing/6` (24px) |
| Close icon | local `IconButton/Icon Button` instance (`Style=Ghost`) — same component used elsewhere in the system, not remote |
| Tags | embedded `Chips/Tag` instances (see [Chips/Tag & Badge](chips-tag-badge.md)), `Hierarchy=Secondary`, `Roundness=True` |
| "Learn more" link | embedded `Button/Button` instance, `Hierarchy=Ghost` |

**Variants:** `State` = `Info` / `Success` / `Warning` / `Error`. Plus booleans `Tag contain` (default off), `Close icon`, `CTA?`, and text overrides `H1`, `H2`. 4 built variants.

## Behavior rules

- **Pick by persistence and weight, not just by "which one looks right"**: Toast for a transient, dismissible notice tied to a user action (auto-dismisses or is manually closed, doesn't block layout); Alert message for a persistent but lightweight inline notice that should stay visible in context; Callout for a persistent notice that needs a headline + explanation + optional link/tags, the most content-heavy of the three.
- **All three share the same 4-state semantic vocabulary** (success/error-danger/info/warning) even though the actual variant property names differ across them (`Type` on Toast/Alert, `State` on Callout) and the error option is spelled `Error` on Toast/Callout but `Danger` on Alert — see Known gaps.
- **Toast and Alert's status icon color is tied to `Type`/state automatically** via the swapped icon-library instance; don't override the icon's color independently of the state.
- **Callout's border color is the primary state signal** (colored border on a neutral `bg/secondary` fill) rather than a colored fill like Toast/Alert — this is intentional, matching a "card" visual weight rather than a "banner" one.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)


- **Inconsistent naming for the same 4-state concept across all three components**: variant property is `Type` (Toast, Alert) vs `State` (Callout); the error/danger option is `Error` (Toast, Callout) vs `Danger` (Alert). Flagging rather than renaming, since renaming a variant option or property is a structural change that would need to be re-confirmed on real usages first.
- **Toast's `Type=Info` fill uses `bg/info-subtle` (opaque) while `Success`/`Error`/`Warning` all use their `-subtle-A80` (translucent) equivalents.** Might be an intentional exception or might be a stray pick — flagging, not changing the fill.
- **Toast's remote `Close` button and all four components' remote status icons are external icon/icon-button library components** (`remote: true`, no local main component in this file) — their internal styling (e.g. a foreign `Text/Secondary` color token seen on the Close button) belongs to that external library and is out of scope to rebind here, same precedent as [Table](table.md)'s `IconButton/Floating Icon Button`. Visually they already render correctly against this system's palette; only worth an instance-level override if that changes.
- **The page's `.Component Page Header` Description field previously contained leftover Tooltip copy** ("Small, interactive popup boxes that appear when a user hovers over...") — replaced with accurate copy for this page as part of this audit (see Changelog).

## Changelog

- **2026-10-07:** added the Spec section and tidied with the design owner. In Figma: the Info toast was switched from `bg/info-subtle` to `bg/info-subtle-A80` so all four match. (An earlier version of this entry said an extra 80% layer opacity had been removed. That was a misreading: the 80% shown on each fill is the token's own opacity. The fills were briefly forced to 100% and then restored the same day; nothing else changed.) The `-A80` tokens themselves were re-pointed by the design owner (see `DESIGN.md` changelog), so info, warning and danger backgrounds are slightly stronger. The toast's custom effect (a background blur plus three drop shadows) was replaced with the `shadow-lg` effect style on all four variants. First coded versions added.
- Bound previously-unbound `itemSpacing`/padding on inert single-child "Icon" wrapper frames (10px → `spacing/2,5`) across all 12 variants (Toast ×4, Alert ×4, Callout ×4), matching the "bind inert gaps for consistency" precedent from [Toggle](toggle.md)/[Divider](divider.md).
- Toast: bound `CTA` frame's `itemSpacing`/padding (0 → `spacing/0`) — a real, non-inert gap between the CTA button and close button, previously unbound.
- Alert message: bound the `text` wrapper's `itemSpacing` (8px → `spacing/2`), and the embedded `Button/Button`'s `strokeWeight` (1px → `border-width/xs`, was unbound despite the Button component itself already being token-bound on its own page — an instance-level override had reset it).
- Callout: bound the card's own `strokeWeight` (1px → `border-width/xs`, the border itself was unbound), the title row's `itemSpacing` (8px → `spacing/2`), the H2-to-tag-row gap (10px → `spacing/2,5`), and the 3 embedded `Chips/Tag` instances' `strokeWeight` (1px → `border-width/xs`, same instance-override-reset pattern as Alert's Button) — across all 4 states.
- Bound remaining zero-value unbound padding on inner wrapper frames (`Icon & text`, `text`, `text & sub`, `Notification title` ×2, `Frame 1400002021`) to `spacing/0` across all variants, for completeness.
- Replaced the page's `.Component Page Header` Description — it contained leftover copy describing Tooltips, not Toast/Alert/Callout.
- Verified visually before/after on all three components — no rendering changes.
- Documented anatomy, variants, and behavior rules — not previously written down.
