import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'Multi-select control. Maps to the Figma **Checkbox** component; `size` follows the Figma `Size` axis (16px `default`, 22px `large`). `indeterminate` drives the native DOM property and is independent of `checked`.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['default', 'large'] },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
  args: { label: 'Email me about updates', size: 'default' },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Checkbox {...args} label="Unchecked" defaultChecked={false} />
      <Checkbox {...args} label="Checked" defaultChecked />
      <Checkbox {...args} label="Indeterminate" indeterminate />
      <Checkbox {...args} label="Disabled" disabled />
      <Checkbox {...args} label="Disabled + checked" disabled defaultChecked />
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Checkbox {...args} size="default" label="Default (16px)" defaultChecked />
      <Checkbox {...args} size="large" label="Large (22px)" defaultChecked />
    </div>
  ),
}

export const WithoutLabel: Story = {
  args: { label: undefined },
}
