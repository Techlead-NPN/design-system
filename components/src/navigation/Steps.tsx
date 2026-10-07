import type { ReactNode } from 'react'

export type StepState = 'empty' | 'progressing' | 'checked' | 'rejected' | 'disabled' | 'checked-disabled'

// Spec: projects/portal2.0/components/steps.md
const Glyph = ({ d, px }: { d: string; px: number }) => (
  <svg width={px} height={px} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
)
const CHECK = 'M5 12l5 5l10 -10'
const X = 'M18 6l-12 12M6 6l12 12'

/** The round status dot. 20px inside a step row, 24px when used on its own. */
export function StepIndicator({ state, size = 20 }: { state: StepState; size?: 20 | 24 }) {
  const box = size === 20 ? 'size-5' : 'size-6'
  const icon = size === 20 ? 12 : 14
  const base = `flex shrink-0 items-center justify-center rounded-infinite ${box}`
  switch (state) {
    case 'progressing':
      return (
        <span className={`${base} bg-accent-indigo-subtlest`}>
          <span className={`flex items-center justify-center rounded-infinite bg-accent-indigo-subtler ${size === 20 ? 'size-[13px]' : 'size-4'}`}>
            <span className={`rounded-infinite bg-accent-indigo ${size === 20 ? 'size-[7px]' : 'size-2'}`} />
          </span>
        </span>
      )
    case 'checked':
      return <span className={`${base} bg-accent-indigo text-primary-inverse`}><Glyph d={CHECK} px={icon} /></span>
    case 'rejected':
      return <span className={`${base} bg-danger text-primary-inverse`}><Glyph d={X} px={icon} /></span>
    case 'checked-disabled':
      return <span className={`${base} bg-accent-indigo-subtlest text-accent-indigo`}><Glyph d={CHECK} px={icon} /></span>
    case 'disabled':
      return <span className={`${base} border border-primary bg-disabled`} />
    default:
      return <span className={`${base} border border-primary`} />
  }
}

export interface StepItem {
  label: ReactNode
  status: 'empty' | 'progressing' | 'completed' | 'completed-inactive'
}

const dot: Record<StepItem['status'], StepState> = {
  empty: 'empty',
  progressing: 'progressing',
  completed: 'checked',
  'completed-inactive': 'checked-disabled',
}

/** A horizontal sequence of steps joined by lines. */
export function Steps({ items, className = '' }: { items: StepItem[]; className?: string }) {
  return (
    <ol className={`flex ${className}`}>
      {items.map((item, i) => {
        const last = i === items.length - 1
        return (
          <li key={i} aria-current={item.status === 'progressing' ? 'step' : undefined} className={`flex h-5 items-center gap-2 ${last ? '' : 'flex-1 pr-2'}`}>
            <StepIndicator state={dot[item.status]} />
            <span className={`whitespace-nowrap text-body-small-medium ${item.status === 'completed-inactive' ? 'text-tertiary' : 'text-primary'}`}>{item.label}</span>
            {!last && <span className={`flex-1 border-t ${item.status === 'completed' ? 'border-accent-indigo' : 'border-primary-subtle'}`} />}
          </li>
        )
      })}
    </ol>
  )
}
