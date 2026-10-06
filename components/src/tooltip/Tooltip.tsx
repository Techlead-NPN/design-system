import type { HTMLAttributes, ReactNode } from 'react'

export type TooltipPointer =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'left' | 'right'

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Which edge the pointer sits on, and where along it. */
  pointer?: TooltipPointer
  title?: ReactNode
  children: ReactNode
}

// Spec: projects/portal2.0/components/tooltip.md
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

export function Tooltip({ pointer = 'top-center', title, className = '', children, ...rest }: TooltipProps) {
  const [edge, along = 'center'] = pointer.split('-') as ['top' | 'bottom' | 'left' | 'right', 'left' | 'center' | 'right' | undefined]
  const bubble = (
    <div className="flex w-[300px] flex-col gap-3 rounded-6 bg-secondary-inverse p-3 text-primary-inverse">
      {title != null && <div className="text-body-mini-medium">{title}</div>}
      <div className="text-support-caption">{children}</div>
    </div>
  )
  if (edge === 'left' || edge === 'right') {
    const tip = <div className={`${arrow} h-4 w-2 self-center ${edge === 'left' ? shapes.left : shapes.right}`} />
    return (
      <div role="tooltip" className={`inline-flex ${className}`} {...rest}>
        {edge === 'left' && tip}
        {bubble}
        {edge === 'right' && tip}
      </div>
    )
  }
  const tip = <div className={`${arrow} h-2 w-4 ${inset[along]} ${edge === 'top' ? shapes.up : shapes.down}`} />
  return (
    <div role="tooltip" className={`inline-flex flex-col ${className}`} {...rest}>
      {edge === 'top' && tip}
      {bubble}
      {edge === 'bottom' && tip}
    </div>
  )
}
