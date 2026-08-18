import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select, Stack, TextInput } from '@mantine/core'

const meta = {
  title: 'Components/Text Input',
  component: TextInput,
  parameters: {
    docs: {
      description: {
        component:
          "Mantine's `TextInput`, styled from the Figma Input component set. This replaces the previous `Input` component. The floating-label behaviour of the old implementation is handled by Mantine's standard label + placeholder pairing, and the focus ring comes from the theme.",
      },
    },
  },
  args: { label: 'Work email', placeholder: 'you@company.com' },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = {
  render: (args) => (
    <Stack>
      <TextInput {...args} />
      <TextInput {...args} required withAsterisk label="Required" />
      <TextInput {...args} label="With help text" description="We will never share this." />
      <TextInput {...args} label="With error" error="Enter a valid work email address." />
      <TextInput {...args} label="Disabled" disabled defaultValue="you@company.com" />
    </Stack>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <Stack>
      <TextInput {...args} size="sm" label="Small" />
      <TextInput {...args} size="md" label="Medium" />
      <TextInput {...args} size="lg" label="Large" />
    </Stack>
  ),
}

export const SelectField: Story = {
  name: 'Select',
  parameters: {
    docs: {
      description: {
        story:
          "Mantine's `Select` shares the same input chrome, so the Figma Input `Type=Dropdown` variant needs no extra styling.",
      },
    },
  },
  render: () => (
    <Select
      label="Industry"
      placeholder="Choose one"
      data={['Technology', 'Healthcare', 'Financial Services', 'Retail', 'Other']}
    />
  ),
}
