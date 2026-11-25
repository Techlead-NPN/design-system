// DRAFT (step 4 of the Workspace theme proposal): a clickable prototype of the
// workspace shell, app switcher and app launcher. Built from the coded
// components and the Workspace theme. Not exported from the package yet;
// step 5 turns the parts that apps will import into real components.
// Design reference: the "Company Workspace Portal" prototype (Nov 2026).
import { useEffect, useRef, useState, type ReactNode, type KeyboardEvent } from 'react'
import {
  IconBell, IconHelp, IconLayoutGrid, IconLayoutSidebar, IconMessage, IconSearch,
} from '@tabler/icons-react'
import { Menu, MenuGroupLabel, MenuItem } from '../menu/Menu'
import { IconButton } from '../button/IconButton'
import { Avatar } from '../avatar/Avatar'
import { Divider } from '../divider/Divider'
import { SidebarIcon, type SidebarIconColor } from '../avatar/SidebarIcon'

export interface WorkspaceApp {
  id: string
  name: string
  /** URL of the app's icon: an illustration on a white tile, square. */
  icon: string
}

export interface NavItem {
  id: string
  label: string
  icon: ReactNode
  color: SidebarIconColor
  count?: number
}

/** An app's icon at a given size. The artwork carries its own white tile. */
export function AppIcon({ app, size = 24 }: { app: WorkspaceApp; size?: 24 | 32 | 56 }) {
  const box = { 24: 'size-6', 32: 'size-8', 56: 'size-14' }[size]
  return <img src={app.icon} alt="" className={`${box} shrink-0`} />
}

/** Grid button + menu that lists every app the person can open. */
export function AppSwitcher({
  apps, currentId, onOpenApp, onOpenLauncher,
}: { apps: WorkspaceApp[]; currentId?: string; onOpenApp: (id: string) => void; onOpenLauncher: () => void }) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', onDown)
    root.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus()
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const close = () => { setOpen(false); trigger.current?.focus() }
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const items = Array.from(root.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? [])
    const i = items.indexOf(document.activeElement as HTMLButtonElement)
    items.at((i + (e.key === 'ArrowDown' ? 1 : -1)) % items.length)?.focus()
  }

  return (
    <div ref={root} className="relative" onKeyDown={onKeyDown}>
      <IconButton
        ref={trigger}
        variant="ghost"
        size="sm"
        aria-label="Switch app"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <IconLayoutGrid size={14} />
      </IconButton>
      {open && (
        <Menu role="menu" aria-label="Switch app" className="absolute left-0 top-full z-20 mt-1 w-64">
          <MenuGroupLabel>Switch app</MenuGroupLabel>
          {apps.map((app) => (
            <MenuItem
              key={app.id}
              role="menuitem"
              aria-current={app.id === currentId || undefined}
              selected={app.id === currentId}
              leading={<AppIcon app={app} size={32} />}
              className="items-center [&>span:first-child]:self-center [&>span:first-child]:py-0"
              onClick={() => { setOpen(false); onOpenApp(app.id) }}
            >
              {app.name}
            </MenuItem>
          ))}
          <Divider spacing="regular" />
          <MenuItem
            role="menuitem"
            leading={
              <span className="flex size-8 items-center justify-center rounded-8 border border-primary-subtle bg-secondary text-secondary">
                <IconLayoutGrid size={16} />
              </span>
            }
            className="items-center [&>span:first-child]:self-center [&>span:first-child]:py-0"
            onClick={() => { setOpen(false); onOpenLauncher() }}
          >
            All apps
          </MenuItem>
        </Menu>
      )}
    </div>
  )
}

/** One sidebar row (Navigation item L1). */
function NavRow({ item, selected, onClick }: { item: NavItem; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-current={selected ? 'page' : undefined}
      onClick={onClick}
      className={
        'flex h-7 w-full items-center gap-2 rounded-4 p-1 text-left outline-none ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo ' +
        (selected
          ? 'bg-accent-indigo-subtlest text-body-small-semibold text-accent-indigo'
          : 'text-body-small-medium text-secondary hover:bg-primary-hover')
      }
    >
      <SidebarIcon color={item.color}>{item.icon}</SidebarIcon>
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {item.count != null && <span className="pr-1 text-support-caption text-tertiary">{item.count}</span>}
    </button>
  )
}

export interface WorkspaceShellProps {
  apps: WorkspaceApp[]
  app: WorkspaceApp
  nav: NavItem[]
  currentNavId: string
  onNavigate: (id: string) => void
  onOpenApp: (id: string) => void
  onOpenLauncher: () => void
  /** Page title in the header. */
  title: string
  /** The page's one main action, shown at the right of the header. */
  primaryAction?: ReactNode
  userInitials: string
  children: ReactNode
}

