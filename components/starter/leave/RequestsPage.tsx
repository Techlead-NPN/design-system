import { useState } from 'react'
import { IconCalendarEvent, IconFileText, IconFilter, IconInbox, IconPlus, IconSearch, IconTag, IconUser } from '@tabler/icons-react'
import {
  DSApprovalTimeline, DSBadge, DSButton, DSDetailPanel, DSDetailSection, DSEmptyState, DSField, DSFieldGrid,
  DSFilterChip, DSFilterChips, DSHideWhenDetailOpen as hide, DSListToolbar, DSListWithDetail, DSPersonLabel,
  DSTab, DSTable, DSTableCell, DSTableHeaderCell, DSTableRow, DSTabs, DSTextInput,
} from '../../src'
import { formatRange, leaveTypeLabel, leaveTypes, statusBadge, type LeaveRequest, type LeaveStatus, type LeaveType } from './data'

export interface RequestsPageProps {
  /** `mine`: the person's own requests. `approvals`: their team's requests, which they approve. */
  mode: 'mine' | 'approvals'
  requests: LeaveRequest[]
  status: LeaveStatus | 'all'
  onStatusChange: (status: LeaveStatus | 'all') => void
  openId: string | null
  onOpen: (id: string | null) => void
  onDecide: (request: LeaveRequest, decision: 'approve' | 'reject') => void
  onCancelRequest: (request: LeaveRequest) => void
  onCreate: () => void
}

const tabs: { id: LeaveStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Waiting' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
]

