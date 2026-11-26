import { useState, type ElementType, type ReactNode } from 'react'
import { SidebarIcon, type SidebarIconColor } from '../avatar/SidebarIcon'

// Spec: workspace/shell.md (Sidebar), projects/e-approval/components/nav-item-l1.md,
// nav-section-label.md, and the tree in patterns/sidebar-navigation.md

export interface NavItem {
  id: string
  label: string
  /** A 14px icon, shown in a tinted chip. */
  icon?: ReactNode
  /** Chip colour. Decorative only, never a status. */
  color?: SidebarIconColor
  /** Plain count at the right, e.g. items waiting. */
  count?: number
  /** Page address. With it the row is a link; without it, a button. */
  href?: string
  /** One level of child rows. A row with children opens and closes them instead of navigating. */
  children?: NavItem[]
}

export interface NavGroup {
  id: string
  /** Small heading above the group, e.g. "Favorites". */
  label?: string
  items: NavItem[]
}

export interface SidebarNavProps {
  groups: NavGroup[]
  /** The id of the page shown now. */
  currentId?: string
  /** Called when a row without children is chosen. */
  onNavigate?: (item: NavItem) => void
  /** Your router's link component (e.g. Next.js `Link`); it receives `href`. Defaults to `a`. */
  linkComponent?: ElementType
  /** Accessible name for the navigation, usually the app's name. */
  'aria-label'?: string
}

const contains = (item: NavItem, id?: string): boolean =>
  id != null && (item.id === id || (item.children ?? []).some((c) => contains(c, id)))

function Row({
  item, selected, expanded, linkComponent: Link = 'a', onClick,
}: { item: NavItem; selected: boolean; expanded?: boolean; linkComponent?: ElementType; onClick: () => void }) {
  const className =
    'flex h-7 min-w-0 flex-1 items-center gap-2 rounded-4 p-1 text-left outline-none ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo ' +
    (selected
      ? 'bg-accent-indigo-subtlest text-body-small-semibold text-accent-indigo'
      : 'text-body-small-medium text-secondary hover:bg-primary-hover')
  const content = (
    <>
      {item.icon != null && <SidebarIcon color={item.color}>{item.icon}</SidebarIcon>}
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {item.count != null && <span className="pr-1 text-support-caption text-tertiary">{item.count}</span>}
    </>
  )
  if (item.href && !item.children) {
    return (
      <Link href={item.href} aria-current={selected ? 'page' : undefined} className={className} onClick={onClick}>
        {content}
      </Link>
    )
  }
  return (
    <button type="button" aria-current={selected ? 'page' : undefined} aria-expanded={expanded} className={className} onClick={onClick}>
      {content}
    </button>
  )
}

/** The app's menu in the sidebar: groups of rows, each row optionally with one level of children. */
export function SidebarNav({ groups, currentId, onNavigate, linkComponent, 'aria-label': ariaLabel }: SidebarNavProps) {
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
    <nav aria-label={ariaLabel} className="flex flex-col">
      {groups.map((group, gi) => (
        <div key={group.id} className="flex flex-col gap-0.5">
          {gi > 0 && <div role="separator" className="my-3 border-t border-primary-subtle" />}
          {group.label && <p className="flex h-7 items-center px-1 text-body-mini-semibold text-tertiary">{group.label}</p>}
          {group.items.map((item) => {
            const isOpen = open.has(item.id)
            return (
              <div key={item.id} className="flex flex-col">
                <div className="flex">
                  <Row
                    item={item}
                    selected={item.id === currentId}
                    expanded={item.children ? isOpen : undefined}
                    linkComponent={linkComponent}
                    onClick={() => (item.children ? toggle(item.id) : onNavigate?.(item))}
                  />
                </div>
                {item.children && isOpen && (
                  <div className="flex flex-col pl-[11px]">
                    {item.children.map((child, ci) => (
                      <div key={child.id} className="flex">
                        <span aria-hidden className="relative w-[9px] shrink-0 self-stretch">
                          <span className={`absolute left-0 top-0 border-l border-primary ${ci === item.children!.length - 1 ? 'h-1/2' : 'h-full'}`} />
                          <span className="absolute left-0 top-1/2 w-[9px] border-t border-primary" />
                        </span>
                        <Row
                          item={child}
                          selected={child.id === currentId}
                          linkComponent={linkComponent}
                          onClick={() => onNavigate?.(child)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
