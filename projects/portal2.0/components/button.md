# Button

The most reused component in the system — 144 variants covering hierarchy, accent, size, state, and inverted-surface combinations, plus a 24-variant icon-only sibling and a responsive button-group wrapper.

Figma: [`✅ Buttons`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Variant properties

**`Button/Button`** (144 variants): `Hierachy` (Primary / Outline / Ghost) × `Accent` (Default / Danger / Blue) × `Size` (Small / Medium) × `State` (Default / Hover / Disabled / Focus) × `Inverted?` (False / True). Plus non-variant properties: `Prefix Icon` / `Suffix icon` (boolean toggles), `Prefix icon type` / `Suffix icon type` (instance-swap), `Button Text`, `ShortcutHelper?` + `ShortcutValue` (the trailing `⌘O`-style hint).

**`IconButton/Icon Button`** (24 variants): `Style` (Primary / Outline / Ghost) × `State` (Default / Hover / Disable / Focus) × `Size` (32px / 24px).

**`Group Buttons`** (2 variants): `Type` (Horizontal / Vertical) × `Tertiary button?` (boolean). See "Button groups" below — this is the responsive 2-or-3-button cluster, distinct from Bottom sheet's own mobile-specific button rules.

Note: **"Danger" and "destructive" are the same thing** — this file's `Accent=Danger` is what other component docs (e.g. Bottom sheet) call the destructive variant.

## When to use each Hierarchy

- **Primary** — the one main action on a screen/section. Solid fill.
- **Outline** — secondary action, or a primary action in a context that already has a Primary button nearby (e.g. Cancel next to Save).
- **Ghost** — lowest-emphasis action, no border/fill until hovered. Used as the optional third ("tertiary") action in button groups.

## Anatomy & tokens by Accent

Each `Accent` drives a full set of role tokens, not just the background:

| Role | Default | Danger | Blue |
|---|---|---|---|
| Primary fill | `bg/accent-stone`-family neutrals (see live file) | `bg/danger` / `bg/danger-bolder` (hover) | `bg/accent-indigo` / `bg/accent-indigo-bolder` (hover) |
| Text/icon (on fill) | `text+icon/primary-inverse` | `text+icon/primary-inverse` | `text+icon/primary-inverse` |
| Outline border/text | `border/primary`, `text+icon/primary` | `border/danger`, `text+icon/danger` | `border/accent-indigo`, `text+icon/accent-indigo` |
| Focus ring | `border/accent-indigo` | `border/accent-indigo` | `border/accent-indigo` |
| Separator (the `\|` before a shortcut hint) | `border/primary-subtle` | `border/accent-blush` | `border/accent-sky` |
| Shortcut hint text (e.g. `⌘O`) | `text+icon/tertiary` | `text+icon/accent-blush` | `text+icon/accent-indigo-subtle` |

The Separator/Shortcut mapping is a deliberate, narrow exception to "accent colors are decorative" (see DESIGN.md §2.2) — `accent-blush`/`accent-sky` are reused here specifically to tint the shortcut-hint UI to match the button's Accent, not because blush/sky carry meaning on their own.

**Focus ring note:** regardless of a button's own Accent, the focus-visible ring is always `border/accent-indigo` — focus is a UI-state, not a content-accent, and stays consistent.

## Button groups (`Group Buttons`)

This component is the **desktop** pattern — a horizontal or vertical cluster of up to 3 buttons (Primary + Outline + optional Ghost via `Tertiary button?`), used for things like a sticky action bar at the bottom of a form.

- **Horizontal, 2 buttons:** Outline (left) + Primary (right).
- **Horizontal, 3 buttons (`Tertiary button?`=true):** Ghost (left) + Outline (middle) + Primary (right).
- **Vertical, 2 buttons:** Primary (top) + Outline (below).
- **Vertical, 3 buttons:** Primary (top) + Outline (middle) + Ghost (bottom).
- **Up to 4 buttons:** not a single component — compose a standalone Ghost/Outline `Button` instance aligned left (e.g. "< Back") next to a `Group Buttons` cluster aligned right. Example: `< Back` ⋯⋯⋯ `Cancel` `Save` `Next`.

**This is a desktop pattern, not the mobile Bottom Sheet rule.** Bottom Sheet's "always vertical for 3 CTAs" rule (see `bottom-sheet.md`) is specific to its narrow mobile container — it does not use this `Group Buttons` component at all (confirmed: Bottom Sheet's button row is an ad-hoc 2-button frame, not an instance of this component). On wider/desktop layouts, horizontal 3-up is the correct, already-built pattern.

