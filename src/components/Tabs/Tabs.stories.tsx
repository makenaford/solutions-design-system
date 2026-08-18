import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from './Tabs'

const tabs = [
  { id: 'overview', label: 'Overview', panel: 'High-level summary of the selected solution.' },
  { id: 'features', label: 'Features', panel: 'What ships in the box, broken down by capability.' },
  { id: 'pricing', label: 'Pricing', panel: 'Plan tiers and what each one includes.' },
  { id: 'archive', label: 'Archive', panel: 'Nothing to see here.', disabled: true },
]

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tabbed navigation with paired panels. `size` follows the Figma `Size` axis — `desktop` renders pill tabs, `mobile` renders the compact treatment. Supports controlled (`activeTab` + `onTabChange`) and uncontrolled (`defaultActiveTab`) usage.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['desktop', 'mobile'] },
    tabs: { control: false },
    activeTab: { control: false },
    onTabChange: { control: false },
  },
  args: { tabs, size: 'desktop' },
  decorators: [
    (Story) => (
      <div className="w-[640px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Mobile: Story = {
  args: { size: 'mobile' },
}

export const WithIcons: Story = {
  args: {
    tabs: tabs.map((tab) => ({ ...tab, icon: <DotIcon /> })),
  },
}

function DotIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
      <circle cx="4" cy="4" r="4" fill="currentColor" />
    </svg>
  )
}
