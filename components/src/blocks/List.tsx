import type { ComponentProps, ReactNode } from 'react'
import { Avatar } from '../avatar/Avatar'

// Spec: workspace/blocks.md (Empty state, List toolbar, Filter chips, View switch, Data table cells);
// E-Approval sources: projects/e-approval/components/request-list-*.md, patterns/request-table.md

export interface EmptyStateProps extends Omit<ComponentProps<'div'>, 'title'> {
  /** An illustration or a large icon. Use the real asset, never a redrawn one. */
  illustration?: ReactNode
  /** What the space is for, or what happened ("No requests match these filters"). */
  title: ReactNode
  /** One line on what to do next. */
  description?: ReactNode
  /** One action, e.g. a Button to create the first item or clear filters. */
  action?: ReactNode
}

/** Shown instead of a list, table or card grid when there is nothing to show. */
export function EmptyState({ illustration, title, description, action, className = '', ...rest }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center gap-2 px-6 py-12 text-center ${className}`} {...rest}>
      {illustration != null && <div className="mb-2 text-tertiary">{illustration}</div>}
      <p className="text-body-medium-semibold text-primary">{title}</p>
      {description != null && <p className="max-w-[360px] text-body-small-regular text-tertiary">{description}</p>}
      {action != null && <div className="mt-2">{action}</div>}
    </div>
  )
}

export interface ListToolbarProps extends ComponentProps<'div'> {
  /** Left side: search, the Filter button, filter chips. */
  start?: ReactNode
  /** Right side: column settings, the view switch, export. */
  end?: ReactNode
}

/** The row above a list or table: search and filters on the left, view controls on the right. */
export function ListToolbar({ start, end, className = '', ...rest }: ListToolbarProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} {...rest}>
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">{start}</div>
      {end != null && <div className="flex shrink-0 items-center gap-1">{end}</div>}
    </div>
  )
}

export interface FilterChipProps extends ComponentProps<'button'> {
  selected?: boolean
  /** Number of items the filter would show, e.g. 12. */
  count?: number
}

/** A quick filter that toggles on and off, e.g. a document type above a table. */
export function FilterChip({ selected = false, count, className = '', type = 'button', children, ...rest }: FilterChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={
        'inline-flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-infinite border border-primary-subtle px-3 text-body-small-medium ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo ' +
        (selected ? 'bg-accent-indigo-subtlest text-primary' : 'bg-secondary text-tertiary hover:text-secondary') +
        ` ${className}`
      }
      {...rest}
    >
      {children}
      {count != null && <span className={selected ? 'text-accent-indigo' : 'text-tertiary'}>{count}</span>}
    </button>
  )
}

/** A row of filter chips. */
export function FilterChips({ className = '', ...rest }: ComponentProps<'div'>) {
  return <div role="group" className={`flex flex-wrap items-center gap-2 ${className}`} {...rest} />
}

const icon = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const
const TableIcon = () => <svg {...icon}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16" /><path d="M10 4v16" /></svg>
const CardsIcon = () => <svg {...icon}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>

export type ListView = 'table' | 'cards'

export interface ViewSwitchProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  value: ListView
  onChange: (view: ListView) => void
}

/** Switches a list between table and cards. Treat the choice as a saved preference. */
export function ViewSwitch({ value, onChange, className = '', ...rest }: ViewSwitchProps) {
  const option = (view: ListView, label: string, glyph: ReactNode) => (
    <button
      type="button"
      aria-label={label}
      aria-pressed={value === view}
      onClick={() => onChange(view)}
      className={
        'flex size-7 items-center justify-center rounded-6 ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo ' +
        (value === view ? 'bg-primary text-primary shadow-sm' : 'text-tertiary hover:text-secondary')
      }
    >
      {glyph}
    </button>
  )
  return (
    <div role="group" aria-label="View" className={`inline-flex items-center gap-0.5 rounded-8 border border-primary-subtle bg-secondary p-0.5 ${className}`} {...rest}>
      {option('table', 'Table view', <TableIcon />)}
      {option('cards', 'Card view', <CardsIcon />)}
    </div>
  )
}

export interface CompanyChipProps extends ComponentProps<'span'> {
  name: string
  /** URL of the company's square logo, shown at 14px. */
  logo?: string
}

/** A company's logo and name, as used in table cells. A rounded rectangle, not a pill. */
export function CompanyChip({ name, logo, className = '', ...rest }: CompanyChipProps) {
  return (
    <span className={`inline-flex h-5 max-w-full items-center gap-1 rounded-6 bg-secondary px-1.5 text-body-small-regular text-primary ${className}`} {...rest}>
      {logo != null && <img src={logo} alt="" className="size-3.5 shrink-0 rounded-2 object-cover" />}
      <span className="truncate">{name}</span>
    </span>
  )
}

export interface AmountProps extends ComponentProps<'span'> {
  value: number
  /** ISO currency code; shown only when `showCurrency` is set. */
  currency?: string
  showCurrency?: boolean
  /** Locale for digit grouping. Defaults to English (1,234.50). */
  locale?: string
}

/** A money amount with two decimals and aligned digits. Right-align the table column it sits in. */
export function Amount({ value, currency = 'THB', showCurrency = false, locale = 'en-US', className = '', ...rest }: AmountProps) {
  const text = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
  return (
    <span className={`tabular-nums ${className}`} {...rest}>
      {text}
      {showCurrency && <span className="ml-1 text-tertiary">{currency}</span>}
    </span>
  )
}

export interface PersonLabelProps extends ComponentProps<'span'> {
  name: string
  /** Shown when there is no photo, e.g. "SC". */
  initials?: string
  avatarSrc?: string
}

/** A person's 16px avatar and name, e.g. "Requested by" in a table. */
export function PersonLabel({ name, initials, avatarSrc, className = '', ...rest }: PersonLabelProps) {
  return (
    <span className={`inline-flex min-w-0 items-center gap-1 text-body-small-regular text-primary ${className}`} {...rest}>
      <Avatar size={16} color="gray" src={avatarSrc} alt="">{initials}</Avatar>
      <span className="truncate">{name}</span>
    </span>
  )
}
