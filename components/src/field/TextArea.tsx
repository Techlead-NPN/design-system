import { useId, useState } from 'react'
import type { TextareaHTMLAttributes, ReactNode } from 'react'
import { fieldBox, fieldBoxError, fieldHint, fieldHintError, fieldLabel, fieldText } from './TextInput'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label shown above the field. */
  label?: ReactNode
  /** Hint shown below the field. In the error state it turns red. */
  hint?: ReactNode
  /** Error state: red border and red hint. */
  error?: boolean
  /** Show a "used/max" character counter. Needs `maxLength`. */
  counter?: boolean
}

// Spec: projects/portal2.0/components/text-input.md
export function TextArea({ label, hint, error = false, counter = false, id, className = '', onChange, ...rest }: TextAreaProps) {
  const auto = useId()
  const areaId = id ?? auto
  const hintId = hint != null ? `${areaId}-hint` : undefined
  const [length, setLength] = useState(String(rest.value ?? rest.defaultValue ?? '').length)
  const showCounter = counter && rest.maxLength != null
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label != null && <label htmlFor={areaId} className={fieldLabel}>{label}</label>}
      <div className={`flex ${fieldBox} ${error ? fieldBoxError : ''}`}>
        <textarea
          id={areaId}
          aria-invalid={error || undefined}
          aria-describedby={hintId}
          className={`${fieldText} max-h-60 min-h-20 resize-y p-2`}
          onChange={(e) => {
            setLength(e.target.value.length)
            onChange?.(e)
          }}
          {...rest}
        />
      </div>
      {(hint != null || showCounter) && (
        <div className="flex items-start justify-between gap-4">
          <p id={hintId} className={error ? fieldHintError : fieldHint}>{hint}</p>
          {showCounter && <span className={`${fieldHint} shrink-0`}>{length}/{rest.maxLength}</span>}
        </div>
      )}
    </div>
  )
}
