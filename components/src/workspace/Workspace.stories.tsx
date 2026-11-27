import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  IconBuildingWarehouse, IconCalendarEvent, IconCash, IconDeviceDesktop, IconFileInvoice, IconHome,
  IconPlus, IconReceipt, IconStack2, IconStar, IconTicket, IconUsers,
} from '@tabler/icons-react'
import { WorkspaceShell } from './WorkspaceShell'
import { AppSwitcher, type WorkspaceApp } from './AppSwitcher'
import { AppLauncher } from './AppLauncher'
import { SidebarNav, type NavGroup, type NavItem } from './SidebarNav'
import { Button } from '../button/Button'
import itsm from './assets/app-itsm.svg'
import procure from './assets/app-procureapp.svg'
import hr from './assets/app-hr-tools.svg'
import accounting from './assets/app-accounting-tools.svg'
import wordmark from './assets/techlead-wordmark-on-light.svg'

const meta = {
  title: 'Workspace/Shell, app switcher and launcher',
  parameters: { layout: 'fullscreen' },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const apps: WorkspaceApp[] = [
  { id: 'itsm', name: 'ITSM', icon: itsm },
  { id: 'procure', name: 'ProcureApp', icon: procure },
  { id: 'hr', name: 'HR Tools', icon: hr },
  { id: 'accounting', name: 'Accounting Tools', icon: accounting },
]

const home: NavItem = { id: 'home', label: 'Home', icon: <IconHome size={14} />, color: 'peach' }
const navByApp: Record<string, { nav: NavGroup[]; action: string }> = {
  itsm: {
    action: 'New ticket',
    nav: [{ id: 'main', items: [home,
      { id: 'tickets', label: 'Tickets', icon: <IconTicket size={14} />, color: 'sky', count: 4 },
      { id: 'assets', label: 'Assets', icon: <IconDeviceDesktop size={14} />, color: 'ocean' },
    ] }],
  },
  procure: {
    action: 'Create request',
    nav: [
      { id: 'fav', label: 'Favorites', items: [{ id: 'fav-pr', label: 'PR : Purchase Request', icon: <IconStar size={14} />, color: 'stone' }] },
      { id: 'main', label: 'ProcureApp', items: [home,
        { id: 'requests', label: 'Requests', icon: <IconStack2 size={14} />, color: 'sky', children: [
          { id: 'all', label: 'All requests', icon: <IconStack2 size={14} />, color: 'ocean', count: 13 },
          { id: 'mine', label: 'Waiting for me', icon: <IconStack2 size={14} />, color: 'stone', count: 2 },
        ] },
        { id: 'purchasing', label: 'Purchasing', icon: <IconBuildingWarehouse size={14} />, color: 'ocean' },
      ] },
    ],
  },
  hr: {
    action: 'Request leave',
    nav: [{ id: 'main', items: [home,
      { id: 'leave', label: 'Leave', icon: <IconCalendarEvent size={14} />, color: 'emerald' },
      { id: 'people', label: 'People', icon: <IconUsers size={14} />, color: 'sky' },
    ] }],
  },
  accounting: {
    action: 'New invoice',
    nav: [{ id: 'main', items: [home,
      { id: 'invoices', label: 'Invoices', icon: <IconFileInvoice size={14} />, color: 'sky' },
      { id: 'payments', label: 'Payments', icon: <IconCash size={14} />, color: 'emerald' },
      { id: 'receipts', label: 'Receipts', icon: <IconReceipt size={14} />, color: 'stone' },
    ] }],
  },
}

const findItem = (groups: NavGroup[], id: string): NavItem | undefined =>
  groups.flatMap((g) => g.items.flatMap((i) => [i, ...(i.children ?? [])])).find((i) => i.id === id)

function Workspace({ start }: { start: 'launcher' | string }) {
  const [appId, setAppId] = useState<string | null>(start === 'launcher' ? null : start)
  const [navId, setNavId] = useState('home')
  const open = (app: WorkspaceApp) => {
    setAppId(app.id)
    setNavId('home')
  }

  if (appId == null) return <AppLauncher apps={apps} logo={wordmark} onOpenApp={open} />

  const app = apps.find((a) => a.id === appId)!
  const { nav, action } = navByApp[app.id]
  const page = findItem(nav, navId)!
  return (
    <WorkspaceShell
      apps={apps}
      app={app}
      onOpenApp={open}
      onOpenLauncher={() => setAppId(null)}
      nav={nav}
      currentNavId={navId}
      onNavigate={(item) => setNavId(item.id)}
      title={page.label}
      primaryAction={<Button accent="blue" prefixIcon={<IconPlus size={14} />}>{action}</Button>}
      onSearch={() => {}}
      notifications={{ count: 2, onClick: () => {} }}
      onComments={() => {}}
      user={{ name: 'Somchai C.', initials: 'SC' }}
      onHelp={() => {}}
    >
      <div className="flex flex-col gap-3">
        <p className="text-body-medium-semibold">Hello, Somchai</p>
        <div className="flex h-60 items-center justify-center rounded-8 border border-dashed border-primary text-body-small-medium text-tertiary">
          {app.name} · {page.label}: the app's page content goes here
        </div>
      </div>
    </WorkspaceShell>
  )
}

/** Start at the launcher, open an app, switch apps from the grid button, go back with "All apps". */
export const ClickableWorkspace: Story = {
  name: 'Clickable workspace',
  render: () => <Workspace start="launcher" />,
}

/** Inside ProcureApp: a Favorites group, and Requests with child rows. */
export const Shell: Story = {
  name: 'Shell',
  render: () => <Workspace start="procure" />,
}

/** The launcher page shown after sign-in and from "All apps". */
export const Launcher: Story = {
  name: 'Launcher',
  render: () => <AppLauncher apps={apps} logo={wordmark} onOpenApp={() => {}} />,
}

/** The switcher on its own. Click the grid button. */
export const Switcher: Story = {
  name: 'App switcher',
  render: () => (
    <div className="h-96 bg-secondary p-4">
      <AppSwitcher apps={apps} currentAppId="procure" onOpenApp={() => {}} onOpenLauncher={() => {}} />
    </div>
  ),
}

function NavDemo() {
  const [current, setCurrent] = useState('all')
  return (
    <div className="w-[228px] bg-secondary p-2">
      <SidebarNav groups={navByApp.procure.nav} currentId={current} onNavigate={(i) => setCurrent(i.id)} aria-label="ProcureApp" />
    </div>
  )
}

/** The sidebar menu on its own: groups, counts, and a row with children. */
export const Navigation: Story = {
  name: 'Sidebar navigation',
  render: () => <NavDemo />,
}
