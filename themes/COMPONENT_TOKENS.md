# Component tokens — audit

A component token is a value a component reads from the theme instead of having it written in, so one theme can change a shape without touching the component. Before this audit two existed: `--badge-radius` (`rounded-badge`) and `--table-row-height` (`h-table-row`).

Duo needs more of them: pill buttons, 16px cards, taller controls. This page lists every fixed shape and size in the coded components, what Duo needs, and the tokens added in package 0.11.0. **Classic's values are today's values, so adding the tokens changes nothing for E-Approval.**

Sources: every `.tsx` file in [`../components/src/`](../components/src/) (2026-11-26), and the Duo style guide's components (Figma `CWIyerZWpc1pNJ6ZYyYJK3`: B/Button, B/Search, B/Select, B/FormField, B/Tab, B/SegmentedTab, B/Checkbox, B/KPICard, B/PRTable).

## Tokens

| Token | Utility | Used by | Classic (unchanged) | Duo | Duo source |
|---|---|---|---|---|---|
| `--button-radius` | `rounded-button` | Button, IconButton | 6px | full (pill) | B/Button |
| `--button-height-md` | `h-button-md` | Button, IconButton `md` | 32px | 36px | B/Button size 36 (default) |
| `--button-height-sm` | `h-button-sm` | Button, IconButton `sm` | 24px | 28px | B/Button size 28 |
| `--button-padding-md` / `--button-padding-sm` | `px-button-padding-md` / `-sm` | Button sides | 8px / 8px | 16px / 12px | B/Button (pills need room) |
| `--field-radius` | `rounded-field` | TextInput, TextArea, Dropdown trigger | 6px | 12px (a rounded rectangle, not a pill) | B/FormField, B/Select |
| `--search-radius` | `rounded-search` | TextInput with `type="search"` | 6px | full (pill) | B/Search. Search is a pill, form fields are rounded rectangles, as on Airbnb, Google and YouTube |
| `--field-height` | `h-field` | TextInput, Dropdown trigger | 32px | 44px (draft 46px) | B/FormField |
| `--field-padding` | `px-field-padding` | TextInput, Dropdown trigger sides | 8px | 12px | B/FormField |
| `--chip-radius` | `rounded-chip` | Chip (default shape) | 6px | full | B/StatusChip, B/Tag |
| `--card-radius` | `rounded-card` | Shell content card, RadioCard, ToggleCard, Dialog, Callout | 8px | 16px | Decided in the foundations pass. RadioCard and ToggleCard keep their visible border in both themes: they sit on white forms, where Duo's soft shadow would hide their edge |
| `--card-border` | `border-card` | Shell content card | `border-primary-subtle` | transparent (the shadow replaces it) | B/KPICard |
| `--card-shadow` | `shadow-card` | Shell content card | none | `shadow-xs` (new: 0 2px 8px, 3% black) | B/Elevation/Soft |
| `--popover-radius` | `rounded-popover` | Menu panel, Dropdown list, Calendar card | 8px | 12px | B/Select (12px family) |
| `--checkbox-radius` | `rounded-checkbox` | Checkbox | 4px | 6px | B/Checkbox |
| `--table-row-height` (exists) | `h-table-row` | Table rows | 36px | 48px (draft row 61px) | B/PRTable/Row |

Each token goes into both theme files, so `npm run check-themes` keeps them in step. PayGenix gets Classic's values.

## Variants, not tokens

Some Duo differences change structure, not a value. They become an option on the component, and a Duo app chooses it.

| Component | Today | Duo | Proposed |
|---|---|---|---|
| Tabs | Underline tabs | Two pill styles: **dark pill** for page-level status tabs (B/Tab), **white pill in a grey track** for switching inside a card (B/SegmentedTab) | `variant="underline"` (default) · `"pill"` · `"segmented"` |
| Workspace shell | Labelled sidebar, one content card | Icon rail that can expand, cards straight on the page, large page title, round search button in the header | `layout="sidebar"` (default) · `"rail"` — the Duo shell prototype step |

## Stays fixed in both themes

These match in Classic and Duo, or are too small to matter, so they keep their written values.

- Menu rows (6px), sidebar rows and breadcrumb items (4px), calendar day cells (4px)
- Fully round parts: avatars, radios, toggle switches, step indicators, the floating action button, notification dots
- Square avatar corners (2px / 4px), sidebar icon chips (4px), the loading shimmer
- Tooltip (6px) and Toast (6px): Duo has no design for them yet
- Bottom sheet top corners (already 16px)

## Decisions

Made with the design owner on 2026-11-26:

1. **Field height: 44px** (`spacing-11`), the closest step to the draft's 46px.
2. **Card edge: soft shadow.** Duo cards use the style guide's very soft shadow instead of a border. This adds one Foundations primitive, `shadow-xs` (0 2px 8px, 3% black). Classic's `--card-shadow` is `none`, so nothing changes there.
3. **Table rows: 48px** (`spacing-12`), more rows per screen than the draft's 61px.
4. **Field corners: 12px rounded rectangles.** Search fields are the exception: they're pills (`--search-radius`), so search stands out in headers and toolbars while form fields stack and align cleanly.

## How it was built

1. Added the tokens to `workspace.css`, `paygenix.css` and `duo.css`, with Classic's values matching what was written in, and `shadow-xs` to Foundations.
2. Replaced the written values in the components above with the new utilities.
3. Checked that Classic and PayGenix look exactly the same: every Storybook story in both themes was measured before and after (size, corners, borders, shadows, colours, padding of every element) and compared.
4. Added the Tabs variants (`variant="pill"` and `"segmented"`, plus a `count` on `Tab`).
5. Package 0.11.0: new tokens and a new prop, no breaking change.

The shell's `rail` layout follows as its own step, together with the Duo shell prototype.
