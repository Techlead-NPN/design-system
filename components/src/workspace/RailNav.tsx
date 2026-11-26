import { useEffect, useRef, useState, type ElementType, type KeyboardEvent } from 'react'
import { Menu, MenuItem } from '../menu/Menu'
import type { NavGroup, NavItem } from './SidebarNav'
import { ChevronIcon } from './icons'

// Spec: workspace/shell.md (Rail layout)

export interface RailNavProps {
  groups: NavGroup[]
  currentId?: string
  onNavigate?: (item: NavItem) => void
  linkComponent?: ElementType
  /** Collapsed shows icons only; expanded shows labels, group headings and child rows. */
  expanded: boolean
  'aria-label'?: string
}

const contains = (item: NavItem, id?: string): boolean =>
  id != null && (item.id === id || (item.children ?? []).some((c) => contains(c, id)))

const focus = 'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo'
// Rail icons render at 18px whatever size the app passes.
const iconBox = 'flex size-[18px] shrink-0 items-center justify-center [&_svg]:size-[18px]'

/** Small dark label beside a collapsed rail item, placed against the window so a scrolling rail doesn't clip it. Visual only: the item carries the accessible name. */
function RailLabel({ text, at }: { text: string; at: DOMRect }) {
  return (
    <span
      aria-hidden
      style={{ left: at.right + 12, top: at.top + at.height / 2 }}
      className="pointer-events-none fixed z-50 -translate-y-1/2 whitespace-nowrap rounded-6 bg-primary-inverse px-2 py-1 text-body-mini-medium text-primary-inverse"
    >
      {text}
    </span>
  )
}

function CollapsedItem({
  item, selected, linkComponent: Link = 'a', currentId, onNavigate,
}: { item: NavItem; selected: boolean; linkComponent?: ElementType; currentId?: string; onNavigate?: (item: NavItem) => void }) {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState<DOMRect | null>(null)
  const [menuAt, setMenuAt] = useState<DOMRect | null>(null)
  const root = useRef<HTMLDivElement>(null)
  const show = (e: { currentTarget: Element }) => setHover(e.currentTarget.getBoundingClientRect())
  const hide = () => setHover(null)
  const hoverProps = { onMouseEnter: show, onMouseLeave: hide, onFocus: show, onBlur: hide }
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    root.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus()
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const look =
    `relative flex size-9 items-center justify-center rounded-infinite ${focus} ` +
    (selected ? 'bg-accent-indigo-subtlest text-accent-indigo' : 'text-secondary hover:bg-primary-hover hover:text-primary')
  const badge = item.count != null && item.count > 0 && (
    <span aria-hidden className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-infinite bg-accent-indigo px-1 text-body-tiny-regular text-primary-inverse">
      {item.count > 99 ? '99+' : item.count}
    </span>
  )
  const name = item.count ? `${item.label}, ${item.count}` : item.label

  if (item.children) {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        e.preventDefault()
        setOpen(false)
        root.current?.querySelector<HTMLButtonElement>('button')?.focus()
      }
      if (open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault()
        const items = Array.from(root.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? [])
        const i = items.indexOf(document.activeElement as HTMLButtonElement)
        items.at((i + (e.key === 'ArrowDown' ? 1 : -1)) % items.length)?.focus()
      }
    }
    return (
      <div ref={root} className="relative" onKeyDown={onKeyDown}>
        <button
          type="button"
          aria-label={name}
          aria-haspopup="menu"
          aria-expanded={open}
          className={look}
          {...hoverProps}
          onClick={(e) => {
            setMenuAt(e.currentTarget.getBoundingClientRect())
            setHover(null)
            setOpen((o) => !o)
          }}
        >
          <span className={iconBox}>{item.icon}</span>
          {badge}
        </button>
        {hover && !open && <RailLabel text={item.label} at={hover} />}
        {open && menuAt && (
          <Menu role="menu" aria-label={item.label} style={{ left: menuAt.right + 12, top: menuAt.top }} className="fixed z-50 w-56">
            <p className="flex h-7 items-center px-2 text-body-mini-semibold text-tertiary">{item.label}</p>
            {item.children.map((child) => (
              <MenuItem
                key={child.id}
                role="menuitem"
                selected={child.id === currentId}
                aria-current={child.id === currentId ? 'page' : undefined}
                trailing={child.count != null ? <span className="pr-1 text-support-caption text-tertiary">{child.count}</span> : undefined}
                onClick={() => {
                  setOpen(false)
                  onNavigate?.(child)
                }}
              >
                {child.label}
              </MenuItem>
            ))}
          </Menu>
        )}
      </div>
    )
  }
  if (item.href) {
    return (
      <>
        <Link href={item.href} aria-label={name} aria-current={selected ? 'page' : undefined} className={look} {...hoverProps} onClick={() => onNavigate?.(item)}>
          <span className={iconBox}>{item.icon}</span>
          {badge}
        </Link>
        {hover && <RailLabel text={item.label} at={hover} />}
      </>
    )
  }
  return (
    <>
      <button type="button" aria-label={name} aria-current={selected ? 'page' : undefined} className={look} {...hoverProps} onClick={() => onNavigate?.(item)}>
        <span className={iconBox}>{item.icon}</span>
        {badge}
      </button>
      {hover && <RailLabel text={item.label} at={hover} />}
    </>
  )
}

