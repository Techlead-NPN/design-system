import { useState, type ElementType, type ReactNode } from 'react'
import { IconButton } from '../button/IconButton'
import { Avatar } from '../avatar/Avatar'
import { Divider } from '../divider/Divider'
import { AppIcon, AppSwitcher, type WorkspaceApp } from './AppSwitcher'
import { SidebarNav, type NavGroup, type NavItem } from './SidebarNav'
import { BellIcon, HelpIcon, MessageIcon, SearchIcon, SidebarIcon } from './icons'

// Spec: workspace/shell.md (Shell)

export interface WorkspaceUser {
  name: string
  /** Shown when there is no photo, e.g. "SC". */
  initials?: string
  avatarSrc?: string
}

export interface WorkspaceShellProps {
  /** Every app this person can open, for the app switcher. */
  apps: WorkspaceApp[]
  /** The app this screen belongs to. */
  app: WorkspaceApp
  onOpenApp?: (app: WorkspaceApp) => void
  onOpenLauncher?: () => void
  launcherHref?: string

  /** The app's sidebar menu. */
  nav: NavGroup[]
  currentNavId?: string
  onNavigate?: (item: NavItem) => void
  /** Your router's link component for sidebar rows with `href`. Defaults to `a`. */
  linkComponent?: ElementType

  /** Page title in the header: text, or a breadcrumb. */
  title: ReactNode
  /** The page's one main action, e.g. a primary blue `Button`. */
  primaryAction?: ReactNode

  /** Shows the Search row; called when it is clicked. */
  onSearch?: () => void
  searchShortcut?: string
  /** Shows the bell. A count above 0 adds a red dot. */
  notifications?: { count?: number; onClick: () => void }
  /** Shows the comments button. */
  onComments?: () => void
  user: WorkspaceUser
  /** Called when the avatar is clicked (opens the account menu). */
  onAccount?: () => void
  /** Shows the help button at the bottom of the sidebar. */
  onHelp?: () => void
  /** Extra content at the bottom of the sidebar, next to help. */
  sidebarFooter?: ReactNode

  /** Controlled sidebar visibility. Leave out to let the shell manage it. */
  sidebarOpen?: boolean
  defaultSidebarOpen?: boolean
  onSidebarOpenChange?: (open: boolean) => void

  /** Page content. It sits in the white content card. */
  children: ReactNode
  /** Extra classes on the root. The root fills the viewport height by default (`h-dvh`). */
  className?: string
}

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo'

/** The frame every internal app's screens sit in: sidebar with the app switcher, header and content card. */
export function WorkspaceShell({
  apps, app, onOpenApp, onOpenLauncher, launcherHref,
  nav, currentNavId, onNavigate, linkComponent,
  title, primaryAction,
  onSearch, searchShortcut = '⌘K', notifications, onComments, user, onAccount, onHelp, sidebarFooter,
  sidebarOpen, defaultSidebarOpen = true, onSidebarOpenChange,
  children, className = 'h-dvh',
}: WorkspaceShellProps) {
  const [ownOpen, setOwnOpen] = useState(defaultSidebarOpen)
  const open = sidebarOpen ?? ownOpen
  const setOpen = (next: boolean) => {
    if (sidebarOpen === undefined) setOwnOpen(next)
    onSidebarOpenChange?.(next)
  }
  const switcher = (
    <AppSwitcher apps={apps} currentAppId={app.id} onOpenApp={onOpenApp} onOpenLauncher={onOpenLauncher} launcherHref={launcherHref} />
  )
  const unread = notifications?.count ?? 0
  const hasRightTools = notifications != null || onComments != null

  return (
    <div className={`flex w-full bg-secondary text-primary ${className}`}>
      {open && (
        <aside className="flex w-[244px] shrink-0 flex-col px-2 py-4">
          <div className="flex h-8 items-center gap-1">
            {switcher}
            <div className="flex min-w-0 items-center gap-2 px-1">
              <AppIcon app={app} size={24} />
              <span className="truncate text-body-small-bold">{app.name}</span>
            </div>
          </div>
          {onSearch && (
            <button
              type="button"
              onClick={onSearch}
              className={`mt-2 flex h-7 items-center gap-2 rounded-4 p-1 pr-0.5 text-left text-body-small-medium text-secondary hover:bg-primary-hover ${focusRing}`}
            >
              <SearchIcon />
              <span className="flex-1">Search</span>
              {searchShortcut && (
                <span className="flex h-4 items-center rounded-4 border border-primary bg-secondary px-1 text-support-caption text-tertiary">
                  {searchShortcut}
                </span>
              )}
            </button>
          )}
          <div className="mt-3 min-h-0 flex-1 overflow-y-auto">
            <SidebarNav groups={nav} currentId={currentNavId} onNavigate={onNavigate} linkComponent={linkComponent} aria-label={app.name} />
          </div>
          {(onHelp || sidebarFooter) && (
            <div className="mt-2 flex items-center gap-2">
              {onHelp && (
                <IconButton variant="outline" size="sm" aria-label="Help" className="rounded-infinite bg-primary" onClick={onHelp}>
                  <HelpIcon />
                </IconButton>
              )}
              {sidebarFooter}
            </div>
          )}
        </aside>
      )}
      <div className={`flex min-w-0 flex-1 flex-col gap-4 pb-2 pr-2 pt-4 ${open ? '' : 'pl-2'}`}>
        <header className="flex h-8 shrink-0 items-center gap-2">
          <IconButton
            variant="ghost"
            size="sm"
            aria-label={open ? 'Hide sidebar' : 'Show sidebar'}
            aria-pressed={!open}
            onClick={() => setOpen(!open)}
          >
            <SidebarIcon />
          </IconButton>
          {!open && switcher}
          <Divider direction="vertical" spacing="regular" className="h-4 self-center" />
          <div className="min-w-0 flex-1 truncate text-body-medium-semibold">{title}</div>
          <div className="flex shrink-0 items-center gap-2">
            {primaryAction}
            {primaryAction && hasRightTools && <Divider direction="vertical" spacing="regular" className="h-4 self-center" />}
            {notifications && (
              <span className="relative">
                <IconButton
                  variant="ghost"
                  size="md"
                  aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
                  onClick={notifications.onClick}
                >
                  <BellIcon />
                </IconButton>
                {unread > 0 && <span aria-hidden className="pointer-events-none absolute right-1.5 top-1.5 size-2 rounded-infinite bg-danger" />}
              </span>
            )}
            {onComments && (
              <IconButton variant="ghost" size="md" aria-label="Comments" onClick={onComments}>
                <MessageIcon />
              </IconButton>
            )}
            <button type="button" aria-label={`Account: ${user.name}`} onClick={onAccount} className={`rounded-infinite ${focusRing}`}>
              <Avatar size={24} color="pink" src={user.avatarSrc} alt="">
                {user.initials}
              </Avatar>
            </button>
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-auto rounded-card border border-card bg-primary p-4 shadow-card">{children}</main>
      </div>
    </div>
  )
}
