// Tabler outline icons used by the workspace shell, inlined so the package has no icon dependency.
const props = (size: number) =>
  ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }) as const

export const GridIcon = ({ size = 14 }: { size?: number }) => (
  <svg {...props(size)}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>
)
export const SidebarIcon = ({ size = 14 }: { size?: number }) => (
  <svg {...props(size)}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 4v16" /></svg>
)
export const SearchIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...props(size)}><circle cx="10" cy="10" r="7" /><path d="M21 21l-6 -6" /></svg>
)
export const HelpIcon = ({ size = 14 }: { size?: number }) => (
  <svg {...props(size)}><circle cx="12" cy="12" r="9" /><path d="M12 17v.01" /><path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" /></svg>
)
export const BellIcon = ({ size = 20 }: { size?: number }) => (
  <svg {...props(size)}><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
)
export const MessageIcon = ({ size = 20 }: { size?: number }) => (
  <svg {...props(size)}><path d="M8 9h8" /><path d="M8 13h6" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" /></svg>
)
export const ChevronIcon = ({ open, size = 14 }: { open: boolean; size?: number }) => (
  <svg {...props(size)}>{open ? <path d="M6 9l6 6l6 -6" /> : <path d="M9 6l6 6l-6 6" />}</svg>
)
