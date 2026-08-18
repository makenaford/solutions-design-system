import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stack } from '@mantine/core'
import { Search } from './Search'

const meta = {
  title: 'Components/Search',
  component: Search,
  parameters: {
    layout: 'centered',
    frame: { width: 360 },
    docs: {
      description: {
        component:
          "Search field built on Mantine's `TextInput`, with the Figma search glyph in the left section and an optional clear button. Accepts every `TextInput` prop.",
      },
    },
  },
  args: { placeholder: 'Search', label: undefined },
} satisfies Meta<typeof Search>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithLabel: Story = {
  args: { label: 'Search the library', description: 'Matches component names and descriptions.' },
}

export const Clearable: Story = {
  parameters: {
    docs: {
      description: { story: 'Passing `onClear` reveals a clear button once the field has a value.' },
    },
  },
  render: (args) => {
    const [value, setValue] = useState('portal')
    return (
      <Search
        {...args}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        onClear={() => setValue('')}
      />
    )
  },
}

export const Sizes: Story = {
  render: (args) => (
    <Stack gap="md">
      <Search {...args} size="sm" placeholder="Small" />
      <Search {...args} size="md" placeholder="Medium" />
      <Search {...args} size="lg" placeholder="Large" />
    </Stack>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Disabled' },
}

export const WithError: Story = {
  args: { error: 'No results matched that query.' },
}
