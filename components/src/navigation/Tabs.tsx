import { createContext, useContext, type ComponentProps, type ReactNode } from 'react'

// Spec: projects/e-approval/components/tab.md (underline); themes/COMPONENT_TOKENS.md (pill, segmented)

/**
 * `underline`: the indigo line under the selected tab (Classic).
 * `pill`: the selected tab is a dark pill, for page-level status tabs (Duo).
 * `segmented`: the selected tab is a white pill in a grey track, for switching views inside a card (Duo).
 */
export type TabsVariant = 'underline' | 'pill' | 'segmented'

const VariantContext = createContext<TabsVariant>('underline')

export interface TabsProps extends ComponentProps<'div'> {
  variant?: TabsVariant
}

const bars: Record<TabsVariant, string> = {
  underline: 'flex gap-2',
  pill: 'flex gap-1',
  segmented: 'inline-flex gap-1 rounded-12 bg-primary-hover p-1',
}

/** A horizontal tab bar. Put `Tab`s inside. */
export function Tabs({ variant = 'underline', className = '', ...rest }: TabsProps) {
  return (
    <VariantContext.Provider value={variant}>
      <div role="tablist" className={`${bars[variant]} ${className}`} {...rest} />
    </VariantContext.Provider>
  )
}

export interface TabProps extends ComponentProps<'button'> {
  selected?: boolean
  /** Underline variant only: height of the label area, 28px or 32px. */
  size?: 28 | 32
  /** 16px icon before the label. */
  prefixIcon?: ReactNode
  /** 16px icon after the label (e.g. a chevron on a "+4 More" tab). */
  suffixIcon?: ReactNode
  /** A count after the label, e.g. items in that tab. */
  count?: ReactNode
}

const focus = 'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo'

export function Tab({ selected = false, size = 28, prefixIcon, suffixIcon, count, className = '', type = 'button', children, ...rest }: TabProps) {
  const variant = useContext(VariantContext)

  if (variant === 'pill' || variant === 'segmented') {
    const look =
      variant === 'pill'
        ? selected
          ? 'rounded-infinite bg-primary-inverse text-primary-inverse'
          : 'rounded-infinite text-secondary hover:bg-primary-hover'
        : selected
          ? 'rounded-10 bg-primary text-primary shadow-xs'
          : 'rounded-10 text-secondary hover:text-primary'
    return (
      <button
        type={type}
        role="tab"
        aria-selected={selected}
        className={`flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap px-3 text-body-small-medium ${look} ${focus} ${className}`}
        {...rest}
      >
        {prefixIcon}
        {children}
        {count != null && <span className={`text-body-small-regular ${variant === 'pill' && selected ? 'text-secondary-inverse' : 'text-tertiary'}`}>{count}</span>}
        {suffixIcon}
      </button>
    )
  }

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
        {count != null && <span className="text-body-small-regular text-tertiary">{count}</span>}
        {suffixIcon}
      </span>
    </button>
  )
}
