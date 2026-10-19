import { useEffect, useId, useRef, useState } from 'react'
import type { ComponentProps, KeyboardEvent } from 'react'
import { Button } from '../button/Button'
import { IconButton } from '../button/IconButton'
import { Menu, MenuItem } from '../menu/Menu'

// Spec: projects/paygenix-merchant/DESIGN.md (Table pagination)

const icon = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const
const ChevronDown = () => <svg {...icon}><path d="M6 9l6 6l6 -6" /></svg>
const ChevronLeft = () => <svg {...icon}><path d="M15 6l-6 6l6 6" /></svg>
const ChevronRight = () => <svg {...icon}><path d="M9 6l6 6l-6 6" /></svg>

export interface TablePaginationProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  /** Current page, starting at 1. */
  page: number
  /** Rows per page. */
  pageSize: number
  /** Total number of rows across all pages. */
  total: number
  onPageChange: (page: number) => void
  /** Called with the new size; the caller should also go back to page 1. Omit to hide the page-size control. */
  onPageSizeChange?: (pageSize: number) => void
  pageSizeOptions?: number[]
  /** Visible label before the page-size button. */
  label?: string
}

/** Sits under a table: rows per page, the range shown, and previous/next page. */
export function TablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [15, 25, 50, 100],
  label = 'Items per page:',
  className = '',
  ...rest
}: TablePaginationProps) {
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  const lastPage = Math.max(1, Math.ceil(total / pageSize))
  const first = total === 0 ? 0 : (page - 1) * pageSize + 1
  const last = Math.min(page * pageSize, total)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const choose = (size: number) => {
    setOpen(false)
    if (size !== pageSize) onPageSizeChange?.(size)
  }
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') return setOpen(false)
    if (!open) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const step = e.key === 'ArrowDown' ? 1 : -1
      setActive((a) => (a + step + pageSizeOptions.length) % pageSizeOptions.length)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      choose(pageSizeOptions[active])
    }
  }

  return (
    <div className={`flex items-center gap-6 text-body-small-medium text-primary ${className}`} {...rest}>
      {onPageSizeChange && (
        <div className="flex items-center gap-2">
          <span id={`${id}-label`}>{label}</span>
          {/* The menu opens upward, left-aligned with the button, 4px above it. */}
          <div ref={root} className="relative" onKeyDown={onKeyDown}>
            <Button
              size="sm"
              suffixIcon={<ChevronDown />}
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls={`${id}-list`}
              aria-labelledby={`${id}-label ${id}-value`}
              onClick={() => {
                setActive(Math.max(0, pageSizeOptions.indexOf(pageSize)))
                setOpen((o) => !o)
              }}
            >
              <span id={`${id}-value`}>{pageSize}</span>
            </Button>
            {open && (
              <Menu id={`${id}-list`} role="listbox" aria-labelledby={`${id}-label`} className="absolute bottom-full left-0 z-10 mb-1 min-w-12">
                {pageSizeOptions.map((size, i) => (
                  <MenuItem key={size} role="option" aria-selected={size === pageSize} active={i === active} onMouseEnter={() => setActive(i)} onClick={() => choose(size)}>
                    {size}
                  </MenuItem>
                ))}
              </Menu>
            )}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        <span aria-live="polite">{first}–{last} of {total}</span>
        <IconButton variant="outline" size="sm" aria-label="Previous page" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft />
        </IconButton>
        <IconButton variant="outline" size="sm" aria-label="Next page" disabled={page >= lastPage} onClick={() => onPageChange(page + 1)}>
          <ChevronRight />
        </IconButton>
      </div>
    </div>
  )
}