/** A list of leave requests with the open one beside it. */
export function RequestsPage({ mode, requests, status, onStatusChange, openId, onOpen, onDecide, onCancelRequest, onCreate }: RequestsPageProps) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<LeaveType | null>(null)
  const [detailTab, setDetailTab] = useState(0)

  const byTab = (s: LeaveStatus | 'all') => requests.filter((r) => s === 'all' || r.status === s)
  const q = query.trim().toLowerCase()
  const rows = byTab(status).filter(
    (r) => (type == null || r.type === type) && (q === '' || r.id.toLowerCase().includes(q) || r.requester.name.toLowerCase().includes(q) || r.reason.toLowerCase().includes(q)),
  )
  const filtered = q !== '' || type != null
  const index = rows.findIndex((r) => r.id === openId)
  const open = index >= 0 ? rows[index] : null
  const go = (id: string | null) => { onOpen(id); setDetailTab(0) }

  const detail = open && (
    <DSDetailPanel
      eyebrow="Leave request"
      title={`${leaveTypeLabel(open.type)}, ${open.days} ${open.days === 1 ? 'day' : 'days'}`}
      status={<DSBadge state={statusBadge[open.status][0]}>{statusBadge[open.status][1]}</DSBadge>}
      meta={<><span>{open.id}</span><DSPersonLabel name={open.requester.name} initials={open.requester.initials} /><span>{formatRange(open.start, open.end)}</span></>}
      tabs={<DSTabs>{['Information', 'Approval'].map((t, i) => <DSTab key={t} selected={detailTab === i} onClick={() => setDetailTab(i)}>{t}</DSTab>)}</DSTabs>}
      footer={
        open.status !== 'pending' ? undefined : mode === 'approvals' ? (
          <>
            <DSButton hierarchy="outline" accent="danger" onClick={() => onDecide(open, 'reject')}>Reject</DSButton>
            <DSButton accent="blue" onClick={() => onDecide(open, 'approve')}>Approve</DSButton>
          </>
        ) : (
          <DSButton hierarchy="outline" accent="danger" onClick={() => onCancelRequest(open)}>Cancel request</DSButton>
        )
      }
      onClose={() => go(null)}
      onPrevious={index > 0 ? () => go(rows[index - 1].id) : undefined}
      onNext={index < rows.length - 1 ? () => go(rows[index + 1].id) : undefined}
    >
      {detailTab === 0 ? (
        <div className="flex flex-col gap-3">
          <DSDetailSection title="Leave">
            <DSFieldGrid>
              <DSField label="Type" icon={<IconTag size={14} />}>{leaveTypeLabel(open.type)}</DSField>
              <DSField label="Working days" icon={<IconFileText size={14} />}>{open.days}</DSField>
              <DSField label="Dates" icon={<IconCalendarEvent size={14} />} wide>{formatRange(open.start, open.end)}</DSField>
              <DSField label="Requested by" icon={<IconUser size={14} />}><DSPersonLabel name={open.requester.name} initials={open.requester.initials} /></DSField>
              <DSField label="Submitted">{open.submitted}</DSField>
              <DSField label="Reason" wide>{open.reason}</DSField>
            </DSFieldGrid>
          </DSDetailSection>
        </div>
      ) : (
        <DSApprovalTimeline steps={open.steps} heading="Approval flow" />
      )}
    </DSDetailPanel>
  )

  return (
    <section className="flex h-full min-h-[560px] flex-col gap-3 rounded-card border border-card bg-primary p-4 shadow-card">
      <DSTabs variant="pill">
        {tabs.map((t) => (
          <DSTab key={t.id} selected={status === t.id} count={byTab(t.id).length} onClick={() => { onStatusChange(t.id); go(null) }}>{t.label}</DSTab>
        ))}
      </DSTabs>
      <DSListToolbar
        start={
          <>
            <DSTextInput type="search" aria-label="Search requests" placeholder={mode === 'mine' ? 'Search by number or reason' : 'Search by name or number'} prefix={<IconSearch size={16} />} className="w-72" value={query} onChange={(e) => setQuery(e.target.value)} />
            <DSFilterChips aria-label="Leave type">
              {leaveTypes.map((t) => (
                <DSFilterChip key={t.value} selected={type === t.value} onClick={() => setType(type === t.value ? null : t.value)}>{t.label}</DSFilterChip>
              ))}
            </DSFilterChips>
          </>
        }
      />
      {rows.length === 0 ? (
        filtered ? (
          <DSEmptyState illustration={<IconFilter size={40} stroke={1.5} />} title="No requests match" description="Try another search or leave type." action={<DSButton hierarchy="outline" onClick={() => { setQuery(''); setType(null) }}>Clear filters</DSButton>} />
        ) : mode === 'mine' ? (
          <DSEmptyState illustration={<IconInbox size={40} stroke={1.5} />} title="No requests here" description="Leave you request shows here." action={<DSButton accent="blue" prefixIcon={<IconPlus size={14} />} onClick={onCreate}>Request leave</DSButton>} />
        ) : (
          <DSEmptyState illustration={<IconInbox size={40} stroke={1.5} />} title="You're all caught up" description="Requests from your team show here." />
        )
      ) : (
        <DSListWithDetail
          className="min-h-0 flex-1"
          detail={detail}
          list={
            <DSTable>
              <thead>
                <DSTableRow>
                  <DSTableHeaderCell>No.</DSTableHeaderCell>
                  {mode === 'approvals' && <DSTableHeaderCell>Employee</DSTableHeaderCell>}
                  <DSTableHeaderCell>Type</DSTableHeaderCell>
                  <DSTableHeaderCell className={hide}>Dates</DSTableHeaderCell>
                  <DSTableHeaderCell className={`text-right ${hide}`}>Days</DSTableHeaderCell>
                  <DSTableHeaderCell>Status</DSTableHeaderCell>
                  <DSTableHeaderCell className={hide}>Submitted</DSTableHeaderCell>
                </DSTableRow>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <DSTableRow key={r.id} selected={r.id === openId} onClick={() => go(r.id)} className="cursor-pointer">
                    <DSTableCell>{r.id}</DSTableCell>
                    {mode === 'approvals' && <DSTableCell><DSPersonLabel name={r.requester.name} initials={r.requester.initials} /></DSTableCell>}
                    <DSTableCell>{leaveTypeLabel(r.type)}</DSTableCell>
                    <DSTableCell className={hide}>{formatRange(r.start, r.end)}</DSTableCell>
                    <DSTableCell className={`text-right tabular-nums ${hide}`}>{r.days}</DSTableCell>
                    <DSTableCell><DSBadge state={statusBadge[r.status][0]}>{statusBadge[r.status][1]}</DSBadge></DSTableCell>
                    <DSTableCell className={hide}>{r.submitted.slice(0, 10)}</DSTableCell>
                  </DSTableRow>
                ))}
              </tbody>
            </DSTable>
          }
        />
      )}
    </section>
  )
}
