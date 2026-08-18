import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'Small pill-shaped counter or indicator. Maps to the Figma **Badge** component (node `22689:3016`). The source library defines a single visual treatment, so there is no color or size axis.',
      },
    },
  },
  args: { children: '3' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Counts: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge>1</Badge>
      <Badge>12</Badge>
      <Badge>99+</Badge>
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <span className="inline-flex items-center gap-2 text-surfaces-textPrimary">
      Notifications
      <Badge>5</Badge>
    </span>
  ),
}
