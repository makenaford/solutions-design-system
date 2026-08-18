import type { CSSProperties, ReactNode } from 'react'
import clsx from 'clsx'
import { paragraph, type TextStyle } from '../../tokens/typography'

/**
 * Figma reference: "Solutions Library- 2026" (KihJKyGA20stc2SSjAlxYU), node 22731:39553
 * — "Icon Card/Vertical/Destop/Yes".
 *
 * The retrieved instance only exercised the "Vertical" + "Desktop" branch of what the layer
 * naming implies is a larger variant set (Vertical/Horizontal, Desktop/Mobile, plus a third
 * Yes/No axis whose meaning wasn't resolvable from a single instance). `orientation` and `size`
 * below are a best-effort modeling of the two axes that are unambiguous from the node name;
 * the horizontal layout is an inferred-but-reasonable interpretation, not something pulled
 * directly from a fetched Horizontal variant.
 */

const toTextStyle = (style: TextStyle): CSSProperties => ({
  fontFamily: style.fontFamily,
  fontSize: style.fontSize,
  fontWeight: style.fontWeight,
  lineHeight: `${style.lineHeight}px`,
  letterSpacing: `${style.letterSpacing}px`,
})

export interface IconCardProps {
  /** Icon/visual rendered in the card's icon slot. Consumer-supplied — not baked into the card. */
  icon: ReactNode
  /** Card title. */
  title: string
  /** Optional supporting copy shown under the title. */
  description?: string
  /** Layout direction: icon stacked above the text (default) or beside it. */
  orientation?: 'vertical' | 'horizontal'
  /** Sizing/width variant — desktop caps the card at 600px per the source design, mobile fills its container. */
  size?: 'desktop' | 'mobile'
  className?: string
}

export const IconCard = ({
  icon,
  title,
  description,
  orientation = 'vertical',
  size = 'desktop',
  className,
}: IconCardProps) => {
  const isHorizontal = orientation === 'horizontal'

  return (
    <div
      className={clsx(
        'group flex flex-col items-start gap-5 rounded-lg border border-components-glassLine-1 bg-surfaces-cardBgBlue p-[20px] shadow-glassCard backdrop-blur-[50px]',
        'transition-[transform,box-shadow,border-color] duration-200 ease-out',
        'hover:-translate-y-1 hover:border-brand-lighten3/60 hover:shadow-hoverLift',
        size === 'desktop' ? 'w-full max-w-[600px]' : 'w-full',
        className,
      )}
    >
      <div
        className={clsx(
          'flex w-full gap-3',
          isHorizontal ? 'flex-row items-center' : 'flex-col items-center',
        )}
      >
        <div className="flex size-12 shrink-0 items-center justify-center transition-transform duration-200 ease-out group-hover:scale-110">
          {icon}
        </div>
        <div
          className={clsx(
            'flex w-full flex-col gap-1',
            isHorizontal ? 'items-start text-left' : 'items-center text-center',
          )}
        >
          <p
            className="w-full text-surfaces-textPrimary"
            style={toTextStyle(paragraph.largeSemiBold)}
          >
            {title}
          </p>
          {description ? (
            <p
              className="w-full text-surfaces-textSecondary"
              style={toTextStyle(paragraph.base)}
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
