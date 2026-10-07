import type { HTMLAttributes } from 'react'

// Spec: projects/portal2.0/components/scroll-area.md
// The scrollbar thumb is a thin rounded bar in border/primary-subtle with no track.
/** A scrolling container with the system's thin scrollbar. Give it a height or max-height. */
export function ScrollArea({ className = '', ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`overflow-auto [scrollbar-color:var(--border-primary-subtle)_transparent] [scrollbar-width:thin] ${className}`}
      {...rest}
    />
  )
}
