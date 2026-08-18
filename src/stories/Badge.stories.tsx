import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, Group } from '@mantine/core'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: [
          "Mantine's `Badge`, carrying the Figma Tag styling. This replaces the previous separate",
          '`Badge` and `Tag` components — both were the same shape in Figma.',
          '',
          '| Figma | Here |',
          '| --- | --- |',
          '| Style = Tonal | `variant="light"` (default) |',
          '| Style = Outline | `variant="outline"` |',
          '| Size = Regular / Small | `size="md"` / `size="sm"` |',
        ].join('\n'),
      },
    },
  },
  args: { children: 'Label' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <Group>
      <Badge {...args} variant="light">
        Tonal
      </Badge>
      <Badge {...args} variant="outline">
        Outline
      </Badge>
      <Badge {...args} variant="filled">
        Filled
      </Badge>
    </Group>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <Group align="center">
      <Badge {...args} size="sm">
        Small
      </Badge>
      <Badge {...args} size="md">
        Regular
      </Badge>
    </Group>
  ),
}

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The status colours come straight from Figma and flip between light and dark mode — toggle the theme to see them change.',
      },
    },
  },
  render: (args) => (
    <Group>
      <Badge {...args} color="brand">
        Brand
      </Badge>
      <Badge {...args} color="success">
        Success
      </Badge>
      <Badge {...args} color="warning">
        Warning
      </Badge>
      <Badge {...args} color="error">
        Error
      </Badge>
      <Badge {...args} color="info">
        Info
      </Badge>
    </Group>
  ),
}
