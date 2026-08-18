import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          'Text field with a floating label. Maps to the Figma **Input** component (node `16166:3919`). The label floats above the border on focus or once a value is present, matching the Figma `Filled` variant.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['default', 'large'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
  args: { label: 'Email', size: 'default' },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithHelpText: Story = {
  args: { helpText: "We'll never share your address." },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <Input {...args} size="default" label="Default" />
      <Input {...args} size="large" label="Large" />
    </div>
  ),
}

export const Filled: Story = {
  args: { defaultValue: 'you@company.com' },
}

export const Required: Story = {
  args: { required: true },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'you@company.com' },
}
