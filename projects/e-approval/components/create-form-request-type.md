# Create Form / Request type selector

The entry screen for creating a new request — a grid of request-type tiles (see [Illustration](illustration.md)'s Request type set) the user picks from before the form itself opens.

Figma: [`📱 Create form`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Create requests` / `Create requests_V2Destop` / `Create requests_V2Mobile` component sets.

## Anatomy

| Part | Token(s) |
|---|---|
| Tile — fill, radius | `bg/secondary`, `border-radii/rounded-8` |
| Icon | swappable [Illustration](illustration.md) instance |
| Type label | `Body/Medium-semibold` / `Body/Mini-semibold`, `text + icon/secondary` |
| Description | `Body/Mini-medium`, `text + icon/tertiary` |

## Variants

Three separate component sets exist for this same screen: `Create requests` (the original build), `Create requests_V2Destop`, and `Create requests_V2Mobile` (a later revision split by breakpoint). All three were present and confirmed current by the design owner — not a stale duplicate.

## Behavior rules

- **This is the first screen of the create-request flow**, before any form fields — see [Create Form](../patterns/create-form.md) for how it fits into the full 3-step flow.
- **V2's Desktop/Mobile split suggests it's the more current, responsive-aware version** — when building new UI, prefer `Create requests_V2Destop`/`V2Mobile` over the plain `Create requests` set unless told otherwise, since it's the one with explicit breakpoint coverage.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Three component sets cover what looks like the same screen** (`Create requests`, `Create requests_V2Destop`, `Create requests_V2Mobile`) — the relationship between the original and the "V2" revision isn't documented (is the original deprecated? Kept for reference? Actively used elsewhere?). Flagging rather than assuming the original is dead weight.
- **`Create requests_V2Destop`'s name has a typo** ("Destop" instead of "Desktop") — flagging, not renaming without confirmation.

## Changelog

- Fixed foreign color tokens (same "Twenty library" pattern) and bound previously-unbound `itemSpacing`/padding/`cornerRadius`/`strokeWeight`: 27 fixes on `Create requests`, 101 each on `Create requests_V2Destop` and `Create requests_V2Mobile`.
- Verified visually before/after on all three — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time — none of these components previously had a doc.
