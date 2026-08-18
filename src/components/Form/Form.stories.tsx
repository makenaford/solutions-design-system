import type { Meta, StoryObj } from '@storybook/react-vite'
import { Form } from './Form'

const meta = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Assembled glass-panel lead-capture form. Maps to Figma node `24140:3535`. The field set is fixed to match the source design — only the heading, description, and submit label are configurable.',
      },
    },
  },
  argTypes: {
    onSubmit: { control: false },
  },
  args: {
    heading: 'Get the solution brief',
    description: 'Tell us where to send it and we will follow up within one business day.',
    submitLabel: 'Download',
  },
  decorators: [
    (Story) => (
      <div className="w-[760px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Defaults: Story = {
  name: 'Default copy',
  args: { heading: undefined, description: undefined, submitLabel: undefined },
}
