import type { CSSVariablesResolver } from '@mantine/core'
import { effects, motion, semantic } from './tokens'

/**
 * Publishes the semantic (non-ramp) Figma tokens as `--sds-*` CSS variables, split so the
 * colour-scheme-dependent ones land in Mantine's `light` / `dark` buckets and flip automatically
 * with `data-mantine-color-scheme`.
 *
 * Anything a component needs in more than one place lives here rather than being repeated at the
 * call site — components reference `var(--sds-…)`, and the value is defined exactly once.
 */
export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {
    '--sds-glass-blur': effects.glassBlur,
    '--sds-tab-blur': effects.tabBlur,
    '--sds-motion-fast': motion.fast,
    '--sds-motion-base': motion.base,
    '--sds-motion-slow': motion.slow,
    '--sds-motion-ease': motion.ease,
  },
  light: {
    '--mantine-color-body': semantic.light.pageBg,
    ...toVars(semantic.light),
  },
  dark: {
    '--mantine-color-body': semantic.dark.pageBg,
    ...toVars(semantic.dark),
  },
})

/** Maps a semantic token bundle onto kebab-cased `--sds-*` variable names. */
function toVars(tokens: typeof semantic.light | typeof semantic.dark) {
  return Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => [
      `--sds-${key.replace(/[A-Z0-9]+/g, (match) => `-${match.toLowerCase()}`)}`,
      value,
    ]),
  )
}
