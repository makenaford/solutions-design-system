/**
 * Raw design tokens, read out of the Figma library "Solutions Library- 2026"
 * (file key `KihJKyGA20stc2SSjAlxYU`) via the Figma MCP.
 *
 * Both modes come from the two mode frames in that file:
 *   light -> "UI Components — Light Mode" (node 24146:44359)
 *   dark  -> "UI Components — Dark Mode"  (node 24148:4298)
 *
 * This file is the single source of truth for the Mantine theme — nothing else in the library
 * should hardcode a colour. Values are transcribed verbatim from Figma; where a token only exists
 * in one mode or had to be extended to fill Mantine's fixed-length scales, it is called out in a
 * comment right next to the value.
 */

/** Figma `Neutral/01`–`Neutral/10`. The ramp inverts between modes: in light it runs
 *  near-white -> near-black, in dark it runs near-black -> near-white. `Neutral/00` is pure white
 *  in both modes and is exposed as Mantine's `theme.white` instead of a ramp entry.
 *  Mantine colour tuples are exactly 10 entries, which is why 01–10 map onto indices 0–9. */
export const neutralLight = [
  '#f0f1f5', // 01 — also published as Base Colors/Neutral/01
  '#e0e4eb', // 02
  '#d1d6e0', // 03
  '#bfc6d4', // 04
  '#8c96a9', // 05
  '#667085', // 06
  '#4e576a', // 07
  '#373f4e', // 08
  '#212631', // 09
  '#070b13', // 10
] as const

export const neutralDark = [
  '#1f2531', // 01
  '#313948', // 02
  '#404b5d', // 03
  '#505e73', // 04
  '#5e6b84', // 05
  '#758096', // 06
  '#8c96a9', // 07
  '#acb4c2', // 08
  '#cbd2dc', // 09
  '#eaecf3', // 10
] as const

/**
 * Brand blue ramp. Figma publishes these as discrete named tokens rather than a numbered scale, so
 * they're ordered lightest -> darkest here to satisfy Mantine's 10-shade contract. Index 6 is
 * `Brand/Primary/Primary`, which is the same value in both modes — hence a single ramp and a
 * `primaryShade` of 6 for light and dark alike.
 */
export const brand = [
  '#e7efff', // Components/CTA Secondary/cta-sec-bg-label (light) — lightest published blue tint
  '#adc9ff', // Brand/Primary/Lighten/4
  '#7aa8ff', // Brand/Primary/Lighten/3
  '#659aff', // Action/Secondary/Text
  '#6399ff', // Action/Primary/Active (dark mode)
  '#377cff', // Brand/Primary/Lighten/1 == Action/Primary/Hover
  '#0b5fff', // Brand/Primary/Primary  <- primaryShade
  '#0053f0', // Components/CTA Primary/cta-prim-bg-step-03
  '#004ad7', // Action/Link/Default Link (light) == Components/Button Outline/text (light)
  '#003eb3', // Action/Primary/Active (light mode)
] as const

/** Figma `Accent/Product Accent` — the purple used in gradients and the glass tab stroke. */
export const accent = { light: '#7414ff', dark: '#ba8fff' } as const

/** Figma `Status/*`. Figma defines a single value per status per mode (info additionally has
 *  Lighten 2 / Darken 2), so these are applied as flat colour tuples rather than invented ramps. */
export const status = {
  error: { light: '#d60e00', dark: '#f3766d' },
  warning: { light: '#e56617', dark: '#f38a3f' },
  success: { light: '#0c8104', dark: '#2abb7f' },
  info: { light: '#004ad7', dark: '#579dff' },
  infoLighten2: { light: '#e7efff', dark: '#e9f2ff' },
  infoDarken2: { light: '#00256c', dark: '#0c66e4' },
} as const

/**
 * Semantic, mode-dependent values that aren't colour ramps. These become custom CSS variables
 * (`--sds-*`) through the theme's `cssVariablesResolver`, so they flip automatically with the
 * colour scheme and can be referenced from component props and CSS alike.
 */
