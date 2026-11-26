import { IconCalendarEvent, IconClockHour4, IconFileText, IconPlus, IconSunHigh } from '@tabler/icons-react'
import { DSBadge, DSButton, DSEmptyState, DSSectionCard, DSStatTile, DSStatTiles } from '../../src'
import { balances, formatRange, leaveTypeLabel, me, statusBadge, type LeaveRequest, type LeaveStatus } from './data'

export interface HomePageProps {
  requests: LeaveRequest[]
  today: Date
  onOpenApprovals: () => void
  onOpenMine: (status?: LeaveStatus) => void
  onOpenRequest: (id: string) => void
  onCreate: () => void
}

/** Home: what needs the person, their balance, their requests and their next days off. */
export function HomePage({ requests, today, onOpenApprovals, onOpenMine, onOpenRequest, onCreate }: HomePageProps) {
  const mine = requests.filter((r) => r.requester.id === me.id)
  const waiting = requests.filter((r) => r.requester.id !== me.id && r.status === 'pending').length
  const count = (s: LeaveStatus) => mine.filter((r) => r.status === s).length
  const upcoming = mine.filter((r) => r.end >= today && (r.status === 'pending' || r.status === 'approved')).sort((a, b) => a.start.getTime() - b.start.getTime())

  return (
    <div className="grid grid-cols-3 gap-4">
      <DSSectionCard title="Waiting for you" icon={<IconClockHour4 size={14} />} color="peach">
        <DSStatTiles>
          <DSStatTile variant="highlight" value={waiting} label="Requests from your team" onClick={onOpenApprovals} />
        </DSStatTiles>
      </DSSectionCard>

      <DSSectionCard className="col-span-2" title="Leave left this year" icon={<IconSunHigh size={14} />} color="sun">
        <DSStatTiles>
          {balances.map((b) => (
            <DSStatTile key={b.type} value={b.left} label={`${leaveTypeLabel(b.type)} · of ${b.of} days`} />
          ))}
        </DSStatTiles>
      </DSSectionCard>

      <DSSectionCard className="col-span-2" title="Your requests" icon={<IconFileText size={14} />} color="ocean" action={<DSButton hierarchy="ghost" size="sm" onClick={() => onOpenMine()}>See all</DSButton>}>
        <DSStatTiles>
          <DSStatTile value={count('pending')} label="Waiting for approval" tone="info" onClick={() => onOpenMine('pending')} />
          <DSStatTile value={count('approved')} label="Approved" tone="success" onClick={() => onOpenMine('approved')} />
          <DSStatTile value={count('rejected')} label="Rejected" tone="danger" onClick={() => onOpenMine('rejected')} />
        </DSStatTiles>
      </DSSectionCard>

      <DSSectionCard title="Your next days off" icon={<IconCalendarEvent size={14} />} color="emerald">
        {upcoming.length === 0 ? (
          <DSEmptyState className="py-4" title="Nothing booked" description="Approved leave shows here." action={<DSButton hierarchy="outline" size="sm" prefixIcon={<IconPlus size={14} />} onClick={onCreate}>Request leave</DSButton>} />
        ) : (
          <ul className="flex flex-col gap-1">
            {upcoming.map((r) => (
              <li key={r.id}>
                <button type="button" onClick={() => onOpenRequest(r.id)} className="flex w-full items-center gap-3 rounded-8 px-2 py-2 text-left hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-accent-indigo">
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-body-small-medium text-primary">{leaveTypeLabel(r.type)}</span>
                    <span className="text-support-caption text-tertiary">{formatRange(r.start, r.end)} · {r.days} {r.days === 1 ? 'day' : 'days'}</span>
                  </span>
                  <DSBadge state={statusBadge[r.status][0]}>{statusBadge[r.status][1]}</DSBadge>
                </button>
              </li>
            ))}
          </ul>
        )}
      </DSSectionCard>
    </div>
  )
}
