import { useState } from 'react'
import { IconButton } from '../button/IconButton'
import { Dropdown } from '../menu/Dropdown'

export interface DateRange {
  start: Date | null
  end: Date | null
}

interface Common {
  /** Month shown first. Defaults to the selected date, or today. */
  defaultMonth?: Date
  weekStartsOn?: 'monday' | 'sunday'
  /** Days before this cannot be picked. */
  min?: Date
  /** Days after this cannot be picked. */
  max?: Date
  /** Draw the floating card around the calendar (border, radius, shadow). */
  card?: boolean
  className?: string
}
export type CalendarProps =
  | (Common & { mode?: 'single'; value: Date | null; onChange: (value: Date) => void })
  | (Common & { mode: 'range'; value: DateRange; onChange: (value: DateRange) => void })

// Spec: projects/portal2.0/components/calendar.md
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const day = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
const Chevron = ({ d }: { d: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
)

export function Calendar(props: CalendarProps) {
  const { weekStartsOn = 'monday', min, max, card = false, className = '' } = props
  const range: DateRange = props.mode === 'range' ? props.value : { start: props.value, end: null }
  const [view, setView] = useState(() => {
    const d = props.defaultMonth ?? range.start ?? new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const offset = weekStartsOn === 'monday' ? 1 : 0
  const first = new Date(view.getFullYear(), view.getMonth(), 1 - ((view.getDay() - offset + 7) % 7))
  const cells = Array.from({ length: 42 }, (_, i) => new Date(first.getFullYear(), first.getMonth(), first.getDate() + i))
  const today = day(new Date())
  const start = range.start ? day(range.start) : null
  const end = range.end ? day(range.end) : null
  const thisYear = new Date().getFullYear()
  const years = Array.from({ length: 21 }, (_, i) => String(thisYear - 10 + i))

  const pick = (d: Date) => {
    if (props.mode !== 'range') return props.onChange(d)
    const { start: s, end: e } = props.value
    if (!s || e) props.onChange({ start: d, end: null })
    else if (day(d) < day(s)) props.onChange({ start: d, end: s })
    else props.onChange({ start: s, end: d })
  }

  return (
    <div className={`inline-flex w-[268px] flex-col gap-2 p-2 ${card ? 'rounded-8 bg-primary shadow-lg inset-ring inset-ring-primary-subtle' : ''} ${className}`}>
      <div className="flex h-8 items-center justify-between gap-2">
        <div className="flex gap-1">
          <Dropdown
            className="w-[98px]"
            aria-label="Month"
            options={MONTHS.map((m, i) => ({ value: String(i), label: m }))}
            value={String(view.getMonth())}
            onChange={(v) => v != null && setView(new Date(view.getFullYear(), Number(v), 1))}
          />
          <Dropdown
            className="w-[76px]"
            aria-label="Year"
            options={years.map((y) => ({ value: y, label: y }))}
            value={String(view.getFullYear())}
            onChange={(v) => v != null && setView(new Date(Number(v), view.getMonth(), 1))}
          />
        </div>
        <div className="flex gap-0.5 text-tertiary">
          <IconButton className="text-tertiary" aria-label="Previous month" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}>
            <Chevron d="M15 6l-6 6l6 6" />
          </IconButton>
          <IconButton className="text-tertiary" aria-label="Next month" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}>
            <Chevron d="M9 6l6 6l-6 6" />
          </IconButton>
        </div>
      </div>
      <div className="flex">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="flex h-8 w-9 items-center justify-center text-body-small-regular text-tertiary">{DAYS[(i + offset) % 7]}</div>
        ))}
      </div>
      <div className="flex flex-col gap-1" role="grid">
        {Array.from({ length: 6 }, (_, w) => (
          <div key={w} className="flex" role="row">
            {cells.slice(w * 7, w * 7 + 7).map((d) => {
              const t = day(d)
              const outside = d.getMonth() !== view.getMonth()
              const disabled = outside || (min != null && t < day(min)) || (max != null && t > day(max))
              const isStart = start === t
              const isEnd = end === t
              const selected = isStart || isEnd
              const inRange = start != null && end != null && t > start && t < end
              // Start and End carry a half-width strip so the range reads as one band.
              const strip = start != null && end != null && start !== end
                ? isStart ? 'before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:bg-accent-indigo-subtlest'
                : isEnd ? 'before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:bg-accent-indigo-subtlest' : ''
                : ''
              const pill = selected
                ? `bg-accent-indigo text-primary-inverse ${start != null && end != null && start !== end ? (isStart ? 'rounded-l-4' : 'rounded-r-4') : 'rounded-4'}`
                : inRange
                  ? 'text-secondary'
                  : disabled
                    ? 'rounded-4 text-disabled'
                    : `rounded-4 text-secondary group-hover:bg-accent-indigo-subtlest group-hover:text-accent-indigo ${t === today ? 'border border-accent-indigo' : ''}`
              return (
                <button
                  key={t}
                  type="button"
                  role="gridcell"
                  aria-selected={selected || inRange}
                  aria-current={t === today ? 'date' : undefined}
                  aria-label={d.toDateString()}
                  disabled={disabled}
                  onClick={() => pick(d)}
                  className={`group relative flex h-8 w-9 items-center justify-center outline-none disabled:cursor-not-allowed ${inRange ? 'bg-accent-indigo-subtlest' : ''} ${strip}`}
                >
                  <span className={`relative flex size-8 items-center justify-center text-body-small-medium group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent-indigo ${pill}`}>
                    {d.getDate()}
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
