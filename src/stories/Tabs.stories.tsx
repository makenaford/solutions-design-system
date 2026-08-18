import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, Text } from '@mantine/core'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Mantine's `Tabs` styled as the Figma tab bar: a glass pill container with a gradient selected pill (`UI Components/Tabs/Selected Fill` + `Selected Stroke`) and the `focus shadow tab` glow. The theme sets `variant=\"pills\"` and `radius=\"round\"` by default, so call sites just compose `Tabs.List` / `Tabs.Tab` / `Tabs.Panel`.",
      },
    },
  },
  args: { defaultValue: 'overview' },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="features">Features</Tabs.Tab>
        <Tabs.Tab value="pricing">Pricing</Tabs.Tab>
        <Tabs.Tab value="archive" disabled>
          Archive
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="overview" pt="md">
        <Text>High-level summary of the selected solution.</Text>
      </Tabs.Panel>
      <Tabs.Panel value="features" pt="md">
        <Text>What is included, broken down by capability.</Text>
      </Tabs.Panel>
      <Tabs.Panel value="pricing" pt="md">
        <Text>Plan tiers and what each one includes.</Text>
      </Tabs.Panel>
      <Tabs.Panel value="archive" pt="md">
        <Text>Retired material.</Text>
      </Tabs.Panel>
    </Tabs>
  ),
}

export const WithIcons: Story = {
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab value="overview" leftSection={<Dot />}>
          Overview
        </Tabs.Tab>
        <Tabs.Tab value="features" leftSection={<Dot />}>
          Features
        </Tabs.Tab>
        <Tabs.Tab value="pricing" leftSection={<Dot />}>
          Pricing
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview" pt="md">
        <Text>High-level summary of the selected solution.</Text>
      </Tabs.Panel>
      <Tabs.Panel value="features" pt="md">
        <Text>What is included, broken down by capability.</Text>
      </Tabs.Panel>
      <Tabs.Panel value="pricing" pt="md">
        <Text>Plan tiers and what each one includes.</Text>
      </Tabs.Panel>
    </Tabs>
  ),
}

function Dot() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
      <circle cx="4" cy="4" r="4" fill="currentColor" />
    </svg>
  )
}
