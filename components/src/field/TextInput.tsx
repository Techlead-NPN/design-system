import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  /** Label shown above the field. */
  label?: ReactNode
  /** Hint shown below the field. In the error state it turns red — use it for the error message. */
  hint?: ReactNode
  /** Error state: red border and red hint. */
  error?: boolean
  /** 16px icon or short text before the value. */
  prefix?: ReactNode
  /** 16px icon or short text after the value. */
  suffix?: ReactNode
}

// Spec: projects/portal2.0/components/text-input.md
export const fieldLabel = 'text-support-label text-tertiary'
export const fieldHint = 'text-support-caption text-tertiary'
export const fieldHintError = 'text-support-caption text-danger'
export const fieldBox =
  'rounded-6 bg-primary inset-ring inset-ring-primary-subtle ' +
  'focus-within:inset-ring-accent-indigo focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent-indigo ' +
  'has-disabled:cursor-not-allowed has-disabled:bg-disabled'
export const fieldBoxError = 'inset-ring-danger focus-within:inset-ring-danger'
export const fieldText =
  'min-w-0 flex-1 bg-transparent text-body-small-regular text-primary outline-none placeholder:text-tertiary ' +
  'disabled:cursor-not-allowed disabled:text-tertiary disabled:placeholder:text-disabled'

export function TextInput({ label, hint, error = false, prefix, suffix, id, className = '', ...rest }: TextInputProps) {
  const auto = useId()
  const inputId = id ?? auto
  const hintId = hint != null ? `${inputId}-hint` : undefined
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label != null && <label htmlFor={inputId} className={fieldLabel}>{label}</label>}
      <div className={`flex h-8 items-center gap-1 px-2 text-primary ${fieldBox} ${error ? fieldBoxError : ''}`}>
        {prefix}
        <input id={inputId} aria-invalid={error || undefined} aria-describedby={hintId} className={fieldText} {...rest} />
        {suffix}
      </div>
      {hint != null && <p id={hintId} className={error ? fieldHintError : fieldHint}>{hint}</p>}
    </div>
  )
}