/** The frame every app screen sits in: sidebar, header and the white content card. */
export function WorkspaceShell({
  apps, app, nav, currentNavId, onNavigate, onOpenApp, onOpenLauncher, title, primaryAction, userInitials, children,
}: WorkspaceShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
    <div className="flex h-full min-h-[640px] bg-secondary text-primary">
      {sidebarOpen && (
        <aside className="flex w-[244px] shrink-0 flex-col px-2 py-4">
          <div className="flex h-8 items-center gap-1">
            <AppSwitcher apps={apps} currentId={app.id} onOpenApp={onOpenApp} onOpenLauncher={onOpenLauncher} />
            <div className="flex min-w-0 items-center gap-2 px-1">
              <AppIcon app={app} size={24} />
              <span className="truncate text-body-small-bold">{app.name}</span>
            </div>
          </div>
          <button
            type="button"
            className="mt-2 flex h-7 items-center gap-2 rounded-4 p-1 pr-0.5 text-left text-body-small-medium text-secondary hover:bg-primary-hover"
          >
            <IconSearch size={16} />
            <span className="flex-1">Search</span>
            <span className="flex h-4 items-center rounded-4 border border-primary bg-secondary px-1 text-support-caption text-tertiary">⌘K</span>
          </button>
          <nav aria-label={app.name} className="mt-3 flex flex-col gap-0.5">
            {nav.map((item) => (
              <NavRow key={item.id} item={item} selected={item.id === currentNavId} onClick={() => onNavigate(item.id)} />
            ))}
          </nav>
          <div className="mt-auto">
            <IconButton variant="outline" size="sm" aria-label="Help" className="rounded-infinite bg-primary">
              <IconHelp size={14} />
            </IconButton>
          </div>
        </aside>
      )}
      <div className={`flex min-w-0 flex-1 flex-col gap-4 pb-2 pr-2 pt-4 ${sidebarOpen ? '' : 'pl-2'}`}>
        <header className="flex h-8 items-center gap-2">
          <IconButton
            variant="ghost"
            size="sm"
            aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
            aria-pressed={!sidebarOpen}
            onClick={() => setSidebarOpen((o) => !o)}
          >
            <IconLayoutSidebar size={14} />
          </IconButton>
          {!sidebarOpen && <AppSwitcher apps={apps} currentId={app.id} onOpenApp={onOpenApp} onOpenLauncher={onOpenLauncher} />}
          <Divider direction="vertical" spacing="regular" className="h-4 self-center" />
          <h1 className="truncate text-body-medium-semibold">{title}</h1>
          <div className="ml-auto flex items-center gap-2">
            {primaryAction}
            <Divider direction="vertical" spacing="regular" className="h-4 self-center" />
            <IconButton variant="ghost" size="md" aria-label="Notifications"><IconBell size={20} /></IconButton>
            <IconButton variant="ghost" size="md" aria-label="Comments"><IconMessage size={20} /></IconButton>
            <button type="button" aria-label="Account" className="rounded-infinite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo">
              <Avatar size={24} color="pink">{userInitials}</Avatar>
            </button>
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-auto rounded-8 border border-primary-subtle bg-primary p-4">{children}</main>
      </div>
    </div>
  )
}

/** The page after sign-in, and behind "All apps": every app as a card. */
export function AppLauncher({
  apps, mostUsedId, logo, workspaceName = 'Portal', onOpenApp,
}: { apps: WorkspaceApp[]; mostUsedId?: string; logo: string; workspaceName?: string; onOpenApp: (id: string) => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-primary text-primary">
      <div aria-hidden className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-(--bg-accent-indigo-subtlest) to-(--bg-primary)" />
      <div className="relative mx-auto flex max-w-[720px] flex-col items-center px-6 pb-16 pt-24">
        <img src={logo} alt="Techlead" className="h-14" />
        <h1 className="mt-6 text-heading-h5">Welcome to {workspaceName}</h1>
        <p className="mt-1 text-body-medium-regular text-secondary">Select an application to use.</p>
        <ul className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {apps.map((app) => (
            <li key={app.id}>
              <button
                type="button"
                onClick={() => onOpenApp(app.id)}
                className={
                  'relative flex h-40 w-full flex-col items-center justify-center gap-4 rounded-12 border border-primary-subtle bg-primary ' +
                  'hover:border-primary hover:shadow-md ' +
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo'
                }
              >
                {app.id === mostUsedId && (
                  <span className="absolute right-0 top-0 rounded-bl-8 rounded-tr-12 bg-accent-indigo px-2 py-1 text-support-caption text-primary-inverse">
                    Most used
                  </span>
                )}
                <AppIcon app={app} size={56} />
                <span className="text-body-medium-semibold">{app.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

