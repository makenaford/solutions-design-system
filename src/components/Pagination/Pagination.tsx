import { useMemo } from 'react'
import clsx from 'clsx'
import { action as actionText } from '../../tokens/typography'

/**
 * Previous/Next arrow icons reproduced from the Figma "Link" component's
 * documented arrow/arrow_left and arrow/arrow_right assets (the component
 * library's Pagination page is built from these Link icons). Raw assets
 * preserved at ./assets/arrow-left.svg and ./assets/arrow-right.svg.
 */
function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  const d =
    direction === 'left'
      ? 'M1.40674 6.40685H16.4067M6.40685 12.0637L0.75 6.40685L6.40685 0.75'
      : 'M0.75 6.40685H15.75M10.7499 12.0637L16.4067 6.40685L10.7499 0.75'

  return (
    <svg width="17" height="13" viewBox="0 0 17.1567 12.8137" fill="none" aria-hidden="true" className="shrink-0">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type PageEntry = number | 'ellipsis'

function getPageRange(page: number, totalPages: number, siblingCount: number): PageEntry[] {
  const totalNumbers = siblingCount * 2 + 5

  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(page - siblingCount, 1)
  const rightSibling = Math.min(page + siblingCount, totalPages)
  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < totalPages - 1

  const range: PageEntry[] = [1]
  if (showLeftEllipsis) range.push('ellipsis')
  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== totalPages) range.push(i)
  }
  if (showRightEllipsis) range.push('ellipsis')
  if (totalPages !== 1) range.push(totalPages)

  return range
}

export interface PaginationProps {
  /** Current 1-indexed page. */
  page: number
  /** Total number of pages. */
  totalPages: number
  /** Called with the requested page when the user changes page. */
  onPageChange: (page: number) => void
  /** Number of page numbers shown on either side of the current page before collapsing into an ellipsis. */
  siblingCount?: number
  className?: string
}

export function Pagination({ page, totalPages, onPageChange, siblingCount = 1, className }: PaginationProps) {
  const pages = useMemo(() => getPageRange(page, totalPages, siblingCount), [page, totalPages, siblingCount])

  return (
    <nav aria-label="Pagination" className={clsx('flex items-center gap-1', className)}>
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={clsx(
          'flex size-9 items-center justify-center rounded-default text-surfaces-textSecondary transition-colors',
          'hover:text-action-linkHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
          'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-surfaces-textSecondary'
        )}
      >
        <ArrowIcon direction="left" />
      </button>

      <ul className="flex items-center gap-1">
        {pages.map((entry, index) =>
          entry === 'ellipsis' ? (
            <li key={`ellipsis-${index}`} className="flex size-9 items-center justify-center text-surfaces-textSecondary" aria-hidden="true">
              &hellip;
            </li>
          ) : (
            <li key={entry}>
              <button
                type="button"
                aria-label={`Page ${entry}`}
                aria-current={entry === page ? 'page' : undefined}
                onClick={() => onPageChange(entry)}
                className={clsx(
                  'flex size-9 items-center justify-center rounded-default transition-colors',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
                  entry === page
                    ? 'bg-brand-primary text-action-neutralInverted'
                    : 'text-action-linkDefault hover:text-action-linkHover'
                )}
                style={{
                  fontFamily: (entry === page ? actionText.linkMediumActive : actionText.linkMedium).fontFamily,
                  fontSize: (entry === page ? actionText.linkMediumActive : actionText.linkMedium).fontSize,
                  fontWeight: (entry === page ? actionText.linkMediumActive : actionText.linkMedium).fontWeight,
                  lineHeight: `${(entry === page ? actionText.linkMediumActive : actionText.linkMedium).lineHeight}px`,
                }}
              >
                {entry}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className={clsx(
          'flex size-9 items-center justify-center rounded-default text-surfaces-textSecondary transition-colors',
          'hover:text-action-linkHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
          'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-surfaces-textSecondary'
        )}
      >
        <ArrowIcon direction="right" />
      </button>
    </nav>
  )
}
