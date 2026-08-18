import * as React from 'react'
import clsx from 'clsx'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Badge — Figma node 22689:3016 ("Badge" component, instance 22729:3208).
 *
 * A small pill-shaped counter/indicator, typically used to show a numeric count. The Figma file
 * only defines a single visual treatment (brand primary fill, white extra-bold label) — no
 * color/size variant axis exists for this component, so none is modeled here.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, children, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      className={clsx(
        'inline-flex min-w-[24px] items-center justify-center whitespace-nowrap rounded-full',
        'bg-brand-primary px-[5px] py-[2px]',
        'font-label text-[13px] font-extrabold leading-[20px] text-center text-neutral-0',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = 'Badge'
