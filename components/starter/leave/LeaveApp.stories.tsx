import type { Meta, StoryObj } from '@storybook/react-vite'
import { LeaveApp } from './LeaveApp'

const meta = {
  title: 'Starter app/Leave',
  parameters: { layout: 'fullscreen' },
  globals: { theme: 'duo' },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

/**
 * A whole internal app built only from the package: Duo rail shell, home dashboard, request
 * lists with the detail panel, a two-step form, and approve, reject and cancel. Everything
 * works: request leave, then approve your team's requests under "Waiting for me".
 * The code is in `components/starter/leave/`; copy it to start a new app.
 */
export const App: Story = { name: 'Leave (Duo)', render: () => <LeaveApp /> }
