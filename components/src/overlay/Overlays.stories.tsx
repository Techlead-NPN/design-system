import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button/Button'
import { BottomSheet, ConfirmationDialog, ContentDialog, Overlay } from './Dialog'
import { Tooltip } from '../tooltip/Tooltip'

const meta = { title: 'Overlays/Dialog, Bottom sheet and Tooltip', component: ConfirmationDialog } satisfies Meta<typeof ConfirmationDialog>
export default meta
type Story = StoryObj

const actions = <><Button hierarchy="outline">Button</Button><Button accent="blue">Button</Button></>
const slot = <div className="flex h-40 items-center justify-center rounded-8 bg-secondary text-body-small-regular text-tertiary">Content</div>

export const ConfirmationDialogs: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6 rounded-8 bg-secondary p-6">
      <ConfirmationDialog title="Title" description="Subparagraph" confirmLabel="Button" cancelLabel="Button" onConfirm={() => {}} onCancel={() => {}} />
      <ConfirmationDialog destructive title="Delete request?" description="This can't be undone." confirmLabel="Delete" cancelLabel="Cancel" onConfirm={() => {}} onCancel={() => {}} />
    </div>
  ),
}

export const ContentDialogs: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6 rounded-8 bg-secondary p-6">
      <ContentDialog size="sm" title="Small" onClose={() => {}} actions={actions}>{slot}</ContentDialog>
      <ContentDialog size="md" title="Medium" onClose={() => {}} actions={actions}>{slot}</ContentDialog>
      <ContentDialog size="lg" title="Large" onClose={() => {}} actions={actions}>{slot}</ContentDialog>
    </div>
  ),
}

function InOverlay() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button accent="blue" onClick={() => setOpen(true)}>Open dialog</Button>
      {open && (
        <Overlay onClose={() => setOpen(false)}>
          <ConfirmationDialog title="Title" description="Click outside or press Escape to close." confirmLabel="Confirm" cancelLabel="Cancel" onConfirm={() => setOpen(false)} onCancel={() => setOpen(false)} />
        </Overlay>
      )}
    </>
  )
}
export const OnTheOverlay: Story = { render: () => <InOverlay /> }

export const BottomSheets: Story = {
  render: () => (
    <div className="flex items-end gap-6 rounded-8 bg-secondary p-6">
      <div className="w-[390px]"><BottomSheet title="Title" actions={actions}>{slot}</BottomSheet></div>
      <div className="w-[390px]"><BottomSheet title="Title" detail="Detail" actions={actions}>{slot}</BottomSheet></div>
    </div>
  ),
}

export const Tooltips: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right', 'left', 'right'] as const).map((p) => (
        <Tooltip key={p} pointer={p} title={p}>This is a single line tooltip with no wrapping text and</Tooltip>
      ))}
    </div>
  ),
}
