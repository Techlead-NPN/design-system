# Auditing and documenting a component

The process used to audit every Portal 2.0 component against the token system and write its doc. Repeat it for each component in any project rather than improvising a new approach. It assumes a Claude session connected to the Figma MCP, with edit access to the project's Figma file.

The goal of the docs: complete enough that an AI building a new page from them alone produces an accurate UI.

## Steps

1. **Get the page structure.** On large pages, query the structure through the plugin API rather than fetching full metadata.
2. **Set the scope.** Only audit components inside a top-level frame. Loose items on the canvas are work in progress or unused — ignore them. If something looks misplaced, ask before assuming.
3. **Audit every binding:**
   - **Color** (fills, strokes) — bound to *this project's* semantic color collection, not just "bound to something". A token from another library with a similar name is still wrong.
   - **Text styles** — one of the project's own named styles.
   - **Sizing** — gap, padding, corner radius and border width bound to Foundation `raw sizing` primitives. Check border width and corner radius as carefully as color and spacing.
   - Check the wrapper frame too: the visible card chrome (radius, border, fill) sometimes lives one level above the component.
4. **Leave OS chrome alone.** Home indicators, drag handles and system status bars keep the platform's own color library (see [Foundations §1](../FOUNDATIONS.md#1-token-architecture)). Their geometry still uses the primitives.
5. **Never bind a component's own outer width or height**, even when the value matches a primitive. Outer dimensions are layout decisions, not token-driven values.
6. **Ambiguous fixes:** pick the most sensible token in context and record it under "Known gaps" in the doc. Don't block on every judgment call, and don't force a value that doesn't match.
7. **Before deleting anything**, search for real usage across every page. Variants that look unused have turned out to have many live instances.
8. **Screenshot before and after** each batch of fixes to confirm nothing changed visually. After a pattern-based fix, re-check the component for leftover foreign tokens instead of trusting the script's own count.
9. **Propose usage and behavior rules**, not only token bindings, and have the design owner confirm or correct them before they are written down as fact.
10. **Write the doc** (see below) and link it from the project's `DESIGN.md`.
11. **Write the same rules into Figma:** the page header's Description text, plus annotations pinned to the specific element each rule governs.

## Doc tiers

- **`components/<name>.md`** — one per component or component family: variant properties, anatomy and tokens table, usage rules with rationale, known gaps, changelog of what was fixed. Tokens are referenced by name; values live in the project's `DESIGN.md`.
- **`patterns/<name>.md`** — composite structures built from documented components: what it is composed of (with links), layout rules and states. No token-by-token table; that belongs to the component doc that owns each token. Document any missing sub-components first.
- **Asset-based components** (logo, illustrations) — export the real SVG files into the project's `assets/` folder and embed them in the doc, with an explicit instruction to use the file rather than redraw it. Artwork colors are fixed art, not token-driven.

## Figma annotation rules

- **Interaction** — behavior, state and usage rules.
- **Development** — naming caveats, binding and implementation notes, unconfirmed assumptions, "not yet built" statuses.
- **Content** — literal copy guidance only.
- Split a note that mixes behavior and implementation into two annotations.
- Annotations are for durable rules a designer still needs a month from now. "Fixed on &lt;date&gt;" notes belong in the doc's changelog, not in Figma.
