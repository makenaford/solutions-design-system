import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, Text } from '@mantine/core'

const ITEMS = [
  {
    value: 'what',
    header: 'What is the Solutions Design System?',
    content:
      'A Mantine theme plus a small set of compositions, generated from the "Solutions Library- 2026" Figma file so design and code share one source of truth.',
  },
  {
    value: 'tokens',
    header: 'Where do the colors and type scales come from?',
    content:
      'Every value is read out of the Figma library’s variables for both light and dark mode, and published as Mantine theme tokens and --sds-* CSS variables.',
  },
  {
    value: 'add',
    header: 'How do I add a component?',
    content:
      'Prefer configuring the Mantine primitive in src/theme/components.ts. Only add a wrapper when the component has structure of its own.',
  },
]

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    frame: { width: 640 },
    docs: {
      description: {
        component:
          "Mantine's `Accordion` with the library's control, chevron and divider styling applied from the theme.",
      },
    },
  },
  args: { defaultValue: 'what' },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Accordion {...args}>
      {ITEMS.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.Control>{item.header}</Accordion.Control>
          <Accordion.Panel>
            <Text>{item.content}</Text>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  ),
}

export const AllowMultiple: Story = {
  parameters: {
    docs: {
      description: {
        story: 'With `multiple`, more than one item can be open at a time.',
      },
    },
  },
  // `args` is not spread here: Mantine types Accordion's `value`/`defaultValue` off the `multiple`
  // flag, so the single-select args from `meta` are not assignable to the multi-select form.
  render: () => (
    <Accordion multiple defaultValue={['what', 'tokens']} radius="lg">
      {ITEMS.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.Control>{item.header}</Accordion.Control>
          <Accordion.Panel>
            <Text>{item.content}</Text>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  ),
}

export const WithDisabledItem: Story = {
  render: (args) => (
    <Accordion {...args}>
      {ITEMS.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.Control>{item.header}</Accordion.Control>
          <Accordion.Panel>
            <Text>{item.content}</Text>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
      <Accordion.Item value="disabled">
        <Accordion.Control disabled>A disabled item</Accordion.Control>
        <Accordion.Panel>
          <Text>Never reachable.</Text>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
}
