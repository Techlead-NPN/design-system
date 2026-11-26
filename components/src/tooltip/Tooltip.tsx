import type { ComponentProps, ReactNode } from 'react'

export type TooltipPointer =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'left' | 'right'

export type TooltipSize = 'md' | 'sm'

export interface TooltipProps extends Omit<ComponentProps<'div'>, 'title'> {
  /** `md`: the 300px bubble with an optional title. `sm`: a one-line label (e.g. an icon button's name), no title, as wide as its text. */
  size?: TooltipSize
  /** Which edge the pointer sits on, and where along it. */
  pointer?: TooltipPointer
  title?: ReactNode
  children: ReactNode
}

// Spec: projects/e-approval/components/tooltip.md
// This is the tooltip bubble only. Showing it on hover/focus and positioning it
// against its trigger is left to the app.
const arrow = 'shrink-0 bg-secondary-inverse'
const shapes = {
  up: '[clip-path:polygon(50%_0,100%_100%,0_100%)]',
  down: '[clip-path:polygon(0_0,100%_0,50%_100%)]',
  left: '[clip-path:polygon(100%_0,100%_100%,0_50%)]',
  right: '[clip-path:polygon(0_0,100%_50%,0_100%)]',
}
const inset = { left: 'self-start ml-6', center: 'self-center', right: 'self-end mr-6' }

export function Tooltip({ size = 'md', pointer = 'top-center', title, className = '', children, ...rest }: TooltipProps) {
  const [edge, along = 'center'] = pointer.split('-') as ['top' | 'bottom' | 'left' | 'right', 'left' | 'center' | 'right' | undefined]
  const bubble =
    size === 'sm' ? (
      <div className="whitespace-nowrap rounded-6 bg-secondary-inverse px-2 py-1 text-body-mini-medium text-primary-inverse">{children}</div>
    ) : (
      <div className="flex w-[300px] flex-col gap-3 rounded-6 bg-secondary-inverse p-3 text-primary-inverse">
        {title != null && <div className="text-body-mini-medium">{title}</div>}
        <div className="text-support-caption">{children}</div>
      </div>
    )
  if (edge === 'left' || edge === 'right') {
    const tip = <div className={`${arrow} ${size === 'sm' ? 'h-2.5 w-1.5' : 'h-4 w-2'} self-center ${edge === 'left' ? shapes.left : shapes.right}`} />
    return (
      <div role="tooltip" className={`inline-flex ${className}`} {...rest}>
        {edge === 'left' && tip}
        {bubble}
        {edge === 'right' && tip}
      </div>
    )
  }
  const tip = <div className={`${arrow} ${size === 'sm' ? 'h-1.5 w-2.5' : 'h-2 w-4'} ${size === 'sm' ? 'self-center' : inset[along]} ${edge === 'top' ? shapes.up : shapes.down}`} />
  return (
    <div role="tooltip" className={`inline-flex flex-col ${className}`} {...rest}>
      {edge === 'top' && tip}
      {bubble}
      {edge === 'bottom' && tip}
    </div>
  )
}
