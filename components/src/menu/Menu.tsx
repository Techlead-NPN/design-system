import type { ComponentProps, ReactNode } from 'react'
import { CheckIcon, ChevronRightIcon } from './icons'

// Spec: projects/portal2.0/components/menu-item.md

/** The floating panel that holds menu rows. */
export function Menu({ className = '', ...rest }: ComponentProps<'div'>) {
  return <div className={`flex flex-col gap-0.5 rounded-8 border border-primary-subtle bg-primary p-1 shadow-lg ${className}`} {...rest} />
}

/** Small caption that titles a group of rows inside a menu. */
export function MenuGroupLabel({ className = '', ...rest }: ComponentProps<'div'>) {
  return <div className={`flex h-7 items-center px-2 text-support-caption text-tertiary ${className}`} {...rest} />
}

export interface MenuItemProps extends ComponentProps<'button'> {
  /** 16px leading icon, or a Checkbox for multi-select rows. */
  leading?: ReactNode
  /** Second line under the title. */
  supportingText?: ReactNode
  /** Single-select: indigo title and a trailing check. */
  selected?: boolean
  /** Shows a trailing chevron: the row opens a sub-menu or another view. */
  hasSubmenu?: boolean
  /** Trailing content such as a keyboard shortcut hint. */
  trailing?: ReactNode
  /** Keyboard highlight. In menus the current row uses the hover fill, not a focus ring. */
  active?: boolean
}

export function MenuItem({ leading, supportingText, selected = false, hasSubmenu = false, trailing, active = false, className = '', type = 'button', children, ...rest }: MenuItemProps) {
  return (
    <button
      type={type}
      data-active={active || undefined}
      className={
        'flex w-full items-center gap-2 rounded-6 p-1 text-left text-primary outline-none ' +
        'enabled:hover:bg-primary-hover data-active:bg-primary-hover focus-visible:bg-primary-hover ' +
        'disabled:cursor-not-allowed disabled:text-disabled ' +
        className
      }
      {...rest}
    >
      {leading != null && <span className="flex shrink-0 items-center self-start py-0.5">{leading}</span>}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className={`truncate text-body-small-regular ${selected ? 'text-accent-indigo' : ''}`}>{children}</span>
        {supportingText != null && (
          <span className={`truncate text-support-caption ${rest.disabled ? '' : 'text-secondary'}`}>{supportingText}</span>
        )}
      </span>
      {trailing}
      {selected && <span className="shrink-0 text-accent-indigo"><CheckIcon /></span>}
      {hasSubmenu && <span className="shrink-0"><ChevronRightIcon /></span>}
    </button>
  )
}
