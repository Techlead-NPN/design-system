import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconCircleDashed } from '@tabler/icons-react'
import { Button } from './Button'
import { IconButton } from './IconButton'

const meta = {
  title: 'Actions/Button',
  component: Button,
  args: { children: 'Button', hierarchy: 'primary', accent: 'default', size: 'md', disabled: false },
  argTypes: {
    hierarchy: { control: 'inline-radio', options: ['primary', 'outline', 'ghost'] },
    accent: { control: 'inline-radio', options: ['default', 'danger', 'blue'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['md', 'sm'] as const).map((size) => (
        <div key={size} className="grid w-max grid-cols-9 items-center gap-x-4 gap-y-3">
          {(['primary', 'outline', 'ghost'] as const).map((h) =>
            (['default', 'danger', 'blue'] as const).map((a) => (
              <div key={h + a} className="contents">
                <Button hierarchy={h} accent={a} size={size}>Button</Button>
                <Button hierarchy={h} accent={a} size={size} prefixIcon={<IconCircleDashed size={14} />}>Button</Button>
                <Button hierarchy={h} accent={a} size={size} disabled>Button</Button>
              </div>
            )),
          )}
        </div>
      ))}
    </div>
  ),
}

export const WithShortcut: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button shortcut="⌘O">Button</Button>
      <Button hierarchy="outline" accent="blue" shortcut="⌘O">Button</Button>
      <Button accent="blue" shortcut="⌘O">Button</Button>
      <Button accent="danger" shortcut="⌘O">Button</Button>
    </div>
  ),
}

export const IconButtons: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {(['primary', 'outline', 'ghost'] as const).map((v) => (
        <div key={v} className="flex items-center gap-2">
          <IconButton variant={v} aria-label="Example"><IconCircleDashed size={20} /></IconButton>
          <IconButton variant={v} aria-label="Example" disabled><IconCircleDashed size={20} /></IconButton>
          <IconButton variant={v} size="sm" aria-label="Example"><IconCircleDashed size={14} /></IconButton>
          <IconButton variant={v} size="sm" aria-label="Example" disabled><IconCircleDashed size={14} /></IconButton>
        </div>
      ))}
    </div>
  ),
}
