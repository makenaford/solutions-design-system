import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import { paragraph } from '../../tokens/typography'

/**
 * Chevron icon reproduced from the Figma asset (Accordion / UI Icon).
 * The source vector is a corner path; rotating it -135deg forms a
 * downward chevron, and a further 180deg (net +45deg) flips it to point
 * up, matching the Figma interaction exactly.
 * Raw asset preserved at ./assets/chevron.svg for reference.
 */
function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 12.1667 12.1667"
      fill="none"
      aria-hidden="true"
      className={clsx(
        'shrink-0 transition-transform duration-150',
        expanded ? 'rotate-[45deg] text-brand-primaryActive' : '-rotate-[135deg] text-neutral-8'
      )}
    >
      <path
        d="M0.75 11.4167L0.75 0.75L11.4167 0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export interface AccordionItem {
  /** Stable identifier used for open-state tracking. */
  id: string
  /** Header label/content shown in the clickable row. */
  header: ReactNode
  /** Body content revealed when the item is expanded. */
  content: ReactNode
  /** Disables interaction for this item. */
  disabled?: boolean
}

export interface AccordionProps {
  /** The accordion's items, in display order. */
  items: AccordionItem[]
  /**
   * When true, more than one item may be open at a time.
   * When false (default), opening an item closes any other open item.
   */
  allowMultiple?: boolean
  /** Controlled open item ids. Pass together with `onOpenChange`. */
  openItems?: string[]
  /** Uncontrolled initial open item ids. Ignored if `openItems` is provided. */
  defaultOpenItems?: string[]
  /** Called with the next set of open item ids whenever the open state changes. */
  onOpenChange?: (openItems: string[]) => void
  className?: string
}

export function Accordion({
  items,
  allowMultiple = false,
  openItems,
  defaultOpenItems = [],
  onOpenChange,
  className,
}: AccordionProps) {
  const [internalOpenItems, setInternalOpenItems] = useState<string[]>(defaultOpenItems)
  const isControlled = openItems !== undefined
  const openIds = isControlled ? openItems : internalOpenItems
  const baseId = useId()

  function toggle(id: string) {
    const isOpen = openIds.includes(id)
    const next = allowMultiple
      ? isOpen
        ? openIds.filter((openId) => openId !== id)
        : [...openIds, id]
      : isOpen
        ? []
        : [id]

    if (!isControlled) setInternalOpenItems(next)
    onOpenChange?.(next)
  }

  return (
    <div className={clsx('flex w-full flex-col', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id)
        const headerId = `${baseId}-header-${item.id}`
        const panelId = `${baseId}-panel-${item.id}`

        return (
          <div key={item.id} className="flex w-full flex-col">
            <button
              type="button"
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={item.disabled}
              onClick={() => toggle(item.id)}
              className={clsx(
                'flex w-full items-center gap-5 rounded-default py-4 text-left transition-colors',
                'hover:bg-neutral-1/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
                item.disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              <span
                className="flex-1 text-surfaces-textPrimary"
                style={{
                  fontFamily: paragraph.largeSemiBold.fontFamily,
                  fontSize: paragraph.largeSemiBold.fontSize,
                  fontWeight: paragraph.largeSemiBold.fontWeight,
                  lineHeight: `${paragraph.largeSemiBold.lineHeight}px`,
                  letterSpacing: paragraph.largeSemiBold.letterSpacing,
                }}
              >
                {item.header}
              </span>
              <ChevronIcon expanded={isOpen} />
            </button>

            <div className={clsx('h-px w-full shrink-0', isOpen ? 'bg-neutral-2/50' : 'bg-neutral-2')} aria-hidden="true" />

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className="flex w-full flex-col items-start py-5 text-surfaces-textSecondary"
                style={{
                  fontFamily: paragraph.default.fontFamily,
                  fontSize: paragraph.default.fontSize,
                  fontWeight: paragraph.default.fontWeight,
                  lineHeight: `${paragraph.default.lineHeight}px`,
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
