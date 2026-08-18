import type { ReactNode } from 'react'
import { Card as MantineCard, Group, Image, Stack, Text, Title } from '@mantine/core'
import type { CardProps as MantineCardProps } from '@mantine/core'

export interface CardProps extends Omit<MantineCardProps, 'title' | 'children'> {
  /** Figma "Align": content stacked above the image, or beside it. */
  orientation?: 'vertical' | 'horizontal'
  /** Image slot. A string is rendered as the image source; a node is rendered as-is. */
  image?: ReactNode | string
  /** Icon slot in the header, sized to the Figma 48px `card-icon` box. */
  icon?: ReactNode
  title: string
  description?: string
  /** Figma "Top Content" slot, above the header. */
  topContent?: ReactNode
  /** Figma "Main Content 1" / "Main Content 2" slots, below the header. */
  mainContent1?: ReactNode
  mainContent2?: ReactNode
  /** Figma "Bottom Content" slot. */
  bottomContent?: ReactNode
}

/**
 * Card — Figma `card-main` (node `16728:26513`).
 *
 * Models the component's slot structure (image, top content, header, two main-content slots,
 * bottom content) and its "Align" axis. Figma's "Padding=False" variant is reached with
 * `withBorder={false} shadow="none" p={0} variant={undefined}`, or more simply by passing
 * `variant={undefined}` — the glass surface comes from `variant="glass"`, which is the default.
 *
 * The "Special Cards" in Figma (Resource, CS-Stat, CS-Quote, Quick Link, Icon-Left, …) are all
 * this component with different slot content — see the stories.
 */
export function Card({
  orientation = 'vertical',
  image,
  icon,
  title,
  description,
  topContent,
  mainContent1,
  mainContent2,
  bottomContent,
  variant = 'glass',
  ...props
}: CardProps) {
  const imageSlot =
    typeof image === 'string' ? <Image src={image} alt="" radius="md" /> : image

  const header = (
    <Stack gap="sm">
      {icon ? <Group h={48} w={48} justify="center" align="center">{icon}</Group> : null}
      <Stack gap={4}>
        <Title order={4} size="xl" c="var(--sds-text-primary)">
          {title}
        </Title>
        {description ? <Text size="lg">{description}</Text> : null}
      </Stack>
    </Stack>
  )

  const body = (
    <Stack gap="md" flex={1} miw={0}>
      {topContent}
      {header}
      {mainContent1}
      {mainContent2}
      {orientation === 'horizontal' ? bottomContent : null}
    </Stack>
  )

  if (orientation === 'horizontal') {
    return (
      <MantineCard variant={variant} p="xl" {...props}>
        <Group align="center" gap="lg" wrap="nowrap">
          {body}
          {imageSlot ? (
            <MantineCard.Section flex={1} miw={0} m={0}>
              {imageSlot}
            </MantineCard.Section>
          ) : null}
        </Group>
      </MantineCard>
    )
  }

  return (
    <MantineCard variant={variant} {...props}>
      <Stack gap="md">
        {imageSlot}
        {body}
        {bottomContent}
      </Stack>
    </MantineCard>
  )
}
