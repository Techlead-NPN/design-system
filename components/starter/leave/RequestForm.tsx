import { useState } from 'react'
import { DSApprovalTimeline, DSCalendar, type DSDateRange, DSDropdown, DSField, DSFieldGrid, DSFormPage, DSFormSection, DSTextArea } from '../../src'
import { approvalFlow, balances, formatRange, leaveTypeLabel, leaveTypes, me, workingDays, type LeaveType } from './data'

export interface NewLeave {
  type: LeaveType
  start: Date
  end: Date
  days: number
  reason: string
}

export interface RequestFormProps {
  today: Date
  onSubmit: (leave: NewLeave) => void
  onCancel: () => void
}

/** Request leave in two steps: the details, then a review with who will approve it. */
export function RequestForm({ today, onSubmit, onCancel }: RequestFormProps) {
  const [step, setStep] = useState(0)
  const [type, setType] = useState<string | null>('annual')
  const [range, setRange] = useState<DSDateRange>({ start: null, end: null })
  const [reason, setReason] = useState('')
  const [tried, setTried] = useState(false)

  const start = range.start
  const end = range.end ?? range.start
  const days = start && end ? workingDays(start, end) : 0
  const balance = balances.find((b) => b.type === type)
  const errors = {
    type: type == null ? 'Choose a type of leave.' : null,
    dates: start == null ? 'Choose the dates.' : days === 0 ? 'These dates are a weekend. Choose working days.' : balance && days > balance.left ? `You have ${balance.left} days of ${leaveTypeLabel(balance.type).toLowerCase()} left.` : null,
  }
  const show = (e: string | null) => (tried ? e : null)

  return (
    <DSFormPage
      className="h-full"
      steps={['Details', 'Review']}
      currentStep={step}
      onStepChange={setStep}
      onBack={() => setStep(0)}
      onNext={() => {
        if (errors.type || errors.dates) { setTried(true); return }
        setStep(1)
      }}
      onCancel={onCancel}
      onSubmit={() => start && end && type && onSubmit({ type: type as LeaveType, start, end, days, reason: reason.trim() })}
      submitLabel="Send request"
    >
      {step === 0 ? (
        <>
          <DSFormSection title="Leave" description={balance ? `${balance.left} of ${balance.of} days left this year.` : undefined}>
            <DSDropdown label="Type" options={leaveTypes} value={type} onChange={setType} error={show(errors.type) != null} hint={show(errors.type) ?? undefined} />
            <div />
            <DSTextArea className="col-span-2" label="Reason (optional)" placeholder="Visible to your manager and HR" rows={2} counter maxLength={250} value={reason} onChange={(e) => setReason(e.target.value)} />
          </DSFormSection>
          <DSFormSection title="Dates" description="Pick the first and last day. Weekends are not counted." columns={1}>
            <div className="flex flex-wrap items-start gap-6">
              <DSCalendar mode="range" value={range} onChange={setRange} min={today} defaultMonth={today} card />
              <div className="flex flex-col gap-1 pt-2">
                <span className="text-body-small-regular text-tertiary">Selected</span>
                <span className="text-body-medium-semibold text-primary">{start && end ? formatRange(start, end) : 'No dates yet'}</span>
                {days > 0 && <span className="text-body-small-regular text-secondary">{days} working {days === 1 ? 'day' : 'days'}</span>}
                {show(errors.dates) && <span role="alert" className="text-body-small-regular text-danger">{show(errors.dates)}</span>}
              </div>
            </div>
          </DSFormSection>
        </>
      ) : (
        <>
          <DSFormSection title="Check before you send" columns={1}>
            <DSFieldGrid>
              <DSField label="Type">{type && leaveTypeLabel(type as LeaveType)}</DSField>
              <DSField label="Working days">{days}</DSField>
              <DSField label="Dates" wide>{start && end && formatRange(start, end)}</DSField>
              <DSField label="Reason" wide>{reason.trim()}</DSField>
            </DSFieldGrid>
          </DSFormSection>
          <DSFormSection title="Who approves it" description="Your manager approves, then HR verifies." columns={1}>
            <DSApprovalTimeline steps={approvalFlow(me, 'Now').map((s) => (s.id === 'req' ? { ...s, status: 'current', statusLabel: 'You', time: undefined } : { ...s, status: 'waiting', statusLabel: s.role === 'approver' ? 'Approves' : 'Verifies' }))} heading="Approval flow" />
          </DSFormSection>
        </>
      )}
    </DSFormPage>
  )
}
