import * as React from 'react'
import clsx from 'clsx'

export type TagVariant = 'tonal' | 'outline'
export type TagSize = 'regular' | 'small'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Style axis from the Figma "Style" variant property. */
  variant?: TagVariant
  /** Size axis from the Figma "Size" variant property. */
  size?: TagSize
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const paddingClasses: Record<TagSize, string> = {
  regular: 'px-[8px] py-[2px]',
  small: 'px-[4px]',
}

const iconSlotClasses = 'flex size-[16px] shrink-0 items-center justify-center'

/**
 * Tag — Figma node 16988:13253 ("Tag" component set).
 *
 * Variant axes modeled as props: `variant` (Tonal/Outline) and `size` (Regular/Small). The Figma
 * "State" axis only defines a single value ("Neutral") in this file — no other color states
 * (e.g. Success/Warning/Error) exist yet, so no `state`/`color` prop was added.
 */
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { variant = 'tonal', size = 'regular', leftIcon, rightIcon, className, children, ...props },
  ref
) {
  const isOutline = variant === 'outline'

  return (
    <span
      ref={ref}
      className={clsx(
        'inline-flex items-center justify-center gap-1 overflow-hidden rounded-md whitespace-nowrap',
        'font-sans text-[14px] font-semibold leading-[18px]',
        paddingClasses[size],
        isOutline
          ? 'border border-brand-primary text-neutral-10'
          : 'bg-components-label-tonalBg text-components-label-tonalText',
        className
      )}
      {...props}
    >
      {leftIcon && <span className={iconSlotClasses}>{leftIcon}</span>}
      {children}
      {rightIcon && (
        <span className={clsx(iconSlotClasses, size === 'regular' && 'opacity-80')}>{rightIcon}</span>
      )}
    </span>
  )
})

Tag.displayName = 'Tag'
