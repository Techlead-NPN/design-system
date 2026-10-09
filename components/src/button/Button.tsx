import type { ComponentProps, ReactNode } from 'react'

export type ButtonHierarchy = 'primary' | 'outline' | 'ghost'
export type ButtonAccent = 'default' | 'danger' | 'blue'
export type ButtonSize = 'sm' | 'md'

export interface ButtonProps extends ComponentProps<'button'> {
  /** Primary = the one main action; Outline = secondary; Ghost = lowest emphasis. */
  hierarchy?: ButtonHierarchy
  accent?: ButtonAccent
  /** sm = 24px high, md = 32px high. */
  size?: ButtonSize
  /** 14px icon before the label. */
  prefixIcon?: ReactNode
  /** 14px icon after the label. */
  suffixIcon?: ReactNode
  /** Keyboard shortcut hint shown after the label, e.g. "⌘O". */
  shortcut?: ReactNode
}

// Spec: projects/portal2.0/components/button.md
const base =
  'inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-6 px-2 text-body-small-medium ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo ' +
  'disabled:cursor-not-allowed disabled:text-disabled'

const sizes: Record<ButtonSize, string> = { sm: 'h-6', md: 'h-8' }

const styles: Record<ButtonHierarchy, Record<ButtonAccent, string>> = {
  primary: {
    default: 'bg-secondary text-secondary inset-ring inset-ring-primary enabled:hover:bg-primary-hover',
    danger: 'bg-danger text-primary-inverse enabled:hover:bg-danger-bolder',
    blue: 'bg-accent-indigo text-primary-inverse enabled:hover:bg-accent-indigo-bolder',
  },
  outline: {
    default: 'text-secondary inset-ring inset-ring-primary enabled:hover:bg-primary-hover',
    danger: 'text-danger inset-ring inset-ring-danger enabled:hover:bg-danger-subtle',
    blue: 'text-accent-indigo inset-ring inset-ring-accent-indigo enabled:hover:bg-accent-indigo-subtlest',
  },
  ghost: {
    default: 'text-secondary enabled:hover:bg-primary-hover',
    danger: 'text-danger enabled:hover:bg-danger-subtle',
    blue: 'text-accent-indigo enabled:hover:bg-accent-indigo-subtlest',
  },
}

// Shortcut hint: a 16px separator line and the hint text, tinted per accent.
const shortcutTone: Record<ButtonAccent, { line: string; text: string }> = {
  default: { line: 'border-primary-subtle', text: 'text-tertiary' },
  danger: { line: 'border-accent-blush', text: 'text-accent-blush' },
  blue: { line: 'border-accent-sky', text: 'text-accent-indigo-subtle' },
}

// One disabled rule per hierarchy, whatever the accent.
const disabled: Record<ButtonHierarchy, string> = {
  primary: 'disabled:bg-disabled disabled:inset-ring-0',
  outline: 'disabled:inset-ring-primary',
  ghost: '',
}

export function Button({
  hierarchy = 'primary',
  accent = 'default',
  size = 'md',
  prefixIcon,
  suffixIcon,
  shortcut,
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${sizes[size]} ${styles[hierarchy][accent]} ${disabled[hierarchy]} ${className}`}
      {...rest}
    >
      {prefixIcon}
      {children}
      {suffixIcon}
      {shortcut != null && (
        <>
          <span aria-hidden="true" className={`h-4 border-l ${shortcutTone[accent].line}`} />
          <span className={`text-support-caption ${rest.disabled ? '' : shortcutTone[accent].text}`}>{shortcut}</span>
        </>
      )}
    </button>
  )
}
