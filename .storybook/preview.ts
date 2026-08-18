import type { Preview } from '@storybook/react-vite'
import { surfaces } from '../src/tokens/colors'
import { withTheme } from './withTheme'
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
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Light or dark theme',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'dark', icon: 'circle', title: 'Dark' },
          { value: 'light', icon: 'circlehollow', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'page' },
    theme: 'dark',
  },
  decorators: [withTheme],
  tags: ['autodocs'],
}

export default preview
