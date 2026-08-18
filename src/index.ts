/**
 * Solutions Design System — public entry point.
 *
 * The library is a Mantine theme plus a small set of compositions. Most "components" in the design
 * system are Mantine primitives configured centrally in `src/theme/components.ts`, so they are
 * re-exported here rather than wrapped: importing `Button` from this package gives you Mantine's
 * Button already carrying the Figma styling, with Mantine's own props.
 */

// ---------------------------------------------------------------- theme --------------------
export { SolutionsProvider, theme, cssVariablesResolver, tokens } from './theme'
export type { SolutionsProviderProps } from './theme'

// ---------------------------------------------------------------- wrappers -----------------
// Thin wrappers over Mantine primitives, kept so the design system owns the import surface.
export { Button } from './components/Button/Button'
export type { ButtonProps } from './components/Button/Button'

// ---------------------------------------------------------------- compositions -------------
// Components with structure of their own, built on Mantine primitives.
export { Card } from './components/Card/Card'
export type { CardProps } from './components/Card/Card'

export { IconCard } from './components/IconCard/IconCard'
export type { IconCardProps } from './components/IconCard/IconCard'

export { Form } from './components/Form/Form'
export type { FormProps } from './components/Form/Form'

export { Search } from './components/Search/Search'
export type { SearchProps } from './components/Search/Search'

export { TableOfContents } from './components/TableOfContents/TableOfContents'
export type {
  TableOfContentsEntry,
  TableOfContentsProps,
} from './components/TableOfContents/TableOfContents'

// ---------------------------------------------------------------- themed primitives --------
/**
 * Mantine components styled by this library's theme. They are re-exported so consumers have a
 * single import surface, and so the design system controls which primitives are part of its
 * supported API.
 *
 * Mapping from the pre-Mantine component set:
 *   Input -> TextInput ·  Tag -> Badge ·  Label -> Chip
 */
export {
  Accordion,
  Anchor,
  Badge,
  Box,
  Checkbox,
  Chip,
  Divider,
  Group,
  Image,
  Pagination,
  Paper,
  Radio,
  Select,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'

export type {
  AccordionProps,
  AnchorProps,
  BadgeProps,
  BoxProps,
  CheckboxProps,
  ChipProps,
  DividerProps,
  GroupProps,
  ImageProps,
  PaginationProps,
  PaperProps,
  RadioProps,
  SelectProps,
  StackProps,
  TabsProps,
  TextProps,
  TextInputProps,
  TitleProps,
} from '@mantine/core'
