# Keyboard shortcuts manual

The reference panel listing all global keyboard shortcuts, grouped by Navigation, Actions, and Quick Create.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Keyboard Manual_content` component (inside `Keyboard Manual`).

## Anatomy

| Part | Token(s) |
|---|---|
| Section heading (Navigation / Actions / Quick Create) | `text + icon/tertiary`, `Support/Caption`-style |
| Shortcut label | `text + icon/primary`, `Body/Small-regular` |
| Key badge | `bg/secondary` pill, `border-radii/rounded-6`, `text + icon/secondary` |

## Variants

Single fixed component — content is a static list of shortcuts (confirmed via screenshot: Navigation — Go to Dashboard `⌘K then D`, Go to All Requests `⌘K then R`, Go to Profile `⌘K then P`; Actions — Create Request/Need Your Approval/View Dashboard all `⌘K then R` (see Known gaps), Search `⌘K`; Quick Create — General (GEN) `⌘K then 1`, Purchase Request PR-SAP `⌘K then 2`, Purchase Order PO `⌘K then 3`, My Mix Benefit MMB `⌘K then 4`).

## Behavior rules

- **Documents the same `⌘K`-prefixed shortcut scheme used to drive the [Command palette](command-palette.md)** — every entry here is a two-step chord (`⌘K` then a letter/number) except plain `Search` (`⌘K` alone).

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Three different Actions ("Create Request", "Need Your Approval", "View Dashboard") all list the identical shortcut `⌘K then R`** — almost certainly a content error (at most one action can own that chord), not a real one-shortcut-triggers-three-actions design. Flagging rather than guessing which two need reassignment.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius — 28 fixes.
- Verified visually before/after — no rendering changes.
- Documented anatomy and behavior rules for the first time, and flagged the duplicate-shortcut content error — previously undocumented.
