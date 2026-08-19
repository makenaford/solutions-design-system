import type { Meta, StoryObj } from '@storybook/react-vite'
import { SimpleGrid } from '@mantine/core'
import { Badge } from './Badge'
import iconCiCd from '../../assets/glass-icons/Product Modules/CI CD.svg'
import iconComposable from '../../assets/glass-icons/General/Composable.svg'

function GlassIcon({ src }: { src: string }) {
  return <img src={src} alt="" width={48} height={48} />
}

const meta = {
  title: 'Components/Badge',
  component: Badge,
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
    variant: { control: 'inline-radio', options: ['filled', 'light', 'outline', 'dot', 'transparent', 'white', 'default', 'gradient'] },
    size: { control: 'inline-radio', options: ['desktop', 'mobile'] },

  },
  args: {

    title: 'Ship faster',
    description: 'Reuse audited components instead of rebuilding the same patterns on every project.',
    orientation: 'vertical',
    size: 'desktop',
  },
} satisfies Meta<typeof Badge>

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
