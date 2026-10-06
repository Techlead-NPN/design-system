// Tabler outline icons used inside components, inlined so the package has no icon dependency.
const base = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const

export const CheckIcon = () => <svg {...base}><path d="M5 12l5 5l10 -10" /></svg>
export const ChevronDownIcon = () => <svg {...base}><path d="M6 9l6 6l6 -6" /></svg>
export const ChevronUpIcon = () => <svg {...base}><path d="M6 15l6 -6l6 6" /></svg>
export const ChevronRightIcon = () => <svg {...base}><path d="M9 6l6 6l-6 6" /></svg>
export const XIcon = () => <svg {...base}><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
export const CircleXIcon = () => (
  <svg {...base}><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" /></svg>
)
