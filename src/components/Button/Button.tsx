import * as React from 'react'
import clsx from 'clsx'
import { action, neutral } from '../../tokens/colors'

export type ButtonColor = 'primary' | 'neutral'
export type ButtonVariant = 'solid' | 'outline' | 'rounded'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color axis from the Figma "Color" variant property. Neutral is only designed for the `solid` style. */
  color?: ButtonColor
  /** Shape/fill axis from the Figma "Style" variant property (Solid / Outline / Rounded). */
  variant?: ButtonVariant
  size?: ButtonSize
  /** Icon rendered before the label, in a 20x20 slot. */
  iconLeft?: React.ReactNode
  /** Icon rendered after the label, in a 20x20 slot. */
  iconRight?: React.ReactNode
}

// The Figma source uses a ~225deg diagonal gradient with the same two stops for every
// filled (solid/rounded) button. Expressed as an inline style because arbitrary
// multi-stop gradients don't map cleanly onto a Tailwind utility class name.
const GRADIENT_ANGLE = '224.78deg'

const solidGradient: Record<ButtonColor, string> = {
  primary: `linear-gradient(${GRADIENT_ANGLE}, ${action.primaryHover} 37.232%, ${action.primaryDefault} 63.409%)`,
  neutral: `linear-gradient(${GRADIENT_ANGLE}, ${neutral[4]} 37.232%, ${neutral[3]} 63.409%)`,
}

const sizeClasses: Record<ButtonSize, string> = {
  large: 'gap-3 px-[18px] py-[14px] text-[21px] leading-[28px]',
  medium: 'gap-3 px-5 py-4 text-[18px] leading-[24px]',
  small: 'gap-1 px-4 py-[10px] text-[14px] leading-[20px]',
}

const radiusClasses: Record<ButtonSize, string> = {
  large: 'rounded-lg',
  medium: 'rounded-lg',
  small: 'rounded-md',
}

const iconSlotClasses = 'flex size-[20px] shrink-0 items-center justify-center transition-transform duration-200 ease-out'

/**
 * Button — Figma node 22664:20974 ("Button" component set).
 *
 * Variant axes modeled as props: `color` (Primary/Neutral), `variant` (Solid/Outline/Rounded),
 * `size` (Small/Medium/Large). The Figma "State" axis (Default/Hover/Focus/Pressed/Disabled) is
 * implemented with pseudo-class Tailwind modifiers instead of props, except for `disabled`, which
 * is a real native attribute.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { color = 'primary', variant = 'solid', size = 'large', iconLeft, iconRight, className, style, disabled, type, children, ...props },
  ref
) {
  const isOutline = variant === 'outline'
  const isPill = variant === 'rounded'

  const backgroundStyle: React.CSSProperties = isOutline ? {} : { backgroundImage: solidGradient[color] }

  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      disabled={disabled}
      className={clsx(
        'group inline-flex items-center justify-center whitespace-nowrap font-sans font-semibold',
        'transition-[background-image,border-color,box-shadow,transform,opacity] duration-200 ease-out',
        'hover:-translate-y-px active:translate-y-0 active:scale-[0.98]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primaryDefault focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 disabled:active:scale-100',
        sizeClasses[size],
        isPill ? 'rounded-full shadow-elevationTight4 hover:shadow-hoverLift' : radiusClasses[size],
        !isPill && !isOutline && 'hover:shadow-hoverLift',
        isOutline
          ? clsx(
              'border border-components-buttonOutline-lineStep01 bg-components-buttonOutline-bgStep01',
              'text-components-buttonOutline-text shadow-glassCard backdrop-blur-[50px]',
              'hover:border-action-primaryActive active:shadow-buttonPressedInner'
            )
          : clsx(
              'border border-transparent text-action-neutralInverted',
              'hover:border-action-primaryDefault active:shadow-buttonPressedInner'
            ),
        className
      )}
      style={{ ...backgroundStyle, ...style }}
      {...props}
    >
      {iconLeft && <span className={clsx(iconSlotClasses, 'group-hover:-translate-x-0.5')}>{iconLeft}</span>}
      {children}
      {iconRight && <span className={clsx(iconSlotClasses, 'group-hover:translate-x-0.5')}>{iconRight}</span>}
    </button>
  )
})

Button.displayName = 'Button'
