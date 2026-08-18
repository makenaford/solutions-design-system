import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TableOfContents } from './TableOfContents'

const items = [
  { id: 'intro', label: 'Introduction' },
  { id: 'install', label: 'Installation' },
  { id: 'npm', label: 'With npm', level: 2 },
  { id: 'yarn', label: 'With yarn', level: 2 },
  { id: 'tokens', label: 'Design tokens' },
  { id: 'components', label: 'Components' },
  { id: 'contributing', label: 'Contributing' },
]

const meta = {
  title: 'Components/Table of Contents',
  component: TableOfContents,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'In-page outline navigation. Entries with `level > 1` are indented; the entry matching `activeId` is highlighted per the Figma active-item state.',
      },
    },
  },
  argTypes: {
    items: { control: false },
    onItemClick: { control: false },
  },
  args: { items, heading: 'Outline', activeId: 'tokens' },
} satisfies Meta<typeof TableOfContents>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [activeId, setActiveId] = useState(args.activeId)
    return <TableOfContents {...args} activeId={activeId} onItemClick={setActiveId} />
  },
}

export const FlatList: Story = {
  args: { items: items.filter((item) => !item.level), heading: 'On this page' },
}
