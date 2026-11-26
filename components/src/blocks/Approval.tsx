import { useId, useState, type ComponentProps, type ReactNode } from 'react'
import { Avatar } from '../avatar/Avatar'
import { Button } from '../button/Button'
import { TextArea } from '../field/TextArea'
import { StepIndicator, type StepState } from '../navigation/Steps'

// Spec: workspace/blocks.md (Approval timeline, Approve/reject dialog); E-Approval sources:
// projects/e-approval/components/request-detail-approval-step.md, request-detail-role-tag.md,
// request-detail-rejection-reason.md, request-detail-approve-reject-dialog.md

const glyph = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const
const VerifyIcon = () => <svg {...glyph}><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 15l2 2l4 -4" /></svg>
const ApproveIcon = () => <svg {...glyph}><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /><path d="M15 19l2 2l4 -4" /></svg>
const DocIcon = () => <svg {...glyph}><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /></svg>

export type ApprovalRole = 'approver' | 'verifier'

/** Whether a person approves or verifies at their step. */
export function RoleTag({ role }: { role: ApprovalRole }) {
  return (
    <span className="inline-flex h-5 items-center gap-1 rounded-6 bg-secondary px-1.5 text-body-small-regular text-primary">
      {role === 'approver' ? <ApproveIcon /> : <VerifyIcon />}
      {role === 'approver' ? 'Approver' : 'Verifier'}
    </span>
  )
}

export type ApprovalStepStatus = 'done' | 'current' | 'waiting' | 'rejected'

export interface ApprovalStep {
  id: string
  name: string
  initials?: string
  /** Job title or position, e.g. "Head of department". */
  position?: string
  role: ApprovalRole
  status: ApprovalStepStatus
  /** Shown at the right, e.g. "Approved", "Waiting for review", "Submitted". */
  statusLabel: string
  /** When they acted, e.g. "24/10/2026 09:12". */
  time?: string
  /** Their comment or reason. */
  note?: ReactNode
}

const markers: Record<ApprovalStepStatus, StepState> = { done: 'checked', current: 'progressing', waiting: 'empty', rejected: 'rejected' }
const labelTone: Record<ApprovalStepStatus, string> = {
  done: 'text-success',
  current: 'text-accent-indigo',
  waiting: 'text-tertiary',
  rejected: 'text-danger',
}

export interface ApprovalTimelineProps extends ComponentProps<'section'> {
  steps: ApprovalStep[]
  /** Default "Delegation of Authority (DOA)". */
  heading?: ReactNode
}

/** Who approves a request, in order, and where it stands: each step's person, role, status, time and note. */
export function ApprovalTimeline({ steps, heading = 'Delegation of Authority (DOA)', className = '', ...rest }: ApprovalTimelineProps) {
  return (
    <section className={`flex flex-col gap-3 ${className}`} {...rest}>
      <h3 className="flex items-center gap-1.5 text-body-small-semibold text-accent-indigo"><DocIcon />{heading}</h3>
      <ol className="flex flex-col">
        {steps.map((step, i) => {
          const last = i === steps.length - 1
          return (
            <li key={step.id} className="flex gap-3" aria-current={step.status === 'current' ? 'step' : undefined}>
              <div className="flex flex-col items-center">
                <StepIndicator state={markers[step.status]} />
                {!last && <span aria-hidden className={`my-1 w-px flex-1 ${step.status === 'done' ? 'bg-accent-indigo' : 'bg-tertiary'}`} />}
              </div>
              <div className={`flex min-w-0 flex-1 flex-col gap-1.5 ${last ? '' : 'pb-5'}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <Avatar size={20} color="gray">{step.initials}</Avatar>
                  <span className="text-body-small-medium text-primary">{step.name}</span>
                  <RoleTag role={step.role} />
                  <span className={`ml-auto text-body-small-medium ${labelTone[step.status]}`}>{step.statusLabel}</span>
                </div>
                {(step.position != null || step.time != null) && (
                  <p className="text-support-caption text-tertiary">{[step.position, step.time].filter(Boolean).join(' · ')}</p>
                )}
                {step.note != null && (
                  <p className="rounded-8 border border-primary-subtle bg-secondary p-2 text-body-small-regular text-primary">{step.note}</p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export interface ApprovalDialogProps {
  decision: 'approve' | 'reject'
  /** What is being decided, e.g. the request title. Shown in the description. */
  subject?: ReactNode
  /** Called with the comment (trimmed; empty when none was written). */
  onConfirm: (comment: string) => void
  onCancel: () => void
  /** Default 250 characters. */
  maxLength?: number
}

/**
 * The confirm step for approving or rejecting. Approving takes an optional comment; rejecting
 * needs a reason, and confirming without one shows an error instead of continuing.
 */
export function ApprovalDialog({ decision, subject, onConfirm, onCancel, maxLength = 250 }: ApprovalDialogProps) {
  const id = useId()
  const [comment, setComment] = useState('')
  const [error, setError] = useState(false)
  const reject = decision === 'reject'
  const confirm = () => {
    if (reject && comment.trim() === '') {
      setError(true)
      return
    }
    onConfirm(comment.trim())
  }
  return (
    <div role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} aria-describedby={`${id}-desc`} className="flex w-[440px] flex-col gap-4 rounded-card bg-primary p-6 shadow-lg">
      <div className="flex flex-col gap-2">
        <h2 id={`${id}-title`} className="text-body-medium-semibold text-primary">{reject ? 'Reject this request?' : 'Approve this request?'}</h2>
        <p id={`${id}-desc`} className="text-body-small-regular text-secondary">
          {reject ? 'The requester sees your reason and can revise the request.' : 'It moves to the next step in the approval flow.'}
          {subject != null && <> <span className="text-primary">{subject}</span></>}
        </p>
      </div>
      <TextArea
        label={reject ? 'Reason' : 'Comment (optional)'}
        placeholder={reject ? 'Explain why it is rejected' : 'Add a comment for the requester'}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value)
          if (error) setError(false)
        }}
        error={error}
        hint={error ? 'Enter a reason to reject.' : undefined}
        counter
        maxLength={maxLength}
        rows={3}
      />
      <div className="flex justify-end gap-2">
        <Button hierarchy="outline" onClick={onCancel}>Cancel</Button>
        {reject ? (
          <Button accent="danger" onClick={confirm}>Reject</Button>
        ) : (
          <Button accent="blue" onClick={confirm}>Approve</Button>
        )}
      </div>
    </div>
  )
}
