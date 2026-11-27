import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconSearch, IconCircleDashed } from '@tabler/icons-react'
import { TextInput } from './TextInput'
import { TextArea } from './TextArea'
import { Dropdown } from '../menu/Dropdown'
import { Calendar } from '../calendar/Calendar'
import type { DateRange } from '../calendar/Calendar'

const hint = 'This is a hint text to help user.'

const meta = {
  title: 'Fields/Text input, Dropdown and Calendar',
  component: TextInput,
  args: { label: 'Title', placeholder: 'Placeholder', hint, error: false, disabled: false, className: 'w-[280px]' },
} satisfies Meta<typeof TextInput>
export default meta
type Story = StoryObj<typeof meta>

export const TextInputPlayground: Story = {}

export const TextInputs: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <TextInput className="w-[280px]" label="Title" placeholder="Placeholder" hint={hint} />
      <TextInput className="w-[280px]" label="Title" defaultValue="Value" hint={hint} />
      <TextInput className="w-[280px]" label="Title" defaultValue="Value" error hint={hint} />
      <TextInput className="w-[280px]" label="Title" placeholder="Placeholder" disabled hint={hint} />
      <TextInput className="w-[280px]" label="Title" defaultValue="Value" disabled hint={hint} />
      <TextInput className="w-[280px]" label="Title" placeholder="Search" prefix={<IconCircleDashed size={16} />} />
    </div>
  ),
}

/** `type="search"` takes the search shape: a pill in Duo, the same as other fields in Classic. Every other field takes the form-field shape. */
export const SearchAndFormFields: Story = {
  name: 'Search field and form field',
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <TextInput className="w-[280px]" type="search" aria-label="Search requests" placeholder="Search requests" prefix={<IconSearch size={16} />} />
      <TextInput className="w-[280px]" label="Title" placeholder="Laptop for the design team" />
    </div>
  ),
}

export const TextAreas: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <TextArea className="w-[320px]" label="Title" placeholder="Type message here." hint={hint} counter maxLength={500} />
      <TextArea className="w-[320px]" label="Title" defaultValue="Value" error hint={hint} counter maxLength={500} />
      <TextArea className="w-[320px]" label="Title" defaultValue="Value" disabled hint={hint} />
    </div>
  ),
}

const options = ['General', 'Advance', 'Payment', 'Petty cash'].map((l) => ({ value: l, label: l, icon: <IconCircleDashed size={16} /> }))

function DropdownDemo() {
  const [one, setOne] = useState<string | null>(null)
  const [many, setMany] = useState<string[]>(['General', 'Advance'])
  return (
    <div className="flex min-h-[260px] flex-wrap items-start gap-6">
      <Dropdown className="w-[280px]" label="Title" placeholder="Select type" hint={hint} prefix={<IconCircleDashed size={16} />} options={options} value={one} onChange={setOne} />
      <Dropdown className="w-[280px]" multiple label="Title" placeholder="Select type" hint={hint} prefix={<IconCircleDashed size={16} />} options={options} value={many} onChange={setMany} />
      <Dropdown className="w-[280px]" label="Title" placeholder="Select type" error hint={hint} options={options} value={null} onChange={() => {}} />
      <Dropdown className="w-[280px]" label="Title" placeholder="Select type" disabled options={options} value={null} onChange={() => {}} />
      <Dropdown className="w-[160px]" size="sm" aria-label="Period" options={[{ value: '3m', label: 'Last 3 months' }, { value: '6m', label: 'Last 6 months' }]} value="3m" onChange={() => {}} />
    </div>
  )
}
export const Dropdowns: Story = { render: () => <DropdownDemo /> }

function CalendarDemo() {
  const [one, setOne] = useState<Date | null>(new Date(2024, 3, 7))
  const [range, setRange] = useState<DateRange>({ start: new Date(2026, 3, 9), end: new Date(2026, 3, 22) })
  return (
    <div className="flex flex-wrap items-start gap-6">
      <Calendar card value={one} onChange={setOne} />
      <Calendar card mode="range" value={range} onChange={setRange} />
    </div>
  )
}
export const Calendars: Story = { render: () => <CalendarDemo /> }
