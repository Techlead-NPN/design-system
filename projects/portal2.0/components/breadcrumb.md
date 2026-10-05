# Breadcrumb

Navigational trail showing the user's current location in the app hierarchy, from root to current page.

Figma: [`✅ Breadrcumb`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Anatomy

`[icon]  Level / Level / Level / Level` — leading icon, then one `.breadcrumb step` per level, separated by `/`.

| Part | Token(s) |
|---|---|
| Ancestor step (clickable) — separator + label | `text + icon/tertiary`, `Body/Small-regular` |
| Current step (last, non-clickable) — separator + label | `text + icon/primary`, `Body/Small-regular` |
| Leading icon | Tabler `icon/home` by default (16×16), stroke bound to `text + icon/tertiary` |

Note: both states use the *same* text style (`Body/Small-regular`) — the visual "boldness" difference on the current step is entirely from the primary/tertiary color contrast, not a font-weight change.

## Behavior rules

- **Clickability:** every level except the current (last) one is a link to that level. The current level is never interactive.
- **Leading icon is contextual**, not fixed: it represents the section the trail starts in. Defaults to `icon/home` for the app root; swap to a different Tabler icon if a trail genuinely starts inside another section (e.g. a bell for a Notifications-rooted trail). Don't default to a random/unrelated icon — pick deliberately per the starting section.
- **Never wraps** to a second line — always truncates instead (see below).
- **Long trails (5+ levels):** collapse the middle into a `…` menu — clicking reveals the hidden levels — keeping the first item and the last 2 visible.
- **Long individual label:** truncates with an ellipsis at a max-width rather than expanding the whole bar.
- **Mobile/narrow screens:** the full trail is replaced with just a back chevron + the immediate parent level — this is a *different* pattern from the `…` collapse used at wider breakpoints, not a smaller version of it.

## Open gaps (component doesn't yet match spec)

None of the behavior rules above have a matching Figma variant yet — only the plain 2/3/4-level trail exists. Flagging rather than building now, per the same "capture rules first, build later" approach used for Bottom sheet:

- No `…` collapse/overflow variant
- No per-label max-width/truncation constraint
- No mobile "Back + parent" variant

## Changelog

- Fixed 5 unbound white-fill color bindings (2 at the shared step-state components, cascading to all nested instances; 3 on the leading icon) to `bg/primary`.
- **Replaced the leading icon** — it was a bell (notifications icon), which made no sense as a default breadcrumb-root icon and was confirmed to be an arbitrary placeholder, not intentional. Swapped to Tabler's outline `icon/home` (matching the file's existing outline-icon style over the alternate filled version), resized to match the original 16×16 slot, and colored to `text + icon/tertiary` to match the rest of the ancestor styling. Applied across all 3 Level variants.
- Left the leading icon's internal vector stroke weight (1.1px) unbound — no exact Foundation match, same pattern as prior components.
- Documented usage/behavior rules (clickability, icon logic, overflow, truncation, mobile behavior) that weren't previously written down — sourced from the design owner.
- Wrote the same usage rules into the Figma file's page Description field for designers working directly in Figma.
- Added granular Figma **annotations** (Dev Mode) pinned to the specific elements each rule governs — step states (clickability), the leading icon (contextual/defaults-to-home logic), and each Level component (no-wrap + overflow-collapse + mobile behavior). These are read by AI design tooling in addition to being visible to designers in Dev Mode.
