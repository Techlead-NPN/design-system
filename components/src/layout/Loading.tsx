import type { ComponentProps } from 'react'

export interface LoadingProps extends ComponentProps<'span'> {
  /** Which surface the bar sits on: `light` for light backgrounds, `dark` for dark ones. */
  surface?: 'light' | 'dark'
}

// Spec: projects/portal2.0/components/loading.md
/** Skeleton bar shown in place of content that is still loading. Set its width with `className`. */
export function Loading({ surface = 'light', className = '', ...rest }: LoadingProps) {
  return (
    <span role="status" aria-label="Loading" className={`relative block h-4 overflow-hidden rounded-4 ${surface === 'light' ? 'bg-loading-light' : 'bg-loading-dark'} ${className}`} {...rest}>
      {/* The second phase fades in and out over the first to make the shimmer. */}
      <span className={`absolute inset-0 animate-pulse ${surface === 'light' ? 'bg-loading-light-2' : 'bg-loading-dark-2'}`} />
    </span>
  )
}
