import * as React from 'react'
import clsx from 'clsx'

export interface LabelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Marks the chip as the active/chosen option (Figma "State=Selected"). Application-controlled,
   * so it's a real prop rather than a pseudo-class. */
  selected?: boolean
  /** Marks the chip as being dragged (Figma "State=Dragged"). Application-controlled (e.g. from a
   * drag-and-drop library), so it's a real prop rather than a pseudo-class. */
  dragged?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const iconSlotClasses = 'flex size-[16px] shrink-0 items-center justify-center'

/**
 * Label (Chip) — Figma node 16847:58705 ("Label" documentation frame, whose reusable component is
 * named "Chip", node 16858:51126).
 *
 * Figma "State" values: Default, Selected, Disabled, Dragged, Focused. `disabled` uses the native
 * button attribute; `selected`/`dragged` are exposed as real props because they're driven by
 * application state, not by a browser pseudo-class. `Focused` is implemented with the
 * `focus-visible` pseudo-class via an internal ring overlay, matching the Figma "Focus Ring" layer.
 *
 * Open question: a separate, differently-shaped "Label CTA" component exists elsewhere in this file
 * (node 15121:237267, Style=Tonal/Gradient/Outline x Size=Large/Medium/Small) — it was NOT used here
 * since the task's node id resolves to the Chip-based "Label" frame instead.
 */
export const Label = React.forwardRef<HTMLButtonElement, LabelProps>(function Label(
  { selected = false, dragged = false, disabled, leftIcon, rightIcon, className, style, type, children, ...props },
  ref
) {
  const borderClasses = selected
    ? 'border-transparent'
    : disabled
      ? 'border-action-primaryInverted'
      : dragged
        ? 'border-action-primaryInverted shadow-elevationTight1'
        : 'border-components-buttonOutline-lineStep01'

  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      disabled={disabled}
      aria-pressed={selected}
      className={clsx(
        'group relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg',
        'px-medium py-[6px]',
        'bg-surfaces-cardBgBlue font-sans text-[14px] font-semibold leading-[18px] text-surfaces-textPrimary',
        'border',
        borderClasses,
        'focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-40',
        className
      )}
      style={style}
      {...props}
    >
      {/* Focus ring overlay — mirrors the Figma "Focus Ring" layer (inset -3px, 2px brand border). */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-[3px] rounded-[10px] border-2 border-transparent group-focus-visible:border-brand-lighten1"
      />
      {leftIcon && <span className={iconSlotClasses}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={iconSlotClasses}>{rightIcon}</span>}
    </button>
  )
})

Label.displayName = 'Label'
