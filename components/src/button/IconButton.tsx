import type { ComponentProps, ReactNode } from 'react'

export type IconButtonStyle = 'primary' | 'outline' | 'ghost'
export type IconButtonAccent = 'default' | 'danger' | 'blue'
export type IconButtonSize = 'sm' | 'md'

export interface IconButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
  variant?: IconButtonStyle
  /** Tints Outline and Ghost the same way as Button's accent. Primary has one look and ignores it. */
  accent?: IconButtonAccent
  /** sm = 24px with a 14px icon, md = 32px with a 20px icon. */
  size?: IconButtonSize
  /** Required: an icon-only button has no visible label. */
  'aria-label': string
  /** The icon, sized to match `size`. */
  children: ReactNode
}

// Spec: projects/portal2.0/components/button.md
const base =
  'inline-flex shrink-0 items-center justify-center rounded-6 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo ' +
  'disabled:cursor-not-allowed disabled:text-disabled'

const sizes: Record<IconButtonSize, string> = { sm: 'size-6', md: 'size-8' }

const primary = 'bg-accent-indigo text-primary-inverse enabled:hover:bg-accent-indigo-bolder disabled:bg-disabled'

const styles: Record<Exclude<IconButtonStyle, 'primary'>, Record<IconButtonAccent, string>> = {
  outline: {
    default: 'bg-primary text-secondary inset-ring inset-ring-primary enabled:hover:bg-primary-hover',
    danger: 'bg-primary text-danger inset-ring inset-ring-danger enabled:hover:bg-danger-subtle',
    blue: 'bg-primary text-accent-indigo inset-ring inset-ring-accent-indigo enabled:hover:bg-accent-indigo-subtlest',
  },
  ghost: {
    default: 'text-secondary enabled:hover:bg-primary-hover',
    danger: 'text-danger enabled:hover:bg-danger-subtle',
    blue: 'text-accent-indigo enabled:hover:bg-accent-indigo-subtlest',
  },
}

// One disabled rule per style, whatever the accent.
const disabled: Record<IconButtonStyle, string> = {
  primary: '',
  outline: 'disabled:inset-ring-primary',
  ghost: '',
}

export function IconButton({
  variant = 'ghost',
  accent = 'default',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...rest
}: IconButtonProps) {
  const look = variant === 'primary' ? primary : styles[variant][accent]
  return (
    <button type={type} className={`${base} ${sizes[size]} ${look} ${disabled[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