## Known gaps

- **Adaptive subtle overlay (16 instances) — resolved 2026-08-20:** a very low-opacity black (4%) used as both a barely-visible edge stroke on solid buttons and a hover-fill tint on outline/ghost buttons. Previously described here as "left unbound," but was actually bound to a variable named `transparent/light` that had since been **deleted from the file's active variable collection** — an orphaned reference invisible in Figma's own Variables panel (`getLocalVariablesAsync` no longer lists it) yet still resolvable via its old ID, so the 16 instances kept rendering correctly while silently pointing at nothing real. Discovered while auditing [Approve & Reject dialog](request-detail-approve-reject-dialog.md) and confirmed file-wide on this page. At the user's request, cleared all 16 dangling bindings and set the same `rgba(0,0,0,0.04)` as a static (unbound) color — visually identical, no more orphaned reference. The underlying gap remains real: our token system still has no equivalent "adaptive overlay" utility that would correctly invert to a light tint on `Inverted?=True` surfaces (this fix keeps the value fixed-black, matching the original's actual behavior, which also had no such adaptation — confirmed via a single-mode variable value, not a genuine light/dark pair). Worth considering as a future Foundation primitive if this pattern recurs.
- **Icon internal vector stroke (24 instances, 1.1px):** same pattern seen in every other component so far — icon glyph strokes don't align to the `border-width` scale (only `xs`=1px exists). Left unbound.

## Changelog

- **2026-08-20:** cleaned up 16 dangling `transparent/light` variable bindings (see Known gaps for the full orphaned-variable story) — discovered while auditing a moved Request list component, traced back to this shared page. Fixed on the actual master components, so every Button instance across the file benefits. Verified visually before/after on the specific Danger/Medium/Default variant and the downstream [Approve & Reject dialog](request-detail-approve-reject-dialog.md) — pixel-identical, no rendering changes.
- **994 color properties audited** across all 170 variants (144 Button + 24 IconButton + 2 Group Buttons). This was overwhelmingly bound to a **different, deprecated design system's tokens** (`palette-deprecated/*`, `adaptive-colors-deprecated/*`, `accent-depreciated/*`, plus generic names like `transparent/light`, `grays/40`) — not just unbound, actually wrong-library-bound. 242 foreign bindings identified and remapped to Portal 2.0 tokens (see table above); 16 left unbound as a genuine capability gap (see Known gaps).
- Found and fixed 2 orphaned references to this file's own **pre-rename** tokens (`border/brand`, `text + icon/brand`, both `#4450f7`) — same pattern as the Color page's early orphaned-variable fixes, just not caught until this pass. Rebound to `border/accent-indigo` / `text + icon/accent-indigo`.
- Found a mislabeled token (`borders/danger`, used on text fills despite its name) — confirmed with the design owner it should be `text + icon/primary-inverse`, not a danger-family token at all. Fixed 29 instances.
- Fixed 320 corner-radius, 97 stroke-weight, 794 spacing bindings to Foundation primitives. The `cornerRadius=56` pattern (144 instances) was the same "arbitrarily large value to force full rounding" pattern seen in Avatar — rebound to `border-radii/rounded-infinite`.
- Fixed 312 unbound white fills on the default placeholder icon (`icon/circle-dashed`, shown when no prefix/suffix icon is chosen) to `bg/primary` — same non-issue pattern as other components' placeholder defaults.
- Documented the `Group Buttons` component's existing Horizontal/Vertical/Tertiary behavior, and clarified its relationship to (and separation from) Bottom Sheet's mobile-specific button rules.
