// Shared by Toast, Alert and Callout: one icon and one color family per status.
export type Status = 'info' | 'success' | 'warning' | 'danger'

const base = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const
const CIRCLE = 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0'
const paths: Record<Status, string[]> = {
  info: [CIRCLE, 'M12 9h.01', 'M11 12h1v4h1'],
  success: [CIRCLE, 'M9 12l2 2l4 -4'],
  warning: ['M12 9v4', 'M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z', 'M12 16h.01'],
  danger: [CIRCLE, 'M10 10l4 4m0 -4l-4 4'],
}

export const statusText: Record<Status, string> = { info: 'text-info', success: 'text-success', warning: 'text-warning', danger: 'text-danger' }
export const statusFillA80: Record<Status, string> = { info: 'bg-info-subtle-A80', success: 'bg-success-subtle-A80', warning: 'bg-warning-subtle-A80', danger: 'bg-danger-subtle-A80' }
export const statusBorder: Record<Status, string> = { info: 'border-info', success: 'border-success', warning: 'border-warning', danger: 'border-danger' }

/** 16px status icon in a 20px-high box so it lines up with the first line of text. */
export function StatusIcon({ status }: { status: Status }) {
  return (
    <span className={`flex h-5 shrink-0 items-center ${statusText[status]}`}>
      <svg {...base}>{paths[status].map((d) => <path key={d} d={d} />)}</svg>
    </span>
  )
}

export const CloseGlyph = () => <svg {...base}><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
