import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconCard } from './IconCard'
import iconCiCd from '../../assets/glass-icons/Product Modules/CI CD.svg'
import iconComposable from '../../assets/glass-icons/General/Composable.svg'

const meta = {
  title: 'Components/Icon Card',
  component: IconCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Glass card pairing an icon with a title and supporting copy. Maps to Figma node `22731:39553`. Only the vertical desktop variant was available to inspect in the source file — the horizontal layout is inferred and worth a design review. The icon is consumer-supplied, not baked in.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    size: { control: 'inline-radio', options: ['desktop', 'mobile'] },
    icon: { control: false },
  },
  args: {
    icon: <GlassIcon src={iconCiCd} label="CI/CD" />,
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
    <div className="grid grid-cols-2 gap-5">
      <IconCard {...args} size="mobile" title="Ship faster" icon={<GlassIcon src={iconCiCd} label="CI/CD" />} />
      <IconCard {...args} size="mobile" title="Stay consistent" icon={<GlassIcon src={iconComposable} label="Composable" />} />
    </div>
  ),
}

/** Renders one of the library's exported "glass icon" assets (`src/assets/glass-icons/`) — the
 * illustrative icon set from Figma's `card-icon variable` component. Cards should always use one
 * of these rather than a hand-drawn placeholder. */
function GlassIcon({ src, label }: { src: string; label: string }) {
  return <img src={src} alt="" role="presentation" aria-label={label} className="size-full" />
}
