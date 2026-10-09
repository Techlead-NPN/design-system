import type { ComponentProps, ReactNode } from 'react'

export type BadgeState = 'success' | 'error' | 'info' | 'accent' | 'urgent' | 'warning' | 'idle' | 'disabled'

export interface BadgeProps extends ComponentProps<'span'> {
  state: BadgeState
  /** Optional 14px icon before the label. Status must never rely on color alone. */
  icon?: ReactNode
}

// Spec: projects/portal2.0/components/chips-tag-badge.md
// Fill, border and text always come from the same status family.
const states: Record<BadgeState, string> = {
  success: 'bg-success-subtle border-success text-success',
  error: 'bg-danger-subtle border-danger text-danger',
  info: 'bg-info-subtle border-info text-info',
  accent: 'bg-accent-indigo-subtlest border-accent-indigo-bolder text-accent-indigo',
  urgent: 'bg-urgent-subtle border-urgent text-urgent',
  warning: 'bg-warning-subtle border-warning text-warning',
  idle: 'bg-idle-subtle border-idle text-idle',
  disabled: 'bg-disabled border-primary-bolder text-tertiary',
}

/** Static status label. Never interactive — use Chip for anything clickable. */
export function Badge({ state, icon, className = '', children, ...rest }: BadgeProps) {
  return (
    <span
      className={`inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap rounded-infinite border px-2 text-body-small-medium ${states[state]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </span>
  )
}
