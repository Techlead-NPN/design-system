# Command palette

The global ⌘K search/command palette, desktop and mobile.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Menu_Search_Desktop` and `Menu_Search_mobile` components (inside `Command Palette`).

## Anatomy

| Part | Token(s) |
|---|---|
| Panel — fill, border, radius, shadow | `bg/primary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8`/`rounded-12` |
| Search input | `text + icon/tertiary` placeholder, `text + icon/primary` typed value |
| Result row (icon + label + keyboard shortcut hint) | `text + icon/primary`, `Body/Small-medium`; shortcut hint `text + icon/tertiary` |
| Section grouping (Navigation / Actions / Quick Create) | `Support/Caption`, `text + icon/tertiary` |

## Variants

`Menu_Search_Desktop`'s `Property 1`: `First time` (empty state, likely showing default suggestions — see [Keyboard shortcuts manual](keyboard-shortcuts-manual.md)'s categories), `No results found`, `typing..`, `loading`, `Returning` (recently-used results). `Menu_Search_mobile`'s `Property 1`: `First time` / `Returning` — a reduced state set for the mobile variant.

## Behavior rules

- **Opens globally via ⌘K** (confirmed via the assembled `Menu_Search_Desktop=First time` reference, which shows Navigation/Actions/Quick Create sections with keyboard shortcut hints matching [Keyboard shortcuts manual](keyboard-shortcuts-manual.md)) — not scoped to the Request list page despite living on this page in Figma.
- **`Returning` likely shows recently-accessed items or last search results** above the default suggestion set, to speed up repeat actions.
- **Mobile omits `No results found`/`typing..`/`loading` as distinct states** — likely folded into a simpler live-filtering UI without separate loading/empty visual states, or those states weren't built out yet; flagging as worth confirming.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Mobile's smaller state set (2 vs. 5) isn't explained by the Figma file** — could be an intentional simplification or an incomplete build; flagging rather than assuming.
- **Despite being grouped under the Request list page's `Command Palette` frame, this is a page-agnostic, app-wide feature** — worth relocating in Figma's file structure to a more global/shared location if the page-per-screen organization is meant to reflect scope, though not renamed/moved without confirmation.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — part of the 1429-fix `Request card`/`Comment`/`Command Palette` pass.
- Verified visually before/after — confirmed via screenshot that `Menu_Search_Desktop=First time` renders the fully-functional ⌘K palette reference, no rendering changes from the fix pass.
- Documented anatomy, variants, and behavior rules for the first time — previously undocumented.
