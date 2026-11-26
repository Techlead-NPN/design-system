import type { ReactNode } from 'react'
import { AppIcon, openApp, type WorkspaceApp } from './AppSwitcher'

// Spec: workspace/shell.md (Launcher)

export interface AppLauncherProps {
  /** Every app this person can open, in the workspace's fixed order. */
  apps: WorkspaceApp[]
  /** Marks one card "Most used". */
  mostUsedAppId?: string
  /** The company wordmark: a URL, or your own element. Shown 56px high. */
  logo: string | ReactNode
  /** Shown as "Welcome to {workspaceName}". */
  workspaceName?: string
  subtitle?: string
  /** Called when a card is chosen. Without it, the browser goes to the app's `href`. */
  onOpenApp?: (app: WorkspaceApp) => void
  className?: string
}

/** The page after sign-in, and behind "All apps": every app as a card. */
export function AppLauncher({
  apps, mostUsedAppId, logo, workspaceName = 'Portal', subtitle = 'Select an application to use.', onOpenApp, className = 'min-h-dvh',
}: AppLauncherProps) {
  return (
    <div className={`relative overflow-hidden bg-primary text-primary ${className}`}>
      <div aria-hidden className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-(--bg-accent-indigo-subtlest) to-(--bg-primary)" />
      <div className="relative mx-auto flex max-w-[720px] flex-col items-center px-6 pb-16 pt-24">
        {typeof logo === 'string' ? <img src={logo} alt="Techlead" className="h-14" /> : logo}
        <h1 className="mt-6 text-center text-heading-h5">Welcome to {workspaceName}</h1>
        <p className="mt-1 text-center text-body-medium-regular text-secondary">{subtitle}</p>
        <ul className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {apps.map((app) => (
            <li key={app.id}>
              <button
                type="button"
                onClick={() => openApp(app, onOpenApp)}
                className={
                  'relative flex h-40 w-full flex-col items-center justify-center gap-4 rounded-12 border border-primary-subtle bg-primary ' +
                  'hover:border-primary hover:shadow-md ' +
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo'
                }
              >
                {app.id === mostUsedAppId && (
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
