import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chip, Group } from '@mantine/core'

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    docs: {
      description: {
        component:
          "Mantine's `Chip` — the Figma component named \"Chip\" and previously exported here as `Label`. Use it for selectable filter pills; use `Badge` for non-interactive labels.",
      },
    },
  },
  args: { children: 'Financial Services' },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = {
  render: (args) => (
    <Group>
      <Chip {...args}>Default</Chip>
      <Chip {...args} defaultChecked>
        Selected
      </Chip>
      <Chip {...args} disabled>
        Disabled
      </Chip>
    </Group>
  ),
}

export const Group_: Story = {
  name: 'Chip.Group',
  render: () => (
    <Chip.Group multiple defaultValue={['financial']}>
      <Group>
        <Chip value="customer">Customer Portals</Chip>
        <Chip value="supplier">Supplier Portals</Chip>
        <Chip value="financial">Financial Services</Chip>
        <Chip value="commerce">Digital Commerce</Chip>
      </Group>
    </Chip.Group>
  ),
}
