import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button/Button'
import { Alert, Callout, Toast } from './Toast'
import { Loading } from '../layout/Loading'

const meta = {
  title: 'Feedback/Toast, Alert, Callout and Loading',
  component: Toast,
  args: { status: 'success', title: 'Title message', description: 'Description' },
  argTypes: { status: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger'] } },
} satisfies Meta<typeof Toast>
export default meta
type Story = StoryObj<typeof meta>

const statuses = ['success', 'danger', 'info', 'warning'] as const

export const ToastPlayground: Story = {}

export const Toasts: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {statuses.map((s) => <Toast key={s} status={s} title="Title message" description="Description" action={<Button hierarchy="ghost" size="sm">CTA</Button>} onClose={() => {}} />)}
    </div>
  ),
}

export const Alerts: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {statuses.map((s) => <Alert key={s} className="w-[512px]" status={s} action={<Button size="sm">CTA</Button>}>No record identifiers have been set.</Alert>)}
      <Alert className="w-[327px]" layout="short" status="info" action={<Button size="sm">CTA</Button>}>No record identifiers have been set.</Alert>
    </div>
  ),
}

export const Callouts: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {statuses.map((s) => (
        <Callout key={s} className="w-[512px]" status={s} title="This form will appear in workflow runs." onClose={() => {}} action={<Button hierarchy="ghost" size="sm">Learn more</Button>}>
          Because this workflow is not using a manual trigger, the form will not open on top of the interface.
        </Callout>
      ))}
    </div>
  ),
}

export const LoadingBars: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Loading className="w-24" />
      <span className="rounded-6 bg-primary-inverse p-3"><Loading surface="dark" className="w-24" /></span>
    </div>
  ),
}
