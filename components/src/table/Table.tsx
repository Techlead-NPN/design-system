import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { IconButton } from '../button/IconButton'

// Spec: projects/portal2.0/components/table.md
// Rows are 36px high; every cell has a bottom border only.

export function Table({ className = '', ...rest }: HTMLAttributes<HTMLTableElement>) {
  return <table className={`w-full border-separate border-spacing-0 text-left ${className}`} {...rest} />
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Selected rows are tinted indigo. */
  selected?: boolean
}

/** A body row. Hover and selection tint every cell in the row. */
export function TableRow({ selected = false, className = '', ...rest }: TableRowProps) {
  return <tr data-selected={selected || undefined} aria-selected={selected || undefined} className={`group/row ${className}`} {...rest} />
}

const SortGlyph = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l4 -4l4 4m-4 -4v14" />
    <path d="M21 15l-4 4l-4 -4m4 4v-14" />
  </svg>
)

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** 14px icon before the label. */
  icon?: ReactNode
  /** Shows the sort button; called when it is pressed. */
  onSort?: () => void
  /** The column's menu is open, or it is the active sort column. */
  active?: boolean
}

export function TableHeaderCell({ icon, onSort, active = false, className = '', children, ...rest }: TableHeaderCellProps) {
  return (
    <th scope="col" className={`h-9 border-b border-primary-subtle px-2 py-0 hover:bg-secondary ${active ? 'bg-accent-indigo-subtlest' : 'bg-primary'} ${className}`} {...rest}>
      <div className="flex items-center justify-between">
        <span className="flex min-w-0 items-center gap-1 text-body-small-medium text-tertiary">
          {icon}
          <span className="truncate">{children}</span>
        </span>
        {onSort && <IconButton size="sm" className="text-tertiary" aria-label="Sort" onClick={onSort}><SortGlyph /></IconButton>}
      </div>
    </th>
  )
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Read-only values use the secondary text color. */
  readOnly?: boolean
}

const cellFill = 'bg-primary group-hover/row:bg-primary-hover group-data-selected/row:bg-accent-indigo-subtlest'

export function TableCell({ readOnly = false, className = '', ...rest }: TableCellProps) {
  return <td className={`h-9 border-b border-primary-subtle py-0 pl-2 pr-1 text-body-small-regular ${readOnly ? 'text-secondary' : 'text-primary'} ${cellFill} ${className}`} {...rest} />
}

/** The narrow leading cell that holds the row-selection checkbox (use `<Checkbox size={14} />`). */
export function TableSelectCell({ header = false, className = '', children, ...rest }: TdHTMLAttributes<HTMLTableCellElement> & { header?: boolean }) {
  const Tag = header ? 'th' : 'td'
  return (
    <Tag className={`h-9 w-[26px] border-b border-primary-subtle pl-1 ${header ? 'bg-primary' : cellFill} ${className}`} {...rest}>
      <span className="flex size-[22px] items-center justify-center">{children}</span>
    </Tag>
  )
}
