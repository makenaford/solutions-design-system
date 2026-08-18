import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TableOfContents } from './TableOfContents'

const ITEMS = [
  { id: 'intro', label: 'Introduction' },
  { id: 'getting-started', label: 'Getting started' },
  { id: 'install', label: 'Installation', level: 2 },
  { id: 'theming', label: 'Theming', level: 2 },
  { id: 'components', label: 'Components' },
  { id: 'api', label: 'API reference' },
]

const meta = {
  title: 'Components/Table of Contents',
  component: TableOfContents,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Vertical section nav with a rule down the left edge that thickens and takes the brand colour on the active entry. Mantine has no equivalent primitive, so this is composed from `Stack`/`Group`/`Anchor`.',
      },
    },
  },
  args: { items: ITEMS, heading: 'Outline', activeId: 'getting-started' },
} satisfies Meta<typeof TableOfContents>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Interactive: Story = {
  parameters: {
    docs: { description: { story: 'Click an entry to move the active marker.' } },
  },
  render: (args) => {
    const [activeId, setActiveId] = useState('intro')
    return <TableOfContents {...args} activeId={activeId} onItemClick={setActiveId} />
  },
}

export const NoActiveItem: Story = {
  args: { activeId: undefined },
}

export const CustomHeading: Story = {
  args: { heading: 'On this page' },
}
