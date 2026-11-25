# Profile / Photo zoom

The profile-photo crop/zoom widget shown when updating an avatar image: a preview with a zoom slider control.

Figma: [`Setting - Profile`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Pic zoom` component (the assembled widget) and `Zoom` component (the slider atom), both inside `Profile`.

## Anatomy

| Part | Token(s) |
|---|---|
| Photo preview — radius, border | `border-radii/rounded-8`, `border/primary-subtle` |
| Zoom slider — track, handle | `Zoom`'s embedded slider control |
| Zoom out/in icons | `text + icon/tertiary` |

## Variants

Both `Pic zoom` and `Zoom` share `Property 1`: `Default` / `Zoom in` — confirmed via screenshot that `Zoom in` shows both a visibly closer-cropped photo and the slider handle moved right, i.e. the two properties move in sync (photo crop level ↔ slider position).

## Behavior rules

- **`Pic zoom` embeds `Zoom` as its slider control** — `Zoom` is the reusable atom, `Pic zoom` is the composite (photo + slider) shown twice on the `Profile` page's reference (once per `Property 1` state, not simultaneously).
- **Dragging the slider recrops the photo preview in real time** — the two `Property 1` states are snapshots of before/after dragging, not independent toggles.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`Pic zoom`'s outer frame has an unbound `cornerRadius=5`** with no matching Foundation primitive (scale jumps 4→6) — same recurring artifact seen across multiple frames on this page, likely a default-wrapper value rather than meaningful; left unbound and flagged rather than snapped without confirmation.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — 17 fixes on `Pic zoom`, 19 on `Zoom`. Part of the combined 655-fix pass across `Setting - Profile`/`Setting - Activity log`.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, clarifying the atom/composite relationship between `Zoom` and `Pic zoom` — previously undocumented.
