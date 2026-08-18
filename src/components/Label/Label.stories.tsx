import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './Label'

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component:
          'Interactive filter chip. Maps to the Figma **Label** frame (node `16847:58705`), whose reusable component is named **Chip** (node `16858:51126`). `selected` and `dragged` are real props because they are driven by application state; `focused` is handled by `:focus-visible`.',
      },
    },
  },
  argTypes: {
    selected: { control: 'boolean' },
    dragged: { control: 'boolean' },
    disabled: { control: 'boolean' },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
  args: { children: 'Filter', selected: false, dragged: false },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Label {...args}>Default</Label>
      <Label {...args} selected>
        Selected
      </Label>
      <Label {...args} dragged>
        Dragged
      </Label>
      <Label {...args} disabled>
        Disabled
      </Label>
    </div>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <Label {...args} rightIcon={<CloseIcon />}>
      Dismissible
    </Label>
  ),
}

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
