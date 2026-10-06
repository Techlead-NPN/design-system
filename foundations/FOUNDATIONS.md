# Foundations — Shared Design System Reference

This document is the source of truth for everything that is shared across **every** project's design system: the token architecture, the raw primitives, and the icon set. Each project's own `DESIGN.md` (under [`../projects/`](../projects/)) builds on top of this and documents only what is specific to that project — its semantic tokens, text styles, components, and patterns.

It's written for three audiences at once: designers, engineers implementing tokens in code, and AI tools generating or modifying designs from this spec ("vibe design"). If a rule here isn't followed, treat it as a bug.

Figma source: the shared **Foundations** file (`n9KB4M3kiVBxwWJPe1HGyB`).

**Values live in code:** [`tokens/foundations.css`](tokens/foundations.css) holds every primitive below as Tailwind CSS v4 tokens and is the source of truth for the values. To build UI from this system, start at [`BUILD_GUIDE.md`](BUILD_GUIDE.md).

---

## 1. Token Architecture

Two files per project, two layers:

- **Foundations file** (shared across all projects): raw color, sizing, and typography primitives, plus effect and grid styles. Sourced from **Tailwind CSS's default palette** for color. Icons are **Tabler Icons**.
- **Project file** (one per project, e.g. Portal 2.0): semantic color tokens that alias Foundation primitives, the project's text styles, plus all components.

### The binding rule

| Property | Components bind to | Never bind directly to |
|---|---|---|
| Color | **Semantic token** (e.g. `text/primary`) | A primitive (`neutral/900`) or a raw hex value |
| Spacing, padding, gap | **Primitive** (`spacing/4`) directly | — there is no semantic spacing layer |
| Border-radius, border-width | **Primitive** directly (`border-radii/rounded-8`) | — no semantic layer |
| Shadows/elevation | **Effect style** directly (`shadow-md`) | — no semantic layer |

This asymmetry is intentional: color needs a semantic layer because its *meaning* (danger, brand, disabled) matters and needs to be swappable independent of the raw value. Sizing doesn't carry meaning the same way, so there's no indirection — components reference Foundation primitives for sizing directly.

### Exception: OS chrome

Elements that are genuine operating-system UI — home indicators, system status bars, native drag handles, and similar OS-level chrome — are exempt from the binding rule above and correctly stay bound to the platform's own system color library (e.g. Apple's `Fills - Vibrant/Primary`, `Labels/Primary`) rather than a project's semantic tokens. These aren't part of the app's design surface; they're the OS rendering its own UI, and should track the OS's own theming, not this design system's. When auditing a component, don't flag or rebind anything that's genuinely OS chrome — geometry (radius, spacing) still follows the primitives below as normal, only the *color* binding is exempt.

**If you're an AI tool reading this to generate a design:** never invent a hex value or a spacing number. Always resolve to an existing token name — a primitive from this document for sizing, a semantic token from the project's `DESIGN.md` for color.

---

## 2. Primitives

Full values live in [`tokens/foundations.css`](tokens/foundations.css); this is the reference summary.

### 2.1 Color primitives (`raw colors`)

Tailwind's default palette (248 tokens — 22 families × 11 steps, plus `base/white`, `base/black`, and four black-alpha variants). Two departures from Tailwind's own values: the `green` family is a custom scale (`green/500` = `#6ecd32`), and `red/100` is `#ffe2e2`. Each project's semantic color tokens alias these; never reference a raw color primitive from a component.

### 2.2 Sizing primitives (`raw sizing`)

Bound **directly** by components — no semantic layer (see §1).

| Scale | Count | Range / Pattern |
|---|---|---|
| `spacing/*` | 35 | 4px-based scale (`spacing/N` = N × 4px), `spacing/0` → `spacing/96`, including half-steps (`spacing/0,5` = 2px, `spacing/1,5` = 6px, etc.), plus `spacing/infinite` (9999px) |
| `border-width/*` | 2 | `border-width/xs` = 1px (borders and dividers), `border-width/sm` = 2px (focus rings) |
| `border-radii/*` | 9 | `rounded-2`, `rounded-4`, `rounded-6`, `rounded-8`, `rounded-10`, `rounded-12`, `rounded-16`, `rounded-24`, plus `rounded-infinite` (9999px, for pills/circles) |
| `breakpoint/*` | 3 | `sm` 390px, `md` 768px, `lg` 1280px |

### 2.3 Typography primitives (`raw typo`)

| Scale | Count | Range / Pattern |
|---|---|---|
| `font-size/*` | 12 | `3xs` (10px) → `6xl` (72px) |
| `line-height/*` | 9 | `2xs` (16px) → `4xl` (90px) |
| `letter-spacing/*` | 6 | `2xs` (-1.5px) → `xl` (1px) |

Named text styles (e.g. `Body/Small-medium`) are built from these scales but live in each project's own file — see the project's `DESIGN.md`.

### 2.4 Effect styles

Shadows: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl` — built from primitive `offset-x/y`, `blur`, `spread`, and `opacity` tokens.

### 2.5 Grid styles

Responsive layout grids, defined in the Foundations file (not present as local styles in project files):

| Grid | Columns | Gutter | Margin | Pairs with |
|---|---|---|---|---|
| `Desktop` | 12 | 24px | 40px | `breakpoint/lg` (1280px) |
| `Tablet` | 8 | 24px | 40px | `breakpoint/md` (768px) |
| `Mobile` | 4 | 16px | 16px | `breakpoint/sm` (390px) |

---

## 3. Icons

**Tabler Icons** — icon names in every project (e.g. `icon/circle-dashed`, `icon/file-type-pdf`) map directly to the Tabler icon set.

---

## 4. Changelog & Rationale

| Change | From → To | Why |
|---|---|---|
| Added `border-radii/rounded-2` (2px) | New primitive | The small square avatars (12–16px) use a 2px corner radius and the scale started at 4px, leaving a raw value |
| Added `border-width/sm` (2px) | New primitive | The focus ring on buttons is 2px wide and the scale only had 1px, leaving a raw value in every Focus variant |
| `opacity/opacity-100`, `border-radii/rounded-infinite` | Foundation file fixes | Corrected a 0–1 scale violation (was `100`, now `1`) and a stray character in the radius token name |

---

## 5. Building and maintaining

- [`BUILD_GUIDE.md`](BUILD_GUIDE.md) — rules for building UI from this system; read before writing any code

Process docs for maintaining the docs against Figma live in [`workflow/`](workflow/):

- [`workflow/AUDIT_WORKFLOW.md`](workflow/AUDIT_WORKFLOW.md) — how a component is audited against the tokens and documented
- [`workflow/DRIFT_CHECK.md`](workflow/DRIFT_CHECK.md) — how to check a project's Figma file for structural drift against its snapshot
