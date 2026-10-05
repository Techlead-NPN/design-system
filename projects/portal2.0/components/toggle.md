# Toggle & Toggle card

Two components: **Toggle** (the switch atom) and **Toggle card** (a settings-row card wrapping a Toggle instance).

Figma: [`✅ Toggle`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page — renamed from "Toggle & Checkbox" 2026-08-18 after its checkbox component was moved out (see Changelog). Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Toggle

| Part | Token(s) |
|---|---|
| Track — off | `bg/tertiary` |
| Track — on | `bg/accent-indigo` |
| Track — disabled | `bg/disabled` |
| Track shape | `border-radii/rounded-infinite`, `spacing/0,5` (2px) inset padding around the knob |
| Knob | `bg/primary`, `border-radii/rounded-infinite` |
| Gap | `spacing/2` (inert — track has only one child, the knob; fixed for consistency, same as Divider's precedent) |

**Variants:** `Toggled` = `False` / `True`. `State` = `Normal` / `Disabled`. 4 total, all built.

## Toggle card

A settings-row card — leading icon, name, description, and a trailing **Toggle instance** (embedded, not independent — fixes to Toggle's main component apply here automatically). Same structure as [Radio card](radio-checkbox-card.md) (identical example content in this file — "Email / Set email visibility, manage your blocklist and more.") but with a real on/off switch instead of a single-select dot, appropriate for a setting that's independently on or off rather than one of several mutually-exclusive options.

| Part | Token(s) |
|---|---|
| Card — fill, border, radius | `bg/primary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8` |
| Name | `text + icon/secondary`, `Body/Small-medium` |
| Description | `text + icon/tertiary`, `Body/Mini-regular` |
| Name/icon gap | `spacing/2` |

**Variants:** `State` = `Default` / `Disable` / `Selected`. Plus `Description?` (boolean).

## Behavior rules

- **Toggle vs. Radio vs. Checkbox is a control-type decision**: Toggle for a single setting that's independently on/off (no relationship to other settings); Radio for choosing one from a mutually-exclusive set ([Radio card](radio-checkbox-card.md)); Checkbox for choosing any number from a set ([Checkbox button](radio-checkbox-card.md)). Toggle card and Radio card exist because both patterns show up as settings-row cards — pick based on which control type actually fits the setting, not on which card "looks right."
- **Toggle's `Disabled` state removes interactivity entirely**, same convention as every other disabled state in this system.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None currently — the naming/duplication issues found on this page have all been resolved (see Changelog).

## Changelog

- **User fix (2026-08-18):** `Toggle`'s `Toggled` variant had a spelling bug that was also a functional gap, not just cosmetic — the correctly-spelled `Toggled=True` only existed paired with `State=Disabled`; the actual enabled/on toggle only existed under a misspelled `Toggled=Tru, State=Normal`. Renamed to `Toggled=True, State=Normal`, so the properties panel now offers a real, working on+enabled combination.
- Bound corner-radius (raw `80`/`60`, the "oversized radius forces a pill/circle" pattern seen throughout this audit) on `Toggle`'s track and knob → `border-radii/rounded-infinite`; bound padding/gap → `spacing/0,5`/`spacing/2`.
- Bound `Toggle card`'s own corner radius/border-width (raw `8`/`1`, unbound) → `border-radii/rounded-8`/`border-width/xs`; bound the icon/name gap → `spacing/2`. Its nested Toggle instances inherited the Toggle fixes automatically.
- **User action (2026-08-18):** this page originally also had a third component — a bare, label-less `checkbox` (10 variants: `Shape`=Rounded/Square × `State`) that had been independently embedded in Table (9 instances) and Menu item (4 instances), duplicating what [Checkbox button](radio-checkbox-card.md) already covered more completely. After Checkbox button gained a matching `Half` (indeterminate) state and all 13 real usages were relinked to it, the user moved the bare checkbox's entire section to the "unused components" page and renamed this page from "Toggle & Checkbox" to "Toggle" to match. Its bindings were still fully audited and fixed before the move (a stray `Text/Inverted` foreign-token color, unbound corner-radius on the `Rounded` shape's circular corners and indeterminate dash, unbound border-width on `Square` shape's unchecked states) — documentation of that work now lives in `radio-checkbox-card.md`'s changelog instead, since that's where the component's canonical replacement lives.
- Verified visually before/after on all components — no rendering changes.
- Documented anatomy, variants, and behavior rules — not previously written down. Clarified the Toggle/Radio/Checkbox selection criteria as a control-type decision, tying together this page with [Radio button, Checkbox button, & Radio card](radio-checkbox-card.md).
