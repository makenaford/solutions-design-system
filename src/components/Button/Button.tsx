import { forwardRef } from 'react'
import { Button as MantineButton } from '@mantine/core'
import type { ButtonProps as MantineButtonProps, ElementProps } from '@mantine/core'

export interface ButtonProps
  extends MantineButtonProps,
    // Mirrors how Mantine types its own components: everything a native <button> accepts, minus
    // the props Mantine defines differently.
    ElementProps<'button', keyof MantineButtonProps> {}

/**
 * Button — Figma Button component set (node `16123:189647`).
 *
 * A thin wrapper over Mantine's `Button`. It deliberately adds no props of its own: the styling
 * lives in the theme (`src/theme/components.ts`), which maps the Figma axes onto Mantine's:
 *
 * | Figma | Prop |
 * | --- | --- |
 * | Style = Solid | `variant="filled"` (default) |
 * | Style = Outline | `variant="outline"` |
 * | Style = Rounded | `radius="round"` |
 * | Color = Primary / Neutral | `color="brand"` / `color="neutral"` |
 * | Size = Small / Medium / Large | `size="sm" \| "md" \| "lg"` |
 * | State = Disabled | `disabled` |
 *
 * The wrapper exists so the design system owns the import surface and has somewhere to add
 * behaviour later without a breaking change for consumers. For a polymorphic button (rendering as
 * an anchor or a router link), use Mantine's `Button` directly with its `component` prop.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  return <MantineButton ref={ref} {...props} />
})
