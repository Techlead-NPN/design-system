# Create Form / Reference & Attachments section

The file-upload and reference-link section of the create-request form.

Figma: [`📱 Create form`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `File list`, `Form/Attachments`, `Form/Attachment`, `Form/Reference` components.

## Anatomy

| Part | Token(s) |
|---|---|
| File row — fill, radius | `bg/primary`, `border-radii/rounded-6` |
| File name | `Body/Small-medium`, `text + icon/primary` |
| File size | `Body/Mini-regular`, `text + icon/tertiary` |
| Upload button | embedded [Button](button.md) instance (Ghost/Outline style) |

## Variants

`File list`: `Type` = `Ghost`/`Outline` (the row's visual weight). `Form/Attachments`: `Icon?` (instance-swap), boolean `Optional?`, text `File title` — this is the per-category attachment group (e.g. "MEMO", "Quotation", "Additional attachments"), each with its own upload control and file list. `Form/Attachment` (the assembled section) and `Form/Reference`: both `Breakpoint` = `Desktop`/`Mobile`.

## Behavior rules

- **`Form/Attachments` repeats per file category** — the assembled `Form/Attachment` section shows multiple `Form/Attachments` instances stacked (one per category: MEMO, Quotation, Additional attachments in the reference screenshot), each independently tracking its own file count/size against the section-level "Total files"/"Total size" limits.
- **File size and total limits are informational, not enforced by this component** — the "5/10" and "750.40 KB/100 MB" counters are content, not a built-in validation state; actual upload limits are an app-level concern.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

None found beyond the fixed item below.

## Changelog

- Fixed foreign color tokens (including `Text/Secondary`, `Base/Medium` foreign text style, `Background/Secondary`, `Borders/Light` — the richest single cluster of "Twenty library" contamination found on this component, `Form/Attachments`) and bound previously-unbound `itemSpacing`/padding/`cornerRadius`/`strokeWeight`: 53 fixes on `File list`, 24 on `Form/Attachments`, 65 on `Form/Attachment`, 14 on `Form/Reference`.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — none of these components previously had a doc.
