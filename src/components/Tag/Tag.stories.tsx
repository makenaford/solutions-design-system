import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './Tag'

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component:
          'Non-interactive descriptor chip. Maps to the Figma **Tag** component set (node `16988:13253`). The Figma `State` axis only defines `Neutral` today, so no color prop exists yet.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['tonal', 'outline'] },
    size: { control: 'inline-radio', options: ['regular', 'small'] },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
  args: { children: 'Category', variant: 'tonal', size: 'regular' },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Tag {...args} variant="tonal">
        Tonal
      </Tag>
      <Tag {...args} variant="outline">
        Outline
      </Tag>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Tag {...args} size="regular">
        Regular
      </Tag>
      <Tag {...args} size="small">
        Small
      </Tag>
    </div>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <Tag {...args} leftIcon={<DotIcon />}>
      With icon
    </Tag>
  ),
}

function DotIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
      <circle cx="4" cy="4" r="4" fill="currentColor" />
    </svg>
  )
}
