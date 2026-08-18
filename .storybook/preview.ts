import type { Preview } from '@storybook/react-vite'
import { surfaces } from '../src/tokens/colors'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      options: {
        page: { name: 'Page', value: surfaces.pageBg },
        card: { name: 'Card', value: surfaces.cardBgGrey },
      },
    },
    docs: {
      codePanel: true,
    },
    controls: {
      matchers: { color: /(background|color)$/i },
    },
    options: {
      storySort: {
        order: ['Overview', ['Introduction', 'Design Tokens'], 'Components'],
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'page' },
  },
  tags: ['autodocs'],
}

export default preview
