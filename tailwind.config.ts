import type { Config } from 'tailwindcss'
import { brand, neutral, baseNeutral, status, surfaces, action, components, charts } from './src/tokens/colors'
import { fontFamily } from './src/tokens/typography'
import { spacing, size, radius } from './src/tokens/spacing'
import { boxShadow } from './src/tokens/shadows'

const neutralScale = Object.fromEntries(Object.entries(neutral).map(([k, v]) => [k, v]))
const baseNeutralScale = Object.fromEntries(Object.entries(baseNeutral).map(([k, v]) => [k, v]))

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,mdx}', './preview/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand,
        neutral: neutralScale,
        'base-neutral': baseNeutralScale,
        status,
        surfaces,
        action,
        components,
        charts,
      },
      fontFamily: {
        sans: [fontFamily.sans],
        label: [fontFamily.label],
        ui: [fontFamily.ui],
        code: [fontFamily.code],
      },
      spacing: { ...spacing, ...size },
      borderRadius: radius,
      boxShadow,
      keyframes: {
        'accordion-in': {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-in': {
          from: { opacity: '0', transform: 'scale(0.7)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-in': 'accordion-in 180ms ease-out',
        'pop-in': 'pop-in 150ms ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config
