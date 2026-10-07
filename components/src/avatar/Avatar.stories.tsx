import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconCircleDashed } from '@tabler/icons-react'
import { Avatar } from './Avatar'
import { SquareAvatar } from './SquareAvatar'
import { SidebarIcon } from './SidebarIcon'

const meta = {
  title: 'Identity/Avatar and Sidebar icon',
  component: Avatar,
  args: { size: 24, color: 'gray', children: 'AB' },
  argTypes: {
    size: { control: 'inline-radio', options: [16, 20, 24, 36] },
    color: { control: 'select', options: ['green', 'teal', 'sky', 'blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'gray'] },
  },
} satisfies Meta<typeof Avatar>
export default meta
type Story = StoryObj<typeof meta>

export const AvatarPlayground: Story = {}

const colors = ['green', 'teal', 'sky', 'blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'gray'] as const

export const Avatars: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {([36, 24, 20, 16] as const).map((size) => (
        <div key={size} className="flex items-center gap-3">
          {colors.map((c) => <Avatar key={c} size={size} color={c}>AB</Avatar>)}
        </div>
      ))}
    </div>
  ),
}

export const SquareAvatars: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {([40, 24, 20, 16, 14, 12] as const).map((size) => <SquareAvatar key={size} size={size}>L</SquareAvatar>)}
    </div>
  ),
}

const accents = ['ocean', 'sky', 'teal', 'sun', 'fuchsia', 'blossom', 'emerald', 'blush', 'peach', 'stone'] as const

export const SidebarIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {([16, 24] as const).map((size) => (
        <div key={size} className="flex items-center gap-3">
          {accents.map((c) => <SidebarIcon key={c} size={size} color={c}><IconCircleDashed size={14} /></SidebarIcon>)}
        </div>
      ))}
    </div>
  ),
}
