import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion } from './Accordion'

const items = [
  {
    id: 'what',
    header: 'What is the Solutions Design System?',
    content:
      'A React + Tailwind component library generated directly from the "Solutions Library- 2026" Figma file, so code and design share one source of truth.',
  },
  {
    id: 'tokens',
    header: 'Where do the colors and type scales come from?',
    content:
      'Every token is extracted from the Figma library variables and styles, then wired into tailwind.config.ts as theme extensions.',
  },
  {
    id: 'contribute',
    header: 'How do I add a component?',
    content: 'Add the folder under src/components, export it from src/index.ts, and write a story beside it.',
  },
  {
    id: 'disabled',
    header: 'A disabled item',
    content: 'This panel can never be opened.',
    disabled: true,
  },
]

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Expandable disclosure list. Supports controlled (`openItems` + `onOpenChange`) and uncontrolled (`defaultOpenItems`) usage. By default opening an item closes the others; pass `allowMultiple` to keep several open.',
      },
    },
  },
  argTypes: {
    allowMultiple: { control: 'boolean' },
    items: { control: false },
    openItems: { control: false },
    onOpenChange: { control: false },
  },
  args: { items, allowMultiple: false },
  decorators: [
    (Story) => (
      <div className="w-[640px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const DefaultOpen: Story = {
  args: { defaultOpenItems: ['what'] },
}

export const AllowMultiple: Story = {
  args: { allowMultiple: true, defaultOpenItems: ['what', 'tokens'] },
}
