import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Primary action control. Maps to the Figma **Button** component set (node `22664:20974`). The Figma `State` axis (Hover / Focus / Pressed) is implemented with pseudo-classes rather than props; `Disabled` uses the native attribute.',
      },
    },
  },
  argTypes: {
    color: { control: 'inline-radio', options: ['primary', 'neutral'] },
    variant: { control: 'inline-radio', options: ['solid', 'outline', 'rounded'] },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    iconLeft: { control: false },
    iconRight: { control: false },
  },
  args: {
    children: 'Continue',
    color: 'primary',
    variant: 'solid',
    size: 'large',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="rounded">
        Rounded
      </Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="small">
        Small
      </Button>
      <Button {...args} size="medium">
        Medium
      </Button>
      <Button {...args} size="large">
        Large
      </Button>
    </div>
  ),
}

export const Colors: Story = {
  name: 'Colors (solid only)',
  parameters: {
    docs: {
      description: {
        story: 'The `neutral` color is only designed for the `solid` style in the source library.',
      },
    },
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} color="primary">
        Primary
      </Button>
      <Button {...args} color="neutral">
        Neutral
      </Button>
    </div>
  ),
}

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} iconLeft={<ArrowIcon />}>
        Icon left
      </Button>
      <Button {...args} iconRight={<ArrowIcon />}>
        Icon right
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
