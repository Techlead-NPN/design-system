import { Fragment } from 'react'
import type { ReactNode } from 'react'

export interface BreadcrumbItem {
  label: ReactNode
  /** Where the level links to. The last item is the current page and never links. */
  href?: string
  onClick?: () => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /** 16px leading icon (a home icon by default in the design). */
  icon?: ReactNode
  className?: string
}

// Spec: projects/portal2.0/components/breadcrumb.md
export function Breadcrumb({ items, icon, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex h-6 items-center gap-1 whitespace-nowrap text-body-small-regular">
        {icon != null && <li className="flex shrink-0 text-tertiary" aria-hidden="true">{icon}</li>}
        {items.map((item, i) => {
          const current = i === items.length - 1
          const tone = current ? 'text-primary' : 'text-tertiary'
          return (
            <Fragment key={i}>
              {i > 0 && <li aria-hidden="true" className={tone}>/</li>}
              <li className={`min-w-0 ${tone}`}>
                {current ? (
                  <span aria-current="page" className="block truncate">{item.label}</span>
                ) : (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    className="block truncate rounded-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
