import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { IconAdjustmentsHorizontal, IconChecklist, IconClockHour4, IconDownload, IconFileText, IconFilter, IconInbox, IconPlus, IconSearch, IconShoppingCart } from '@tabler/icons-react'
import { SectionCard, StatTile, StatTiles } from './Dashboard'
import { Amount, CompanyChip, EmptyState, FilterChip, FilterChips, ListToolbar, PersonLabel, ViewSwitch, type ListView } from './List'
import { Table, TableCell, TableHeaderCell, TableRow, TableSelectCell } from '../table/Table'
import { Checkbox } from '../selection/Checkbox'
import { Badge } from '../badge/Badge'
import { Button } from '../button/Button'
import { IconButton } from '../button/IconButton'
import { TextInput } from '../field/TextInput'
import { Tab, Tabs } from '../navigation/Tabs'

const meta = { title: 'Blocks/Dashboard and list', parameters: { layout: 'padded' } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const SectionCards: Story = {
  name: 'Section card and stat tiles',
  render: () => (
    <div className="grid max-w-[880px] grid-cols-2 gap-4 bg-secondary p-4">
      <SectionCard title="Waiting for you" icon={<IconClockHour4 size={14} />} color="peach">
        <StatTiles>
          <StatTile variant="highlight" value={5} label="Requests" onClick={() => {}} />
        </StatTiles>
      </SectionCard>
      <SectionCard title="Your requests" icon={<IconFileText size={14} />} color="ocean" action={<Button hierarchy="ghost" size="sm">See all</Button>}>
        <StatTiles>
          <StatTile value={2} label="Draft" tone="idle" onClick={() => {}} />
          <StatTile value={4} label="Under review" tone="info" onClick={() => {}} />
          <StatTile value={9} label="Approved" tone="success" onClick={() => {}} />
          <StatTile value={1} label="Rejected" tone="danger" onClick={() => {}} />
        </StatTiles>
      </SectionCard>
    </div>
  ),
}

export const EmptyStates: Story = {
  name: 'Empty state',
  render: () => (
    <div className="flex max-w-[880px] flex-col gap-4">
      <EmptyState illustration={<IconInbox size={40} stroke={1.5} />} title="No requests yet" description="Requests you create appear here." action={<Button accent="blue" prefixIcon={<IconPlus size={14} />}>Create request</Button>} />
      <EmptyState illustration={<IconFilter size={40} stroke={1.5} />} title="No requests match these filters" description="Try another status or clear the filters." action={<Button hierarchy="outline">Clear filters</Button>} />
    </div>
  ),
}

const docs = [
  { id: 'PR-2026-0042', company: 'Techlead Next', title: 'Laptops for the marketing team', who: 'Somchai C.', ini: 'SC', amount: 128400, status: ['warning', 'Waiting for approval'] as const, date: '24/10/2026' },
  { id: 'PR-2026-0041', company: 'Techlead Next', title: 'Roll-up banners for the year-end expo', who: 'Somchai C.', ini: 'SC', amount: 18190, status: ['warning', 'Waiting for approval'] as const, date: '23/10/2026' },
  { id: 'PR-2026-0039', company: 'MarDEE Digital', title: 'A3 printer for the sales team', who: 'Thana W.', ini: 'TW', amount: 86884, status: ['urgent', 'Waiting for RFQ'] as const, date: '20/10/2026' },
  { id: 'PR-2026-0036', company: 'Techlead Next', title: '27-inch monitors (5)', who: 'Somchai C.', ini: 'SC', amount: 47347.5, status: ['info', 'In progress'] as const, date: '15/10/2026' },
  { id: 'PR-2026-0024', company: 'Techlead Next', title: 'Wireless microphones (4)', who: 'Malee S.', ini: 'MS', amount: 21614, status: ['error', 'Rejected'] as const, date: '01/10/2026' },
]

function ListPage() {
  const [tab, setTab] = useState(0)
  const [type, setType] = useState('PR')
  const [view, setView] = useState<ListView>('table')
  const [empty, setEmpty] = useState(false)
  const rows = empty ? [] : docs
  return (
    <div className="flex max-w-[1100px] flex-col gap-3 rounded-card border border-card bg-primary p-4 shadow-card">
      <Tabs>
        {[['All', 12], ['Waiting for me', 5], ['In review', 3], ['Approved', 4]].map(([label, count], i) => (
          <Tab key={label} selected={tab === i} count={count} onClick={() => setTab(i)}>{label}</Tab>
        ))}
      </Tabs>
      <ListToolbar
        start={
          <>
            <TextInput type="search" aria-label="Search documents" placeholder="Search documents" prefix={<IconSearch size={16} />} className="w-64" />
            <Button hierarchy="outline" prefixIcon={<IconAdjustmentsHorizontal size={14} />}>Filter</Button>
          </>
        }
        end={
          <>
            <ViewSwitch value={view} onChange={setView} />
            <IconButton variant="ghost" aria-label="Export"><IconDownload size={20} /></IconButton>
          </>
        }
      />
      <FilterChips aria-label="Document type">
        {[['PR', 12], ['RFQ', 4], ['PO', 4], ['GR', 3], ['PAY', 1]].map(([label, count]) => (
          <FilterChip key={label} selected={type === label} count={count as number} onClick={() => setType(label as string)}>{label}</FilterChip>
        ))}
        <Button hierarchy="ghost" size="sm" onClick={() => setEmpty((e) => !e)}>{empty ? 'Show rows' : 'Show empty state'}</Button>
      </FilterChips>
      {rows.length === 0 ? (
        <EmptyState illustration={<IconFilter size={40} stroke={1.5} />} title="No documents match these filters" description="Try another type or clear the filters." action={<Button hierarchy="outline" onClick={() => setEmpty(false)}>Clear filters</Button>} />
      ) : (
        <Table>
          <thead>
            <TableRow>
              <TableSelectCell header><Checkbox aria-label="Select all" /></TableSelectCell>
              <TableHeaderCell>No.</TableHeaderCell>
              <TableHeaderCell>Company</TableHeaderCell>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>Requested by</TableHeaderCell>
              <TableHeaderCell className="text-right">Amount (THB)</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
            </TableRow>
          </thead>
          <tbody>
            {rows.map((d) => (
              <TableRow key={d.id}>
                <TableSelectCell><Checkbox aria-label={`Select ${d.id}`} /></TableSelectCell>
                <TableCell>{d.id}</TableCell>
                <TableCell><CompanyChip name={d.company} /></TableCell>
                <TableCell className="max-w-[260px] truncate">{d.title}</TableCell>
                <TableCell><PersonLabel name={d.who} initials={d.ini} /></TableCell>
                <TableCell className="text-right"><Amount value={d.amount} /></TableCell>
                <TableCell><Badge state={d.status[0]}>{d.status[1]}</Badge></TableCell>
                <TableCell>{d.date}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

/** Status tabs, list toolbar, filter chips, a document table and the empty state, put together. Switch the toolbar Theme to Duo to compare. */
export const ListPageTemplate: Story = { name: 'List page (template)', render: () => <ListPage /> }

/** A dashboard from section cards and stat tiles. */
export const DashboardTemplate: Story = {
  name: 'Dashboard (template)',
  render: () => (
    <div className="grid max-w-[1100px] grid-cols-3 gap-4 bg-secondary p-4">
      <SectionCard title="Waiting for you" icon={<IconClockHour4 size={14} />} color="peach">
        <StatTiles><StatTile variant="highlight" value={5} label="Requests" onClick={() => {}} /></StatTiles>
      </SectionCard>
      <SectionCard className="col-span-2" title="Your requests" icon={<IconFileText size={14} />} color="ocean">
        <StatTiles>
          <StatTile value={2} label="Draft" tone="idle" onClick={() => {}} />
          <StatTile value={4} label="Under review" tone="info" onClick={() => {}} />
          <StatTile value={9} label="Approved" tone="success" onClick={() => {}} />
          <StatTile value={1} label="Rejected" tone="danger" onClick={() => {}} />
        </StatTiles>
      </SectionCard>
      <SectionCard className="col-span-3" title="Purchasing" icon={<IconShoppingCart size={14} />} color="sky" action={<Button hierarchy="ghost" size="sm">Last 3 months</Button>}>
        <StatTiles>
          <StatTile value={2} label="PR · Purchase requests" />
          <StatTile value={1} label="PO · Purchase orders" />
          <StatTile value={1} label="GR · Goods received" />
          <StatTile value={2} label="PAY · Payments" />
        </StatTiles>
      </SectionCard>
      <SectionCard className="col-span-3" title="Nothing to approve" icon={<IconChecklist size={14} />} color="emerald">
        <EmptyState className="py-6" title="You're all caught up" description="New approvals appear here." />
      </SectionCard>
    </div>
  ),
}
