import type { ComponentProps, ReactNode } from 'react'

export type ChipHierarchy = 'primary' | 'secondary'

export interface ChipProps extends ComponentProps<'button'> {
  /** Primary = filled, Secondary = outlined. */
  hierarchy?: ChipHierarchy
  /** true = full pill, false = rounded rectangle. */
  rounded?: boolean
  selected?: boolean
  /** 16px icon before the label. */
  prefixIcon?: ReactNode
  /** 16px icon after the label (e.g. a remove "x"). */
  suffixIcon?: ReactNode
}

// Spec: projects/portal2.0/components/chips-tag-badge.md
const base =
  'inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap px-1.5 text-body-small-regular ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo ' +
  'disabled:cursor-not-allowed disabled:text-disabled'

const styles: Record<ChipHierarchy, { rest: string; selected: string }> = {
  primary: {
    rest: 'bg-secondary text-primary enabled:hover:bg-primary-hover disabled:bg-disabled',
    selected: 'bg-accent-indigo text-primary-inverse disabled:bg-disabled',
  },
  secondary: {
    rest: 'bg-primary text-primary inset-ring inset-ring-primary enabled:hover:inset-ring-primary-bolder disabled:bg-transparent disabled:inset-ring-disabled',
    selected: 'bg-primary text-accent-indigo inset-ring inset-ring-accent-indigo disabled:bg-transparent disabled:inset-ring-disabled',
  },
}

/** Selectable pill for filters, multi-select tags and removable tokens. */
export function Chip({
  hierarchy = 'primary',
  rounded = true,
  selected = false,
  prefixIcon,
  suffixIcon,
  className = '',
  type = 'button',
  children,
  ...rest
}: ChipProps) {
  const s = styles[hierarchy]
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={`${base} ${rounded ? 'rounded-infinite' : 'rounded-6'} ${selected ? s.selected : s.rest} ${className}`}
      {...rest}
    >
      {prefixIcon}
      {children}
      {suffixIcon}
    </button>
  )
}
