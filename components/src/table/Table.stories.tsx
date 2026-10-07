import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconCircleDashed } from '@tabler/icons-react'
import { Table, TableCell, TableHeaderCell, TableRow, TableSelectCell } from './Table'
import { Checkbox } from '../selection/Checkbox'
import { Badge } from '../badge/Badge'
import { Loading } from '../layout/Loading'
import { ScrollArea } from '../layout/ScrollArea'
import { Divider } from '../divider/Divider'

const meta = { title: 'Data/Table, Scroll area and Divider', component: Table } satisfies Meta<typeof Table>
export default meta
type Story = StoryObj<typeof meta>

export const DataTable: Story = {
  render: () => (
    <ScrollArea className="max-h-[240px] w-[640px]">
      <Table>
        <thead>
          <tr>
            <TableSelectCell header><Checkbox size={14} aria-label="Select all" /></TableSelectCell>
            <TableHeaderCell icon={<IconCircleDashed size={14} />} onSort={() => {}}>Request</TableHeaderCell>
            <TableHeaderCell icon={<IconCircleDashed size={14} />} active onSort={() => {}}>Requested by</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
            <TableRow key={n} selected={n === 1}>
              <TableSelectCell><Checkbox size={14} defaultChecked={n === 1} aria-label="Select row" /></TableSelectCell>
              <TableCell>TL-GR-2601000{n}</TableCell>
              <TableCell readOnly>Onpailin Sanitya</TableCell>
              <TableCell>{n === 3 ? <Loading className="w-24" /> : <Badge state={n % 2 ? 'success' : 'info'}>{n % 2 ? 'Approved' : 'Draft'}</Badge>}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  ),
}

export const Dividers: Story = {
  render: () => (
    <div className="flex flex-col gap-6 text-body-mini-regular text-tertiary">
      <div className="flex w-[300px] flex-col">
        none<Divider />regular<Divider spacing="regular" />spacious<Divider spacing="spacious" />end
      </div>
      <div className="flex h-6 items-center">
        none<Divider direction="vertical" />regular<Divider direction="vertical" spacing="regular" />spacious<Divider direction="vertical" spacing="spacious" />end
      </div>
    </div>
  ),
}
