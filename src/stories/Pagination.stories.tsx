import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination, Stack } from '@mantine/core'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component:
          "Mantine's `Pagination`, using the library's link colours and the hover/press treatment from the theme.",
      },
    },
  },
  args: { total: 12, defaultValue: 4 },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Controlled: Story = {
  render: (args) => {
    const [page, setPage] = useState(4)
    return <Pagination {...args} value={page} onChange={setPage} />
  },
}

export const Variations: Story = {
  render: () => (
    <Stack align="flex-start">
      <Pagination total={4} defaultValue={2} />
      <Pagination total={60} defaultValue={25} siblings={2} />
      <Pagination total={12} defaultValue={4} withEdges />
      <Pagination total={12} defaultValue={4} disabled />
    </Stack>
  ),
}
