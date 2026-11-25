# Divider

A thin separator line with configurable reserved spacing around it, used to visually break up content in a list or panel. Available in both horizontal and vertical orientations.

Figma: [`✅ Divider`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Spec

Measured from Figma on 2026-10-06; Figma was tidied to match where noted in the Changelog. Where this section and the sections below disagree, this section is right.

Coded in [`components/src/divider/Divider.tsx`](../../../components/src/divider/Divider.tsx).

The line is always 1px, `border/primary-subtle`. `Spacing` only changes how much room the divider occupies across the line; the line sits in the middle of that room.

| `Spacing` | `Direction=Default` (horizontal): total height | `Direction=Vertical`: total width |
|---|---|---|
| `None` | 1px | 1px |
| `Regular` | 9px (4px above and below the line) | 5px (2px each side) |
| `Spacious` | 16px | 16px |

A horizontal divider fills the width it is given; a vertical one fills the height. These totals are the component's own outer size and are not bound to spacing tokens.

## Anatomy

| Part | Token(s) |
|---|---|
| Line | `border/primary-subtle` fill, 1px thick |
| Reserved spacing (`Spacing=Spacious`) | 16px (raw, not bound — see Known gaps), consistent in both `Default` and `Vertical` direction |
| Reserved spacing (`Spacing=Regular`) | ~9px (`Default`) / ~5px (`Vertical`) — not derived from a single consistent value, see Known gaps |
| Reserved spacing (`Spacing=None`) | 1px — the frame hugs the line exactly, no extra space |

## Variants

`Spacing` = `Regular` / `None` / `Spacious`. `Direction` = `Default` (horizontal line) / `Vertical` (vertical line). 6 total combinations, all built.

- **`Spacing`** controls how much empty space the divider reserves around the line itself — use `None` for a hairline divider flush against adjacent content, `Regular` for standard list-item separation, `Spacious` for separating distinct sections.
- **`Direction=Default`** renders a horizontal line (for stacking vertically in a list); **`Direction=Vertical`** renders a vertical line (for placing side-by-side in a horizontal row, e.g. between toolbar items).

## Behavior rules

- **The divider owns its own spacing** — don't add extra margin/gap around a Divider instance in surrounding layouts; pick the `Spacing` variant that already reserves the right amount instead of stacking spacing on top of spacing.
- **Purely decorative** — never interactive, never carries semantic meaning beyond visual separation (unlike, say, a status-colored border).

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`Spacing=Regular` is asymmetric between directions:** the horizontal (`Default`) variant reserves 9px total height, while the vertical variant reserves only 5px total width, for what's supposed to be the same "Regular" spacing level. Unlike `Spacious` (cleanly 16px / `spacing/4` in both directions), `Regular` doesn't resolve to one consistent value — flagging rather than forcing symmetry, since it's unclear whether this was intentional (e.g. horizontal lists genuinely wanting more breathing room than horizontal toolbars) or just an authoring inconsistency. Left unbound pending a decision.
- **Inconsistent sizing-mode construction across variants:** `Spacing=Regular` variants use `HUG` sizing (their size is genuinely computed from padding + the line), while `Spacing=Spacious`/`None` use `FIXED` sizing with a manually-set dimension. This means the (now-fixed) padding/gap token bindings only actually drive the rendered size on the `Regular` variants — on `Spacious`/`None` they're present but inert, since the fixed dimension overrides what the padding would otherwise produce. Not a visual bug (the fixed values happen to render correctly), just worth knowing if editing this component's layout in Figma.
- `Spacing=None`'s 1px reserved space exactly matches the line's own thickness rather than a distinct spacing token — left unbound as it's not really "spacing," just the line hugged tightly.
- **A component's own outer width/height are treated as layout decisions, not token-driven values, and are left raw on principle** — even where a value cleanly matches a primitive (`Spacing=Spacious`'s 16px, exactly `spacing/4`). Only gap, padding, corner-radius, and border-width get bound to sizing tokens; frame width/height do not. (Standing rule for this project, confirmed 2026-08-17 — see [[feedback-component-audit-workflow]].)

## Changelog

- **2026-10-06:** added the Spec section. First coded version added.
- Rebound `itemSpacing` (previously bound to a foreign variable literally named `"2"`, not `spacing/2` — same numeric value, wrong source, same "Twenty library" pattern as prior components) to this system's `spacing/2`, across all 6 variants. Inert on 5 of the 6 (each variant has only one child, so there's no second element for the gap to apply between) but fixed for consistency and in case a variant ever gains a second child.
- Rebound horizontal padding on the 3 `Vertical` variants (previously bound to a foreign variable named `"0,5"`, not `spacing/0,5`) to this system's `spacing/0,5`.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and usage rules — not previously written down. Flagged the `Regular` asymmetry rather than silently normalizing it, since fixing it would require picking a value and changing the rendered size.
