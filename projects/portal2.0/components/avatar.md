# Avatar

Circular or square badge representing a user, company, or generic entity — either a photo, a low-contrast color badge with initials, or (in the `Square` variant) a plain-letter fallback.

Figma: [`✅ Avatar`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md) — this doc never repeats raw values, only token names.

## Variant families

Two distinct component sets live on this page — they are not interchangeable and are not sized the same:

| | `Avatar` | `Square` |
|---|---|---|
| Shape | Circular (`border-radii/rounded-infinite`) | Square with small corner radius |
| Styles | `Picture` (photo), `Low contrast letter` (color + initials) | `Picture`, `Initials`, `Initials hover` |
| Sizes | 36px, 16px, 20px, 24px | 40px, 12px, 14px, 16px, 20px, 24px |

Do not assume a size available on one exists on the other — `Avatar` no longer has 12px/14px (see Changelog below), `Square` still does.

## `Avatar` — Low contrast letter colors

Each color name binds to a background + text token pair. Most are decorative, but **two are not** — worth knowing before treating this like a purely-arbitrary color picker:

| Color name | Background token | Text token | Meaning |
|---|---|---|---|
| Green | `bg/success-subtle` | `text + icon/success` | **Semantic** — reuses the success status color, not decorative |
| Red | `bg/danger-subtle` | `text + icon/danger` | **Semantic** — reuses the danger status color, not decorative |
| Blue | `bg/accent-indigo-subtlest` | `text + icon/accent-indigo` | Brand/interactive indigo, not a generic "blue" accent |
| Teal | `bg/accent-teal` | `text + icon/accent-teal` | Decorative |
| Sky | `bg/accent-sky` | `text + icon/accent-sky` | Decorative |
| Purple | `bg/accent-fuchsia` | `text + icon/accent-fuchsia` | Decorative (name says Purple, token family is fuchsia) |
| Pink | `bg/accent-blush` | `text + icon/accent-blush` | Decorative (name says Pink, token family is blush) |
| Orange | `bg/accent-peach` | `text + icon/accent-peach` | Decorative |
| Yellow | `bg/accent-sun` | `text + icon/accent-sun` | Decorative |
| Gray | `bg/accent-stone` | `text + icon/secondary` | Decorative background, but text intentionally uses the neutral secondary color rather than `accent-stone`'s own text token — better contrast against the near-white background |

**Implication:** if you're picking an avatar color for a new user/entity, `Green` and `Red` are not neutral choices — they'll visually read as "success" and "danger" states to anyone who's learned the rest of the system. Prefer the other 8 for pure visual variety.

## Sizing tokens

- Circularity: all `Avatar`-frame containers bind `cornerRadius` to `border-radii/rounded-infinite`, not a fixed pixel value — guarantees a perfect circle at any size.
- Ring/stroke: `border-width/xs` (1px) on both frames.
- `Square` frame's corner radius (2px) and its `Initials hover` stroke weight (4px) are **not bound to any Foundation token** — no `rounded-2` or wider `border-width` step exists in the Foundation scale. Left unbound rather than forced to the nearest (visually different) available value. Flagged as an open gap in the Foundation sizing scale, not a binding bug in this component.

## Text style

Avatar initials ("AB") use `Body/Tiny-regular` (10px, Inter Regular) at the 16px avatar size — a style created specifically for this component (see DESIGN.md changelog). `Square`'s Initials variants use `Support/Caption` (12px) — already correct, no relation to the above.

## Changelog

- **Removed 12px/14px from `Avatar`, kept on `Square`.** Cross-checked against a real in-app component (Request card, node `2424:18298`) and confirmed 16px is the size actually specified. Before deletion, audited all 40 small-size variants across every page: found 55 live instances of `Avatar`-frame 12px/14px (Table: 4, Request list: 27, Activity log: 24), all migrated to the matching 16px color variant via component swap, verified via async main-component resolution (the synchronous `mainComponent` property proved unreliable on deeply-nested instances during this migration — resolve via `getMainComponentAsync()` for any future bulk swap work). `Square`'s 12px/14px were separately confirmed in active use (47 instances) and were explicitly out of scope for removal.
- **Created `Body/Tiny-regular`** to formalize the previously-unbound 10px/Regular text used by the 16px avatar's initials.
- Fixed 3 unbound colors, 73 corner-radius bindings, and 159 stroke-weight bindings across both variant families to reference Foundation primitives instead of raw values.
- Added granular Figma annotations pinned to specific elements: `Avatar` frame root (circularity rule + the 12px/14px removal, warning against reintroducing without checking usage), `Green`/`Red` swatches (semantic-not-decorative warning), `Gray` swatch (the text-token deviation), `Square` frame root (distinct from `Avatar`, sizes not in parity). Visible directly in Figma (Design or Dev mode) in addition to this doc.
