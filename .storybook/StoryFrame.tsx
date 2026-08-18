import type { ReactNode } from 'react'
import { Box } from '@mantine/core'

export interface StoryFrameOptions {
  /** Constrain the story to a fixed width. Omit to let it size to its content. */
  width?: number | string
  /** Upper bound so a fixed-width story still behaves on a narrow viewport. */
  maxWidth?: number | string
  /** Centre the story horizontally. On by default when a width is set. */
  centered?: boolean
}

/**
 * The shared wrapper every story renders inside.
 *
 * This is the single place to put styling that should apply across the whole Storybook — page
 * background, outer padding, story width. Individual stories must not wrap themselves in layout
 * markup; they declare what they need through the `frame` parameter instead:
 *
 * ```ts
 * export const Playground: Story = {
 *   parameters: { frame: { width: 400 } },
 * }
 * ```
 *
 * Anything added here is picked up by every story automatically.
 */
export function StoryFrame({
  width,
  maxWidth = '100%',
  centered = width !== undefined,
  children,
}: StoryFrameOptions & { children: ReactNode }) {
  return (
    <Box bg="var(--mantine-color-body)" p="xl" mih="100vh">
      <Box w={width} maw={maxWidth} mx={centered ? 'auto' : undefined}>
        {children}
      </Box>
    </Box>
  )
}
