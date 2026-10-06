import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { fieldBox, fieldBoxError, fieldHint, fieldHintError, fieldLabel } from '../field/TextInput'
import { Checkbox } from '../selection/Checkbox'
import { Menu, MenuItem } from './Menu'
import { ChevronDownIcon, ChevronUpIcon, CircleXIcon, XIcon } from './icons'

export interface DropdownOption {
  value: string
  label: string
  /** 16px icon shown before the label in the list. */
  icon?: ReactNode
  disabled?: boolean
}

interface Common {
  options: DropdownOption[]
  label?: ReactNode
  hint?: ReactNode
  placeholder?: string
  error?: boolean
  disabled?: boolean
  /** 16px icon at the start of the field. */
  prefix?: ReactNode
  className?: string
}
export type DropdownProps =
  | (Common & { multiple?: false; value: string | null; onChange: (value: string | null) => void })
  | (Common & { multiple: true; value: string[]; onChange: (value: string[]) => void })

// Spec: projects/portal2.0/components/dropdown.md
export function Dropdown(props: DropdownProps) {
  const { options, label, hint, placeholder = 'Select', error = false, disabled = false, prefix, className = '' } = props
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const selected = props.multiple ? props.value : props.value != null ? [props.value] : []
  const byValue = (v: string) => options.find((o) => o.value === v)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const choose = (o: DropdownOption) => {
    if (o.disabled) return
    if (props.multiple) {
      props.onChange(props.value.includes(o.value) ? props.value.filter((v) => v !== o.value) : [...props.value, o.value])
    } else {
      props.onChange(o.value)
      setOpen(false)
    }
  }
  const onKeyDown = (e: KeyboardEvent) => {
    if (disabled) return
    if (e.key === 'Escape') return setOpen(false)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) return setOpen(true)
      const step = e.key === 'ArrowDown' ? 1 : -1
      setActive((a) => (a + step + options.length) % options.length)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (open) choose(options[active])
      else setOpen(true)
    }
  }

  const textTone = disabled ? (selected.length ? 'text-tertiary' : 'text-disabled') : selected.length ? 'text-primary' : 'text-tertiary'
  return (
    <div ref={root} className={`relative flex flex-col gap-1 ${className}`}>
      {label != null && <span id={`${id}-label`} className={fieldLabel}>{label}</span>}
      <div
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-list`}
        aria-labelledby={label != null ? `${id}-label` : undefined}
        aria-invalid={error || undefined}
        aria-disabled={disabled || undefined}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className={
          `flex h-8 items-center gap-1 px-2 ${fieldBox} ${error ? fieldBoxError : ''} ` +
          'focus-visible:inset-ring-accent-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo ' +
          (open ? 'inset-ring-accent-indigo outline-2 outline-offset-2 outline-accent-indigo ' : '') +
          (disabled ? 'cursor-not-allowed bg-disabled' : 'cursor-pointer')
        }
      >
        {prefix != null && <span className={`shrink-0 ${disabled ? 'text-disabled' : 'text-primary'}`}>{prefix}</span>}
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
          {props.multiple && selected.length > 0 ? (
            selected.map((v) => (
              <span key={v} className={`inline-flex h-5 shrink-0 items-center gap-1 rounded-6 px-1.5 text-body-small-regular ${disabled ? 'bg-disabled text-disabled' : 'bg-secondary text-primary'}`}>
                {byValue(v)?.label ?? v}
                <button
                  type="button"
                  aria-label={`Remove ${byValue(v)?.label ?? v}`}
                  disabled={disabled}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (props.multiple) props.onChange(props.value.filter((x) => x !== v))
                  }}
                >
                  <XIcon />
                </button>
              </span>
            ))
          ) : (
            <span className={`truncate text-body-small-regular ${textTone}`}>{selected.length ? byValue(selected[0])?.label : placeholder}</span>
          )}
        </div>
        {props.multiple && selected.length > 0 && !disabled && (
          <button
            type="button"
            aria-label="Clear all"
            className="shrink-0 text-tertiary"
            onClick={(e) => {
              e.stopPropagation()
              if (props.multiple) props.onChange([])
            }}
          >
            <CircleXIcon />
          </button>
        )}
        <span className={`shrink-0 ${disabled ? 'text-disabled' : 'text-secondary'}`}>{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
      </div>
      {hint != null && <p className={error ? fieldHintError : fieldHint}>{hint}</p>}
      {open && (
        <Menu id={`${id}-list`} role="listbox" aria-multiselectable={props.multiple || undefined} className="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-auto">
          {options.map((o, i) => {
            const isSelected = selected.includes(o.value)
            return (
              <MenuItem
                key={o.value}
                role="option"
                aria-selected={isSelected}
                tabIndex={-1}
                disabled={o.disabled}
                active={i === active}
                selected={!props.multiple && isSelected}
                leading={
                  props.multiple ? (
                    // Visual only: the row itself is the control.
                    <span className="pointer-events-none flex" aria-hidden="true">
                      <Checkbox checked={isSelected} readOnly tabIndex={-1} disabled={o.disabled} />
                    </span>
                  ) : (
                    o.icon
                  )
                }
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(o)}
              >
                {o.label}
              </MenuItem>
            )
          })}
        </Menu>
      )}
    </div>
  )
}
