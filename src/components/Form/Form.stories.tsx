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
          'Lead-capture form — Figma "Form" (node `21405:74359`, Format=Short). A glass panel wrapping the standard field set. All field chrome, focus states and the submit button come from the theme, so this component only describes fields and layout.',
      },
    },
  },
  args: {
    heading: 'Get the solution brief',
    description: 'Tell us where to send it and we will follow up within one business day.',
    submitLabel: 'Download',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const DefaultCopy: Story = {
  args: { heading: undefined, description: undefined, submitLabel: undefined },
}
