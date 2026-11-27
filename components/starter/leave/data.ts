// Sample data for the Leave starter app. A real app loads this from its API; the shapes are
// what the pages need, so keep them when you wire up the real data.
import type { DSApprovalStep, DSBadgeState } from '../../src'

export interface Person {
  id: string
  name: string
  email?: string
  initials: string
  position: string
}

export type LeaveType = 'annual' | 'sick' | 'personal'
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled'

export interface LeaveRequest {
  id: string
  type: LeaveType
  start: Date
  end: Date
  /** Working days. */
  days: number
  reason: string
  requester: Person
  status: LeaveStatus
  submitted: string
  /** The approval flow, in order. The first step is the requester. */
  steps: DSApprovalStep[]
}

export const me: Person = { id: 'sc', name: 'Somchai C.', email: 'somchai.c@techlead.com', initials: 'SC', position: 'Head of marketing' }
const director: Person = { id: 'ac', name: 'Anan C.', initials: 'AC', position: 'Marketing director' }
const hr: Person = { id: 'ms', name: 'Malee S.', initials: 'MS', position: 'HR officer' }
const thana: Person = { id: 'tw', name: 'Thana W.', initials: 'TW', position: 'Content lead' }
const preeya: Person = { id: 'pk', name: 'Preeya K.', initials: 'PK', position: 'Designer' }

export const leaveTypes: { value: LeaveType; label: string }[] = [
  { value: 'annual', label: 'Annual leave' },
  { value: 'sick', label: 'Sick leave' },
  { value: 'personal', label: 'Personal leave' },
]
export const leaveTypeLabel = (t: LeaveType) => leaveTypes.find((l) => l.value === t)!.label

/** Days left this year, per type. */
export const balances: { type: LeaveType; left: number; of: number }[] = [
  { type: 'annual', left: 8, of: 12 },
  { type: 'sick', left: 28, of: 30 },
  { type: 'personal', left: 3, of: 3 },
]

export const statusBadge: Record<LeaveStatus, [DSBadgeState, string]> = {
  pending: ['warning', 'Waiting for approval'],
  approved: ['success', 'Approved'],
  rejected: ['error', 'Rejected'],
  cancelled: ['disabled', 'Cancelled'],
}

export const formatDate = (d: Date) => d.toLocaleDateString('en-GB')
export const formatRange = (start: Date, end: Date) => (start.getTime() === end.getTime() ? formatDate(start) : `${formatDate(start)} – ${formatDate(end)}`)

/** Monday to Friday between two dates, inclusive. */
export function workingDays(start: Date, end: Date) {
  let n = 0
  for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) if (d.getDay() % 6 !== 0) n++
  return n
}

/** Who approves a request from this person: their manager approves, then HR verifies. */
export function approvalFlow(requester: Person, submitted: string): DSApprovalStep[] {
  const manager = requester.id === me.id ? director : me
  return [
    { id: 'req', name: requester.name, initials: requester.initials, position: requester.position, status: 'done', statusLabel: 'Submitted', time: submitted },
    { id: 'mgr', name: manager.name, initials: manager.initials, position: manager.position, role: 'approver', status: 'current', statusLabel: 'Waiting for approval' },
    { id: 'hr', name: hr.name, initials: hr.initials, position: hr.position, role: 'verifier', status: 'waiting', statusLabel: 'Not yet' },
  ]
}

/** Moves the flow on after the manager decides. */
export function decide(steps: DSApprovalStep[], decision: 'approve' | 'reject', comment: string, time: string): DSApprovalStep[] {
  return steps.map((s) => {
    if (s.id === 'mgr') return { ...s, status: decision === 'approve' ? 'done' : 'rejected', statusLabel: decision === 'approve' ? 'Approved' : 'Rejected', time, note: comment || undefined }
    if (s.id === 'hr') return decision === 'approve' ? { ...s, status: 'done', statusLabel: 'Verified', time } : s
    return s
  })
}

const d = (day: number, month: number) => new Date(2026, month - 1, day)

function request(id: string, requester: Person, type: LeaveType, start: Date, end: Date, reason: string, submitted: string, status: LeaveStatus = 'pending'): LeaveRequest {
  let steps = approvalFlow(requester, submitted)
  if (status === 'approved') steps = decide(steps, 'approve', '', submitted)
  if (status === 'rejected') steps = decide(steps, 'reject', 'Campaign launch week. Can you move it a week later?', submitted)
  return { id, type, start, end, days: workingDays(start, end), reason, requester, status, submitted, steps }
}

export const initialRequests: LeaveRequest[] = [
  request('LV-2026-0031', thana, 'annual', d(15, 12), d(19, 12), 'Family trip to Chiang Mai.', '24/11/2026 10:05'),
  request('LV-2026-0030', preeya, 'personal', d(4, 12), d(4, 12), 'Moving house.', '23/11/2026 16:40'),
  request('LV-2026-0028', me, 'annual', d(29, 12), d(31, 12), 'Year-end holiday.', '20/11/2026 09:12'),
  request('LV-2026-0022', me, 'sick', d(10, 11), d(11, 11), 'Flu.', '12/11/2026 08:30', 'approved'),
  request('LV-2026-0017', thana, 'annual', d(2, 11), d(3, 11), 'Wedding.', '20/10/2026 11:20', 'approved'),
  request('LV-2026-0011', me, 'personal', d(20, 10), d(20, 10), 'Bank appointment.', '01/10/2026 14:02', 'rejected'),
]
