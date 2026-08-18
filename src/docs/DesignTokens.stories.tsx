import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  BrandTable,
  FontSizeTable,
  NeutralTable,
  RadiusTable,
  SemanticTable,
  SpacingTable,
} from './TokenTable'

/**
 * The token tables are defined as stories rather than as raw JSX inside the MDX page: content in
 * an MDX body renders outside the preview decorators, so it would have no `MantineProvider` and no
 * `--sds-*` variables. As stories they inherit both, and follow the toolbar's colour-scheme
 * control like everything else.
 *
 * `!dev` keeps them out of the sidebar — they are only ever shown embedded in the docs page.
 */
const meta = {
  title: 'Overview/Design Tokens',
  tags: ['!dev', '!autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Brand: Story = { render: () => <BrandTable /> }
export const Neutral: Story = { render: () => <NeutralTable /> }
export const Semantic: Story = { render: () => <SemanticTable /> }
export const Spacing: Story = { render: () => <SpacingTable /> }
export const Radius: Story = { render: () => <RadiusTable /> }
export const TypeScale: Story = { render: () => <FontSizeTable /> }
