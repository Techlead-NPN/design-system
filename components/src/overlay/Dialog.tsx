import { useEffect, useId } from 'react'
import type { ReactNode } from 'react'
import { Button } from '../button/Button'
import { IconButton } from '../button/IconButton'
import { CloseGlyph } from '../feedback/status'

// Spec: projects/portal2.0/components/dialog.md, overlay.md, bottom-sheet.md

export interface OverlayProps {
  /** Called when the scrim is clicked or Escape is pressed. */
  onClose?: () => void
  /** `center` for dialogs, `bottom` for a bottom sheet. */
  align?: 'center' | 'bottom'
  children: ReactNode
}

/** The dimmed backdrop behind a dialog or sheet. */
export function Overlay({ onClose, align = 'center', children }: OverlayProps) {
  useEffect(() => {
    if (!onClose) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className={`fixed inset-0 z-50 flex justify-center bg-overlay ${align === 'center' ? 'items-center' : 'items-end'}`} onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      {children}
    </div>
  )
}

export interface ConfirmationDialogProps {
  title: ReactNode
  description?: ReactNode
  /** Optional extra content between the text and the buttons. */
  children?: ReactNode
  /** Destructive = the confirm button is red. */
  destructive?: boolean
  confirmLabel: ReactNode
  cancelLabel: ReactNode
  onConfirm: () => void
  onCancel: () => void
}

/** Small dialog that asks the user to confirm or cancel one action. */
export function ConfirmationDialog({ title, description, children, destructive = false, confirmLabel, cancelLabel, onConfirm, onCancel }: ConfirmationDialogProps) {
  const id = useId()
  return (
    <div role="alertdialog" aria-modal="true" aria-labelledby={`${id}-title`} aria-describedby={description != null ? `${id}-desc` : undefined} className="flex w-[400px] flex-col gap-4 rounded-8 bg-primary p-6 shadow-lg">
      <div className="flex flex-col gap-2">
        <h2 id={`${id}-title`} className="text-body-medium-semibold text-primary">{title}</h2>
        {description != null && <p id={`${id}-desc`} className="text-body-small-regular text-primary">{description}</p>}
      </div>
      {children}
      <div className="flex gap-4">
        <Button className="flex-1" hierarchy="outline" onClick={onCancel}>{cancelLabel}</Button>
        <Button className="flex-1" hierarchy="primary" accent={destructive ? 'danger' : 'blue'} onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </div>
  )
}

export interface ContentDialogProps {
  /** sm = 400px, md = 600px, lg = 780px wide. */
  size?: 'sm' | 'md' | 'lg'
  title: ReactNode
  onClose?: () => void
  children: ReactNode
  /** Footer buttons, in reading order (secondary first, primary last). */
  actions?: ReactNode
}

const widths = { sm: 'w-[400px]', md: 'w-[600px]', lg: 'w-[780px]' }

/** Dialog with a title bar, free content, and a footer of actions. */
export function ContentDialog({ size = 'md', title, onClose, children, actions }: ContentDialogProps) {
  const id = useId()
  return (
    <div role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} className={`flex max-h-full flex-col rounded-8 bg-primary shadow-lg ${widths[size]}`}>
      <div className="flex items-center gap-4 px-6 pb-3 pt-6">
        <h2 id={`${id}-title`} className="min-w-0 flex-1 truncate text-body-medium-semibold text-primary">{title}</h2>
        {onClose && <IconButton size="sm" aria-label="Close" onClick={onClose}><CloseGlyph /></IconButton>}
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-6">{children}</div>
      {actions != null && (
        // Small dialogs stretch the buttons across the width; larger ones right-align them.
        <div className={`flex gap-3 px-6 pb-6 pt-4 ${size === 'sm' ? '*:flex-1' : 'justify-end *:min-w-[120px]'}`}>{actions}</div>
      )}
    </div>
  )
}

export interface BottomSheetProps {
  title: ReactNode
  /** Second line under the title, for a confirmation sheet. */
  detail?: ReactNode
  children?: ReactNode
  /** Footer buttons; they share the width equally. */
  actions?: ReactNode
}

/** Mobile panel that slides up from the bottom edge. Use inside `<Overlay align="bottom">`. */
export function BottomSheet({ title, detail, children, actions }: BottomSheetProps) {
  const id = useId()
  return (
    <div role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} className="flex max-h-full w-full flex-col rounded-t-16 bg-primary">
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-4">
        <div className="flex h-4 items-end justify-center">
          {/* Grabber: OS chrome in the design; drawn here with a neutral fill. */}
          <span className="h-[5px] w-9 rounded-infinite bg-tertiary" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 id={`${id}-title`} className="text-body-medium-semibold text-primary">{title}</h2>
          {detail != null && <p className="text-body-small-medium text-tertiary">{detail}</p>}
        </div>
        {children != null && <div className="min-h-0 flex-1 overflow-auto">{children}</div>}
      </div>
      {actions != null && <div className="flex gap-3 px-4 pb-6 pt-3 *:flex-1">{actions}</div>}
    </div>
  )
}
