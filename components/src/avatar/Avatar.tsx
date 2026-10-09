import type { ComponentProps } from 'react'

export type AvatarSize = 16 | 20 | 24 | 36
export type AvatarColor = 'green' | 'teal' | 'sky' | 'blue' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'gray'

export interface AvatarProps extends ComponentProps<'span'> {
  size?: AvatarSize
  /** Photo URL. When set, the photo replaces the initials. */
  src?: string
  alt?: string
  /**
   * Background/text pair for initials. `green` and `red` reuse the success
   * and danger status colors — prefer the others for plain variety.
   */
  color?: AvatarColor
  /** Initials, e.g. "AB". */
  children?: string
}

// Spec: projects/portal2.0/components/avatar.md
const sizes: Record<AvatarSize, string> = {
  16: 'size-4 text-body-tiny-regular',
  20: 'size-5 text-support-caption',
  24: 'size-6 text-support-caption',
  36: 'size-9 text-body-medium-semibold',
}

const colors: Record<AvatarColor, string> = {
  green: 'bg-success-subtle text-success',
  teal: 'bg-accent-teal text-accent-teal',
  sky: 'bg-accent-sky text-accent-sky',
  blue: 'bg-accent-indigo-subtlest text-accent-indigo',
  purple: 'bg-accent-fuchsia text-accent-fuchsia',
  pink: 'bg-accent-blush text-accent-blush',
  red: 'bg-danger-subtle text-danger',
  orange: 'bg-accent-peach text-accent-peach',
  yellow: 'bg-accent-sun text-accent-sun',
  gray: 'bg-accent-stone text-secondary',
}

/** Round avatar: a photo, or initials on a low-contrast color. */
export function Avatar({ size = 24, src, alt = '', color = 'gray', className = '', children, ...rest }: AvatarProps) {
  const base = `inline-flex shrink-0 items-center justify-center overflow-hidden rounded-infinite ${sizes[size]}`
  if (src) {
    return (
      <span className={`${base} ${className}`} {...rest}>
        <img src={src} alt={alt} className="size-full object-cover" />
      </span>
    )
  }
  return (
    <span className={`${base} ${colors[color]} ${className}`} {...rest}>
      {children}
    </span>
  )
}
