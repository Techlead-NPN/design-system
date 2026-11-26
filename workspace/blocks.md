# Building blocks — inventory

Blocks are the parts between single components and whole pages: a section card, a stat tile group, a list toolbar, an approval timeline. The theme and components make colours and single parts match; blocks make apps put them together the same way.

This page compares two sources, keeps the blocks that appear in both, and proposes an order to build them. **It is an inventory, not a spec.** Each block gets its own spec when it is built.

**Sources**

- **E-Approval**: its app component and pattern docs in [`../projects/e-approval/`](../projects/e-approval/).
- **ProcureApp**: the design owner's super-app prototype ([live](https://company-workspace-superapp.vercel.app/portal.html)), screens checked 2026-11-25: home, request list, purchasing board, documents table, document detail (information and approval tabs), request-type picker, create-request form.

**The rule for a block**, same as for components: it goes into the package when at least two apps use it and the developers will import it. Blocks found in only one app stay in that app.

## Summary

| Tier | Blocks | Why first |
|---|---|---|
| **1** — every request and approval app needs these | Section card · Stat tiles · Empty state · List toolbar · Filter chips · Data table cells · Detail panel · Field grid · Approval timeline · Approve/reject dialog · Form page | They make up the list, detail, form and dashboard pages that Procureapp, Contract management and Leave all have. Approval is expected to live inside every app |
| **2** — common, build once tier 1 is in use | Activity list · Shortcut tile · Type picker · Comment thread · Attachments · Line items · Card view · Filter panel · Bulk action bar · Widget filter · Approval flow builder · Preview | Shared, but fewer pages need them, or they build on tier 1 |
| **App only for now** | Kanban board · Budget card · Dashboard customise | Seen in one app, or tied to purchasing |

## Inventory

`E-A` = E-Approval doc, `Proc` = ProcureApp prototype. "Built from" lists the coded components the block would reuse.

### Dashboard

| Block | What it is | E-A | Proc | Built from | Tier |
|---|---|---|---|---|---|
| Section card | Card with a title row (tinted icon chip, title, optional action or filter at the right) and a body | [`home-widget-title`](../projects/e-approval/components/home-widget-title.md), [`home-dashboard-widgets`](../projects/e-approval/components/home-dashboard-widgets.md) | Every home widget; the sections of the request-type picker | SidebarIcon, Button | 1 |
| Stat tiles | A row of count + label tiles, plus a highlighted "needs you" count | [`home-widget-status`](../projects/e-approval/components/home-widget-status.md) | "Your requests" (Draft, Pending, Approved, Rejected); "Waiting for you"; PR / PO / GR / PAY counters | — | 1 |
| Activity list | Avatar, what happened, link, time, in a short list | [`home-activity-log-row`](../projects/e-approval/components/home-activity-log-row.md), [`request-detail-activity-log`](../projects/e-approval/components/request-detail-activity-log.md), [`settings-activity-log`](../projects/e-approval/components/settings-activity-log.md) | "Recent activity" widget; the detail panel's status tab | Avatar | 2 |
| Shortcut tile | Illustration, code and name; opens a create flow | [`home-widget-cards`](../projects/e-approval/components/home-widget-cards.md) | "Quick create" (GEN, PR, PO) | — | 2 |
| Widget filter | "Last 3 months" trigger and its menu | [`home-timeframe-filter`](../projects/e-approval/components/home-timeframe-filter.md) | "3 months" on the purchasing widget | Menu | 2 |
| Dashboard customise | Choose which widgets show | [`home-dashboard-widgets`](../projects/e-approval/components/home-dashboard-widgets.md) | "Customise" button | — | App only |

### List pages

| Block | What it is | E-A | Proc | Built from | Tier |
|---|---|---|---|---|---|
| Status tabs | Tabs that split a list by status, with icons and counts | [`request-list-header-mobile`](../projects/e-approval/components/request-list-header-mobile.md) (mobile) | All / Waiting for me / In review / Approved / Rejected | Tabs | 1 (part of List toolbar) |
| List toolbar | Search field and Filter button at the left; columns, table/card switch and export at the right | [`request-table`](../projects/e-approval/patterns/request-table.md), [`request-list-view-switch`](../projects/e-approval/components/request-list-view-switch.md) | Request list and documents table | TextInput, Button, IconButton | 1 |
| Filter chips | Pills for quick filters, with counts | [`request-list-filter-chip`](../projects/e-approval/components/request-list-filter-chip.md) | PR · 12, RFQ · 4, PO · 4, GR · 3, PAY · 1 | Chip | 1 |
| Data table cells | The standard cells of a document table: ID, company chip, person (avatar + name), amount, status, date; sortable headers | [`request-list-table-row`](../projects/e-approval/components/request-list-table-row.md), [`request-list-company-chip`](../projects/e-approval/components/request-list-company-chip.md), [`request-list-status-badge`](../projects/e-approval/components/request-list-status-badge.md) | Documents table | Table, Badge, Avatar, TablePagination | 1 |
| Empty state | Icon, message, hint | [`request-list-empty-state`](../projects/e-approval/components/request-list-empty-state.md) | Empty request list | — | 1 |
| Card view | The card alternative to a table row | [`request-card`](../projects/e-approval/components/request-card.md) | Table/card switch | Badge, Avatar | 2 |
| Filter panel | The panel behind the Filter button | [`request-list-filter-panel`](../projects/e-approval/components/request-list-filter-panel.md) | Filter button | Dropdown, Calendar, Checkbox | 2 |
| Segmented search bar | One capsule split into parts (for example Company · Status · Date), each opening its own picker, like Airbnb's "Where · When · Who" | — | — | TextInput, Dropdown, Calendar | Candidate: build only when two apps need it |
| Bulk action bar | Appears when rows are selected | [`request-list-viewbar`](../projects/e-approval/components/request-list-viewbar.md) | Row checkboxes (bar not seen) | Button | 2 |
| Kanban board | Lanes by stage, a card per document | — | Purchasing "Overview" board | Badge, Avatar | App only |

