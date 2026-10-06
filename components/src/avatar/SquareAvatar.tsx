import type { HTMLAttributes } from 'react'

export type SquareAvatarSize = 12 | 14 | 16 | 20 | 24 | 40

export interface SquareAvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SquareAvatarSize
  /** Image URL (e.g. a company logo). When set, it replaces the initial. */
  src?: string
  alt?: string
  /** A single initial, e.g. "L". */
  children?: string
}

// Spec: projects/portal2.0/components/avatar.md
const sizes: Record<SquareAvatarSize, string> = {
  12: 'size-3 rounded-2 text-body-tiny-regular',
  14: 'size-3.5 rounded-2 text-body-tiny-regular',
  16: 'size-4 rounded-2 text-support-caption',
  20: 'size-5 rounded-4 text-body-small-medium',
  24: 'size-6 rounded-4 text-body-small-medium',
  40: 'size-10 rounded-4 text-body-medium-medium',
}

/** Square avatar for companies and other non-person entities: an image, or one initial. */
export function SquareAvatar({ size = 24, src, alt = '', className = '', children, ...rest }: SquareAvatarProps) {
  const base = `inline-flex shrink-0 items-center justify-center overflow-hidden ${sizes[size]}`
  if (src) {
    return (
      <span className={`${base} ${className}`} {...rest}>
        <img src={src} alt={alt} className="size-full object-cover" />
      </span>
    )
  }
  return (
    <span className={`${base} bg-tertiary text-secondary ${className}`} {...rest}>
      {children}
    </span>
  )
}
