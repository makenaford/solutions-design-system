import type { Meta, StoryObj } from '@storybook/react-vite'
import { SimpleGrid } from '@mantine/core'
import { IconCard } from './IconCard'
import iconCiCd from '../../assets/glass-icons/Product Modules/CI CD.svg'
import iconComposable from '../../assets/glass-icons/General/Composable.svg'

function GlassIcon({ src }: { src: string }) {
  return <img src={src} alt="" width={48} height={48} />
}

const meta = {
  title: 'Components/Icon Card',
  component: IconCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Glass card pairing an icon with a title and supporting copy — Figma node `22731:39553`. Only the vertical/desktop variant was available to inspect in the source file, so the horizontal layout is an inferred interpretation. Illustrative icons should come from `src/assets/glass-icons/`.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    size: { control: 'inline-radio', options: ['desktop', 'mobile'] },
    icon: { control: false },
  },
  args: {
    icon: <GlassIcon src={iconCiCd} />,
    title: 'Ship faster',
    description: 'Reuse audited components instead of rebuilding the same patterns on every project.',
    orientation: 'vertical',
    size: 'desktop',
  },
} satisfies Meta<typeof IconCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
}

export const TitleOnly: Story = {
  args: { description: undefined },
}

export const Grid: Story = {
  render: (args) => (
    <SimpleGrid cols={2} spacing="md">
      <IconCard {...args} size="mobile" title="Ship faster" icon={<GlassIcon src={iconCiCd} />} />
      <IconCard
        {...args}
        size="mobile"
        title="Stay consistent"
        icon={<GlassIcon src={iconComposable} />}
      />
    </SimpleGrid>
  ),
}
