import { useEffect, useState } from 'react'
import { IconClipboardList, IconHome, IconPlus, IconStack2 } from '@tabler/icons-react'
import {
  DSApprovalDialog, DSButton, DSConfirmationDialog, DSOverlay, DSToast, DSWorkspaceShell,
  type DSNavGroup, type DSWorkspaceApp,
} from '../../src'
import hrIcon from '../../src/workspace/assets/app-hr-tools.svg'
import procureIcon from '../../src/workspace/assets/app-procureapp.svg'
import itsmIcon from '../../src/workspace/assets/app-itsm.svg'
import { decide, initialRequests, leaveTypeLabel, me, approvalFlow, type LeaveRequest, type LeaveStatus } from './data'
import { HomePage } from './HomePage'
import { RequestsPage } from './RequestsPage'
import { RequestForm, type NewLeave } from './RequestForm'

// The Leave starter app: one internal app built only from the design system package.
// Copy this folder to start a new app. In your app, import from '@techlead-npn/design-system'
// instead of '../../src', and replace the router and data below with your own.

const leave: DSWorkspaceApp = { id: 'leave', name: 'Leave', icon: hrIcon }
const apps: DSWorkspaceApp[] = [leave, { id: 'procure', name: 'ProcureApp', icon: procureIcon }, { id: 'itsm', name: 'ITSM', icon: itsmIcon }]

type Page = 'home' | 'mine' | 'approvals' | 'new'
const titles: Record<Page, string> = { home: 'Home', mine: 'My requests', approvals: 'Waiting for me', new: 'Request leave' }

/**
 * The rail opens expanded the first time, then remembers the person's choice. The key is shared
 * by every workspace app, so the choice follows the person between apps on the same site; apps on
 * separate sites save it in the person's profile instead.
 */
const RAIL_KEY = 'workspace.railExpanded'
const savedRail = () => {
  try { return localStorage.getItem(RAIL_KEY) !== 'false' } catch { return true }
}

/** Fixed so the sample data stays current. A real app uses `new Date()`. */
const today = new Date(2026, 10, 26)
const now = () => '26/11/2026 ' + new Date().toTimeString().slice(0, 5)

