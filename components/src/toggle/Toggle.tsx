import type { InputHTMLAttributes, ReactNode } from 'react'

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  /** Required when the toggle has no visible label next to it. */
  'aria-label'?: string
}

// Spec: projects/portal2.0/components/toggle.md
const track =
  'flex h-5 w-8 shrink-0 items-center rounded-infinite bg-tertiary p-0.5 ' +
  'group-has-checked/toggle:bg-accent-indigo ' +
  'group-has-focus-visible/toggle:outline-2 group-has-focus-visible/toggle:outline-offset-2 group-has-focus-visible/toggle:outline-accent-indigo'
const knob = 'size-4 rounded-infinite bg-primary transition-transform group-has-checked/toggle:translate-x-3'

/** On/off switch. Takes effect immediately — use Checkbox when a form is submitted later. */
export function Toggle({ className = '', ...rest }: ToggleProps) {
  return (
    <label className={`group/toggle inline-flex has-disabled:cursor-not-allowed ${className}`}>
      <input type="checkbox" role="switch" className="sr-only" {...rest} />
      <span className={`${track} group-has-disabled/toggle:bg-disabled group-has-disabled/toggle:group-has-checked/toggle:bg-accent-indigo-subtlest`}>
        <span className={knob} />
      </span>
    </label>
  )
}

export interface ToggleCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  /** 20px leading icon. */
  icon?: ReactNode
  /** The card title. */
  label: ReactNode
  description?: ReactNode
}

/** A settings row with a switch. The whole card is the click target and takes the focus ring. */
export function ToggleCard({ icon, label, description, className = '', ...rest }: ToggleCardProps) {
  return (
    <label
      className={
        'group/toggle flex flex-col gap-2 rounded-8 border border-primary-subtle bg-primary p-2 ' +
        'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-indigo ' +
        'has-disabled:cursor-not-allowed has-disabled:border-disabled has-disabled:bg-disabled ' +
        className
      }
    >
      <span className="flex h-6 items-center gap-2 text-secondary group-has-disabled/toggle:text-disabled">
        {icon}
        <span className="min-w-0 flex-1 truncate text-body-small-medium">{label}</span>
        <input type="checkbox" role="switch" className="sr-only" {...rest} />
        {/* On a disabled card the track stays bg/tertiary so the switch remains visible. */}
        <span className="flex h-5 w-8 shrink-0 items-center rounded-infinite bg-tertiary p-0.5 group-has-checked/toggle:bg-accent-indigo group-has-disabled/toggle:bg-tertiary">
          <span className={knob} />
        </span>
      </span>
      {description != null && (
        <span className="pb-2 pl-7 text-body-mini-regular text-tertiary group-has-disabled/toggle:text-disabled">{description}</span>
      )}
    </label>
  )
}
