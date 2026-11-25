import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, type ReactNode } from 'react'
import {
  IconBuildingWarehouse, IconCalendarEvent, IconCash, IconDeviceDesktop, IconFileInvoice, IconHome,
  IconPlus, IconReceipt, IconStack2, IconTicket, IconUsers,
} from '@tabler/icons-react'
import { AppLauncher, AppSwitcher, WorkspaceShell, type NavItem, type WorkspaceApp } from './Workspace'
import { Button } from '../button/Button'
import itsm from './assets/app-itsm.svg'
import procure from './assets/app-procureapp.svg'
import hr from './assets/app-hr-tools.svg'
import accounting from './assets/app-accounting-tools.svg'
import wordmark from './assets/techlead-wordmark-on-light.svg'

const meta = {
  title: 'Workspace (draft)/App shell and switcher',
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

const i = (node: ReactNode) => node
const navByApp: Record<string, { nav: NavItem[]; action: string }> = {
  itsm: {
    action: 'New ticket',
    nav: [
      { id: 'home', label: 'Home', icon: i(<IconHome size={14} />), color: 'peach' },
      { id: 'tickets', label: 'Tickets', icon: i(<IconTicket size={14} />), color: 'sky', count: 4 },
      { id: 'assets', label: 'Assets', icon: i(<IconDeviceDesktop size={14} />), color: 'ocean' },
    ],
  },
  procure: {
    action: 'Create request',
    nav: [
      { id: 'home', label: 'Home', icon: i(<IconHome size={14} />), color: 'peach' },
      { id: 'requests', label: 'Requests', icon: i(<IconStack2 size={14} />), color: 'sky', count: 13 },
      { id: 'purchasing', label: 'Purchasing', icon: i(<IconBuildingWarehouse size={14} />), color: 'ocean' },
    ],
  },
  hr: {
    action: 'Request leave',
    nav: [
      { id: 'home', label: 'Home', icon: i(<IconHome size={14} />), color: 'peach' },
      { id: 'leave', label: 'Leave', icon: i(<IconCalendarEvent size={14} />), color: 'emerald' },
      { id: 'people', label: 'People', icon: i(<IconUsers size={14} />), color: 'sky' },
    ],
  },
  accounting: {
    action: 'New invoice',
    nav: [
      { id: 'home', label: 'Home', icon: i(<IconHome size={14} />), color: 'peach' },
      { id: 'invoices', label: 'Invoices', icon: i(<IconFileInvoice size={14} />), color: 'sky' },
      { id: 'payments', label: 'Payments', icon: i(<IconCash size={14} />), color: 'emerald' },
      { id: 'receipts', label: 'Receipts', icon: i(<IconReceipt size={14} />), color: 'stone' },
    ],
  },
}

function PagePlaceholder({ app, page }: { app: WorkspaceApp; page: string }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-body-medium-semibold">Hello, Somchai</p>
      <div className="flex h-60 items-center justify-center rounded-8 border border-dashed border-primary text-body-small-medium text-tertiary">
        {app.name} · {page} — each app's own page content goes here
      </div>
    </div>
  )
}

function Prototype({ start }: { start: 'launcher' | string }) {
  const [appId, setAppId] = useState<string | null>(start === 'launcher' ? null : start)
  const [navId, setNavId] = useState('home')
  const open = (id: string) => { setAppId(id); setNavId('home') }

  if (appId == null) {
    return <AppLauncher apps={apps} mostUsedId="procure" logo={wordmark} onOpenApp={open} />
  }
  const app = apps.find((a) => a.id === appId)!
  const { nav, action } = navByApp[app.id]
  const page = nav.find((n) => n.id === navId)!
  return (
    <div className="h-screen">
      <WorkspaceShell
        apps={apps}
        app={app}
        nav={nav}
        currentNavId={navId}
        onNavigate={setNavId}
        onOpenApp={open}
        onOpenLauncher={() => setAppId(null)}
        title={page.label}
        primaryAction={<Button hierarchy="primary" accent="blue" prefixIcon={<IconPlus size={14} />}>{action}</Button>}
        userInitials="SC"
      >
        <PagePlaceholder app={app} page={page.label} />
      </WorkspaceShell>
    </div>
  )
}

/** Clickable: start at the launcher, open an app, switch apps from the grid button, go back with "All apps". */
export const ClickablePrototype: Story = {
  name: 'Clickable prototype',
  render: () => <Prototype start="launcher" />,
}

/** The shell inside an app (ProcureApp). The grid button at the top-left opens the switcher. */
export const InsideAnApp: Story = {
  name: 'Inside an app',
  render: () => <Prototype start="procure" />,
}

/** The switcher on its own, opened. */
export const SwitcherOpen: Story = {
  name: 'App switcher',
  render: () => (
    <div className="h-96 bg-secondary p-4">
      <AppSwitcher apps={apps} currentId="procure" onOpenApp={() => {}} onOpenLauncher={() => {}} />
    </div>
  ),
}
