import { forwardRef, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import { paragraph } from '../../tokens/typography'

export type SearchSize = 'default' | 'large'

/**
 * Magnifying-glass glyph reproduced from the Figma file's "search" icon
 * asset (found on the Dropdown component's Search variant — the two nodes
 * handed off for this task, 16478:3770 and 22668:24377, both turned out to
 * be mislabeled "Search" but actually contain a Carousel/Call-to-Action
 * section; see the task report for details). Raw asset preserved at
 * ./assets/search.svg.
 */
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M14.7556 16L9.15556 10.4C8.71111 10.7556 8.2 11.037 7.62222 11.2444C7.04444 11.4519 6.42963 11.5556 5.77778 11.5556C4.16296 11.5556 2.7963 10.9963 1.67778 9.87778C0.559259 8.75926 0 7.39259 0 5.77778C0 4.16296 0.559259 2.7963 1.67778 1.67778C2.7963 0.559259 4.16296 0 5.77778 0C7.39259 0 8.75926 0.559259 9.87778 1.67778C10.9963 2.7963 11.5556 4.16296 11.5556 5.77778C11.5556 6.42963 11.4519 7.04444 11.2444 7.62222C11.037 8.2 10.7556 8.71111 10.4 9.15556L16 14.7556L14.7556 16ZM5.77778 9.77778C6.88889 9.77778 7.83333 9.38889 8.61111 8.61111C9.38889 7.83333 9.77778 6.88889 9.77778 5.77778C9.77778 4.66667 9.38889 3.72222 8.61111 2.94444C7.83333 2.16667 6.88889 1.77778 5.77778 1.77778C4.66667 1.77778 3.72222 2.16667 2.94444 2.94444C2.16667 3.72222 1.77778 4.66667 1.77778 5.77778C1.77778 6.88889 2.16667 7.83333 2.94444 8.61111C3.72222 9.38889 4.66667 9.77778 5.77778 9.77778Z"
        fill="currentColor"
      />
    </svg>
  )
}

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Matches the Figma "Condensed" sizing convention shared with Input (True -> `default`, False -> `large`). */
  size?: SearchSize
  /** Renders a trailing clear ("x") button once the field has a value; called when it's pressed. */
  onClear?: () => void
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  { size = 'default', onClear, disabled, className, placeholder = 'Search', value, defaultValue, onChange, ...rest },
  forwardedRef
) {
  const isLarge = size === 'large'
  const textStyle = isLarge ? paragraph.base : paragraph.default
  const [uncontrolledHasValue, setUncontrolledHasValue] = useState(Boolean(defaultValue))
  const isControlled = value !== undefined
  const hasValue = isControlled ? String(value).length > 0 : uncontrolledHasValue
  const showClear = Boolean(onClear) && hasValue

  return (
    <div className={clsx('relative flex w-full items-center', className)}>
      <span className="pointer-events-none absolute left-4 flex size-4 shrink-0 items-center justify-center text-surfaces-textSecondary">
        <SearchIcon className="size-full" />
      </span>

      <input
        ref={forwardedRef}
        type="search"
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={(event) => {
          setUncontrolledHasValue(event.target.value.length > 0)
          onChange?.(event)
        }}
        className={clsx(
          'w-full rounded-lg border bg-transparent pl-9 text-surfaces-textPrimary outline-none transition-colors placeholder:text-surfaces-textSecondary [&::-webkit-search-cancel-button]:appearance-none',
          'py-4',
          onClear ? 'pr-9' : 'pr-5',
          disabled ? 'cursor-not-allowed border-neutral-4 opacity-50' : 'border-neutral-4 hover:border-base-neutral-6',
          'focus:border-action-primaryActive'
        )}
        style={{
          fontFamily: textStyle.fontFamily,
          fontSize: textStyle.fontSize,
          fontWeight: textStyle.fontWeight,
          lineHeight: `${textStyle.lineHeight}px`,
        }}
        {...rest}
      />

      {onClear && showClear && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={onClear}
          className="absolute right-3 flex size-4 shrink-0 items-center justify-center rounded-full text-surfaces-textSecondary transition-colors hover:text-surfaces-textPrimary"
        >
          <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="size-3">
            <path d="M1.5 1.5L10.5 10.5M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
})
