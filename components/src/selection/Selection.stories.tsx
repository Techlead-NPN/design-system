import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconMail } from '@tabler/icons-react'
import { Checkbox } from './Checkbox'
import { Radio } from './Radio'
import { RadioCard } from './RadioCard'
import { Toggle, ToggleCard } from '../toggle/Toggle'

const meta = {
  title: 'Selection/Checkbox, Radio and Toggle',
  component: Checkbox,
  args: { children: 'Label', disabled: false, error: false, indeterminate: false },
} satisfies Meta<typeof Checkbox>
export default meta
type Story = StoryObj<typeof meta>

export const CheckboxPlayground: Story = {}

export const Checkboxes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Checkbox>Label</Checkbox>
      <Checkbox defaultChecked>Label</Checkbox>
      <Checkbox indeterminate>Label</Checkbox>
      <Checkbox error>Label</Checkbox>
      <Checkbox error defaultChecked>Label</Checkbox>
      <Checkbox disabled>Label</Checkbox>
      <Checkbox disabled defaultChecked>Label</Checkbox>
      <Checkbox labelSide="left" defaultChecked>Label</Checkbox>
      <Checkbox size={14} defaultChecked aria-label="14px, for table rows" />
    </div>
  ),
}

export const Radios: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Radio name="a">Label</Radio>
      <Radio name="a" defaultChecked>Label</Radio>
      <Radio name="b" error>Label</Radio>
      <Radio name="b" error defaultChecked>Label</Radio>
      <Radio name="c" disabled>Label</Radio>
      <Radio name="d" disabled defaultChecked>Label</Radio>
      <Radio name="e" labelSide="left" defaultChecked>Label</Radio>
    </div>
  ),
}

const text = 'Set email visibility, manage your blocklist and more.'

export const RadioCards: Story = {
  render: () => (
    <div className="flex w-[248px] flex-col gap-3">
      <RadioCard label="Email" name="card" icon={<IconMail size={20} />} description={text} />
      <RadioCard label="Email" name="card" icon={<IconMail size={20} />} defaultChecked description={text} />
      <RadioCard label="Email" name="card-disabled" icon={<IconMail size={20} />} disabled description={text} />
    </div>
  ),
}

export const Toggles: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <Toggle aria-label="Off" />
        <Toggle aria-label="On" defaultChecked />
        <Toggle aria-label="Off, disabled" disabled />
        <Toggle aria-label="On, disabled" disabled defaultChecked />
      </div>
      <div className="flex w-[248px] flex-col gap-3">
        <ToggleCard label="Email" icon={<IconMail size={20} />} description={text} />
        <ToggleCard label="Email" icon={<IconMail size={20} />} defaultChecked description={text} />
        <ToggleCard label="Email" icon={<IconMail size={20} />} disabled description={text} />
      </div>
    </div>
  ),
}
