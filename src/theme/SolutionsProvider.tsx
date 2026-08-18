import { MantineProvider, mergeThemeOverrides, type MantineProviderProps } from '@mantine/core'
import { cssVariablesResolver } from './cssVariables'
import { theme } from './theme'

export interface SolutionsProviderProps
  extends Omit<MantineProviderProps, 'theme' | 'cssVariablesResolver'> {
  /** Optional theme overrides, merged on top of the design system theme rather than replacing it. */
  theme?: MantineProviderProps['theme']
}

/**
 * Wraps `MantineProvider` with the Solutions Design System theme and its `--sds-*` variables.
 * Applications should render this once at their root — every component in this library assumes the
 * tokens it publishes are present.
 *
 * Defaults to the dark colour scheme, which is the library's native mode in Figma; pass
 * `defaultColorScheme="light"` or `"auto"` to change that.
 */
export function SolutionsProvider({
  children,
  defaultColorScheme = 'dark',
  theme: themeOverride,
  ...props
}: SolutionsProviderProps) {
  return (
    <MantineProvider
      theme={themeOverride ? mergeThemeOverrides(theme, themeOverride) : theme}
      cssVariablesResolver={cssVariablesResolver}
      defaultColorScheme={defaultColorScheme}
      {...props}
    >
      {children}
    </MantineProvider>
  )
}
