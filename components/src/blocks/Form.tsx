import type { ComponentProps, ReactNode } from 'react'
import { Button } from '../button/Button'
import { StepIndicator } from '../navigation/Steps'

// Spec: workspace/blocks.md (Form page, Form section); E-Approval sources:
// projects/e-approval/patterns/create-form.md, components/create-form-progress.md,
// create-form-general-details.md. Steps go in order (decided 2026-11-26), unlike the
// free tabs in E-Approval's doc.

export interface FormStepsProps {
  steps: string[]
  /** Index of the step being filled in. */
  current: number
  /** Called when the person goes back to a completed step. Later steps can't be opened ahead. */
  onStepChange?: (index: number) => void
}

/** The step bar of a multi-step form. Completed steps can be revisited; later steps are locked. */
export function FormSteps({ steps, current, onStepChange }: FormStepsProps) {
  return (
    <ol className="flex items-center" aria-label="Steps">
      {steps.map((label, i) => {
        const done = i < current
        const now = i === current
        const last = i === steps.length - 1
        const content = (
          <>
            <StepIndicator state={done ? 'checked' : now ? 'progressing' : 'empty'} />
            <span className={`whitespace-nowrap text-body-small-medium ${i > current ? 'text-tertiary' : 'text-primary'}`}>{label}</span>
          </>
        )
        return (
          <li key={label} aria-current={now ? 'step' : undefined} className={`flex items-center gap-2 ${last ? '' : 'flex-1 pr-2'}`}>
            {done && onStepChange ? (
              <button
                type="button"
                onClick={() => onStepChange(i)}
                className="flex items-center gap-2 rounded-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo"
              >
                {content}
              </button>
            ) : (
              <span className="flex items-center gap-2">{content}</span>
            )}
            {!last && <span aria-hidden className={`ml-2 flex-1 border-t ${done ? 'border-accent-indigo' : 'border-primary-subtle'}`} />}
          </li>
        )
      })}
    </ol>
  )
}

export interface FormPageProps extends Omit<ComponentProps<'form'>, 'title' | 'onSubmit'> {
  title: ReactNode
  /** Right of the title, e.g. a priority picker. */
  aside?: ReactNode
  /** Step labels. Leave out for a one-step form: no step bar, and the footer offers Submit straight away. */
  steps?: string[]
  /** Index of the current step (multi-step forms). */
  currentStep?: number
  /** Going back to a completed step from the step bar. */
  onStepChange?: (index: number) => void
  /** Next step. Check the current step first and only advance when it's valid. */
  onNext?: () => void
  /** Previous step. Shown from the second step on. */
  onBack?: () => void
  onCancel?: () => void
  /** Shows "Save draft" when given. */
  onSaveDraft?: () => void
  /** The final action, on the last step (or the only step). */
  onSubmit?: () => void
  submitLabel?: string
  nextLabel?: string
}

/**
 * A full form page: title, step bar (multi-step forms), the form sections, and a pinned footer
 * with Back, Cancel, Save draft and Next or Submit. One-step forms leave out `steps`.
 */
export function FormPage({
  title, aside, steps, currentStep = 0, onStepChange, onNext, onBack, onCancel, onSaveDraft, onSubmit,
  submitLabel = 'Submit', nextLabel = 'Next', className = '', children, ...rest
}: FormPageProps) {
  const multi = steps != null && steps.length > 1
  const last = !multi || currentStep >= steps.length - 1
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        if (last) onSubmit?.()
        else onNext?.()
      }}
      className={`flex min-h-0 flex-col ${className}`}
      {...rest}
    >
      <header className="flex shrink-0 flex-col gap-4 pb-4">
        <div className="flex items-start gap-3">
          <h1 className="min-w-0 flex-1 text-heading-h6 text-primary">{title}</h1>
          {aside}
        </div>
        {multi && <FormSteps steps={steps} current={currentStep} onStepChange={onStepChange} />}
      </header>
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-4">{children}</div>
      <footer className="flex shrink-0 items-center gap-2 border-t border-primary-subtle bg-primary pt-3">
        {multi && currentStep > 0 && onBack && <Button type="button" hierarchy="ghost" onClick={onBack}>Back</Button>}
        <div className="ml-auto flex items-center gap-2">
          {onCancel && <Button type="button" hierarchy="ghost" onClick={onCancel}>Cancel</Button>}
          {onSaveDraft && <Button type="button" hierarchy="outline" onClick={onSaveDraft}>Save draft</Button>}
          <Button type="submit" accent="blue">{last ? submitLabel : nextLabel}</Button>
        </div>
      </footer>
    </form>
  )
}

export interface FormSectionProps extends Omit<ComponentProps<'section'>, 'title'> {
  title: ReactNode
  /** One line under the title about what this section needs. */
  description?: ReactNode
  /** Columns for the fields inside. Default 2; give a field `className="col-span-2"` to span both. */
  columns?: 1 | 2
}

/** A titled card of fields on a form page. */
export function FormSection({ title, description, columns = 2, className = '', children, ...rest }: FormSectionProps) {
  return (
    <section className={`flex flex-col gap-4 rounded-card border border-card bg-primary p-4 shadow-card ${className}`} {...rest}>
      <div className="flex flex-col gap-1">
        <h2 className="text-body-medium-semibold text-primary">{title}</h2>
        {description != null && <p className="text-body-small-regular text-tertiary">{description}</p>}
      </div>
      <div className={`grid gap-x-4 gap-y-4 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>{children}</div>
    </section>
  )
}
