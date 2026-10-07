import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconChevronDown, IconCircleDashed, IconHome } from '@tabler/icons-react'
import { Tab, Tabs } from './Tabs'
import { Breadcrumb } from './Breadcrumb'
import { Steps } from './Steps'
import { Menu, MenuGroupLabel, MenuItem } from '../menu/Menu'

const meta = { title: 'Navigation/Tabs, Breadcrumb, Steps and Menu', component: Tabs } satisfies Meta<typeof Tabs>
export default meta
type Story = StoryObj<typeof meta>

function TabsDemo({ size }: { size: 28 | 32 }) {
  const [tab, setTab] = useState(0)
  return (
    <Tabs>
      {['Information', 'Approval Flow', 'Comment'].map((t, i) => (
        <Tab key={t} size={size} selected={tab === i} onClick={() => setTab(i)}>{t}</Tab>
      ))}
      <Tab size={size} suffixIcon={<IconChevronDown size={16} />}>+4 More</Tab>
    </Tabs>
  )
}
export const TabBar: Story = { render: () => <div className="flex flex-col gap-6"><TabsDemo size={28} /><TabsDemo size={32} /></div> }

export const Breadcrumbs: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Breadcrumb icon={<IconHome size={16} />} items={[{ label: 'Level', href: '#' }, { label: 'Level' }]} />
      <Breadcrumb icon={<IconHome size={16} />} items={[{ label: 'Level', href: '#' }, { label: 'Level', href: '#' }, { label: 'Level', href: '#' }, { label: 'Level' }]} />
    </div>
  ),
}

export const StepSequence: Story = {
  render: () => (
    <Steps
      className="w-[640px]"
      items={[
        { label: 'Step 1', status: 'completed' },
        { label: 'Step 2', status: 'progressing' },
        { label: 'Step 3', status: 'empty' },
        { label: 'Step 4', status: 'completed-inactive' },
      ]}
    />
  ),
}

export const MenuPanel: Story = {
  render: () => (
    <Menu className="w-[240px]">
      <MenuGroupLabel>Group label</MenuGroupLabel>
      <MenuItem leading={<IconCircleDashed size={16} />} supportingText="Supporting text" hasSubmenu>Menu item</MenuItem>
      <MenuItem leading={<IconCircleDashed size={16} />} supportingText="Supporting text" active>Menu item (keyboard highlight)</MenuItem>
      <MenuItem leading={<IconCircleDashed size={16} />} supportingText="Supporting text" selected>Menu item</MenuItem>
      <MenuItem leading={<IconCircleDashed size={16} />} supportingText="Supporting text" disabled>Menu item</MenuItem>
      <MenuItem leading={<IconCircleDashed size={16} />}>Menu item</MenuItem>
    </Menu>
  ),
}
