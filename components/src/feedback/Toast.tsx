import type { HTMLAttributes, ReactNode } from 'react'
import { IconButton } from '../button/IconButton'
import { CloseGlyph, StatusIcon, statusBorder, statusFillA80, statusText } from './status'
import type { Status } from './status'

// Spec: projects/portal2.0/components/toast-alert.md

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  status: Status
  title: ReactNode
  description?: ReactNode
  /** Optional action, e.g. a small Ghost Button. */
  action?: ReactNode
  onClose?: () => void
}

/** Temporary message that floats over the page and reports the result of an action. */
export function Toast({ status, title, description, action, onClose, className = '', ...rest }: ToastProps) {
  return (
    <div role="status" className={`flex w-[450px] items-start gap-4 rounded-6 p-2 shadow-lg ${statusFillA80[status]} ${className}`} {...rest}>
      <div className="flex min-w-0 flex-1 gap-1">
        <StatusIcon status={status} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="text-body-small-medium text-secondary">{title}</div>
          {description != null && <div className="text-support-caption text-tertiary">{description}</div>}
        </div>
      </div>
      <div className="flex shrink-0 items-center">
        {action}
        {onClose && <IconButton size="sm" aria-label="Close" onClick={onClose}><CloseGlyph /></IconButton>}
      </div>
    </div>
  )
}

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  status: Status
  /** `full` = one row; `short` = the action drops below the text, for narrow spaces. */
  layout?: 'full' | 'short'
  /** Optional action, e.g. a small Primary Button. */
  action?: ReactNode
}

/** Inline banner that stays in the page until its condition changes. */
export function Alert({ status, layout = 'full', action, className = '', children, ...rest }: AlertProps) {
  return (
    <div role="alert" className={`flex gap-2 rounded-6 p-2 ${layout === 'short' ? 'flex-col' : 'items-center'} ${statusFillA80[status]} ${className}`} {...rest}>
      <div className="flex min-w-0 flex-1 gap-2">
        <StatusIcon status={status} />
        <div className={`min-w-0 flex-1 text-body-small-regular ${statusText[status]}`}>{children}</div>
      </div>
      {action != null && <div className={`flex shrink-0 ${layout === 'short' ? 'justify-end' : ''}`}>{action}</div>}
    </div>
  )
}

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  status: Status
  title: ReactNode
  /** Optional action shown bottom right, e.g. a small Ghost Button. */
  action?: ReactNode
  onClose?: () => void
}

/** Boxed note with a title and explanation, for guidance that belongs next to the content. */
export function Callout({ status, title, action, onClose, className = '', children, ...rest }: CalloutProps) {
  return (
    <div className={`flex flex-col gap-1 rounded-8 border bg-secondary p-3 ${statusBorder[status]} ${className}`} {...rest}>
      <div className="flex min-h-6 items-center gap-2">
        <StatusIcon status={status} />
        <div className="min-w-0 flex-1 text-body-small-medium text-primary">{title}</div>
        {onClose && <IconButton size="sm" aria-label="Close" onClick={onClose}><CloseGlyph /></IconButton>}
      </div>
      {children != null && <div className="pl-6 text-body-small-regular text-tertiary">{children}</div>}
      {action != null && <div className="flex justify-end">{action}</div>}
    </div>
  )
}
