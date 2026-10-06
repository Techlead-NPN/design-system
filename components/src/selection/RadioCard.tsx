import type { InputHTMLAttributes, ReactNode } from 'react'

export interface RadioCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  /** 20px leading icon. */
  icon?: ReactNode
  /** The card title. */
  label: ReactNode
  description?: ReactNode
  /** Optional status tag shown next to the name. */
  tag?: ReactNode
}

// Spec: projects/portal2.0/components/radio-checkbox-card.md
// The whole card is the click target and takes the focus ring; the dot only shows the state.
export function RadioCard({ icon, label, description, tag, className = '', ...rest }: RadioCardProps) {
  return (
    <label
      className={
        'group/radio flex flex-col gap-2 rounded-8 border border-primary-subtle bg-primary p-2 ' +
        'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-indigo ' +
        'has-disabled:cursor-not-allowed has-disabled:border-disabled has-disabled:bg-disabled ' +
        className
      }
    >
      <span className="flex h-6 items-center gap-2 text-secondary group-has-disabled/radio:text-disabled">
        {icon}
        <span className="flex min-w-0 flex-1 items-center gap-2">
          <span className="truncate text-body-small-medium">{label}</span>
          {tag}
        </span>
        <input type="radio" className="sr-only" {...rest} />
        <span className="flex size-6 shrink-0 items-center justify-center">
          <span
            className={
              'flex size-4 items-center justify-center rounded-infinite border border-primary ' +
              'group-has-checked/radio:border-transparent group-has-checked/radio:bg-accent-indigo ' +
              'group-has-disabled/radio:border-disabled group-has-disabled/radio:group-has-checked/radio:border-transparent ' +
              'group-has-disabled/radio:group-has-checked/radio:bg-tertiary'
            }
          >
            <span className="hidden size-1.5 rounded-infinite bg-primary group-has-checked/radio:block" />
          </span>
        </span>
      </span>
      {description != null && (
        <span className="pb-2 pl-7 text-body-mini-regular text-tertiary group-has-disabled/radio:text-disabled">{description}</span>
      )}
    </label>
  )
}
