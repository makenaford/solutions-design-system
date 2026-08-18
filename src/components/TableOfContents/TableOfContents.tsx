import { Anchor, Box, Group, Stack, Text } from '@mantine/core'
import type { StackProps } from '@mantine/core'
import classes from './TableOfContents.module.css'

export interface TableOfContentsEntry {
  /** Anchor id (without the leading "#") this entry links to. */
  id: string
  label: string
  /** Nesting depth, 1-indexed. Entries deeper than 1 are indented. */
  level?: number
}

export interface TableOfContentsProps extends Omit<StackProps, 'children' | 'onSelect'> {
  items: TableOfContentsEntry[]
  /** Id of the section currently in view, highlighted per the Figma "Active" item state. */
  activeId?: string
  onItemClick?: (id: string) => void
  /** Small-caps heading above the list. */
  heading?: string
}

/**
 * Table of contents — a vertical section nav with a rule down the left edge that thickens and
 * takes the brand colour on the active entry.
 *
 * Mantine has no equivalent primitive, so this is composed from `Stack`/`Group`/`Anchor` with the
 * rule and active treatment in a local CSS module.
 */
export function TableOfContents({
  items,
  activeId,
  onItemClick,
  heading = 'Outline',
  ...props
}: TableOfContentsProps) {
  return (
    <Stack component="nav" aria-label={heading} gap="md" w={200} maw={240} {...props}>
      <Text size="sm" fw={600} tt="uppercase" lts={6} c="var(--sds-text-secondary)">
        {heading}
      </Text>

      <Stack component="ul" gap={0} m={0} p={0} className={classes.list}>
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <Group
              key={item.id}
              component="li"
              gap="md"
              wrap="nowrap"
              align="stretch"
              className={classes.item}
            >
              <Box aria-hidden className={classes.rule} data-active={isActive || undefined} />
              <Anchor
                href={`#${item.id}`}
                onClick={() => onItemClick?.(item.id)}
                aria-current={isActive ? 'true' : undefined}
                underline="never"
                size="md"
                fw={isActive ? 600 : 400}
                c={isActive ? 'var(--sds-text-primary)' : 'var(--sds-text-secondary)'}
                ml={item.level && item.level > 1 ? (item.level - 1) * 12 : undefined}
                className={classes.link}
              >
                {item.label}
              </Anchor>
            </Group>
          )
        })}
      </Stack>
    </Stack>
  )
}
