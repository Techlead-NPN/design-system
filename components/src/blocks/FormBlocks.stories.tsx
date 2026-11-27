import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { FormPage, FormSection } from './Form'
import { FieldGrid, Field, DetailSection } from './Detail'
import { ApprovalTimeline, type ApprovalStep } from './Approval'
import { Amount, CompanyChip } from './List'
import { TextInput } from '../field/TextInput'
import { TextArea } from '../field/TextArea'
import { Dropdown } from '../menu/Dropdown'
import { Badge } from '../badge/Badge'

const meta = { title: 'Blocks/Form page', parameters: { layout: 'padded' } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const companies = [{ value: 'tln', label: 'Techlead Next' }, { value: 'mdd', label: 'MarDEE Digital' }]
const departments = [{ value: 'mkt', label: 'Marketing' }, { value: 'pro', label: 'Procurement' }, { value: 'it', label: 'IT' }]
const approvers: ApprovalStep[] = [
  { id: '1', name: 'Somchai C.', initials: 'SC', position: 'Requester', status: 'current', statusLabel: 'You' },
  { id: '2', name: 'Wipa K.', initials: 'WK', position: 'Head of marketing', role: 'verifier', status: 'waiting', statusLabel: 'Verifies' },
  { id: '3', name: 'Tharin P.', initials: 'TP', position: 'Procurement manager', role: 'approver', status: 'waiting', statusLabel: 'Approves' },
]

function PurchaseRequestForm() {
  const [step, setStep] = useState(0)
  const [company, setCompany] = useState<string | null>('tln')
  const [dept, setDept] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [reason, setReason] = useState('')
  const [tried, setTried] = useState(false)
  const [sent, setSent] = useState(false)
  const titleError = tried && title.trim() === ''
  const deptError = tried && dept == null

  if (sent) return <p className="text-body-medium-semibold text-primary">Submitted. <button className="text-accent-indigo underline" onClick={() => { setSent(false); setStep(0) }}>Start again</button></p>

  return (
    <div className="h-[680px] max-w-[880px] rounded-card border border-card bg-primary p-5 shadow-card">
      <FormPage
        className="h-full"
        title="Purchase request"
        aside={<Badge state="urgent">High priority</Badge>}
        steps={['Information', 'Approval', 'Preview']}
        currentStep={step}
        onStepChange={setStep}
        onBack={() => setStep((s) => s - 1)}
        onNext={() => {
          if (step === 0 && (title.trim() === '' || dept == null)) { setTried(true); return }
          setStep((s) => s + 1)
        }}
        onCancel={() => {}}
        onSaveDraft={() => {}}
        onSubmit={() => setSent(true)}
      >
        {step === 0 && (
          <>
            <FormSection title="General" description="Who the request is for and what it is.">
              <Dropdown label="Company" options={companies} value={company} onChange={setCompany} />
              <Dropdown label="Department" options={departments} value={dept} onChange={setDept} error={deptError} hint={deptError ? 'Choose a department.' : undefined} />
              <TextInput className="col-span-2" label="Title" placeholder="Laptops for the marketing team" value={title} onChange={(e) => setTitle(e.target.value)} error={titleError} hint={titleError ? 'Enter a title.' : undefined} />
            </FormSection>
            <FormSection title="Details" columns={1}>
              <TextArea label="Reason" placeholder="Replacing laptops older than five years" value={reason} onChange={(e) => setReason(e.target.value)} counter maxLength={500} rows={3} />
            </FormSection>
          </>
        )}
        {step === 1 && (
          <FormSection title="Approval flow" description="Set by the delegation of authority for this amount." columns={1}>
            <ApprovalTimeline steps={approvers} heading="Approvers" />
          </FormSection>
        )}
        {step === 2 && (
          <DetailSection title="Check before you submit">
            <FieldGrid>
              <Field label="Company"><CompanyChip name={companies.find((c) => c.value === company)?.label ?? ''} /></Field>
              <Field label="Department">{departments.find((d) => d.value === dept)?.label}</Field>
              <Field label="Title" wide>{title}</Field>
              <Field label="Reason" wide>{reason}</Field>
              <Field label="Estimated amount (THB)"><Amount value={128400} /></Field>
              <Field label="Approvers">{approvers.length - 1}</Field>
            </FieldGrid>
          </DetailSection>
        )}
      </FormPage>
    </div>
  )
}

/** Three steps that go in order. Next checks the step first: try it with the title empty. Completed steps in the bar can be clicked to go back. */
export const MultiStep: Story = { name: 'Multi-step form (template)', render: () => <PurchaseRequestForm /> }

/** A short form keeps the same page, section and footer, without the step bar. */
export const SingleStep: Story = {
  name: 'One-step form (template)',
  render: () => (
    <div className="h-[460px] max-w-[640px] rounded-card border border-card bg-primary p-5 shadow-card">
      <FormPage className="h-full" title="Request leave" onCancel={() => {}} onSubmit={() => {}} submitLabel="Send request">
        <FormSection title="Leave">
          <Dropdown label="Type" options={[{ value: 'annual', label: 'Annual leave' }, { value: 'sick', label: 'Sick leave' }]} value="annual" onChange={() => {}} />
          <TextInput label="Days" defaultValue="2" />
          <TextArea className="col-span-2" label="Note (optional)" rows={2} />
        </FormSection>
      </FormPage>
    </div>
  ),
}
