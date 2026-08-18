import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'
import { Label } from '../Label/Label'
import { Tag } from '../Tag/Tag'
import { Button } from '../Button/Button'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Base card layout. Maps to the Figma **card-main** component (node `16728:26513`) — its three fetched variants (`Align=Vertical/Padding=True`, `Align=Horizontal/Padding=True`, `Align=Vertical/Padding=False`) share one content structure (image, header, up to two main-content slots, bottom content), modeled here as props rather than a fixed layout. `padding={false}` drops the card\'s own glass surface for embedding inside another container. The "Special Cards" stories below compose this same component to match the examples shown alongside card-main in Figma.',
      },
    },
  },
  argTypes: {
    align: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    padding: { control: 'boolean' },
    icon: { control: false },
    image: { control: false },
    topContent: { control: false },
    mainContent1: { control: false },
    mainContent2: { control: false },
    bottomContent: { control: false },
  },
  args: {
    align: 'vertical',
    padding: true,
    title: 'Card Title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: <PlaceholderIcon />,
  },
  decorators: [
    (Story) => (
      <div className="w-[400px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithImage: Story = {
  args: { image: <PlaceholderImage /> },
}

export const Horizontal: Story = {
  args: { align: 'horizontal', image: <PlaceholderImage /> },
  decorators: [
    (Story) => (
      <div className="w-[700px] max-w-full">
        <Story />
      </div>
    ),
  ],
}

export const NoPadding: Story = {
  name: 'Padding = False',
  parameters: {
    docs: {
      description: {
        story:
          'With `padding={false}` the card renders bare content only — no border, background, shadow, or blur — for embedding inside a container that already provides its own surface, matching the Figma "Padding=False" variant.',
      },
    },
  },
  args: { padding: false, image: <PlaceholderImage /> },
}

export const WithoutIcon: Story = {
  args: { icon: undefined },
}

// --- Special Cards -----------------------------------------------------
// The Figma file shows these as ready-made examples alongside card-main, each built by composing
// the base Card with different slot content. They are not separate components — just Card.

export const SpecialResource: Story = {
  name: 'Special Card / Resource',
  parameters: {
    docs: {
      description: {
        story: 'A resource/blog card: image with an overlaid category label, title only, no description.',
      },
    },
  },
  render: () => (
    <Card
      image={
        <div className="relative size-full">
          <PlaceholderImage />
          <div className="absolute bottom-3 left-3">
            <Label>Resource</Label>
          </div>
        </div>
      }
      title="5 ways to modernize your customer portal"
    />
  ),
}

export const SpecialStatHighlight: Story = {
  name: 'Special Card / Stat Highlight',
  parameters: {
    docs: {
      description: { story: 'A single highlighted statistic used as the main content, no image.' },
    },
  },
  render: () => (
    <Card
      icon={<PlaceholderIcon />}
      title="Customer growth"
      description="Year over year, across all regions."
      mainContent1={<p className="text-[40px] font-bold text-brand-primaryActive">+128%</p>}
    />
  ),
}

export const SpecialCsStat: Story = {
  name: 'Special Card / CS-Stat',
  parameters: {
    docs: {
      description: { story: 'A customer-story card pairing two stats as the main content slots.' },
    },
  },
  render: () => (
    <Card
      image={<PlaceholderImage />}
      title="Airbus"
      mainContent1={
        <div className="flex w-full items-center gap-6">
          <Stat value="60%" label="Faster releases" />
          <Stat value="3.2x" label="Developer output" />
        </div>
      }
    />
  ),
}

export const SpecialCsQuote: Story = {
  name: 'Special Card / CS-Quote',
  parameters: {
    docs: {
      description: { story: 'A customer quote used as bottom content, beneath the header.' },
    },
  },
  render: () => (
    <Card
      icon={<PlaceholderIcon />}
      title="Enterprise Websites"
      bottomContent={
        <blockquote className="w-full border-l-2 border-brand-primary pl-4 text-surfaces-textSecondary">
          "This platform let us ship in weeks what used to take quarters."
        </blockquote>
      }
    />
  ),
}

export const SpecialQuickLink: Story = {
  name: 'Special Card / Quick Link',
  parameters: {
    docs: {
      description: { story: 'A compact link-out card with a tag and an action button as bottom content.' },
    },
  },
  render: () => (
    <Card
      padding
      icon={<PlaceholderIcon />}
      title="Developer documentation"
      topContent={<Tag size="small">Docs</Tag>}
      bottomContent={
        <Button variant="outline" size="small">
          Read more
        </Button>
      }
    />
  ),
}

export const SpecialIconLeft: Story = {
  name: 'Special Card / Icon-Left',
  parameters: {
    docs: {
      description: {
        story: 'The most compact card: icon, title, and description only — no image or main content — for feature-callout lists.',
      },
    },
  },
  render: () => (
    <Card
      icon={<PlaceholderIcon />}
      title="Single sign-on"
      description="Connect your identity provider once and every solution inherits it."
    />
  ),
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <p className="text-[28px] font-bold text-surfaces-textPrimary">{value}</p>
      <p className="text-[14px] text-surfaces-textSecondary">{label}</p>
    </div>
  )
}

function PlaceholderIcon() {
  return (
    <div className="flex size-full items-center justify-center rounded-md bg-gradient-to-br from-brand-primaryHover to-brand-accent text-neutral-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l2.4 7.35H22l-6.2 4.5 2.4 7.15L12 17.5l-6.2 4.5 2.4-7.15L2 10.35h7.6L12 3z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

function PlaceholderImage() {
  return <div className="size-full bg-gradient-to-br from-brand-primaryHover via-brand-accent to-brand-primary" />
}
