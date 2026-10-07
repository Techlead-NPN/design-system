import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

// Spec: projects/portal2.0/components/tab.md

/** A horizontal tab bar. Put `Tab`s inside. */
export function Tabs({ className = '', ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div role="tablist" className={`flex gap-2 ${className}`} {...rest} />
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  /** Height of the label area: 28px or 32px. */
  size?: 28 | 32
  /** 16px icon before the label. */
  prefixIcon?: ReactNode
  /** 16px icon after the label (e.g. a chevron on a "+4 More" tab). */
  suffixIcon?: ReactNode
}

export function Tab({ selected = false, size = 28, prefixIcon, suffixIcon, className = '', type = 'button', children, ...rest }: TabProps) {
  return (
    <button
      type={type}
      role="tab"
      aria-selected={selected}
      className={`group flex h-10 shrink-0 items-center border-b outline-none ${selected ? 'border-accent-indigo' : 'border-transparent'} ${className}`}
      {...rest}
    >
      <span
        className={
          `flex items-center gap-1 whitespace-nowrap rounded-6 px-2 text-body-small-medium ${size === 28 ? 'h-7' : 'h-8'} ` +
          'group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent-indigo ' +
          (selected ? 'text-accent-indigo' : 'text-secondary group-hover:bg-primary-hover')
        }
      >
        {prefixIcon}
        {children}
        {suffixIcon}
      </span>
    </button>
  )
}
