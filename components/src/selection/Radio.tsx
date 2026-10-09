import type { ComponentProps, ReactNode } from 'react'

export interface RadioProps extends Omit<ComponentProps<'input'>, 'type' | 'children'> {
  /** Label text. Omit for a bare radio and pass `aria-label` instead. */
  children?: ReactNode
  /** Which side of the dot the label sits on. */
  labelSide?: 'left' | 'right'
  /** Error state: red ring, red fill when selected. */
  error?: boolean
}

// Spec: projects/portal2.0/components/radio-checkbox-card.md
const circle =
  'flex size-4 items-center justify-center rounded-infinite border ' +
  'group-has-focus-visible/radio:outline-2 group-has-focus-visible/radio:outline-offset-2 group-has-focus-visible/radio:outline-accent-indigo ' +
  'group-has-checked/radio:border-transparent ' +
  'group-has-disabled/radio:border-disabled group-has-disabled/radio:group-has-checked/radio:border-transparent ' +
  'group-has-disabled/radio:group-has-checked/radio:bg-tertiary'
const tone = {
  default: 'border-primary group-has-checked/radio:bg-accent-indigo',
  error: 'border-danger group-has-checked/radio:bg-danger',
}

export function Radio({ children, labelSide = 'right', error = false, className = '', ...rest }: RadioProps) {
  const label = children != null && (
    <span className="text-body-small-regular text-primary group-has-disabled/radio:text-disabled">{children}</span>
  )
  return (
    <label className={`group/radio inline-flex items-center gap-1 has-disabled:cursor-not-allowed ${className}`}>
      {labelSide === 'left' && label}
      <input type="radio" aria-invalid={error || undefined} className="sr-only" {...rest} />
      {/* 24px box holding the 16px circle */}
      <span className="flex size-6 shrink-0 items-center justify-center">
        <span className={`${circle} ${error ? tone.error : tone.default}`}>
          <span className="hidden size-1.5 rounded-infinite bg-primary group-has-checked/radio:block" />
        </span>
      </span>
      {labelSide === 'right' && label}
    </label>
  )
}
