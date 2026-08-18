import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from './Search'

const meta = {
  title: 'Components/Search',
  component: Search,
  parameters: {
    docs: {
      description: {
        component:
          'Search field built from the library search icon plus the Input field chrome — no standalone Search component exists in the Figma file, so this composition is worth a design review.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['default', 'large'] },
    disabled: { control: 'boolean' },
    onClear: { control: false },
  },
  args: { size: 'default', placeholder: 'Search' },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Search>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <Search {...args} size="default" />
      <Search {...args} size="large" />
    </div>
  ),
}

export const Clearable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Passing `onClear` renders a trailing clear button once the field has a value.',
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState('design system')
    return (
      <Search
        {...args}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onClear={() => setValue('')}
      />
    )
  },
}

export const Disabled: Story = {
  args: { disabled: true },
}
