import { useEffect } from 'react'
import type { Decorator } from '@storybook/react-vite'

export const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? 'dark'

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  return <Story />
}
