# Create Form / Item & Budget section

The largest form section — line items, budget selection, and budget status, plus the assembled `Form/Item & Budget` section and its assignee-selection modal.

Figma: [`📱 Create form`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, 10 components under the "Item section" and "Budget" groups.

## Item section

| Component | Notes |
|---|---|
| `Sum Amount` | Single fixed component — the running total display. |
| `Item table row` | `Type` = `Value` / `Header` — the line-item table's header row and data rows share one component. |
| `Item section` | Single fixed component — wraps the item table + "Sum Amount" into one card. |

## Budget selection & status

| Component | Notes |
|---|---|
| `Budget seletion card` *(sic — "seletion" is a real typo in the Figma layer name)* | `Type` = `unplanned` / `planned` — matches [Form/Item & Budget](#form-item--budget)'s "Planned budget"/"Unplanned budget" radio choice. |
| `Budget status` (568×351, id `2331:11067`) | 8 states: `void`/`pending`/`reserved`/`calculating`/`In budget`/`enter info`/`out-of budget`/`over budget`, plus boolean `sub-text?`. The full-featured version — see Known gaps for its naming collision with the other `Budget status`. |
| `Budget status` (673×252, id `3487:10111`) | Only 3 states via a generic `Property 1` variant: `out-of-budget`/`over budget`/`within budget`. A separate, smaller component sharing the exact same name — see Known gaps. |
| `Budget form section` | `Breakpoint` = `Desktop`/`Mobile`, boolean `project code?` — the full budget-entry form (account no., department, account/project code, budget source). |
| `Budget summary section` | Boolean `Over budget?` — the read-only summary shown after budget entry. |

## Form/Item & Budget (assembled section) & assignee modal

`Form/Item & Budget`: `Breakpoint` = `Desktop`/`Mobile` — the fully assembled section combining the item table, budget selection, and budget status/summary. `contentdialog_assignee modal`: single fixed component — the modal for picking who a budget/approval step is assigned to.

## Behavior rules

- **`Budget seletion card`'s `Type` (planned/unplanned) drives which `Budget status` states are even reachable** — e.g. `calculating`/`enter info` are meaningful mid-process states that likely only apply to one path; not confirmed in detail, flagged below.
- **The two differently-scoped `Budget status` components are NOT interchangeable** — the 8-state one is the general-purpose budget-check indicator; the 3-state one appears to be a narrower, later addition. Until the naming collision is resolved (see Known gaps), pick based on which one the surrounding design actually uses, don't assume they're redundant.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Two unrelated components are both named "Budget status"** (`2331:11067`, 8 states, `sub-text?` boolean vs. `3487:10111`, 3 states, generic `Property 1` variant naming) — a real naming collision, not a duplicate to consolidate. Flagging for the design owner to either rename one for clarity or confirm they're deliberately parallel (e.g. one compact, one detailed) with a documented usage rule for when to use which.
- **`Budget seletion card`'s Figma layer name has a typo** ("seletion") — flagging, not renaming without confirmation.
- **Several `request amount row`/`Avbl. row`/`Over budget row` frames have very large gap values (142px)** — these are space-between label/value layouts, not simple content gaps; correctly left unbound since no primitive represents that pattern, not a mistake.

## Changelog

- Fixed foreign color tokens, foreign text styles (`Base/Medium`/`Base/Semi-bold` — a foreign Inter-based style family at 13px, not our 30-style scale — rebound to `Body/Small-medium`/`Body/Small-semibold`), and bound previously-unbound `itemSpacing`/padding/`cornerRadius`/`strokeWeight` across all 10 components (~340 total fixes: 3 on Sum Amount, 28 on Item table row, 55 on Budget selection card, 6 on Item section, 76 on Budget status (8-state), 6 on Budget status (3-state), 109 on Budget form section, 38 on Budget summary section, 12 on Form/Item & Budget, 9 on the assignee modal).
- Verified visually before/after on all 10 — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — none of these components previously had a doc.
