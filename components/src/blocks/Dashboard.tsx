import type { ComponentProps, ReactNode } from 'react'
import { SidebarIcon, type SidebarIconColor } from '../avatar/SidebarIcon'

// Spec: workspace/blocks.md (Section card, Stat tiles); E-Approval sources:
// projects/e-approval/components/home-widget-title.md, home-widget-status.md

export interface SectionCardProps extends Omit<ComponentProps<'section'>, 'title'> {
  title: ReactNode
  /** A 14px icon, shown in a tinted 24px chip before the title. */
  icon?: ReactNode
  /** The icon chip's colour. Decorative: pick per card, never to signal status. */
  color?: SidebarIconColor
  /** Right side of the title row: a "See all" link, a filter, a small button. */
  action?: ReactNode
}

/** A titled card that groups related content on a page, e.g. a dashboard widget. */
export function SectionCard({ title, icon, color = 'stone', action, className = '', children, ...rest }: SectionCardProps) {
  return (
    <section className={`flex flex-col gap-4 rounded-card border border-card bg-primary p-4 shadow-card ${className}`} {...rest}>
      <header className="flex min-h-6 items-center gap-2">
        {icon != null && <SidebarIcon color={color} size={24}>{icon}</SidebarIcon>}
        <h2 className="min-w-0 flex-1 truncate text-body-medium-semibold text-secondary">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  )
}

export type StatTone = 'neutral' | 'idle' | 'info' | 'success' | 'warning' | 'urgent' | 'danger'

const tones: Record<StatTone, string> = {
  neutral: 'text-primary',
  idle: 'text-idle',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  urgent: 'text-urgent',
  danger: 'text-danger',
}

export interface StatTileProps extends Omit<ComponentProps<'button'>, 'value'> {
  /** The number. */
  value: ReactNode
  label: ReactNode
  /** Colour of the number. Use the same status colours as everywhere else (e.g. Approved = success). */
  tone?: StatTone
  /** `highlight`: the orange banner for counts that need the person's action. */
  variant?: 'default' | 'highlight'
}

/** A count and its label. Clickable when it has an `onClick` (e.g. opens the filtered list). */
export function StatTile({ value, label, tone = 'neutral', variant = 'default', onClick, className = '', type = 'button', ...rest }: StatTileProps) {
  const look =
    variant === 'highlight'
      ? 'bg-urgent-subtle hover:bg-urgent-bolder'
      : 'bg-secondary hover:bg-secondary-hover'
  const content = (
    <>
      <span className={`text-body-large-bold tabular-nums ${variant === 'highlight' ? 'text-success' : tones[tone]}`}>{value}</span>
      <span className={`text-body-mini-medium ${variant === 'highlight' ? 'text-success' : 'text-secondary'}`}>{label}</span>
    </>
  )
  const box = `flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-8 px-3 py-2 text-center ${look}`
  if (!onClick) return <div className={`${box} ${className}`}>{content}</div>
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${box} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo ${className}`}
      {...rest}
    >
      {content}
    </button>
  )
}

/** A row of stat tiles that share the width. */
export function StatTiles({ className = '', ...rest }: ComponentProps<'div'>) {
  return <div className={`flex gap-2 ${className}`} {...rest} />
}
