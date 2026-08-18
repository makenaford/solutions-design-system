import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconCard } from './IconCard'

const meta = {
  title: 'Components/Icon Card',
  component: IconCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Glass card pairing an icon with a title and supporting copy. Maps to Figma node `22731:39553`. Only the vertical desktop variant was available to inspect in the source file — the horizontal layout is inferred and worth a design review. The icon is consumer-supplied, not baked in.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    size: { control: 'inline-radio', options: ['desktop', 'mobile'] },
    icon: { control: false },
  },
  args: {
    icon: <SparkIcon />,
    title: 'Ship faster',
    description: 'Reuse audited components instead of rebuilding the same patterns on every project.',
    orientation: 'vertical',
    size: 'desktop',
  },
} satisfies Meta<typeof IconCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
}

export const TitleOnly: Story = {
  args: { description: undefined },
}

export const Grid: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-5">
      <IconCard {...args} size="mobile" title="Ship faster" />
      <IconCard {...args} size="mobile" title="Stay consistent" />
    </div>
  ),
}

function SparkIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="text-brand-primaryActive">
      <path
        d="M16 3l3.2 9.8L29 16l-9.8 3.2L16 29l-3.2-9.8L3 16l9.8-3.2L16 3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
