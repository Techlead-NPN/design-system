import { useState, type ElementType, type ReactNode } from 'react'
import { IconButton } from '../button/IconButton'
import { Avatar } from '../avatar/Avatar'
import { AppIcon, AppSwitcher, type WorkspaceApp } from './AppSwitcher'
import { RailNav } from './RailNav'
import type { NavGroup, NavItem } from './SidebarNav'
import type { WorkspaceUser } from './WorkspaceShell'
import { BellIcon, ChevronsIcon, HelpIcon, MessageIcon, SearchIcon } from './icons'

// Spec: workspace/shell.md (Rail layout). Used by WorkspaceShell when layout="rail".

export interface WorkspaceRailProps {
  apps: WorkspaceApp[]
  app: WorkspaceApp
  onOpenApp?: (app: WorkspaceApp) => void
  onOpenLauncher?: () => void
  launcherHref?: string
  nav: NavGroup[]
  currentNavId?: string
  onNavigate?: (item: NavItem) => void
  linkComponent?: ElementType
  title: ReactNode
  subtitle?: ReactNode
  primaryAction?: ReactNode
  onSearch?: () => void
  searchShortcut?: string
  notifications?: { count?: number; onClick: () => void }
  onComments?: () => void
  user: WorkspaceUser
  onAccount?: () => void
  onHelp?: () => void
  railExpanded?: boolean
  defaultRailExpanded?: boolean
  onRailExpandedChange?: (expanded: boolean) => void
  children: ReactNode
  className?: string
}

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo'
const roundTool = `flex size-11 shrink-0 items-center justify-center rounded-infinite bg-primary text-secondary shadow-card hover:text-primary ${focus}`

export function WorkspaceRail({
  apps, app, onOpenApp, onOpenLauncher, launcherHref,
  nav, currentNavId, onNavigate, linkComponent,
  title, subtitle, primaryAction,
  onSearch, searchShortcut = '⌘K', notifications, onComments, user, onAccount, onHelp,
  railExpanded, defaultRailExpanded = false, onRailExpandedChange,
  children, className = 'h-dvh',
}: WorkspaceRailProps) {
  const [own, setOwn] = useState(defaultRailExpanded)
  const expanded = railExpanded ?? own
  const setExpanded = (next: boolean) => {
    if (railExpanded === undefined) setOwn(next)
    onRailExpandedChange?.(next)
  }
  const unread = notifications?.count ?? 0
  const switcher = <AppSwitcher apps={apps} currentAppId={app.id} onOpenApp={onOpenApp} onOpenLauncher={onOpenLauncher} launcherHref={launcherHref} />

  return (
    <div className={`flex w-full gap-3 bg-secondary p-3 text-primary ${className}`}>
      <aside
        className={
          'flex shrink-0 flex-col rounded-card border border-card bg-primary py-3 shadow-card ' +
          (expanded ? 'w-[244px] px-3' : 'w-14 items-center px-2.5')
        }
      >
        {expanded ? (
          <div className="flex h-9 items-center gap-2 pl-1.5">
            <AppIcon app={app} size={24} />
            <span className="min-w-0 flex-1 truncate text-body-small-bold">{app.name}</span>
            {switcher}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span title={app.name}><AppIcon app={app} size={32} /></span>
            {switcher}
          </div>
        )}
        <div role="separator" className={`my-3 border-t border-primary-subtle ${expanded ? 'mx-1.5' : 'w-6'}`} />
        <div className="-mx-1 min-h-0 flex-1 overflow-y-auto px-1 py-0.5">
          <RailNav groups={nav} currentId={currentNavId} onNavigate={onNavigate} linkComponent={linkComponent} expanded={expanded} aria-label={app.name} />
        </div>
        <div className={`mt-3 flex gap-2 ${expanded ? 'items-center justify-between px-1.5' : 'flex-col items-center'}`}>
          {onHelp && (
            <IconButton variant="ghost" size="sm" aria-label="Help" onClick={onHelp}>
              <HelpIcon />
            </IconButton>
          )}
          <IconButton
            variant="ghost"
            size="sm"
            aria-label={expanded ? 'Collapse menu' : 'Expand menu'}
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            <ChevronsIcon direction={expanded ? 'left' : 'right'} size={14} />
          </IconButton>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto">
        <header className="flex shrink-0 items-center gap-3">
          {onSearch && (
            <button
              type="button"
              onClick={onSearch}
              className={`flex h-11 w-80 max-w-full items-center gap-3 rounded-infinite bg-primary px-5 text-left text-body-small-regular text-secondary shadow-card hover:text-primary ${focus}`}
            >
              <SearchIcon size={18} />
              <span className="flex-1">Search</span>
              {searchShortcut && <span className="text-support-caption text-tertiary">{searchShortcut}</span>}
            </button>
          )}
          <div className="ml-auto flex shrink-0 items-center gap-2">
            {primaryAction}
            {notifications && (
              <button
                type="button"
                aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
                onClick={notifications.onClick}
                className={`relative ${roundTool}`}
              >
                <BellIcon />
                {unread > 0 && <span aria-hidden className="absolute right-3 top-3 size-2 rounded-infinite bg-danger" />}
              </button>
            )}
            {onComments && (
              <button type="button" aria-label="Comments" onClick={onComments} className={roundTool}>
                <MessageIcon />
              </button>
            )}
            <button type="button" aria-label={`Account: ${user.name}`} onClick={onAccount} className={`rounded-infinite ${focus}`}>
              <Avatar size={36} color="pink" src={user.avatarSrc} alt="">
                {user.initials}
              </Avatar>
            </button>
          </div>
        </header>
        <div className="shrink-0">
          <h1 className="text-heading-h5">{title}</h1>
          {subtitle != null && <p className="mt-1 text-body-small-regular text-secondary">{subtitle}</p>}
        </div>
        <main className="min-h-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
