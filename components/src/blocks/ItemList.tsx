import type { ComponentProps, ReactNode } from 'react'

// Spec: workspace/blocks.md (Item list). Found by the Leave starter ("Your next days off") and the
// Room booking vibe test ("Coming up", "Free right now"), which both hand-built it.

/** A short list of rows inside a card, e.g. upcoming items on a home page. Put `ItemRow`s inside. */
export function ItemList({ className = '', ...rest }: ComponentProps<'ul'>) {
  return <ul className={`flex flex-col gap-1 ${className}`} {...rest} />
}

export interface ItemRowProps extends Omit<ComponentProps<'li'>, 'title' | 'onClick'> {
  /** The main line. Truncates to one line. */
  title: ReactNode
  /** One line of detail under the title, e.g. "Floor 3 · 4 seats". */
  meta?: ReactNode
  /** Before the text, e.g. a date column or an avatar. Give it its own width so rows line up. */
  leading?: ReactNode
  /** After the text: a `Badge`, or a small `Button` when the row itself isn't clickable. */
  trailing?: ReactNode
  /**
   * Makes the whole row one button that opens the item. A clickable row can't hold its own
   * buttons, so `trailing` must then be something like a badge, not a button.
   */
  onClick?: () => void
  /** Accessible name for a clickable row when the title alone doesn't say what it opens. */
  'aria-label'?: string
}

const rowLayout = 'flex w-full items-center gap-3 rounded-8 px-2 py-2 text-left'

/** One row of an `ItemList`: optional leading part, title and meta, and a trailing badge or action. */
export function ItemRow({ title, meta, leading, trailing, onClick, 'aria-label': ariaLabel, className = '', ...rest }: ItemRowProps) {
  const content = (
    <>
      {leading != null && <span className="flex shrink-0 flex-col">{leading}</span>}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex min-w-0 items-center gap-1 text-body-small-medium text-primary"><span className="truncate">{title}</span></span>
        {meta != null && <span className="text-support-caption text-tertiary">{meta}</span>}
      </span>
      {trailing != null && <span className="flex shrink-0 items-center gap-2">{trailing}</span>}
    </>
  )
  return (
    <li className={className} {...rest}>
      {onClick ? (
        <button type="button" onClick={onClick} aria-label={ariaLabel} className={`${rowLayout} hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo`}>
          {content}
        </button>
      ) : (
        <div className={rowLayout}>{content}</div>
      )}
    </li>
  )
}
