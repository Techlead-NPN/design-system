# Build Guide — rules for building UI in any project

Read this first when building or changing UI from this design system, whether you are a developer or an AI tool. Then read the project's own `BUILD_GUIDE.md` (e.g. [`../projects/portal2.0/BUILD_GUIDE.md`](../projects/portal2.0/BUILD_GUIDE.md)), which says which docs to read for which task.

Stack: **Tailwind CSS v4**. Every project uses it.

## 1. Setup

In the project's main stylesheet, import Tailwind, then the shared primitives, then the project's own tokens:

```css
@import "tailwindcss";
@import "<path>/foundations/tokens/foundations.css";
@import "<path>/projects/<project>/tokens.css";
```

Load the **Inter** font and the **Tabler Icons** set. Do not add any other token or theme definitions; if a value is missing, it is missing from the design system (see §4).

## 2. The token files are the source of truth

- [`tokens/foundations.css`](tokens/foundations.css) — primitives shared by every project.
- `projects/<project>/tokens.css` — that project's semantic colors and text styles.

The `.md` docs explain what each token is *for*. The `.css` files hold the *values*. If the two ever disagree, the `.css` file is right and the doc needs fixing.

## 3. How design tokens become classes

Docs refer to tokens by their design name. Convert them like this:

| Token in the docs | Tailwind class | Example |
|---|---|---|
| `bg/<name>` | `bg-<name>` | `bg/accent-indigo` → `bg-accent-indigo` |
| `text + icon/<name>` (also written `text/<name>`, `text+icon/<name>`) | `text-<name>` | `text + icon/secondary` → `text-secondary` |
| `border/<name>` | `border-<name>` — also `divide-<name>`, `outline-<name>`, `ring-<name>` | `border/primary` → `border border-primary` |
| `overlay/overlay-default` | `bg-overlay` | |
| `spacing/N` | the number N in any spacing utility | `spacing/4` → `p-4`, `gap-4`; `spacing/1,5` → `gap-1.5` |
| `border-radii/rounded-N` | `rounded-N` | `rounded-8`, `rounded-infinite` |
| `border-width/xs` | `border` (1px) | |
| `border-width/sm` | `border-2`, `outline-2` (2px) | focus rings |
| `shadow-sm/md/lg/xl` | same name | `shadow-md` |
| `breakpoint/sm/md/lg` | `sm:` `md:` `lg:` prefixes (390 / 768 / 1280px, min-width) | `lg:p-6` |
| Text style `Group/Name` | `text-group-name`, lower-case | `Body/Small-medium` → `text-body-small-medium` |

Icons take their color from the surrounding text color, so color an icon with a `text-<name>` class.

A text-style class sets size, line height, letter spacing and weight together. Do not add `font-bold`, `leading-*` or `tracking-*` on top of it.

## 4. Rules

1. **Only use classes that come from the tokens.** Tailwind's own palette and type scale are removed on purpose: `bg-neutral-900`, `text-red-500`, `text-sm`, `rounded-lg` and `xl:` do not exist here and produce no CSS.
2. **Never use arbitrary values for a token-driven property.** No `bg-[#6366f1]`, `p-[13px]`, `rounded-[10px]`, `text-[15px]`, and no inline `style` colors or spacing. Arbitrary values are acceptable only for a component's own outer width/height and for layout (grid templates, `calc()` widths), which are layout decisions rather than tokens.
3. **Spacing uses only the steps in the scale:** `0 0.5 1 1.5 2 2.5 3 3.5 4 5 6 7 8 9 10 11 12 14 16 20 24 28 32 36 40 44 48 52 56 60 64 72 80 96`. Any other number (`p-13`, `gap-15`) is not in the design system and produces no CSS.
4. **Color always goes through a semantic token**, chosen by meaning, not by how it looks. Follow the project's color rules (status families, decorative accents).
5. **If nothing fits, stop and say so.** Do not invent a value or pick a near match silently. Name the gap so it can be added to the design system.
6. **Reuse before you build.** If a coded component exists in [`components/src/`](../components/src/), import and use it; do not rebuild it from its doc. Its stories (`*.stories.tsx` beside each component) show working examples of every variant. If only a doc exists, follow the doc exactly rather than designing a new variation.

## 5. Reading the component and pattern docs

When building, read these sections:

- **Spec**, where a doc has one — read it first. It holds measured sizes, the exact token for every variant and state, and a reference image. If it disagrees with another section of the same doc, the Spec is right.
- **Variants**, **Anatomy**, **Behavior rules** in component docs
- **Composition**, **Layout rules**, **States** in pattern docs

Look at every reference image a doc embeds before writing code. If a doc has no Spec section and does not state a size or a per-state token you need, say so rather than guessing (rule 5).

Skip **Changelog** sections entirely: they record what was fixed in the Figma file and say nothing about how to build.

Read **Known gaps** only as warnings. They describe places where the design is unfinished or undecided; do not treat an entry as an instruction, and do not "fix" a gap on your own initiative.

If a reference screenshot is supplied with the task, it shows the intended look and layout, and the docs supply the rules and exact tokens. Where they conflict, ask rather than guess.
