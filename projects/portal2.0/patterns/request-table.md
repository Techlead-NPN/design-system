# Request Table (pattern)

The main request-list screen: a sortable, filterable, bulk-actionable table (or card grid) of requests, with a table/card view toggle and a mobile-optimized header.

Figma: [`📱 Request list`](https://www.figma.com/design/YFci6zgeYAQqX2OlHKQB0e) page, `Table_Requests list` component — used here as the visual composition reference, not documented as a separate atom. Tokens referenced below are defined in [`../DESIGN.md`](../DESIGN.md).

## Spec

![Request table](../assets/reference/request-table.png)

The table is a header row plus body rows from [Table row](../components/request-list-table-row.md), whose Spec section has the row height, borders, column widths and per-column content. The table fills the width of its container; the Title column absorbs the spare width.

## Composition

Built from already-documented atoms:
- [Table row](../components/request-list-table-row.md) — header + body rows
- [Company chip](../components/request-list-company-chip.md), [Status badge](../components/request-list-status-badge.md) — embedded in each row
- [Viewbar](../components/request-list-viewbar.md) — appears above the table on selection
- [View switch](../components/request-list-view-switch.md) — toggles table vs. [Request card](../components/request-card.md) layout
- [Filter chip](../components/request-list-filter-chip.md), [Filter panel](../components/request-list-filter-panel.md) — filtering controls above the table
- [Empty state](../components/request-list-empty-state.md) — shown when zero rows match
- [Mobile header](../components/request-list-header-mobile.md) — the mobile-specific top bar and tab strip

## Layout rules

- **Columns, left to right (per the reference screen)**: bulk-select checkbox, `# Requests No.`, Company, Title, Requested by, Request date, Priority, Status. Column header labels are individually sortable (sort-direction carets confirmed on several columns).
- **Every column value is either plain text or an embedded atom** (Company → [Company chip](../components/request-list-company-chip.md), Priority → an icon + label dropdown, Status → [Status badge](../components/request-list-status-badge.md)) — no column mixes raw and componentized values.
- **[Viewbar](../components/request-list-viewbar.md) is not part of the table's static layout** — it's an overlay/insertion that appears above the header row only once one or more rows are selected.

## Behavior rules

- **Selecting a row (or opening it) launches the [Request Detail Slide-over](request-detail-slide-over.md)** — the table itself never navigates away from the list.
- **[View switch](../components/request-list-view-switch.md) is a global, persistent preference** — switching to `card` swaps every row for a [Request card](../components/request-card.md) in a grid, not a per-session toggle that resets.
- **Filtering is layered**: [Mobile header](../components/request-list-header-mobile.md)'s approval-relevance tabs (All / Need Your Approval / Under review) apply first, then [Filter chip](../components/request-list-filter-chip.md) quick-filters, then the full [Filter panel](../components/request-list-filter-panel.md) (Company/Status/Priority/Request date) — any combination narrowing the same underlying list to zero rows shows [Empty state](../components/request-list-empty-state.md).

## Known gaps (component doesn't yet match spec, or naming is inconsistent)

- See each linked atom doc's own Known Gaps for component-level issues (the `Draft`/`Submitted` status-naming mismatch, `Multi Seclected`/`loding` typos, the redundant mobile-variant modeling on [Filter chip](../components/request-list-filter-chip.md), etc.) — not repeated here.
- **Whether card-view supports the same bulk-select/[Viewbar](../components/request-list-viewbar.md) flow as table-view isn't confirmed** — [Request card](../components/request-card.md)'s desktop variant does include a checkbox and a `Bulk selected` state, suggesting yes, but this isn't shown together with `Viewbar` in any single reference frame.

## Changelog

- **2026-10-05:** added the Spec section and reference image.
- **Full token audit (2026-08-19):** ~2168 total fixes across all 42 components on the Request list page — see each linked atom doc's own changelog for specifics. Notable finds: a genuine token-naming collision on [Approval reason note](../components/request-detail-rejection-reason.md) (a foreign collection reusing our exact `text + icon/tertiary` name with a different hex value), a confirmed duplicate build of the activity-log pattern against the Home page's version (see [Activity log](../components/request-detail-activity-log.md)), and correct preservation of genuine iOS system-chrome tokens on the mobile comment composer (see [Comment thread](../components/request-detail-comment-thread.md)).
- Verified visually before/after across all components — no rendering changes, confirming the token rebinds were value-preserving throughout.
- Documented composition, layout rules, and filtering behavior for the first time — this pattern previously had no doc.
