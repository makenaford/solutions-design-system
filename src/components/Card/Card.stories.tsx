import type { Meta, StoryObj } from '@storybook/react-vite'
import { AspectRatio, Badge, Blockquote, Box, Group, Stack, Text, Title } from '@mantine/core'
import { Button } from '../Button/Button'
import { Card } from './Card'
import classes from '../../stories/stories.module.css'
import iconDam from '../../assets/glass-icons/Data/DAM.svg'
import iconAnalytics from '../../assets/glass-icons/Performance/Analytics.svg'
import iconTestimonies from '../../assets/glass-icons/Customer Support/Testimonies.svg'
import iconDocumentation from '../../assets/glass-icons/Education/Documentation.svg'
import iconVerification from '../../assets/glass-icons/Security/Verification.svg'

/** Renders one of the library's glass icons at the Figma 48px `card-icon` size. */
function GlassIcon({ src }: { src: string }) {
  return <img src={src} alt="" width={48} height={48} />
}

/**
 * Stand-in for a card image. The gradient is the one thing here without a top-level prop
 * equivalent (`bg` takes a colour, not a gradient), so it lives in the stories' CSS module —
 * defined once and shared by every story that needs a placeholder.
 */
function PlaceholderImage() {
  return (
    <AspectRatio ratio={3 / 2}>
      <Box bdrs="md" className={classes.placeholderImage} />
    </AspectRatio>
  )
}

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    // Width comes from the shared StoryFrame rather than a wrapper div in each story.
    frame: { width: 400 },
    docs: {
      description: {
        component: [
          'Base card layout, mapped to the Figma **card-main** component (node `16728:26513`).',
          '',
          'Its slots — image, top content, header, two main-content slots, bottom content — and its',
          '`orientation` axis are props here. The glass surface comes from `variant="glass"`, which is',
          'defined once in the theme and shared with `IconCard`, `Form` and the `Tabs` bar; pass',
          '`variant={undefined}` for the Figma "Padding=False" case where the card sits inside a',
          'surface that already provides its own chrome.',
          '',
          'The "Special Cards" stories below are all this same component with different slot content.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    variant: { control: 'inline-radio', options: ['glass', undefined] },
    icon: { control: false },
    image: { control: false },
    topContent: { control: false },
    mainContent1: { control: false },
    mainContent2: { control: false },
    bottomContent: { control: false },
  },
  args: {
    orientation: 'vertical',
    variant: 'glass',
    title: 'Card Title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: <GlassIcon src={iconDam} />,
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithImage: Story = {
  args: { image: <PlaceholderImage /> },
}

export const Horizontal: Story = {
  parameters: { frame: { width: 760 } },
  args: { orientation: 'horizontal', image: <PlaceholderImage /> },
}

export const WithoutSurface: Story = {
  name: 'Padding = False',
  parameters: {
    docs: {
      description: {
        story:
          'Figma\'s "Padding=False" variant: bare content with no glass surface, for embedding inside a container that already has its own chrome.',
      },
    },
  },
  args: { variant: undefined, image: <PlaceholderImage /> },
}

export const WithoutIcon: Story = {
  args: { icon: undefined },
}

// --- Special Cards -------------------------------------------------------------------------
// Shown alongside card-main in Figma as ready-made examples. Each is this same Card with
// different slot content — they are not separate components.

export const SpecialResource: Story = {
  name: 'Special Card / Resource',
  parameters: {
    docs: {
      description: { story: 'Resource/blog card: image with an overlaid category label, title only.' },
    },
  },
  render: () => (
    <Card
      image={
        <Box pos="relative">
          <PlaceholderImage />
          <Badge pos="absolute" left={12} bottom={12}>
            Resource
          </Badge>
        </Box>
      }
      title="5 ways to modernize your customer portal"
    />
  ),
}

export const SpecialStatHighlight: Story = {
  name: 'Special Card / Stat Highlight',
  parameters: {
    docs: { description: { story: 'A single highlighted statistic as the main content.' } },
  },
  render: () => (
    <Card
      icon={<GlassIcon src={iconAnalytics} />}
      title="Customer growth"
      description="Year over year, across all regions."
      mainContent1={
        <Text fz={40} fw={700} c="brand.4">
          +128%
        </Text>
      }
    />
  ),
}

export const SpecialCsStat: Story = {
  name: 'Special Card / CS-Stat',
  parameters: {
    docs: { description: { story: 'Customer-story card pairing two stats.' } },
  },
  render: () => (
    <Card
      image={<PlaceholderImage />}
      title="Airbus"
      mainContent1={
        <Group gap="lg" grow>
          <Stat value="60%" label="Faster releases" />
          <Stat value="3.2x" label="Developer output" />
        </Group>
      }
    />
  ),
}

export const SpecialCsQuote: Story = {
  name: 'Special Card / CS-Quote',
  parameters: {
    docs: { description: { story: 'A customer quote in the bottom-content slot.' } },
  },
  render: () => (
    <Card
      icon={<GlassIcon src={iconTestimonies} />}
      title="Enterprise Websites"
      bottomContent={
        <Blockquote color="brand" p="md">
          “This platform let us ship in weeks what used to take quarters.”
        </Blockquote>
      }
    />
  ),
}

export const SpecialQuickLink: Story = {
  name: 'Special Card / Quick Link',
  parameters: {
    docs: { description: { story: 'Compact link-out card with a tag and an action.' } },
  },
  render: () => (
    <Card
      icon={<GlassIcon src={iconDocumentation} />}
      title="Developer documentation"
      topContent={<Badge size="sm">Docs</Badge>}
      bottomContent={
        <Group>
          <Button variant="outline" size="sm">
            Read more
          </Button>
        </Group>
      }
    />
  ),
}

export const SpecialIconLeft: Story = {
  name: 'Special Card / Icon-Left',
  parameters: {
    docs: {
      description: {
        story: 'The most compact card — icon, title and description only, for feature-callout lists.',
      },
    },
  },
  render: () => (
    <Card
      icon={<GlassIcon src={iconVerification} />}
      title="Single sign-on"
      description="Connect your identity provider once and every solution inherits it."
    />
  ),
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Stack gap={4}>
      <Title order={3} size="h2" c="var(--sds-text-primary)">
        {value}
      </Title>
      <Text size="sm">{label}</Text>
    </Stack>
  )
}
