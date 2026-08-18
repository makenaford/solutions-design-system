import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio } from './Radio'

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component:
          'Single-select control. Maps to the Figma **Radio** component; `size` follows the Figma `Size` axis (16px `default`, 22px `large`). Group radios by giving them a shared `name`.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['default', 'large'] },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
  args: { label: 'Monthly billing', size: 'default' },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Group: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Radio {...args} name="billing" label="Monthly" defaultChecked />
      <Radio {...args} name="billing" label="Annual" />
      <Radio {...args} name="billing" label="Enterprise (contact sales)" disabled />
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Radio {...args} name="size-demo" size="default" label="Default (16px)" defaultChecked />
      <Radio {...args} name="size-demo-2" size="large" label="Large (22px)" defaultChecked />
    </div>
  ),
}
