# Settings / Activity log

The full account-wide activity log: a sortable table on desktop, a card list on mobile. Distinct from the smaller, related activity displays elsewhere in the app.

Figma: [`Setting - Activity log`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Table_Activity Log_Header`, `Table_Activity Log_Data`, `Table_Activity log` components (desktop, inside `[D] Table_Activity log`), `[M] Card_Activity log` component (mobile, inside `[M] Card_Activity log`).

## Anatomy

| Part | Token(s) |
|---|---|
| Table header row | `text + icon/tertiary`, `Support/Caption` |
| Table data row — actor, action, request link, comment, date | `text + icon/primary`/`text + icon/secondary` mix, `Body/Small-regular`, request ID link in `text + icon/accent-indigo` |
| Mobile card — fill, border, radius | `bg/primary`, `border/primary-subtle`, `border-width/xs`, `border-radii/rounded-8` |

## Variants

`Table_Activity Log_Data`'s `State`: `Default`, `Hover`, `loding` [sic "loading"], `State6` (unrenamed, likely a skeleton/empty variant). `[M] Card_Activity log`'s `State`: `Default` / `Hover`. `Table_Activity Log_Header` and `Table_Activity log` (the assembled table wrapper) are single fixed components.

## Behavior rules

- **This is a dedicated, full-page account-wide activity log** — a row-based table (desktop) or card list (mobile) of every logged action across the account, reached via [Settings nav](profile-settings-nav.md)'s `Requests` section or similar. This is functionally distinct from:
  - [Home / Activity log row](home-activity-log-row.md) — a small dashboard *widget* showing a few recent items
  - [Request detail / Activity log (per-request)](request-detail-activity-log.md) — a *per-request* timeline inside one request's detail slide-over
  
  All three represent "activity log" but at different scopes (dashboard summary vs. one request vs. the whole account) — not duplicates to consolidate, but worth being aware all three exist when searching the file by name.
- **Table rows link to the originating request** (`TL-GR-26010002`-style ID, styled as a link) — clicking presumably opens that request's detail slide-over.

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- **`Table_Activity Log_Data`'s `State6` is an unrenamed generic Figma default** — same "never renamed" pattern seen elsewhere (e.g. [Filter_timeframe](home-timeframe-filter.md)); its actual purpose (likely a skeleton or empty-row state, given `loding` already covers loading) isn't confirmed.
- **`loding` is a misspelling** of "loading" — flagging for a rename, not renamed without confirmation.
- **`cornerRadius=5` found unbound on this page's frames** (both the desktop table's component-set wrapper and the mobile card's), with no matching Foundation primitive — the same recurring low-priority artifact found across `Setting - Profile`, likely a default-wrapper value rather than meaningful.

## Changelog

- Fixed foreign color tokens (`Text/Primary`, `Text/Tertiary` — the classic "Twenty library" pattern) and bound previously-unbound spacing/radius: 10 fixes on `Table_Activity Log_Header`, 195 on `Table_Activity Log_Data`, 5 on `Table_Activity log`, 37 on `[M] Card_Activity log`. Part of the combined 655-fix pass across `Setting - Profile`/`Setting - Activity log`.
- Verified visually before/after — no rendering changes.
- Documented anatomy, variants, and behavior rules for the first time, and clarified this component's relationship to the two other "Activity log" implementations elsewhere in the file — previously undocumented.
