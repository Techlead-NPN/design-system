import type { HTMLAttributes, ReactNode } from 'react'

export type SidebarIconColor = 'ocean' | 'sky' | 'teal' | 'sun' | 'fuchsia' | 'blossom' | 'emerald' | 'blush' | 'peach' | 'stone'

export interface SidebarIconProps extends HTMLAttributes<HTMLSpanElement> {
  /** Decorative only — pick for variety, never to signal status. */
  color?: SidebarIconColor
  /** 16 for compact or nested rows, 24 for prominent entries. The icon is 14px in both. */
  size?: 16 | 24
  /** A 14px icon. */
  children: ReactNode
}

// Spec: projects/portal2.0/components/icon-sidebar.md
const colors: Record<SidebarIconColor, string> = {
  ocean: 'bg-accent-ocean border-accent-ocean text-accent-ocean',
  sky: 'bg-accent-sky border-accent-sky text-accent-sky',
  teal: 'bg-accent-teal border-accent-teal text-accent-teal',
  sun: 'bg-accent-sun border-accent-sun text-accent-sun',
  fuchsia: 'bg-accent-fuchsia border-accent-fuchsia text-accent-fuchsia',
  blossom: 'bg-accent-blossom border-accent-blossom text-accent-blossom',
  emerald: 'bg-accent-emerald border-accent-emerald text-accent-emerald',
  blush: 'bg-accent-blush border-accent-blush text-accent-blush',
  peach: 'bg-accent-peach border-accent-peach text-accent-peach',
  stone: 'bg-accent-stone border-accent-stone text-accent-stone',
}

/** Small tinted chip holding one icon, used for sidebar navigation items. */
export function SidebarIcon({ color = 'stone', size = 16, className = '', children, ...rest }: SidebarIconProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-4 border ${size === 16 ? 'size-4' : 'size-6'} ${colors[color]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  )
}
