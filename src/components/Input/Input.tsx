import { forwardRef, useId, useState } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import { paragraph } from '../../tokens/typography'

export type InputSize = 'default' | 'large'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label. Floats above the border on focus or once a value is present, matching the Figma "Filled" variant. */
  label?: string
  /** Small helper copy rendered below the field, matching the Figma "Help Text" slot. */
  helpText?: string
  /** Matches the Figma "Condensed" variant (True -> `default`, False -> `large`). */
  size?: InputSize
  /** Optional leading icon, matching the Figma "Icon Left" slot. */
  leftIcon?: ReactNode
  /** Optional trailing icon, matching the Figma "Icon Right" slot. */
  rightIcon?: ReactNode
}

/**
 * Text field reproduced from the Figma "Input" component (node 16166:3919 —
 * the "Type=Text" variant of its Condensed/State/Filled matrix). The primary
 * node handed off for this component, 16884:41620, turned out to actually
 * contain a "Dropdown" component mislabeled "Input" in the Figma file, so
 * this implementation is based on the fallback node instead. See the task
 * report for details.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    helpText,
    size = 'default',
    leftIcon,
    rightIcon,
    required,
    disabled,
    className,
    id,
    value,
    defaultValue,
    placeholder,
    onFocus,
    onBlur,
    onChange,
    ...rest
  },
  forwardedRef
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const isLarge = size === 'large'

  const [focused, setFocused] = useState(false)
  const [uncontrolledHasValue, setUncontrolledHasValue] = useState(Boolean(defaultValue))
  const isControlled = value !== undefined
  const hasValue = isControlled ? String(value).length > 0 : uncontrolledHasValue
  const floated = focused || hasValue

  const fieldTextStyle = isLarge ? paragraph.base : paragraph.default
  const labelRestTextStyle = isLarge ? paragraph.baseHeavy : paragraph.default
  const labelFloatedTextStyle = isLarge ? paragraph.smallHeavy : paragraph.extraSmallSemiBold
  const helpTextStyle = isLarge ? paragraph.smallHeavy : paragraph.extraSmall

  return (
    <div className={clsx('flex w-full flex-col gap-1', className)}>
      <div className="relative flex w-full items-center">
        {label && (
          <label
            htmlFor={inputId}
            className={clsx(
              'pointer-events-none absolute left-4 select-none text-surfaces-textPrimary transition-all',
              floated ? '-top-[9px] bg-surfaces-pageBg px-1' : 'top-1/2 -translate-y-1/2 opacity-80'
            )}
            style={{
              fontFamily: (floated ? labelFloatedTextStyle : labelRestTextStyle).fontFamily,
              fontSize: (floated ? labelFloatedTextStyle : labelRestTextStyle).fontSize,
              fontWeight: (floated ? labelFloatedTextStyle : labelRestTextStyle).fontWeight,
              lineHeight: `${(floated ? labelFloatedTextStyle : labelRestTextStyle).lineHeight}px`,
            }}
          >
            {label}
            {required && <span className="ml-0.5 text-status-error">*</span>}
          </label>
        )}

        {leftIcon && <span className="pointer-events-none absolute left-4 flex size-4 shrink-0 items-center text-surfaces-textSecondary">{leftIcon}</span>}

        <input
          ref={forwardedRef}
          id={inputId}
          disabled={disabled}
          required={required}
          value={value}
          defaultValue={defaultValue}
          placeholder={label ? (floated ? placeholder : undefined) : placeholder}
          onFocus={(event) => {
            setFocused(true)
            onFocus?.(event)
          }}
          onBlur={(event) => {
            setFocused(false)
            onBlur?.(event)
          }}
          onChange={(event) => {
            setUncontrolledHasValue(event.target.value.length > 0)
            onChange?.(event)
          }}
          className={clsx(
            'w-full rounded-lg border bg-transparent text-surfaces-textPrimary outline-none transition-colors',
            isLarge ? 'px-4 py-4' : 'px-5 py-4',
            leftIcon && 'pl-9',
            rightIcon && 'pr-9',
            disabled ? 'cursor-not-allowed border-neutral-4 opacity-50' : 'border-neutral-4 hover:border-base-neutral-6',
            'focus:border-action-primaryActive'
          )}
          style={{
            fontFamily: fieldTextStyle.fontFamily,
            fontSize: fieldTextStyle.fontSize,
            fontWeight: fieldTextStyle.fontWeight,
            lineHeight: `${fieldTextStyle.lineHeight}px`,
          }}
          {...rest}
        />

        {rightIcon && <span className="pointer-events-none absolute right-4 flex size-4 shrink-0 items-center text-surfaces-textSecondary">{rightIcon}</span>}
      </div>

      {helpText && (
        <p
          className="px-4 text-surfaces-textSecondary"
          style={{
            fontFamily: helpTextStyle.fontFamily,
            fontSize: helpTextStyle.fontSize,
            fontWeight: helpTextStyle.fontWeight,
            lineHeight: `${helpTextStyle.lineHeight}px`,
          }}
        >
          {helpText}
        </p>
      )}
    </div>
  )
})
