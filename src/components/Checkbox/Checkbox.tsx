import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import { paragraph } from '../../tokens/typography'

export type CheckboxSize = 'default' | 'large'

/**
 * Checkmark glyph reproduced from the Figma "Checkbox" asset (an L-shaped
 * stroke rotated -45deg to form a tick). Raw asset preserved at
 * ./assets/check.svg for reference.
 */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <g transform="rotate(45 6 6)">
        <path d="M2.5 8.5H8.5V2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

/**
 * Indeterminate dash glyph reproduced from the Figma "Checkbox" asset
 * (a simple horizontal stroke). Raw asset preserved at ./assets/dash.svg.
 */
function DashIcon({ className }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M2.5 6H9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Optional visible label rendered next to the checkbox. */
  label?: string
  /** Matches the Figma "Size" variant (16px Default box vs. 22px Large box). */
  size?: CheckboxSize
  /**
   * Puts the checkbox in the mixed/"Indeterminate" visual state from Figma.
   * This only drives the DOM `indeterminate` property (and therefore the
   * `:indeterminate` styling below) — it does not affect `checked`.
   */
  indeterminate?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, size = 'default', indeterminate = false, disabled, className, id, ...rest },
  forwardedRef
) {
  const internalRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(forwardedRef, () => internalRef.current as HTMLInputElement)

  useEffect(() => {
    if (internalRef.current) internalRef.current.indeterminate = indeterminate
  }, [indeterminate])

  const generatedId = useId()
  const inputId = id ?? generatedId
  const isLarge = size === 'large'
  const boxSizeClass = isLarge ? 'size-[22px]' : 'size-[16px]'
  const iconWrapperSizeClass = isLarge ? 'size-[20px]' : 'size-[16px]'
  const labelTextStyle = isLarge ? paragraph.large : paragraph.default

  return (
    <label
      htmlFor={inputId}
      className={clsx('inline-flex items-center gap-4', disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer', className)}
    >
      {/* `group` here lets every descendant react to the real native :checked / :indeterminate
          state of the input below via the `group-has-[...]` variants, without relying on
          sibling-only `peer` selectors (the icon lives a couple of levels deep). */}
      <span className="group relative inline-flex shrink-0 items-center justify-center">
        {/* Hover glow reproduced from the Figma "Hover Background" asset (a soft radial blend of brand.lighten1 -> brand.accent). */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
          style={{ background: 'radial-gradient(circle, rgba(55,124,255,0.18), rgba(186,143,255,0.05) 70%)' }}
        />

        <input
          ref={internalRef}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className="absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...rest}
        />

        <span
          aria-hidden="true"
          className={clsx(
            'pointer-events-none relative flex items-center justify-center overflow-hidden rounded-sm border border-base-neutral-9 transition-colors',
            boxSizeClass,
            'group-has-[:checked]:border-transparent group-has-[:indeterminate]:border-transparent',
            'group-has-[:focus-visible]:ring-2 group-has-[:focus-visible]:ring-brand-lighten3 group-has-[:focus-visible]:ring-offset-1'
          )}
        >
          <span
            className="absolute inset-0 opacity-0 transition-opacity group-has-[:checked]:opacity-100"
            style={{ backgroundImage: 'linear-gradient(250deg, #377cff 37%, #0b5fff 63%)' }}
          />
          <span
            className="absolute inset-0 opacity-0 transition-opacity group-has-[:indeterminate]:opacity-100"
            style={{ backgroundImage: 'linear-gradient(259deg, #0b5fff 10%, #377cff 100%)' }}
          />

          <span className={clsx('relative z-10 flex items-center justify-center text-neutral-0', iconWrapperSizeClass)}>
            <CheckIcon
              className={clsx('size-full opacity-0 transition-opacity', 'group-has-[:checked]:opacity-100 group-has-[:indeterminate]:opacity-0')}
            />
            <DashIcon className="absolute inset-0 size-full opacity-0 transition-opacity group-has-[:indeterminate]:opacity-100" />
          </span>
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
