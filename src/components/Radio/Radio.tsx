import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import { paragraph } from '../../tokens/typography'

export type RadioSize = 'default' | 'large'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Optional visible label rendered next to the radio button. */
  label?: string
  /** Matches the Figma "Size" variant (16px Default dot vs. 22px Large dot). */
  size?: RadioSize
}

/**
 * Radio dot reproduced from the Figma "Radio" asset: an unselected state is a
 * thin ring (border only), and a selected state is a solid gradient ring with
 * a small white "hole" punched in the center — reproduced here with CSS
 * (border + an absolutely centered inner circle) rather than the flattened
 * per-state SVGs Figma exports, so the two states share one implementation.
 * Raw reference assets preserved at ./assets/radio-selected.svg and
 * ./assets/radio-unselected.svg.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, size = 'default', disabled, className, id, ...rest },
  forwardedRef
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const isLarge = size === 'large'
  const outerSizeClass = isLarge ? 'size-[22px]' : 'size-[16px]'
  const innerSizeClass = isLarge ? 'size-[10px]' : 'size-[8px]'
  const labelTextStyle = isLarge ? paragraph.large : paragraph.default

  return (
    <label
      htmlFor={inputId}
      className={clsx('inline-flex items-center gap-4', disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer', className)}
    >
      <span className="group relative inline-flex shrink-0 items-center justify-center">
        {/* Hover glow reproduced from the Figma "Hover Background" asset. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
          style={{ background: 'radial-gradient(circle, rgba(55,124,255,0.18), rgba(186,143,255,0.05) 70%)' }}
        />

        <input
          ref={forwardedRef}
          id={inputId}
          type="radio"
          disabled={disabled}
          className="absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...rest}
        />

        <span
          aria-hidden="true"
          className={clsx(
            'pointer-events-none relative flex items-center justify-center rounded-full border border-base-neutral-9 transition-colors',
            outerSizeClass,
            'group-has-[:checked]:border-transparent',
            'group-has-[:focus-visible]:ring-2 group-has-[:focus-visible]:ring-brand-lighten3 group-has-[:focus-visible]:ring-offset-1'
          )}
        >
          <span
            className="absolute inset-0 rounded-full opacity-0 transition-opacity group-has-[:checked]:opacity-100"
            style={{ backgroundImage: 'linear-gradient(97deg, #377cff 50%, #0b5fff 100%)' }}
          />
          <span
            className={clsx(
              'relative z-10 rounded-full bg-neutral-0 opacity-0 transition-opacity group-has-[:checked]:opacity-100',
              innerSizeClass
            )}
          />
        </span>
      </span>

      {label && (
        <span
          className="text-surfaces-textPrimary"
          style={{
            fontFamily: labelTextStyle.fontFamily,
            fontSize: labelTextStyle.fontSize,
            fontWeight: labelTextStyle.fontWeight,
            lineHeight: `${labelTextStyle.lineHeight}px`,
            letterSpacing: labelTextStyle.letterSpacing,
          }}
        >
          {label}
        </span>
      )}
    </label>
  )
})
