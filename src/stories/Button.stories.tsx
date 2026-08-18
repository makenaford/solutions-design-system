import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Group, Stack } from '@mantine/core'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: [
          "Mantine's `Button`, styled by this library's theme from the Figma Button component set.",
          '',
          'The Figma axes map onto Mantine props rather than bespoke ones:',
          '',
          '| Figma | Here |',
          '| --- | --- |',
          '| Style = Solid | `variant="filled"` (default) — the 225° brand gradient |',
          '| Style = Outline | `variant="outline"` — glass fill + Button Outline tokens |',
          '| Style = Rounded | `radius="round"` |',
          '| Color = Primary / Neutral | `color="brand"` / `color="neutral"` |',
          '| Size = Small / Medium / Large | `size="sm" \\| "md" \\| "lg"` |',
          '| State = Disabled | `disabled` |',
          '',
          'Hover lift, press feedback and the icon nudge are defined once in the theme.',
        ].join('\n'),
      },
    },
  },
  args: { children: 'Continue' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <Group>
      <Button {...args} variant="filled">
        Solid
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} radius="round">
        Rounded
      </Button>
    </Group>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <Group align="center">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </Group>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <Group>
      <Button {...args} color="brand">
        Primary
      </Button>
      <Button {...args} color="neutral">
        Neutral
      </Button>
    </Group>
  ),
}

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: { story: 'Icons nudge outward on hover — a theme-level interaction, not per-button styling.' },
    },
  },
  render: (args) => (
    <Group>
      <Button {...args} leftSection={<Arrow direction="left" />}>
        Back
      </Button>
      <Button {...args} rightSection={<Arrow direction="right" />}>
        Continue
      </Button>
    </Group>
  ),
}

export const States: Story = {
  render: (args) => (
    <Stack align="flex-start">
      <Group>
        <Button {...args}>Default</Button>
        <Button {...args} disabled>
          Disabled
        </Button>
        <Button {...args} loading>
          Loading
        </Button>
      </Group>
      <Group>
        <Button {...args} variant="outline">
          Default
        </Button>
        <Button {...args} variant="outline" disabled>
          Disabled
        </Button>
      </Group>
    </Stack>
  ),
}

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
}

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={direction === 'right' ? 'M2 8h12M9 3l5 5-5 5' : 'M14 8H2M7 3L2 8l5 5'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
