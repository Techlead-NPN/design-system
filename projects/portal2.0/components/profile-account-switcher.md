# Profile / Account switcher

The dropdown panel opened from [Workspace menu](nav-workspace-menu.md) or the [Identity card](profile-identity-card.md): a list of the user's accounts to switch between, plus Settings/Add account/Sign out actions.

Figma: [`Setting - Profile`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `list profile` component (the panel) and `Account list` component (a single row), both inside `Atom_Profile`.

## Anatomy

| Part | Token(s) |
|---|---|
| Panel header ("Switch account") | embedded `MenuComponents/Dropdown Header` instance |
| Account row — avatar, name, email | `Account list`: [Avatar](avatar.md), `text + icon/primary` (name), `text + icon/tertiary` (email) |
| Chevron | `icon/chevron-right` |
| Divider | embedded [Divider](divider.md) instance |
| Menu actions (Settings / Add account / Sign out) | embedded `Menu item/Informative` instances |

## Variants

Both `list profile` and `Account list` are single fixed components — the panel's account count varies by data, not variant.

## Behavior rules

- **Lists every account the user has signed into, one `Account list` row per account** — clicking a row switches the active account.
- **`Settings` in this panel is a shortcut into the Settings area** — see [Settings nav](profile-settings-nav.md) for what that area contains.
- **`Add account` and `Sign out` are terminal actions**, separated from the switchable account list by a [Divider](divider.md).

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **Real bug found and fixed**: the `Account list` component's frame had a broken hardcoded height of **7,895px** (`counterAxisSizingMode=FIXED`) despite its actual content (avatar + text + chevron, ~46px tall) — every instance inherited this, and the parent `list profile` panel's total height ballooned to the same absurd figure across its 5 stacked account rows. This wasn't a token/color issue — a genuine layout-authoring bug, unambiguous given the content vs. declared-size mismatch. **Fixed**: resized `Account list` to its correct hug-content height (46px, from padding 4px top/bottom + content 38px) via an explicit `resize()` call. A first attempt to fix this by switching `counterAxisSizingMode` to `AUTO` instead caused a runaway feedback loop (height jumped to 128,975px) — reverted to an explicit fixed-height resize instead, which held correctly. Verified visually: the panel now renders exactly as the composite `Atom_Profile` reference frame shows it.

## Changelog

- **2026-08-20:** discovered and fixed the broken `Account list` height (see Known gaps) — a structural bug, not a token gap, found during this page's audit.
- Fixed foreign color tokens and bound previously-unbound spacing/radius — part of the combined 655-fix pass across `Setting - Profile`/`Setting - Activity log`.
- Verified visually before/after — confirmed the height fix produces a correctly-rendered panel matching the reference composition; no other rendering changes.
- Documented anatomy and behavior rules for the first time — previously undocumented.
