import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, type ReactNode } from 'react'
import {
  IconAdjustmentsHorizontal, IconBriefcase, IconBuilding, IconBuildingWarehouse, IconCalendarTime, IconCash, IconChartDots3,
  IconClipboardList, IconFileText, IconHierarchy2, IconHistory, IconHome, IconId, IconLayersSubtract, IconPlus,
  IconSchool, IconShieldLock, IconSitemap, IconStack2, IconUsers, IconWebhook,
} from '@tabler/icons-react'
import { WorkspaceShell } from './WorkspaceShell'
import type { WorkspaceApp } from './AppSwitcher'
import type { NavGroup, NavItem } from './SidebarNav'
import { Button } from '../button/Button'
import { Tab, Tabs } from '../navigation/Tabs'
import { Badge } from '../badge/Badge'
import procure from './assets/app-procureapp.svg'
import itsm from './assets/app-itsm.svg'

// The Duo rail shell, set up for the task test: one app with deep menus (ProcureApp)
// and one with many flat items (Org Chart Studio, as in the real build).

const meta = {
  title: 'Workspace/Duo rail (task test)',
  parameters: { layout: 'fullscreen' },
  globals: { theme: 'duo' },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const orgIcon = (
  <svg viewBox="0 0 32 32" aria-hidden>
    <rect width="32" height="32" rx="8" fill="#fff" />
    <rect x="12" y="5" width="8" height="6" rx="2" fill="#8B5CF6" />
    <rect x="4" y="21" width="8" height="6" rx="2" fill="#C4B5FD" />
    <rect x="20" y="21" width="8" height="6" rx="2" fill="#C4B5FD" />
    <path d="M16 11v5M8 21v-5h16v5" stroke="#8B5CF6" strokeWidth="2" fill="none" />
  </svg>
)

const apps: WorkspaceApp[] = [
  { id: 'procure', name: 'ProcureApp', icon: procure },
  { id: 'org', name: 'Org Chart Studio', icon: orgIcon },
  { id: 'itsm', name: 'ITSM', icon: itsm },
]

const t = (label: string, id: string, count?: number): NavItem => ({ id, label, icon: <IconFileText />, count })
const navs: Record<string, { nav: NavGroup[]; action: string }> = {
  procure: {
    action: 'Create request',
    nav: [
      { id: 'main', items: [
        { id: 'home', label: 'Home', icon: <IconHome /> },
        { id: 'mine', label: 'My requests', icon: <IconStack2 />, count: 3 },
        { id: 'approvals', label: 'Waiting for me', icon: <IconClipboardList />, count: 5 },
      ] },
      { id: 'types', label: 'Request types', items: [
        { id: 'expense', label: 'Expense and payment', icon: <IconCash />, children: [t('ADV: Advance request', 'adv'), t('CLR: Clear advance', 'clr'), t('PAY: Payment request', 'pay'), t('PET: Petty cash', 'pet', 12)] },
        { id: 'purchasing', label: 'Purchasing', icon: <IconBuildingWarehouse />, children: [t('PR: Purchase request', 'pr', 2), t('PO: Purchase order', 'po', 1), t('MRR: Material request', 'mrr'), t('RFQ: Request for quotation', 'rfq')] },
        { id: 'employee', label: 'Employee', icon: <IconSchool />, children: [t('ITR: Internal training', 'itr'), t('PTR: Public training', 'ptr'), t('MMB: My mix benefit', 'mmb')] },
        { id: 'projects', label: 'Projects', icon: <IconBriefcase />, children: [t('PROJ: Project request', 'proj')] },
      ] },
      { id: 'admin', items: [{ id: 'settings', label: 'Approval settings', icon: <IconAdjustmentsHorizontal /> }] },
    ],
  },
  org: {
    action: 'Create task',
    nav: [
      { id: 'chart', items: [{ id: 'home', label: 'Org chart', icon: <IconSitemap /> }] },
      { id: 'structure', label: 'Structure', items: [
        { id: 'companies', label: 'Companies', icon: <IconBuilding /> },
        { id: 'units', label: 'Units', icon: <IconHierarchy2 /> },
        { id: 'positions', label: 'Positions and seats', icon: <IconChartDots3 /> },
      ] },
      { id: 'jobs', label: 'Jobs', items: [
        { id: 'levels', label: 'Job levels', icon: <IconLayersSubtract /> },
        { id: 'families', label: 'Job families', icon: <IconBriefcase /> },
        { id: 'profiles', label: 'Job profiles', icon: <IconId /> },
      ] },
      { id: 'people', items: [{ id: 'employees', label: 'Employees', icon: <IconUsers />, count: 36 }] },
      { id: 'changes', label: 'Changes', items: [
        { id: 'drafts', label: 'Change requests', icon: <IconFileText />, count: 2 },
        { id: 'upcoming', label: 'Upcoming changes', icon: <IconCalendarTime /> },
        { id: 'history', label: 'Change history', icon: <IconHistory /> },
      ] },
      { id: 'admin', label: 'Admin', items: [
        { id: 'access', label: 'Access and roles', icon: <IconShieldLock /> },
        { id: 'api', label: 'Data sharing (API)', icon: <IconWebhook /> },
      ] },
    ],
  },
  itsm: {
    action: 'New ticket',
    nav: [{ id: 'main', items: [{ id: 'home', label: 'Home', icon: <IconHome /> }, { id: 'tickets', label: 'Tickets', icon: <IconClipboardList />, count: 4 }] }],
  },
}

const find = (groups: NavGroup[], id: string) => groups.flatMap((g) => g.items.flatMap((i) => [i, ...(i.children ?? [])])).find((i) => i.id === id)

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-card border border-card bg-primary p-5 shadow-card ${className}`}>{children}</section>
}

const rows = [
  ['PR-2026-0042', 'Laptops for the marketing team', 'Somchai C.', '128,400.00', 'Waiting for approval'],
  ['PR-2026-0041', 'Roll-up banners for the year-end expo', 'Somchai C.', '18,190.00', 'Waiting for approval'],
  ['PR-2026-0040', 'Meeting room camera and mic', 'Preeya K.', '151,940.00', 'Waiting for RFQ'],
  ['PR-2026-0038', 'Ergonomic office chairs', 'Malee S.', '68,480.00', 'Waiting for RFQ'],
]

function Page({ app, page }: { app: WorkspaceApp; page: NavItem }) {
  const [tab, setTab] = useState(0)
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        {[['Waiting for you', '5'], ['Your open requests', '3'], ['Due this week', '2']].map(([label, value]) => (
          <Card key={label} className="flex items-center justify-between">
            <span className="text-body-small-regular text-secondary">{label}</span>
            <span className="text-heading-h4">{value}</span>
          </Card>
        ))}
      </div>
      <Card className="flex flex-col gap-4 p-0">
        <div className="flex items-center justify-between px-5 pt-5">
          <Tabs variant="pill">
            {[['All', 12], ['Waiting', 5], ['Approved', 7]].map(([label, count], i) => (
              <Tab key={label} selected={tab === i} count={count} onClick={() => setTab(i)}>{label}</Tab>
            ))}
          </Tabs>
          <span className="text-body-small-regular text-tertiary">{app.name} · {page.label}</span>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-body-small-medium text-secondary">
              {['No.', 'Title', 'Requester', 'Amount (THB)', 'Status'].map((h) => <th key={h} className="h-10 border-b border-primary-subtle px-5 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="h-table-row border-b border-primary-subtle text-body-small-regular last:border-0 hover:bg-primary-hover">
                <td className="px-5 text-primary">{r[0]}</td><td className="px-5">{r[1]}</td><td className="px-5 text-secondary">{r[2]}</td>
                <td className="px-5 tabular-nums">{r[3]}</td><td className="px-5"><Badge state={r[4].includes('RFQ') ? 'urgent' : 'warning'}>{r[4]}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function DuoWorkspace({ startApp, expanded }: { startApp: string; expanded?: boolean }) {
  const [appId, setAppId] = useState(startApp)
  const [navId, setNavId] = useState('home')
  const app = apps.find((a) => a.id === appId)!
  const { nav, action } = navs[appId]
  const page = find(nav, navId) ?? find(nav, 'home')!
  return (
    <WorkspaceShell
      layout="rail"
      defaultRailExpanded={expanded}
      apps={apps}
      app={app}
      onOpenApp={(a) => { setAppId(a.id); setNavId('home') }}
      onOpenLauncher={() => {}}
      nav={nav}
      currentNavId={page.id}
      onNavigate={(item) => setNavId(item.id)}
      title={page.label}
      subtitle={page.id === 'home' ? 'Good morning, Somchai' : undefined}
      primaryAction={<Button accent="blue" prefixIcon={<IconPlus size={16} />}>{action}</Button>}
      onSearch={() => {}}
      notifications={{ count: 2, onClick: () => {} }}
      user={{ name: 'Somchai C.', initials: 'SC' }}
      onHelp={() => {}}
    >
      <Page app={app} page={page} />
    </WorkspaceShell>
  )
}

/** Collapsed rail, deep menus: request types sit under four categories. Click a category icon to open its flyout. */
export const ProcureAppCollapsed: Story = { name: 'ProcureApp, collapsed', render: () => <DuoWorkspace startApp="procure" /> }

/** The same app with the rail expanded: labels, group headings and child rows. */
export const ProcureAppExpanded: Story = { name: 'ProcureApp, expanded', render: () => <DuoWorkspace startApp="procure" expanded /> }

/** Many flat items (13, as in the real Org Chart Studio). Hover the icons: can you tell Job levels, families and profiles apart? */
export const OrgChartCollapsed: Story = { name: 'Org Chart Studio, collapsed', render: () => <DuoWorkspace startApp="org" /> }

/** Org Chart Studio with labels. */
export const OrgChartExpanded: Story = { name: 'Org Chart Studio, expanded', render: () => <DuoWorkspace startApp="org" expanded /> }
