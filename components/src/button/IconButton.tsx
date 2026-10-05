import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type IconButtonStyle = 'primary' | 'outline' | 'ghost'
export type IconButtonSize = 'sm' | 'md'

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: IconButtonStyle
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

const styles: Record<IconButtonStyle, string> = {
  primary: 'bg-accent-indigo text-primary-inverse enabled:hover:bg-accent-indigo-bolder disabled:bg-disabled',
  outline: 'bg-primary text-secondary inset-ring inset-ring-primary enabled:hover:bg-primary-hover',
  ghost: 'text-secondary enabled:hover:bg-primary-hover',
}

export function IconButton({ variant = 'ghost', size = 'md', className = '', type = 'button', children, ...rest }: IconButtonProps) {
  return (
    <button type={type} className={`${base} ${sizes[size]} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
