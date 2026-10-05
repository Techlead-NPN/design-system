# App Shell (pattern)

The persistent page frame every screen renders inside: sidebar + header + a raised content card on a tinted backdrop. This is the composition that was previously missing from Figma entirely — component docs for [Sidebar Navigation](sidebar-navigation.md) and [Header Navigation](../components/nav-header-navigation.md) documented those pieces individually, but nothing captured how they combine, or which surface gets which background.

Figma: [`Page Template`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page (added 2026-08-25) — the first real reference for this composition. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Composition

Built from already-documented atoms:
- [Sidebar Navigation](sidebar-navigation.md) — left rail, fixed width
- [Header Navigation](../components/nav-header-navigation.md) — top bar inside the right column
- [Home Dashboard](home-dashboard.md)'s `Dashboard` composition — shown here as the example page content, but the shell itself is content-agnostic; any page's content goes in the same `Content` slot

## Layout rules

- **Root frame** (`Page Template`): `1280×832`, fixed — the desktop reference size (matches `breakpoint/lg`). Background: `bg/secondary` (`#fafafa`) — this is the tinted backdrop that shows through everywhere the sidebar and header don't paint their own surface.
- **Sidebar Navigation**: `244px` fixed width, full height. **No background fill** — it sits directly on the `bg/secondary` backdrop, not on its own surface.
- **Right content** (everything right of the sidebar): fills remaining width/height. **No background fill** either — same backdrop shows through. Internal padding `top 16 / right 8 / bottom 8 / left 0`, `itemSpacing 16` between the header and the content card below it. This padding is what produces the visible gray gutter around the white card.
- **Header Navigation**: fills the row's width, hugs its own height. **No background fill** — transparent, blends into the backdrop. Has a `1px` bottom-ish border stroke and a background-blur effect (for content scrolling underneath it).
- **Content** (the white card): fills remaining width/height inside `Right content`. Background: `bg/primary` (`#ffffff`). `cornerRadius: 8` (`border-radii/rounded-8`), `1px` border. This is the raised surface — page content (e.g. the Dashboard) renders inside it with its own internal padding (`16px`, `itemSpacing 12` between widgets, per [home-dashboard.md](home-dashboard.md)).

## Known gaps / flags — not fixed, needs confirmation

- **Content card's and Header's border are both bound to `border/accent-stone`** (`#e7e5e4`), a token documented in DESIGN.md as "Decorative — default icon border color," not a structural/neutral border role. `border/primary` (`#d4d4d4`) or `border/primary-subtle` (`#e5e5e5`) read as the more likely intended semantic match for a card/header outline. Flagging as a possible token-role mismatch rather than rebinding — needs design-owner confirmation before touching a shell-level binding that every page would inherit.
- **Sidebar Navigation instance on this page resolves to a variant named `Type=Expand`**, which doesn't match either documented variant on the `Sidebar Navigation` component set (`Type=Regular` / `Type=Small` — see [sidebar-navigation.md](sidebar-navigation.md)). Worth checking whether this is a third, newer variant not yet reflected in that doc, or a stray/mislabeled instance.
- **Only the Desktop breakpoint is built.** No mobile/tablet version of this shell composition exists yet in Figma — the individual atoms (Sidebar, Header) have their own mobile variants, but they haven't been assembled into a mobile `Page Template` to confirm how the backdrop/card treatment adapts (e.g. does the card still float with margin on mobile, or go edge-to-edge?).

## Changelog

- **2026-08-25:** documented for the first time, immediately after the `Page Template` reference page was added to Figma. Written specifically because a vibe-coded page (built from the `.md` docs alone, without this shell reference) diverged from the real product on exactly this — background layering and card-to-card margin — because nothing had ever captured it. See [sidebar-navigation.md](sidebar-navigation.md)'s own note: the *component* was documented, but the *shell composition* around it wasn't, until now.