function ExpandedRow({
  item, selected, nested = false, open, linkComponent: Link = 'a', onClick,
}: { item: NavItem; selected: boolean; nested?: boolean; open?: boolean; linkComponent?: ElementType; onClick: () => void }) {
  const className =
    `flex w-full items-center gap-2.5 rounded-infinite text-left ${nested ? 'h-8 pl-[42px] pr-3' : 'h-9 px-3'} ${focus} ` +
    (selected ? 'bg-accent-indigo-subtlest text-body-small-medium text-accent-indigo' : 'text-body-small-regular text-secondary hover:bg-primary-hover hover:text-primary')
  const content = (
    <>
      {!nested && <span className={iconBox}>{item.icon}</span>}
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {item.count != null && <span className="text-support-caption text-tertiary">{item.count}</span>}
      {item.children && <span className="text-tertiary"><ChevronIcon open={!!open} /></span>}
    </>
  )
  if (item.href && !item.children) {
    return <Link href={item.href} aria-current={selected ? 'page' : undefined} className={className} onClick={onClick}>{content}</Link>
  }
  return (
    <button type="button" aria-current={selected ? 'page' : undefined} aria-expanded={item.children ? open : undefined} className={className} onClick={onClick}>
      {content}
    </button>
  )
}

/** The app's menu in the Duo rail: icons only when collapsed, labels and child rows when expanded. */
export function RailNav({ groups, currentId, onNavigate, linkComponent, expanded, 'aria-label': ariaLabel }: RailNavProps) {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(groups.flatMap((g) => g.items).filter((i) => i.children && contains(i, currentId)).map((i) => i.id)),
  )
  const toggle = (id: string) =>
    setOpen((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <nav aria-label={ariaLabel} className={`flex flex-col ${expanded ? '' : 'items-center'}`}>
      {groups.map((group, gi) => (
        <div key={group.id} className={`flex flex-col gap-1 ${expanded ? '' : 'items-center'}`}>
          {gi > 0 && <div role="separator" className={`my-2 border-t border-primary-subtle ${expanded ? 'mx-3' : 'w-6'}`} />}
          {expanded && group.label && <p className="flex h-7 items-center px-3 text-body-mini-semibold text-tertiary">{group.label}</p>}
          {group.items.map((item) =>
            expanded ? (
              <div key={item.id} className="flex flex-col gap-0.5">
                <ExpandedRow
                  item={item}
                  selected={item.id === currentId || (!open.has(item.id) && contains(item, currentId) && item.id !== currentId)}
                  open={open.has(item.id)}
                  linkComponent={linkComponent}
                  onClick={() => (item.children ? toggle(item.id) : onNavigate?.(item))}
                />
                {item.children && open.has(item.id) &&
                  item.children.map((child) => (
                    <ExpandedRow key={child.id} item={child} nested selected={child.id === currentId} linkComponent={linkComponent} onClick={() => onNavigate?.(child)} />
                  ))}
              </div>
            ) : (
              <CollapsedItem
                key={item.id}
                item={item}
                selected={contains(item, currentId)}
                linkComponent={linkComponent}
                currentId={currentId}
                onNavigate={onNavigate}
              />
            ),
          )}
        </div>
      ))}
    </nav>
  )
}
