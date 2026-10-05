# Request detail / Comment thread

The comment thread shown in the slide-over's Comment tab: message bubbles, the input composer, and a mobile keyboard-attached variant.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `comment`, `bubbles`, `InputSubComponent`, `Comment buttom` [sic], `Comment buttom/share content` components (inside `Requests expand` and `Comment`).

## Anatomy

| Part | Token(s) |
|---|---|
| Comment bubble — fill, radius | `bg/secondary`, `border-radii/rounded-8` |
| Author name | `text + icon/primary`, `Body/Small-medium` |
| Message text | `text + icon/primary`, `Body/Small-regular` |
| Timestamp | `text + icon/tertiary`, `Body/Mini-regular` |
| Composer input | see [InputSubComponent](#variants) below |

## Variants

- `comment` (the tab's overall content state): `No comment yet` / `list comment`.
- `bubbles` (a single message): `state` = `Default` / `empty` / `filie show` [sic "file show"], plus a `Reply` boolean for threaded replies.
- `InputSubComponent` (the composer): `Text-area` (idle/empty) / `Typing..` (active).
- `Comment buttom` [sic] (mobile, keyboard-attached composer): `No comment yet` / `commented` / `KB` (keyboard-open state).
- `Comment buttom/share content`: a single fixed sub-component of the mobile composer's attachment/share affordance.

## Behavior rules

- **`comment=No comment yet` shows an empty-state prompt; `list comment` shows the assembled thread of `bubbles`.**
- **`bubbles`' `filie show` state renders an attached file inline in the bubble**, separate from plain text; `Reply` nests the bubble under a parent comment.
- **`InputSubComponent` is the desktop/general composer; `Comment buttom` is the mobile-specific variant that mocks up the iOS keyboard accessory bar.**

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`bubbles`' `filie show` is a misspelling** of "file show" — flagging for a rename, not renamed without confirmation.
- **`Comment buttom` is a misspelling** of "Comment button" throughout (component name and the `Comment buttom/share content` sub-component) — flagging for a rename.
- **`Comment buttom`'s `KB` variant is a genuine iOS system-chrome mockup** (system font SF Pro, Apple's `Labels/Primary` color, `Miscellaneous/Keyboard Accessory Bar - Selection`/`Keyboard Emoji + Mic` tokens) — correctly **left unfixed** per the OS-chrome exemption ([`DESIGN.md` §1](../DESIGN.md)); do not rebind these to this system's tokens.

## Changelog

- Fixed foreign color tokens and bound previously-unbound spacing/radius on `comment`, `bubbles`, `InputSubComponent`, `Comment buttom/share content` — `comment`/`bubbles`/`InputSubComponent` as part of the 1429-fix `Request card`/`Comment`/`Command Palette` pass, `Comment buttom/share content` as part of the 1923-fix `Requests expand` pass.
- Correctly identified and preserved `Comment buttom`'s genuine iOS system-chrome tokens rather than rebinding them — see Known gaps.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, grouping all thread-related components into one doc — previously undocumented.
