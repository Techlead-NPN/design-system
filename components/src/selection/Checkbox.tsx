import { useEffect, useRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  /** Label text. Omit for a bare checkbox and pass `aria-label` instead. */
  children?: ReactNode
  /** Which side of the box the label sits on. */
  labelSide?: 'left' | 'right'
  /** "Some but not all" — shows a dash instead of a check. */
  indeterminate?: boolean
  /** Error state: red border, red fill when selected. */
  error?: boolean
  /** Box size in px. 16 by default; 14 inside table and menu rows. */
  size?: 14 | 16
}

// Spec: projects/portal2.0/components/radio-checkbox-card.md
const box =
  'flex shrink-0 items-center justify-center rounded-4 border text-primary-inverse ' +
  'group-has-focus-visible:outline-2 group-has-focus-visible:outline-offset-2 group-has-focus-visible:outline-accent-indigo ' +
  'group-has-checked:border-transparent group-has-indeterminate:border-transparent ' +
  'group-has-disabled:border-disabled group-has-disabled:group-has-checked:border-transparent ' +
  'group-has-disabled:group-has-checked:bg-tertiary group-has-disabled:group-has-indeterminate:border-transparent ' +
  'group-has-disabled:group-has-indeterminate:bg-tertiary'
const tone = {
  default: 'border-primary group-has-checked:bg-accent-indigo group-has-indeterminate:bg-accent-indigo',
  error: 'border-danger group-has-checked:bg-danger group-has-indeterminate:bg-danger',
}

export function Checkbox({ children, labelSide = 'right', indeterminate = false, error = false, size = 16, className = '', ...rest }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])

  const label = children != null && (
    <span className="text-body-small-regular text-primary group-has-disabled:text-disabled">{children}</span>
  )
  return (
    <label className={`group inline-flex items-center gap-2 has-disabled:cursor-not-allowed ${className}`}>
      {labelSide === 'left' && label}
      <input ref={ref} type="checkbox" aria-invalid={error || undefined} className="sr-only" {...rest} />
      <span className={`${box} ${size === 14 ? 'size-3.5' : 'size-4'} ${error ? tone.error : tone.default}`}>
        <svg viewBox="0 0 8 6" className="hidden h-1.5 w-2 group-has-checked:block group-has-indeterminate:hidden" fill="none" aria-hidden="true">
          <path d="M1 3l2 2 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="hidden h-0.5 w-2 rounded-infinite bg-primary group-has-indeterminate:block" />
      </span>
      {labelSide === 'right' && label}
    </label>
  )
}
