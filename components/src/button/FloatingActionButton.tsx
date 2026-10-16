import type { ComponentProps, ReactNode } from 'react'

export interface FloatingActionButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
  /** Required: the button has no visible label. Name the action, e.g. "New request". */
  'aria-label': string
  /** A 24px icon. */
  children: ReactNode
}

// Spec: projects/portal2.0/components/button.md (Floating action button)
// The one main create action on a mobile screen. For inline or repeated icon actions use IconButton.
export function FloatingActionButton({ className = '', type = 'button', children, ...rest }: FloatingActionButtonProps) {
  return (
    <button
      type={type}
      className={
        'inline-flex size-10 shrink-0 items-center justify-center rounded-infinite shadow-md ' +
        'bg-accent-indigo text-primary-inverse enabled:hover:bg-accent-indigo-bolder ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo ' +
        'disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled ' +
        className
      }
      {...rest}
    >
      {children}
    </button>
  )
}
