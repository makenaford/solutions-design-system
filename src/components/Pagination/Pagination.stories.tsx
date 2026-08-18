import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from './Pagination'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Page navigation control. No assembled pagination bar exists in the Figma file — this was rebuilt from the library link and arrow styles, so it is worth a design review. `siblingCount` controls how many page numbers show either side of the current page before collapsing into an ellipsis.',
      },
    },
  },
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
    onPageChange: { control: false },
  },
  args: { page: 4, totalPages: 12, siblingCount: 1 },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.page)
    return <Pagination {...args} page={page} onPageChange={setPage} />
  },
}

export const FewPages: Story = {
  ...Playground,
  args: { page: 2, totalPages: 4 },
}

export const ManyPages: Story = {
  ...Playground,
  args: { page: 25, totalPages: 60, siblingCount: 2 },
}
