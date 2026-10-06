import type { HTMLAttributes } from 'react'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical'
  /** Space the divider takes up across its line: none, regular or spacious. */
  spacing?: 'none' | 'regular' | 'spacious'
}

// Spec: projects/portal2.0/components/divider.md
// The outer box sizes are the component's own dimensions (not spacing tokens).
const horizontal = { none: 'h-px', regular: 'h-[9px]', spacious: 'h-4' }
const vertical = { none: 'w-px', regular: 'w-[5px]', spacious: 'w-4' }

export function Divider({ direction = 'horizontal', spacing = 'none', className = '', ...rest }: DividerProps) {
  if (direction === 'vertical') {
    return (
      <div role="separator" aria-orientation="vertical" className={`flex shrink-0 justify-center self-stretch ${vertical[spacing]} ${className}`} {...rest}>
        <div className="h-full border-l border-primary-subtle" />
      </div>
    )
  }
  return (
    <div role="separator" className={`flex w-full shrink-0 items-center ${horizontal[spacing]} ${className}`} {...rest}>
      <div className="w-full border-t border-primary-subtle" />
    </div>
  )
}