export const semantic = {
  light: {
    /** Surfaces/Page BG base/Default */
    pageBg: '#fbfcfe',
    /** Surfaces/Text/* */
    textPrimary: '#262c37',
    textSecondary: '#363e4c',
    textTertiary: '#6f798e',
    /** Surfaces/Card BG/* */
    cardBgGrey: '#f4f6fb',
    cardBgBlue: '#e8eefb40',
    cardBgTranslucent: '#ffffff1a',
    /** Components/Glass Card/* + Components/Glass Line/* */
    glassStep01: '#adc9ff1a',
    glassStep02: '#8c96a908',
    glassShadow: '#adc9ff33',
    glassLine01: '#6fa0ff99',
    glassLine02: '#6fa0ff66',
    /** Components/Button Outline/* */
    buttonOutlineText: '#004ad7',
    buttonOutlineBg01: '#bbd2ff26',
    buttonOutlineBg02: '#bbd2ff00',
    buttonOutlineLine01: '#0b5fff',
    buttonOutlineLine02: '#0b5fff',
    /** Components/Label/* */
    labelTonalText: '#00256c',
    labelTonalBg: '#e7efff',
    /** Components/Glass Tab/* */
    tabGradient01: '#0b5fff',
    tabGradient02: '#0053f0',
    tabStroke01: '#377cff00',
    tabStroke02: '#7414ff00',
    tabFocusShadow: '#adc9ff',
    tabFill: '#f8faff',
    /** Action/Link/* */
    linkDefault: '#004ad7',
    /** Derived: no Figma token exists for a neutral row-hover wash, so this is a low-alpha tint of
     *  Neutral/10 rather than a published value. */
    overlayHover: 'rgba(7, 11, 19, 0.05)',
  },
  dark: {
    /** No published Page BG token for dark mode; this is Figma's `Neutral/10` from the light ramp,
     *  which is the darkest published surface and what the dark-mode frames sit on. */
    pageBg: '#070b13',
    textPrimary: '#f0f1f5',
    textSecondary: '#d1d6e0',
    textTertiary: '#d1d6e0',
    cardBgGrey: '#0f131b',
    cardBgBlue: '#6399ff0d',
    cardBgTranslucent: '#ffffff1a',
    glassStep01: '#ffffff0d',
    glassStep02: '#8c96a908',
    glassShadow: '#00000014',
    glassLine01: '#ffffff33',
    glassLine02: '#ffffff1a',
    buttonOutlineText: '#f0f1f5',
    buttonOutlineBg01: '#ffffff1a',
    buttonOutlineBg02: '#ffffff00',
    buttonOutlineLine01: '#ffffffb2',
    buttonOutlineLine02: '#70a2ff',
    labelTonalText: '#ffffff',
    labelTonalBg: '#313948',
    tabGradient01: '#ffffff1a',
    tabGradient02: '#7979790d',
    tabStroke01: '#377cff',
    tabStroke02: '#ad80f5',
    tabFocusShadow: '#1f2531',
    tabFill: '#79797908',
    linkDefault: '#74a4ff',
    /** Derived, as above — low-alpha white wash. */
    overlayHover: 'rgba(255, 255, 255, 0.06)',
  },
} as const

/** Figma `Spacing/*` and the `xsm|small|medium|large|xlg` size scale. */
export const spacing = {
  xxs: '2px', // xsm
  xs: '4px', // small / Spacing/spacing-1 / Small Button Spacing
  sm: '8px', // medium / Spacing/spacing-3 / Large Button Spacing
  md: '16px', // large / Spacing/spacing-4 / Spacing/spacing-5
  lg: '24px', // xlg
  /** Extension: no 40px token exists in Figma, but the Form and horizontal Card frames are both
   *  padded 40px, so it's captured here rather than repeated as a magic number. */
  xl: '40px',
} as const

/** Figma `Border Radius/*`. */
export const radius = {
  xs: '2px', // xsm
  sm: '4px', // Border Radius/rounded-md
  md: '8px', // Border Radius/rounded-lg
  lg: '10px', // Border Radius/Default  <- defaultRadius
  xl: '16px', // extension, for large surfaces
  round: '1000px', // round
} as const

/** Figma type ramp. Families: Source Sans 3 (body/UI), Manrope (labels), Source Code Pro (code). */
export const fontFamily = {
  sans: '"Source Sans 3", system-ui, sans-serif',
  label: '"Manrope", system-ui, sans-serif',
  mono: '"Source Code Pro", ui-monospace, monospace',
} as const

/** Figma `Paragraph/*` sizes, smallest -> largest. */
export const fontSizes = {
  xs: '11px', // Paragraph/XSmall
  sm: '14px', // Paragraph/X-Small
  md: '16px', // Paragraph/Small + Paragraph/Base
  lg: '18px', // Paragraph/Default
  xl: '21px', // Paragraph/Large
} as const

export const lineHeights = {
  xs: '16px',
  sm: '18px',
  md: '24px',
  lg: '23px',
  xl: '26px',
} as const

/** Figma `Desktop/Heading/*` and `Mobile/Heading/*`. */
export const headingSizes = {
  h1: { fontSize: '32px', lineHeight: '40px' }, // Desktop/H4/Heavier
  h2: { fontSize: '29px', lineHeight: '32px' }, // Mobile/H4/Heavy
  h3: { fontSize: '24px', lineHeight: '30px' }, // Desktop/H6
  h4: { fontSize: '21px', lineHeight: '26px' },
  h5: { fontSize: '18px', lineHeight: '23px' }, // Desktop/H7
  h6: { fontSize: '16px', lineHeight: '24px' },
} as const

/** Figma effects: `glass effect card`, `Shadow/Dropdown`, `focus shadow tab`. */
export const effects = {
  /** `glass effect card` — BACKGROUND_BLUR 100 + DROP_SHADOW(Glass Card/shadow, 0 0, r6, s1). */
  glassBlur: '100px',
  /** `focus shadow tab` — BACKGROUND_BLUR 40 + DROP_SHADOW(tab-focus-shadow, -1 1, r7, s2). */
  tabBlur: '40px',
  /** `Shadow/Dropdown` */
  dropdown: '0 4px 8px rgba(39, 40, 51, 0.12)',
} as const

/** Motion values. Not published in Figma — chosen to keep marketing-site interactions subtle and
 *  are centralised here so no component invents its own timing. */
export const motion = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  ease: 'ease-out',
} as const
