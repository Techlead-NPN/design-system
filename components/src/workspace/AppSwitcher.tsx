import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Menu, MenuGroupLabel, MenuItem } from '../menu/Menu'
import { IconButton } from '../button/IconButton'
import { Divider } from '../divider/Divider'
import { GridIcon } from './icons'

// Spec: workspace/shell.md (App switcher)

export interface WorkspaceApp {
  id: string
  /** Short English name, e.g. "ProcureApp". */
  name: string
  /** The app's icon: an illustration on a white rounded tile. A URL, or your own element. */
  icon: string | ReactNode
  /** Where the app lives, when apps are separate sites. Used when no `onOpenApp` is given. */
  href?: string
}

export type AppIconSize = 24 | 32 | 56

const boxes: Record<AppIconSize, string> = { 24: 'size-6', 32: 'size-8', 56: 'size-14' }

/** An app's icon at 24px (sidebar), 32px (switcher) or 56px (launcher). */
export function AppIcon({ app, size = 24 }: { app: WorkspaceApp; size?: AppIconSize }) {
  if (typeof app.icon === 'string') return <img src={app.icon} alt="" className={`${boxes[size]} shrink-0`} />
  return <span aria-hidden className={`flex ${boxes[size]} shrink-0 items-center justify-center [&>*]:size-full`}>{app.icon}</span>
}

/** Opens an app: the callback if given, else the app's `href`. */
export function openApp(app: WorkspaceApp, onOpenApp?: (app: WorkspaceApp) => void) {
  if (onOpenApp) onOpenApp(app)
  else if (app.href) window.location.assign(app.href)
}

export interface AppSwitcherProps {
  /** Every app this person can open, in the workspace's fixed order. */
  apps: WorkspaceApp[]
  /** The app the person is in now; marked as selected. */
  currentAppId?: string
  /** Called when an app is chosen. Without it, the browser goes to the app's `href`. */
  onOpenApp?: (app: WorkspaceApp) => void
  /** Called for "All apps". Without it, the browser goes to `launcherHref`. */
  onOpenLauncher?: () => void
  launcherHref?: string
}

const rowLeading = 'items-center [&>span:first-child]:self-center [&>span:first-child]:py-0'

/** The grid button and the menu that lists every app. */
export function AppSwitcher({ apps, currentAppId, onOpenApp, onOpenLauncher, launcherHref }: AppSwitcherProps) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    root.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus()
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const onKeyDown = (e: KeyboardEvent) => {
    if (!open) return
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      trigger.current?.focus()
      return
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const items = Array.from(root.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? [])
    const i = items.indexOf(document.activeElement as HTMLButtonElement)
    items.at((i + (e.key === 'ArrowDown' ? 1 : -1)) % items.length)?.focus()
  }

  const showLauncher = onOpenLauncher != null || launcherHref != null

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
        <GridIcon />
      </IconButton>
      {open && (
        <Menu role="menu" aria-label="Switch app" className="absolute left-0 top-full z-30 mt-1 w-64">
          <MenuGroupLabel>Switch app</MenuGroupLabel>
          {apps.map((app) => (
            <MenuItem
              key={app.id}
              role="menuitem"
              aria-current={app.id === currentAppId || undefined}
              selected={app.id === currentAppId}
              leading={<AppIcon app={app} size={32} />}
              className={rowLeading}
              onClick={() => {
                setOpen(false)
                openApp(app, onOpenApp)
              }}
            >
              {app.name}
            </MenuItem>
          ))}
          {showLauncher && (
            <>
              <Divider spacing="regular" />
              <MenuItem
                role="menuitem"
                leading={
                  <span className="flex size-8 items-center justify-center rounded-8 border border-primary-subtle bg-secondary text-secondary">
                    <GridIcon size={16} />
                  </span>
                }
                className={rowLeading}
                onClick={() => {
                  setOpen(false)
                  if (onOpenLauncher) onOpenLauncher()
                  else if (launcherHref) window.location.assign(launcherHref)
                }}
              >
                All apps
              </MenuItem>
            </>
          )}
        </Menu>
      )}
    </div>
  )
}
