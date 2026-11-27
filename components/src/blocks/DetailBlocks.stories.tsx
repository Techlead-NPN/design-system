import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { IconBuilding, IconCalendar, IconDots, IconExternalLink, IconFileText, IconFlag, IconPrinter, IconSearch, IconShare, IconTag } from '@tabler/icons-react'
import { ListWithDetail, DetailPanel, DetailSection, FieldGrid, Field, hideWhenDetailOpen } from './Detail'
import { ApprovalTimeline, ApprovalDialog, type ApprovalStep } from './Approval'
import { Amount, CompanyChip, ListToolbar, PersonLabel } from './List'
import { Table, TableCell, TableHeaderCell, TableRow } from '../table/Table'
import { Badge, type BadgeState } from '../badge/Badge'
import { Button } from '../button/Button'
import { IconButton } from '../button/IconButton'
import { TextInput } from '../field/TextInput'
import { Tab, Tabs } from '../navigation/Tabs'

const meta = { title: 'Blocks/Detail and approval', parameters: { layout: 'padded' } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const steps: ApprovalStep[] = [
  { id: '1', name: 'Somchai C.', initials: 'SC', position: 'Requester', status: 'done', statusLabel: 'Submitted', time: '24/10/2026 09:12' },
  { id: '2', name: 'Wipa K.', initials: 'WK', position: 'Head of marketing', role: 'verifier', status: 'done', statusLabel: 'Verified', time: '24/10/2026 13:40', note: 'Fine for the Q4 campaign. Please use the framework vendor.' },
  { id: '3', name: 'Tharin P.', initials: 'TP', position: 'Procurement manager', role: 'approver', status: 'current', statusLabel: 'Waiting for approval' },
  { id: '4', name: 'Anan C.', initials: 'AC', position: 'Chief financial officer', role: 'approver', status: 'waiting', statusLabel: 'Not yet' },
]

export const Timeline: Story = {
  name: 'Approval timeline',
  render: () => (
    <div className="max-w-[440px]">
      <ApprovalTimeline steps={steps} />
    </div>
  ),
}

export const RejectedTimeline: Story = {
  name: 'Approval timeline, rejected',
  render: () => (
    <div className="max-w-[440px]">
      <ApprovalTimeline steps={[steps[0], { ...steps[1], status: 'rejected', statusLabel: 'Rejected', note: 'Over budget for Q4. Split it into two requests.' }, { ...steps[2], status: 'waiting', statusLabel: 'Not yet' }]} />
    </div>
  ),
}

export const Dialogs: Story = {
  name: 'Approve and reject dialogs',
  render: () => (
    <div className="flex flex-wrap items-start gap-6 rounded-card bg-overlay p-6">
      <ApprovalDialog decision="approve" subject="PR-2026-0042" onConfirm={() => {}} onCancel={() => {}} />
      <ApprovalDialog decision="reject" subject="PR-2026-0042" onConfirm={() => {}} onCancel={() => {}} />
    </div>
  ),
}

export const Fields: Story = {
  name: 'Field grid and detail section',
  render: () => (
    <div className="flex max-w-[440px] flex-col gap-3">
      <DetailSection title="General">
        <FieldGrid>
          <Field label="Title" wide icon={<IconFileText size={14} />}>Laptops for the marketing team</Field>
          <Field label="Company" icon={<IconBuilding size={14} />}><CompanyChip name="Techlead Next" /></Field>
          <Field label="Request type" icon={<IconTag size={14} />}>Purchase request</Field>
          <Field label="Request date" icon={<IconCalendar size={14} />}>24/10/2026</Field>
          <Field label="Priority" icon={<IconFlag size={14} />}><Badge state="urgent">High</Badge></Field>
          <Field label="Department">Marketing</Field>
          <Field label="Amount (THB)"><Amount value={128400} /></Field>
          <Field label="Vendor" />
        </FieldGrid>
      </DetailSection>
      <DetailSection title="Details" defaultOpen={false}>
        <FieldGrid><Field label="Reason" wide>Replacing laptops older than five years.</Field></FieldGrid>
      </DetailSection>
    </div>
  ),
}

const docs: { id: string; company: string; title: string; who: string; ini: string; amount: number; status: [BadgeState, string]; date: string }[] = [
  { id: 'PR-2026-0042', company: 'Techlead Next', title: 'Laptops for the marketing team', who: 'Somchai C.', ini: 'SC', amount: 128400, status: ['warning', 'Waiting for approval'], date: '24/10/2026' },
  { id: 'PR-2026-0041', company: 'Techlead Next', title: 'Roll-up banners for the year-end expo', who: 'Somchai C.', ini: 'SC', amount: 18190, status: ['warning', 'Waiting for approval'], date: '23/10/2026' },
  { id: 'PR-2026-0039', company: 'MarDEE Digital', title: 'A3 printer for the sales team', who: 'Thana W.', ini: 'TW', amount: 86884, status: ['urgent', 'Waiting for RFQ'], date: '20/10/2026' },
  { id: 'PR-2026-0036', company: 'Techlead Next', title: '27-inch monitors (5)', who: 'Somchai C.', ini: 'SC', amount: 47347.5, status: ['info', 'In progress'], date: '15/10/2026' },
  { id: 'PR-2026-0024', company: 'Techlead Next', title: 'Wireless microphones (4)', who: 'Malee S.', ini: 'MS', amount: 21614, status: ['error', 'Rejected'], date: '01/10/2026' },
]

function ListWithDetailPage() {
  const [openId, setOpenId] = useState<string | null>(docs[0].id)
  const [tab, setTab] = useState(0)
  const [dialog, setDialog] = useState<'approve' | 'reject' | null>(null)
  const index = docs.findIndex((d) => d.id === openId)
  const doc = index >= 0 ? docs[index] : null
  const hide = hideWhenDetailOpen

  const detail = doc && (
    <DetailPanel
      eyebrow="Request details"
      title={doc.title}
      status={<Badge state={doc.status[0]}>{doc.status[1]}</Badge>}
      meta={<><span>{doc.id}</span><PersonLabel name={doc.who} initials={doc.ini} /><span>{doc.date}</span></>}
      actions={
        <>
          <IconButton variant="ghost" size="sm" aria-label="Open full page"><IconExternalLink size={14} /></IconButton>
          <IconButton variant="ghost" size="sm" aria-label="Share"><IconShare size={14} /></IconButton>
          <IconButton variant="ghost" size="sm" aria-label="Print"><IconPrinter size={14} /></IconButton>
          <IconButton variant="ghost" size="sm" aria-label="More"><IconDots size={14} /></IconButton>
        </>
      }
      tabs={
        <Tabs>
          {['Information', 'Approval', 'Comments'].map((t, i) => <Tab key={t} selected={tab === i} onClick={() => setTab(i)}>{t}</Tab>)}
        </Tabs>
      }
      footer={<><Button hierarchy="outline" accent="danger" onClick={() => setDialog('reject')}>Reject</Button><Button accent="blue" onClick={() => setDialog('approve')}>Approve</Button></>}
      onClose={() => setOpenId(null)}
      onPrevious={index > 0 ? () => setOpenId(docs[index - 1].id) : undefined}
      onNext={index < docs.length - 1 ? () => setOpenId(docs[index + 1].id) : undefined}
    >
      {tab === 0 && (
        <div className="flex flex-col gap-3">
          <DetailSection title="General">
            <FieldGrid>
              <Field label="Company"><CompanyChip name={doc.company} /></Field>
              <Field label="Request type">Purchase request</Field>
              <Field label="Amount (THB)"><Amount value={doc.amount} /></Field>
              <Field label="Department">Marketing</Field>
            </FieldGrid>
          </DetailSection>
          <DetailSection title="Details"><FieldGrid><Field label="Reason" wide>Replacing equipment older than five years.</Field></FieldGrid></DetailSection>
        </div>
      )}
      {tab === 1 && <ApprovalTimeline steps={steps} />}
      {tab === 2 && <p className="text-body-small-regular text-tertiary">No comments yet.</p>}
    </DetailPanel>
  )

  return (
    <div className="relative flex h-[620px] max-w-[1180px] flex-col gap-3 rounded-card border border-card bg-primary p-4 shadow-card">
      <ListToolbar start={<TextInput type="search" aria-label="Search documents" placeholder="Search documents" prefix={<IconSearch size={16} />} className="w-64" />} />
      <ListWithDetail
        className="min-h-0 flex-1"
        detail={detail}
        list={
          <Table>
            <thead>
              <TableRow>
                <TableHeaderCell>No.</TableHeaderCell>
                <TableHeaderCell className={hide}>Company</TableHeaderCell>
                <TableHeaderCell>Title</TableHeaderCell>
                <TableHeaderCell className={hide}>Requested by</TableHeaderCell>
                <TableHeaderCell className={`text-right ${hide}`}>Amount (THB)</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell className={hide}>Date</TableHeaderCell>
              </TableRow>
            </thead>
            <tbody>
              {docs.map((d) => (
                <TableRow key={d.id} selected={d.id === openId} onClick={() => setOpenId(d.id)} className="cursor-pointer">
                  <TableCell>{d.id}</TableCell>
                  <TableCell className={hide}><CompanyChip name={d.company} /></TableCell>
                  <TableCell className="max-w-[260px] truncate">{d.title}</TableCell>
                  <TableCell className={hide}><PersonLabel name={d.who} initials={d.ini} /></TableCell>
                  <TableCell className={`text-right ${hide}`}><Amount value={d.amount} /></TableCell>
                  <TableCell><Badge state={d.status[0]}>{d.status[1]}</Badge></TableCell>
                  <TableCell className={hide}>{d.date}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        }
      />
      {dialog && doc && (
        <div className="absolute inset-0 flex items-center justify-center rounded-card bg-overlay">
          <ApprovalDialog decision={dialog} subject={doc.id} onConfirm={() => setDialog(null)} onCancel={() => setDialog(null)} />
        </div>
      )}
    </div>
  )
}

/** Click a row: the detail opens inside the card, the table drops to No., Title and Status. Close it to get every column back. Approve and Reject open the confirm dialog. */
export const ListWithDetailTemplate: Story = { name: 'List with detail (template)', render: () => <ListWithDetailPage /> }