### Detail

| Block | What it is | E-A | Proc | Built from | Tier |
|---|---|---|---|---|---|
| Detail panel | Header (title, ID chip, owner, date, status, open/share/print/more), tab strip, scrolling body, footer actions | [`request-detail-shell`](../projects/e-approval/components/request-detail-shell.md), [`request-detail-slide-over`](../projects/e-approval/patterns/request-detail-slide-over.md) | Document detail, opened beside the table | Tabs, IconButton, Badge, Button | 1 |
| Field grid | Label + value pairs in two columns, in collapsible sections | [`request-detail-inline-cell`](../projects/e-approval/components/request-detail-inline-cell.md), [`request-detail-sections`](../projects/e-approval/components/request-detail-sections.md) | Information tab ("General", "Details") | — | 1 |
| Approval timeline | "Delegation of Authority" steps: person, role, status, time, note | [`request-detail-approval-step`](../projects/e-approval/components/request-detail-approval-step.md), [`request-detail-role-tag`](../projects/e-approval/components/request-detail-role-tag.md), [`request-detail-rejection-reason`](../projects/e-approval/components/request-detail-rejection-reason.md) | Approval tab, also headed "Delegation of Authority (DOA)" | StepIndicator, Avatar, Badge | 1 |
| Approve/reject dialog | Confirm with an optional or required comment | [`request-detail-approve-reject-dialog`](../projects/e-approval/components/request-detail-approve-reject-dialog.md) | Present in the prototype's code (not opened) | ConfirmationDialog, TextArea | 1 |
| Comment thread | Messages and a composer below them | [`request-detail-comment-thread`](../projects/e-approval/components/request-detail-comment-thread.md) | Comments tab | Avatar, TextArea | 2 |
| Attachments | Files and links | [`create-form-reference-attachments`](../projects/e-approval/components/create-form-reference-attachments.md) | Attachments; "Related" tab | — | 2 |
| Line items | Items with quantity, unit, unit price, total | [`create-form-item-budget`](../projects/e-approval/components/create-form-item-budget.md), [`request-detail-sections`](../projects/e-approval/components/request-detail-sections.md) | "Details" items table | Table | 2 |
| Budget card | Available vs requested, in or out of budget | [`request-detail-budget-status`](../projects/e-approval/components/request-detail-budget-status.md) | "Budget" widget | Badge | App only (purchasing) |

### Forms

| Block | What it is | E-A | Proc | Built from | Tier |
|---|---|---|---|---|---|
| Form page | Title, step tabs (Information / Approval / Preview), form section cards, sticky footer (Back, Cancel, Save draft, Next) | [`create-form`](../projects/e-approval/patterns/create-form.md), [`create-form-progress`](../projects/e-approval/components/create-form-progress.md) | Purchase Request form, same three steps | Steps, Button | 1 |
| Form section | Card with a title (and info icon) and a two-column field grid | [`create-form-general-details`](../projects/e-approval/components/create-form-general-details.md) | "General", "Details" | TextInput, Dropdown, Calendar | 1 (part of Form page) |
| Type picker | Grouped grid of shortcut tiles with a search field | [`create-form-request-type`](../projects/e-approval/components/create-form-request-type.md) | "Create request · Purchasing" | Section card, Shortcut tile | 2 |
| Approval flow builder | Assign verifiers and approvers per step | [`create-form-approval`](../projects/e-approval/components/create-form-approval.md) | Approval step of the form (not opened) | Dropdown, Avatar | 2 |
| Preview | Read-only summary before submitting | [`create-form-preview`](../projects/e-approval/components/create-form-preview.md) | Preview step | Field grid | 2 |

Notifications, the ⌘K command palette, keyboard shortcuts and the account menu belong to the shell, not to blocks; see [`shell.md`](shell.md).

## Page templates

Built in Storybook from the shell plus blocks, as whole pages to copy. They are references, not package exports.

| Template | Made of |
|---|---|
| Dashboard | Section cards with stat tiles, shortcut tiles and an activity list |
| List | Status tabs, list toolbar, filter chips, data table (or card view), empty state |
| List with detail | The list with the detail panel open beside it: information, approval, comments |
| Form | Form page with form sections and the approval and preview steps |
| Type picker | Section cards of shortcut tiles |

## Differences to settle before building

The two sources mostly agree, which is why these blocks are good candidates. Where they differ:

- **Detail panel placement:** in the prototype the panel opens beside the table and the list stays visible. E-Approval's docs describe a slide-over, but don't say whether it covers the list or pushes it aside.
- **Form steps:** E-Approval's docs say the three steps are free tabs, not a locked wizard. The prototype shows them as a stepper. Same three steps; whether they lock needs a decision.
- **Off-theme values:** the prototype uses some sizes that aren't in the theme (as with the app switcher). Blocks use theme values; the prototype is the layout reference, not the measurement source.
- **Labels:** the prototype is in Thai; the decision is English labels.

## Changelog

- **2026-11-25:** first inventory, from E-Approval's docs and the ProcureApp prototype.
