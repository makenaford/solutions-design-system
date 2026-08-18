import type { ReactNode } from 'react'
import { Card, Center, Flex, Stack, Text, Title } from '@mantine/core'
import type { CardProps } from '@mantine/core'

export interface IconCardProps extends Omit<CardProps, 'title' | 'children'> {
  /** Icon/visual for the card. Use one of the library's glass icons from `src/assets/glass-icons/`. */
  icon: ReactNode
  title: string
  description?: string
  /** Figma layout axis — icon above the text, or beside it. */
  orientation?: 'vertical' | 'horizontal'
  /** Figma sizing variant. `desktop` caps the card at the 600px source width. */
  size?: 'desktop' | 'mobile'
}

/**
 * IconCard — Figma node `22731:39553` ("Icon Card").
 *
 * A glass card pairing an icon with a title and supporting copy. Only the vertical/desktop variant
 * was available to inspect in the source file, so the horizontal layout remains an inferred
 * interpretation rather than a traced one.
 */
export function IconCard({
  icon,
  title,
  description,
  orientation = 'vertical',
  size = 'desktop',
  variant = 'glass',
  ...props
}: IconCardProps) {
  const isHorizontal = orientation === 'horizontal'

  const text = (
    <Stack gap={4} ta={isHorizontal ? 'left' : 'center'} align={isHorizontal ? 'flex-start' : 'center'} w="100%">
      <Title order={4} size="xl" c="var(--sds-text-primary)">
        {title}
      </Title>
      {description ? <Text size="md">{description}</Text> : null}
    </Stack>
  )

  return (
    <Card variant={variant} maw={size === 'desktop' ? 600 : undefined} w="100%" data-interactive {...props}>
      <Flex direction={isHorizontal ? 'row' : 'column'} gap="sm" align="center" wrap="nowrap">
        <Center w={48} h={48} flex="0 0 auto">
          {icon}
        </Center>
        {text}
      </Flex>
    </Card>
  )
}
