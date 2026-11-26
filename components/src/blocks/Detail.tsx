import { useState, type ComponentProps, type ReactNode } from 'react'
import { IconButton } from '../button/IconButton'

// Spec: workspace/blocks.md (Detail panel, Field grid); E-Approval sources:
// projects/e-approval/components/request-detail-shell.md, request-detail-inline-cell.md,
// request-detail-sections.md, patterns/request-detail-slide-over.md

const glyph = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const
const XIcon = () => <svg {...glyph}><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
const UpIcon = () => <svg {...glyph}><path d="M6 15l6 -6l6 6" /></svg>
const DownIcon = () => <svg {...glyph}><path d="M6 9l6 6l6 -6" /></svg>

/**
 * Put this class on table header and body cells that can hide while the detail panel is open,
 * so the table drops to its key columns (e.g. No., Title, Status) instead of squeezing.
 */
export const hideWhenDetailOpen = 'group-data-[detail=open]/split:hidden'

export interface ListWithDetailProps extends ComponentProps<'div'> {
  /** The list or table. */
  list: ReactNode
  /** The open record's `DetailPanel`, or nothing when no record is open. */
  detail?: ReactNode
  /** Width of the detail panel when open. Default 440px. */
  detailWidth?: number
}

/**
 * A list with the open record's details beside it, inside the same card. The panel pushes the
 * list narrower instead of covering it; mark non-key columns with `hideWhenDetailOpen`.
 */
export function ListWithDetail({ list, detail, detailWidth = 440, className = '', ...rest }: ListWithDetailProps) {
  const open = detail != null && detail !== false
  return (
    <div data-detail={open ? 'open' : 'closed'} className={`group/split flex min-h-0 ${className}`} {...rest}>
      <div className="min-w-0 flex-1 overflow-x-auto">{list}</div>
      {open && (
        <div style={{ width: detailWidth }} className="flex min-h-0 shrink-0 flex-col border-l border-primary-subtle">
          {detail}
        </div>
      )}
    </div>
  )
}

export interface DetailPanelProps extends Omit<ComponentProps<'section'>, 'title'> {
  /** Small label above the title, e.g. "Request details". */
  eyebrow?: ReactNode
  title: ReactNode
  /** One line under the title: document number, owner, date. */
  meta?: ReactNode
  /** The record's status, usually a `Badge`. */
  status?: ReactNode
  /** Header icon buttons: open in full page, share, print, more. */
  actions?: ReactNode
  /** A `Tabs` bar under the header. */
  tabs?: ReactNode
  /** Pinned to the bottom, e.g. Reject and Approve buttons. */
  footer?: ReactNode
  onClose?: () => void
  /** Go to the previous / next record in the list without closing. */
  onPrevious?: () => void
  onNext?: () => void
}

/** The open record: header with title and status, optional tabs, a scrolling body and a pinned footer. */
export function DetailPanel({ eyebrow, title, meta, status, actions, tabs, footer, onClose, onPrevious, onNext, className = '', children, ...rest }: DetailPanelProps) {
  return (
    <section className={`flex min-h-0 flex-1 flex-col bg-primary ${className}`} {...rest}>
      <header className="flex shrink-0 flex-col gap-3 border-b border-primary-subtle px-4 pt-3">
        <div className="flex items-center gap-1">
          {onClose && <IconButton variant="ghost" size="sm" aria-label="Close" onClick={onClose}><XIcon /></IconButton>}
          {eyebrow != null && <span className="ml-1 text-body-small-medium text-secondary">{eyebrow}</span>}
          <div className="ml-auto flex items-center gap-1">
            {onPrevious && <IconButton variant="ghost" size="sm" aria-label="Previous" onClick={onPrevious}><UpIcon /></IconButton>}
            {onNext && <IconButton variant="ghost" size="sm" aria-label="Next" onClick={onNext}><DownIcon /></IconButton>}
            {actions}
          </div>
        </div>
        <div className="flex items-start gap-3">
          <h2 className="min-w-0 flex-1 text-heading-h6 text-primary">{title}</h2>
          {status != null && <div className="shrink-0 pt-1">{status}</div>}
        </div>
        {meta != null && <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-small-regular text-secondary">{meta}</div>}
        {tabs != null ? <div className="-mb-px">{tabs}</div> : <div className="h-1" />}
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
      {footer != null && <footer className="flex shrink-0 items-center justify-end gap-2 border-t border-primary-subtle px-4 py-3">{footer}</footer>}
    </section>
  )
}

export interface DetailSectionProps extends Omit<ComponentProps<'section'>, 'title'> {
  title: ReactNode
  /** Starts open. Default true. */
  defaultOpen?: boolean
}

/** A titled, collapsible group of fields inside a detail panel. */
export function DetailSection({ title, defaultOpen = true, className = '', children, ...rest }: DetailSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className={`rounded-card border border-primary-subtle bg-primary ${className}`} {...rest}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 rounded-card px-4 py-3 text-left text-body-medium-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo"
      >
        <span className="flex-1">{title}</span>
        <span className="text-tertiary">{open ? <UpIcon /> : <DownIcon />}</span>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </section>
  )
}

/** Labelled values in two columns. Put `Field`s inside. */
export function FieldGrid({ className = '', ...rest }: ComponentProps<'dl'>) {
  return <dl className={`grid grid-cols-2 gap-x-6 gap-y-4 ${className}`} {...rest} />
}

export interface FieldProps extends Omit<ComponentProps<'div'>, 'children'> {
  label: ReactNode
  /** The value: text, a chip, a badge. Empty values show a dash. */
  children?: ReactNode
  /** 14px icon before the label. */
  icon?: ReactNode
  /** Spans both columns, for long values such as a description. */
  wide?: boolean
}

/** One label and its value. */
export function Field({ label, icon, wide = false, className = '', children, ...rest }: FieldProps) {
  const empty = children == null || children === ''
  return (
    <div className={`flex min-w-0 flex-col gap-1 ${wide ? 'col-span-2' : ''} ${className}`} {...rest}>
      <dt className="flex items-center gap-1 text-body-small-regular text-tertiary">{icon}{label}</dt>
      <dd className={`min-w-0 text-body-small-medium ${empty ? 'text-tertiary' : 'text-primary'}`}>{empty ? '—' : children}</dd>
    </div>
  )
}
