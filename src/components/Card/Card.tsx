import type { CSSProperties, ReactNode } from 'react'
import clsx from 'clsx'
import { paragraph, type TextStyle } from '../../tokens/typography'

export type CardAlign = 'vertical' | 'horizontal'

export interface CardProps {
  /** Layout axis from the Figma "Align" variant — content stacked (vertical) or beside the image (horizontal). */
  align?: CardAlign
  /**
   * Matches the Figma "Padding" variant. `true` (default) renders the card as a self-contained
   * glass surface (border, background, shadow, blur, padding) — use this most of the time.
   * `false` renders bare content with no surface or padding, for embedding inside a container
   * that already provides its own border/background (e.g. a "Special Card" composition).
   */
  padding?: boolean
  /** Image/visual slot, e.g. a thumbnail or illustration. Rendered in a 3:2 rounded frame. Omit to hide (Figma "Show Image"). */
  image?: ReactNode
  /** Icon slot in the card header, in a 48x48 box (matches the Figma "card-icon" glass/medium size). */
  icon?: ReactNode
  /** Card title. */
  title: string
  /** Optional supporting copy under the title. */
  description?: string
  /** Slot above the header (Figma "Top Content"). */
  topContent?: ReactNode
  /** First slot below the header (Figma "Main Content 1") — e.g. a stat, list, or progress bar. */
  mainContent1?: ReactNode
  /** Second slot below the header (Figma "Main Content 2"). */
  mainContent2?: ReactNode
  /** Slot at the end of the card (Figma "Bottom Content") — e.g. a button or link row. */
  bottomContent?: ReactNode
  className?: string
}

const toTextStyle = (style: TextStyle): CSSProperties => ({
  fontFamily: style.fontFamily,
  fontSize: style.fontSize,
  fontWeight: style.fontWeight,
  lineHeight: `${style.lineHeight}px`,
  letterSpacing: style.letterSpacing,
})

/**
 * Card — Figma "card-main" (node `16728:26513`), the base component behind every card layout in
 * the library. Its three fetched variants (Align=Vertical/Padding=True, Align=Horizontal/
 * Padding=True, Align=Vertical/Padding=False) share one content structure — image, optional top
 * content, a header (icon + title + description), up to two main-content slots, and bottom
 * content — which this component models directly as props/slots rather than as a fixed layout.
 *
 * The "Special Cards" shown alongside card-main in Figma (Resource, CS-Stat, CS-Details, CS-Quote,
 * Icon-Center, Quick Link, Icon-Left, Stat Highlight) are all this same component composed with
 * different slot content — see the Storybook stories for examples of each, built from this Card.
 */
export function Card({
  align = 'vertical',
  padding = true,
  image,
  icon,
  title,
  description,
  topContent,
  mainContent1,
  mainContent2,
  bottomContent,
  className,
}: CardProps) {
  const isHorizontal = align === 'horizontal'

  const header = (
    <div className="flex w-full flex-col items-start gap-3">
      {icon && <div className="flex size-[48px] shrink-0 items-center justify-center">{icon}</div>}
      <div className="flex w-full flex-col items-start gap-1">
        <p className="w-full text-surfaces-textPrimary" style={toTextStyle(paragraph.largeSemiBold)}>
          {title}
        </p>
        {description && (
          <p className="w-full text-surfaces-textSecondary" style={toTextStyle(paragraph.default)}>
            {description}
          </p>
        )}
      </div>
    </div>
  )

  const imageSlot = image && (
    <div className="aspect-[3/2] w-full shrink-0 overflow-hidden rounded-lg border border-[rgba(111,160,255,0.2)]">
      {image}
    </div>
  )

  // card-header + the two main-content slots share a tighter gap than the rest of the card, so
  // they read as one text block regardless of whether the outer card renders with padding.
  const contentGroup = (
    <div className="flex w-full flex-col items-start gap-large">
      {header}
      {mainContent1 && <div className="w-full">{mainContent1}</div>}
      {mainContent2 && <div className="w-full">{mainContent2}</div>}
    </div>
  )

  if (isHorizontal) {
    return (
      <div
        className={clsx(
          'flex items-center gap-[24px]',
          padding &&
            'rounded-lg border border-components-glassLine-1 bg-surfaces-cardBgBlue p-[40px] shadow-glassCard backdrop-blur-[100px]',
          className
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col items-start gap-[10px]">
          {topContent && <div className="w-full">{topContent}</div>}
          {header}
          {mainContent1 && <div className="w-full">{mainContent1}</div>}
          {mainContent2 && <div className="w-full">{mainContent2}</div>}
          {bottomContent && <div className="w-full pt-large">{bottomContent}</div>}
        </div>
        {imageSlot && <div className="min-w-0 flex-1">{imageSlot}</div>}
      </div>
    )
  }

  return (
    <div
      className={clsx(
        'flex flex-col items-start',
        padding ? 'gap-[20px]' : 'gap-large',
        padding &&
          'rounded-lg border border-components-glassLine-1 bg-surfaces-cardBgBlue p-[20px] shadow-glassCard backdrop-blur-[100px]',
        className
      )}
    >
      {imageSlot}
      {topContent && <div className="w-full">{topContent}</div>}
      {contentGroup}
      {bottomContent && <div className="w-full">{bottomContent}</div>}
    </div>
  )
}
