import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox, Group, Radio, Stack } from '@mantine/core'

const meta = {
  title: 'Components/Selection Controls',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Mantine's `Checkbox` and `Radio`, sharing the Figma gradient fill and the pop-in animation on check. Both are configured once in the theme — note that Checkbox exposes an `input` Styles API selector while Radio exposes `radio`.",
      },
    },
  },
  args: { label: 'Email me about updates' },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const CheckboxStates: Story = {
  name: 'Checkbox / States',
  render: (args) => (
    <Stack align="flex-start">
      <Checkbox {...args} label="Unchecked" />
      <Checkbox {...args} label="Checked" defaultChecked />
      <Checkbox {...args} label="Indeterminate" indeterminate />
      <Checkbox {...args} label="Disabled" disabled />
      <Checkbox {...args} label="Disabled + checked" disabled defaultChecked />
      <Checkbox {...args} label="With error" error="This field is required" />
    </Stack>
  ),
}

export const CheckboxSizes: Story = {
  name: 'Checkbox / Sizes',
  render: (args) => (
    <Group align="center">
      <Checkbox {...args} size="sm" label="Small" defaultChecked />
      <Checkbox {...args} size="md" label="Medium" defaultChecked />
      <Checkbox {...args} size="lg" label="Large" defaultChecked />
    </Group>
  ),
}

export const CheckboxGroup: Story = {
  name: 'Checkbox / Group',
  render: () => (
    <Checkbox.Group
      label="Which topics interest you?"
      description="Pick as many as you like."
      defaultValue={['portals']}
    >
      <Stack mt="sm" align="flex-start">
        <Checkbox value="portals" label="Customer portals" />
        <Checkbox value="commerce" label="Digital commerce" />
        <Checkbox value="intranets" label="Intranets" />
      </Stack>
    </Checkbox.Group>
  ),
}

export const RadioStates: Story = {
  name: 'Radio / States',
  render: () => (
    <Stack align="flex-start">
      <Radio label="Unselected" name="demo-states" />
      <Radio label="Selected" name="demo-states" defaultChecked />
      <Radio label="Disabled" name="demo-states-2" disabled />
      <Radio label="Disabled + selected" name="demo-states-3" disabled defaultChecked />
    </Stack>
  ),
}

export const RadioGroup: Story = {
  name: 'Radio / Group',
  render: () => (
    <Radio.Group label="Preferred contact method" defaultValue="email">
      <Stack mt="sm" align="flex-start">
        <Radio value="email" label="Email" />
        <Radio value="phone" label="Phone" />
        <Radio value="none" label="Do not contact me" />
      </Stack>
    </Radio.Group>
  ),
}
