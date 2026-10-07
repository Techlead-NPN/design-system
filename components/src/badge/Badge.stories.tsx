import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconCircleDashed, IconX } from '@tabler/icons-react'
import { Badge } from './Badge'
import { Chip } from './Chip'
import { StepIndicator } from '../navigation/Steps'

const meta = {
  title: 'Status/Badge and Chip',
  component: Badge,
  args: { state: 'success', children: 'status' },
  argTypes: { state: { control: 'select', options: ['success', 'error', 'info', 'accent', 'urgent', 'warning', 'idle', 'disabled'] } },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const BadgePlayground: Story = {}

export const Badges: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(['success', 'error', 'info', 'accent', 'urgent', 'warning', 'idle', 'disabled'] as const).map((s) => (
        <Badge key={s} state={s}>{s}</Badge>
      ))}
    </div>
  ),
}

export const Chips: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['primary', 'secondary'] as const).map((h) => (
        <div key={h} className="flex flex-wrap items-center gap-3">
          <Chip hierarchy={h} prefixIcon={<IconCircleDashed size={16} />}>Name</Chip>
          <Chip hierarchy={h} selected prefixIcon={<IconCircleDashed size={16} />}>Name</Chip>
          <Chip hierarchy={h} disabled prefixIcon={<IconCircleDashed size={16} />}>Name</Chip>
          <Chip hierarchy={h} rounded={false}>Name</Chip>
          <Chip hierarchy={h} rounded={false} selected suffixIcon={<IconX size={16} />}>Alexandre Prot</Chip>
        </div>
      ))}
    </div>
  ),
}

export const StepIndicators: Story = {
  render: () => (
    <div className="flex gap-3">
      {(['empty', 'checked', 'rejected', 'progressing', 'disabled', 'checked-disabled'] as const).map((s) => <StepIndicator key={s} state={s} size={24} />)}
    </div>
  ),
}