export function LeaveApp() {
  const [page, setPage] = useState<Page>('home')
  const [railExpanded, setRailExpanded] = useState(savedRail)
  const [requests, setRequests] = useState(initialRequests)
  const [status, setStatus] = useState<LeaveStatus | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const [deciding, setDeciding] = useState<{ request: LeaveRequest; decision: 'approve' | 'reject' } | null>(null)
  const [cancelling, setCancelling] = useState<LeaveRequest | null>(null)
  const [toast, setToast] = useState<{ status: 'success' | 'info'; title: string; description?: string } | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(t)
  }, [toast])

  const mine = requests.filter((r) => r.requester.id === me.id)
  const team = requests.filter((r) => r.requester.id !== me.id)
  const go = (p: Page, opts: { status?: LeaveStatus | 'all'; openId?: string | null } = {}) => {
    setPage(p)
    setStatus(opts.status ?? 'all')
    setOpenId(opts.openId ?? null)
  }
  const update = (id: string, change: (r: LeaveRequest) => LeaveRequest) => setRequests((rs) => rs.map((r) => (r.id === id ? change(r) : r)))

  const nav: DSNavGroup[] = [
    { id: 'main', items: [
      { id: 'home', label: 'Home', icon: <IconHome /> },
      { id: 'mine', label: 'My requests', icon: <IconStack2 />, count: mine.filter((r) => r.status === 'pending').length || undefined },
      { id: 'approvals', label: 'Waiting for me', icon: <IconClipboardList />, count: team.filter((r) => r.status === 'pending').length || undefined },
    ] },
  ]

  const submit = (l: NewLeave) => {
    const id = `LV-2026-${String(32 + requests.length - initialRequests.length).padStart(4, '0')}`
    const submitted = now()
    setRequests((rs) => [{ id, ...l, requester: me, status: 'pending', submitted, steps: approvalFlow(me, submitted) }, ...rs])
    go('mine', { openId: id })
    setToast({ status: 'success', title: 'Request sent', description: `${id} is waiting for your manager.` })
  }

  return (
    <>
      <DSWorkspaceShell
        layout="rail"
        railExpanded={railExpanded}
        onRailExpandedChange={(open) => {
          setRailExpanded(open)
          try { localStorage.setItem(RAIL_KEY, String(open)) } catch { /* private mode: keep it for this visit */ }
        }}
        apps={apps}
        app={leave}
        onOpenApp={() => {}}
        onOpenLauncher={() => {}}
        nav={nav}
        currentNavId={page === 'new' ? undefined : page}
        onNavigate={(item) => go(item.id as Page)}
        title={titles[page]}
        subtitle={page === 'home' ? `Good morning, ${me.name.split(' ')[0]}` : page === 'approvals' ? 'Leave requests from your team' : undefined}
        primaryAction={page === 'new' ? undefined : <DSButton accent="blue" prefixIcon={<IconPlus size={16} />} onClick={() => go('new')}>Request leave</DSButton>}
        onSearch={() => {}}
        notifications={{ count: team.filter((r) => r.status === 'pending').length, onClick: () => go('approvals', { status: 'pending' }) }}
        user={{ name: me.name, initials: me.initials }}
        onHelp={() => {}}
      >
        {page === 'home' && (
          <HomePage
            requests={requests}
            today={today}
            onOpenApprovals={() => go('approvals', { status: 'pending' })}
            onOpenMine={(s) => go('mine', { status: s })}
            onOpenRequest={(id) => go('mine', { openId: id })}
            onCreate={() => go('new')}
          />
        )}
        {(page === 'mine' || page === 'approvals') && (
          <RequestsPage
            key={page}
            mode={page}
            requests={page === 'mine' ? mine : team}
            status={status}
            onStatusChange={setStatus}
            openId={openId}
            onOpen={setOpenId}
            onDecide={(request, decision) => setDeciding({ request, decision })}
            onCancelRequest={setCancelling}
            onCreate={() => go('new')}
          />
        )}
        {page === 'new' && <RequestForm today={today} onSubmit={submit} onCancel={() => go('home')} />}
      </DSWorkspaceShell>

      {deciding && (
        <DSOverlay onClose={() => setDeciding(null)}>
          <DSApprovalDialog
            decision={deciding.decision}
            subject={`${deciding.request.id}, ${deciding.request.requester.name}`}
            onCancel={() => setDeciding(null)}
            onConfirm={(comment) => {
              const { request, decision } = deciding
              update(request.id, (r) => ({ ...r, status: decision === 'approve' ? 'approved' : 'rejected', steps: decide(r.steps, decision, comment, now()) }))
              setDeciding(null)
              setToast({ status: 'success', title: decision === 'approve' ? 'Approved' : 'Rejected', description: `${request.requester.name} has been told.` })
            }}
          />
        </DSOverlay>
      )}

      {cancelling && (
        <DSOverlay onClose={() => setCancelling(null)}>
          <DSConfirmationDialog
            destructive
            title="Cancel this request?"
            description={`${leaveTypeLabel(cancelling.type)}, ${cancelling.id}. Your manager won't need to approve it any more.`}
            confirmLabel="Cancel request"
            cancelLabel="Keep it"
            onCancel={() => setCancelling(null)}
            onConfirm={() => {
              update(cancelling.id, (r) => ({ ...r, status: 'cancelled', steps: r.steps.map((s) => (s.id === 'req' ? s : { ...s, status: 'waiting', statusLabel: 'Not needed' })) }))
              setCancelling(null)
              setToast({ status: 'info', title: 'Request cancelled' })
            }}
          />
        </DSOverlay>
      )}

      {toast && <DSToast className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2" status={toast.status} title={toast.title} description={toast.description} onClose={() => setToast(null)} />}
    </>
  )
}
