export const fontFamily = {
  sans: '"Source Sans 3", sans-serif',
  label: '"Manrope", sans-serif',
  ui: '"Inter", sans-serif',
  code: '"Source Code Pro", monospace',
} as const

export interface TextStyle {
  fontFamily: string
  fontSize: number
  fontWeight: number
  lineHeight: number
  letterSpacing: number
}

export const paragraph = {
  xsmall: { fontFamily: fontFamily.sans, fontSize: 11, fontWeight: 400, lineHeight: 16, letterSpacing: 0 },
  xsmallHeavier: { fontFamily: fontFamily.label, fontSize: 13, fontWeight: 800, lineHeight: 20, letterSpacing: 0 },
  small: { fontFamily: fontFamily.sans, fontSize: 16, fontWeight: 400, lineHeight: 20, letterSpacing: 0 },
  smallSemiBold: { fontFamily: fontFamily.sans, fontSize: 16, fontWeight: 600, lineHeight: 20, letterSpacing: 0 },
  smallHeavy: { fontFamily: fontFamily.sans, fontSize: 13, fontWeight: 600, lineHeight: 16, letterSpacing: 0 },
  extraSmall: { fontFamily: fontFamily.sans, fontSize: 14, fontWeight: 400, lineHeight: 18, letterSpacing: 0 },
  extraSmallSemiBold: { fontFamily: fontFamily.sans, fontSize: 14, fontWeight: 600, lineHeight: 18, letterSpacing: 0 },
  base: { fontFamily: fontFamily.sans, fontSize: 16, fontWeight: 400, lineHeight: 24, letterSpacing: 0 },
  baseHeavy: { fontFamily: fontFamily.sans, fontSize: 16, fontWeight: 600, lineHeight: 24, letterSpacing: 0 },
  default: { fontFamily: fontFamily.sans, fontSize: 18, fontWeight: 400, lineHeight: 23, letterSpacing: 0 },
  defaultSemiBold: { fontFamily: fontFamily.sans, fontSize: 18, fontWeight: 600, lineHeight: 23, letterSpacing: 0 },
  large: { fontFamily: fontFamily.sans, fontSize: 21, fontWeight: 400, lineHeight: 26, letterSpacing: 0 },
  largeSemiBold: { fontFamily: fontFamily.sans, fontSize: 21, fontWeight: 600, lineHeight: 26, letterSpacing: 0 },
} satisfies Record<string, TextStyle>

export const heading = {
  mobileH4Heavy: { fontFamily: fontFamily.sans, fontSize: 29, fontWeight: 700, lineHeight: 32, letterSpacing: 0 },
  mobileH7SemiBold: { fontFamily: fontFamily.sans, fontSize: 18, fontWeight: 600, lineHeight: 20, letterSpacing: 0 },
  desktopH4Heavier: { fontFamily: fontFamily.sans, fontSize: 32, fontWeight: 700, lineHeight: 40, letterSpacing: 0 },
  desktopH6Normal: { fontFamily: fontFamily.sans, fontSize: 24, fontWeight: 400, lineHeight: 30, letterSpacing: 0 },
  desktopH6SemiBold: { fontFamily: fontFamily.sans, fontSize: 24, fontWeight: 600, lineHeight: 30, letterSpacing: 0 },
  desktopH6Heavier: { fontFamily: fontFamily.sans, fontSize: 24, fontWeight: 700, lineHeight: 30, letterSpacing: 0 },
  desktopH7Heavier: { fontFamily: fontFamily.sans, fontSize: 18, fontWeight: 700, lineHeight: 23, letterSpacing: 0 },
} satisfies Record<string, TextStyle>

export const action = {
  buttonSmall: { fontFamily: fontFamily.sans, fontSize: 14, fontWeight: 600, lineHeight: 20, letterSpacing: 0 },
  buttonMedium: { fontFamily: fontFamily.sans, fontSize: 18, fontWeight: 600, lineHeight: 24, letterSpacing: 0 },
  buttonLarge: { fontFamily: fontFamily.sans, fontSize: 21, fontWeight: 600, lineHeight: 28, letterSpacing: 0 },
  linkXSmall: { fontFamily: fontFamily.sans, fontSize: 14, fontWeight: 600, lineHeight: 20, letterSpacing: 0 },
  linkXSmallHover: { fontFamily: fontFamily.sans, fontSize: 14, fontWeight: 600, lineHeight: 20, letterSpacing: 0 },
  linkXSmallActive: { fontFamily: fontFamily.sans, fontSize: 14, fontWeight: 700, lineHeight: 20, letterSpacing: 0 },
  linkMedium: { fontFamily: fontFamily.sans, fontSize: 18, fontWeight: 600, lineHeight: 24, letterSpacing: 0 },
  linkMediumHover: { fontFamily: fontFamily.sans, fontSize: 18, fontWeight: 600, lineHeight: 24, letterSpacing: 0 },
  linkMediumActive: { fontFamily: fontFamily.sans, fontSize: 18, fontWeight: 700, lineHeight: 24, letterSpacing: 0 },
  linkLarge: { fontFamily: fontFamily.sans, fontSize: 21, fontWeight: 600, lineHeight: 28, letterSpacing: 0 },
  linkLargeHover: { fontFamily: fontFamily.sans, fontSize: 21, fontWeight: 600, lineHeight: 28, letterSpacing: 0 },
  linkLargeActive: { fontFamily: fontFamily.sans, fontSize: 21, fontWeight: 700, lineHeight: 28, letterSpacing: 0 },
  inlineLinkBase: { fontFamily: fontFamily.label, fontSize: 16, fontWeight: 700, lineHeight: 24, letterSpacing: 0 },
} satisfies Record<string, TextStyle>

export const smallCaps = {
  default: { fontFamily: fontFamily.sans, fontSize: 14, fontWeight: 600, lineHeight: 20, letterSpacing: 6 },
} satisfies Record<string, TextStyle>

export const typography = { fontFamily, paragraph, heading, action, smallCaps } as const
