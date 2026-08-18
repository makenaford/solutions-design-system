import clsx from 'clsx'
import { paragraph, smallCaps } from '../../tokens/typography'

export interface TableOfContentsEntry {
  /** Anchor id (without the leading "#") this entry links/scrolls to. */
  id: string
  label: string
  /** Nesting depth, 1-indexed. Entries with level > 1 are indented. Defaults to 1. */
  level?: number
}

export interface TableOfContentsProps {
  items: TableOfContentsEntry[]
  /** Id of the currently active/in-view section, highlighted per the Figma "Active" item state. */
  activeId?: string
  /** Called with an entry's id when its link is clicked. */
  onItemClick?: (id: string) => void
  /** Small-caps section heading above the list. Defaults to "Outline". */
  heading?: string
  className?: string
}

export function TableOfContents({ items, activeId, onItemClick, heading = 'Outline', className }: TableOfContentsProps) {
  return (
    <nav aria-label={heading} className={clsx('flex w-[200px] max-w-[240px] flex-col gap-5', className)}>
      <span
        className="w-full uppercase text-surfaces-textSecondary"
        style={{
          fontFamily: smallCaps.default.fontFamily,
          fontSize: smallCaps.default.fontSize,
          fontWeight: smallCaps.default.fontWeight,
          lineHeight: `${smallCaps.default.lineHeight}px`,
          letterSpacing: smallCaps.default.letterSpacing,
        }}
      >
        {heading}
      </span>

      <ul className="flex w-full flex-col items-start">
        {items.map((item) => {
          const isActive = item.id === activeId
          const textStyle = isActive ? paragraph.smallSemiBold : paragraph.small
          const level = item.level ?? 1

          return (
            <li key={item.id} className="flex w-full items-stretch gap-4">
              <span
                aria-hidden="true"
                className={clsx(
                  'min-h-[56px] shrink-0 self-stretch rounded-md transition-[width,background-color] duration-200 ease-out',
                  isActive ? 'w-[3px] bg-brand-primary' : 'w-px bg-surfaces-divider'
                )}
              />
              <a
                href={`#${item.id}`}
                onClick={() => onItemClick?.(item.id)}
                aria-current={isActive ? 'true' : undefined}
                style={{
                  fontFamily: textStyle.fontFamily,
                  fontSize: textStyle.fontSize,
                  fontWeight: textStyle.fontWeight,
                  lineHeight: `${textStyle.lineHeight}px`,
                  letterSpacing: textStyle.letterSpacing,
                  marginLeft: level > 1 ? `${(level - 1) * 12}px` : undefined,
                }}
                className={clsx(
                  'flex-1 rounded-default py-4 transition-[color,background-color] duration-150',
                  isActive
                    ? 'text-surfaces-textPrimary'
                    : 'text-surfaces-textSecondary hover:bg-surfaces-overlayHover hover:text-surfaces-textPrimary'
                )}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
