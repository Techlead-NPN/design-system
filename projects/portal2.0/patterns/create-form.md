# Create Form (pattern)

The full request-creation flow: pick a request type, fill out a tabbed form (Information / Approval / Preview), and submit.

Figma: [`📱 Create form`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Page Component` frame's 4 component sets (`Create requests`, `Step 1: info`, `Step 2: approval`, `Step 3: preview`) — used here as the visual composition reference, not documented as separate atoms. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Composition

Built from already-documented atoms and sections:
- [Request type selector](../components/create-form-request-type.md) — the entry screen
- [Priority](../components/create-form-priority.md), [Progress indicator](../components/create-form-progress.md) — supporting controls shown throughout
- [General & Details](../components/create-form-general-details.md), [Item & Budget](../components/create-form-item-budget.md), [Reference & Attachments](../components/create-form-reference-attachments.md) — the Information tab's sections
- [Approval](../components/create-form-approval.md) — the Approval tab
- [Preview](../components/create-form-preview.md) — the Preview tab

## Layout rules

- **Despite being named `Step 1`/`Step 2`/`Step 3` in Figma, this is a tabbed form, not a strictly linear wizard** — the screenshot reference shows all three tabs (`Information`/`Approval`/`Preview`) visible and selectable at once, not gated behind forward-only navigation. Don't build this as a step-locked wizard unless the design owner confirms that's actually intended.
- **The `Information` tab is a single long scroll**, not its own set of sub-steps — General, Details, Item & Budget, Reference, and Attachments all stack vertically on one tab, each as its own card with a shared [Form Title](../components/create-form-general-details.md) header.
- **A [Progress indicator](../components/create-form-progress.md) and [Priority](../components/create-form-priority.md) control sit above the tabbed content**, persistent across all three tabs.
- **A [Sticky button](../components/create-form-priority.md) bar stays pinned at the bottom** regardless of scroll position or active tab.

## Behavior rules

- **Flow order: request type → Information tab (fill everything) → Approval tab (assign approvers, optionally accept an AI-suggested flow) → Preview tab (final read-only recap) → submit.**
- **The Preview tab must reflect exactly what was entered in Information and Approval** — see [Preview](../components/create-form-preview.md), which is read-only by design; it should never diverge from the live form state.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Tab label inconsistency between the two `Step 1: info` variants**: one build labels the third tab `Preview` under a first tab called `Information`, while a second labels it `Info`/`Approval`/`Preview` — minor copy drift, not confirmed which is canonical.
- **Whether the flow enforces tab order (must complete Information before Approval, etc.) or allows free navigation between tabs isn't specified** in Figma — flagging as an open question rather than assuming a wizard-style gate.
- See each linked atom doc's own Known Gaps for component-level issues (the `Budget status` naming collision, `Fields/Select`'s `Hove` typo, the `Create requests`/`V2` versioning question, etc.) — not repeated here.

## Changelog

- **Full token audit (2026-08-19):** ~1000 total fixes across all 31 components on this page — see each linked atom doc's own changelog for specifics. This page had the richest and most varied foreign-token contamination of any page audited so far: the usual "Twenty library" color/spacing patterns, plus several new variants (`Height/24px`, `Spacing/4px`-style CSS-custom-property-esque names, a stray `xx` variable resolving to white, `Background/Secondary`, `Borders/Light`, `bg/active-suble`, and a genuine foreign brand-color ramp `brand/primary-100/200/300` left unfixed and flagged since no single token maps to a 3-step ramp).
- Verified visually before/after across all components — no rendering changes, confirming the token rebinds were value-preserving throughout.
- Documented composition, layout rules, and the tab-vs-wizard structure for the first time — this pattern previously had no doc. The `Page Component` reference screens were used to correct an initial assumption: they're implemented as tabs, not a gated step wizard, despite the "Step 1/2/3" naming.
