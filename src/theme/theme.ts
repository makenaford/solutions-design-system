import { createTheme, colorsTuple, virtualColor, type MantineColorsTuple } from '@mantine/core'
import {
  accent,
  brand,
  effects,
  fontFamily,
  fontSizes,
  headingSizes,
  lineHeights,
  neutralDark,
  neutralLight,
  radius,
  spacing,
  status,
} from './tokens'
import { componentTheme } from './components'

/** Builds the light/dark pair plus the `virtualColor` that switches between them, for a token that
 *  Figma defines differently per mode. Keeps the three related entries declared in one place. */
function modeColor(name: string, light: string, dark: string) {
  return {
    [`${name}Light`]: colorsTuple(light),
    [`${name}Dark`]: colorsTuple(dark),
    [name]: virtualColor({ name, light: `${name}Light`, dark: `${name}Dark` }),
  }
}

/**
 * The Mantine theme for the Solutions Design System.
 *
 * Every value traces back to `./tokens.ts`, which is transcribed from the Figma library. Component
 * appearance is configured centrally in `./components.ts` so that a given treatment (the glass
 * surface, the gradient button fill, the pill tab bar) is defined once and reached through a
 * `variant` prop rather than repeated at call sites.
 */
export const theme = createTheme({
  primaryColor: 'brand',
  /** `Brand/Primary/Primary` (#0b5fff) is index 6 and is identical in both Figma modes. */
  primaryShade: 6,
  autoContrast: true,

  colors: {
    brand: brand as unknown as MantineColorsTuple,

    /** Semantic neutral ramp. Figma inverts it between modes, so the two real ramps are registered
     *  and a virtual colour picks the right one — `c="neutral.5"` then means the same thing
     *  visually in light and dark. */
    neutralLight: neutralLight as unknown as MantineColorsTuple,
    neutralDark: neutralDark as unknown as MantineColorsTuple,
    neutral: virtualColor({ name: 'neutral', light: 'neutralLight', dark: 'neutralDark' }),

    /** Status + accent colours. Figma publishes a single value per mode rather than a ramp, so
     *  these are flat tuples — no intermediate shades are invented. */
    ...modeColor('error', status.error.light, status.error.dark),
    ...modeColor('warning', status.warning.light, status.warning.dark),
    ...modeColor('success', status.success.light, status.success.dark),
    ...modeColor('info', status.info.light, status.info.dark),
    ...modeColor('accent', accent.light, accent.dark),
  },

  white: '#ffffff', // Figma Neutral/00 — white in both modes
  black: neutralLight[9], // Figma light Neutral/10

  fontFamily: fontFamily.sans,
  fontFamilyMonospace: fontFamily.mono,
  headings: {
    fontFamily: fontFamily.sans,
    fontWeight: '600',
    sizes: {
      h1: headingSizes.h1,
      h2: headingSizes.h2,
      h3: headingSizes.h3,
      h4: headingSizes.h4,
      h5: headingSizes.h5,
      h6: headingSizes.h6,
    },
  },
  fontSizes,
  lineHeights,
  /** Figma weights: Regular 400, SemiBold 600, Bold 700, ExtraBold 800 (Manrope labels). */
  fontWeights: { regular: '400', medium: '600', bold: '700' },

  spacing,
  radius,
  /** Figma `Border Radius/Default` = 10px. */
  defaultRadius: 'lg',

  shadows: {
    /** Figma `Shadow/Dropdown`. */
    xs: effects.dropdown,
    sm: effects.dropdown,
    md: effects.dropdown,
    /** Figma `glass effect card` drop shadow: offset 0 0, radius 6, spread 1, colour
     *  `Components/Glass Card/shadow` (mode-dependent, hence the variable). */
    lg: '0 0 6px 1px var(--sds-glass-shadow)',
    /** Hover lift for marketing surfaces — an extension, not a published Figma effect. */
    xl: '0 12px 24px -8px rgba(11, 95, 255, 0.25)',
  },

  components: componentTheme,
})
