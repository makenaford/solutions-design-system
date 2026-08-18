import {
  Accordion,
  Anchor,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Pagination,
  Paper,
  Radio,
  Tabs,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { buttonSizes, type ButtonSizeKey } from './tokens'
import classes from './components.module.css'

/**
 * Central component configuration for the theme.
 *
 * This is where the design system's look actually lives: each Mantine component is given the
 * Figma defaults it should start from, plus the class names that implement its variants. Because
 * it is configured once here, a call site only ever needs a `variant` / `size` / `radius` prop —
 * no component in this library repeats a colour, border or shadow of its own.
 */
export const componentTheme = {
  /** Surfaces. `variant="glass"` is the Figma "glass effect card" treatment, shared by Card,
   *  IconCard, Form and the Tabs bar; `data-interactive` adds the marketing hover-lift. */
  Paper: Paper.extend({
    classNames: { root: classes.glassSurface },
    defaultProps: { radius: 'md' },
  }),

  Card: Card.extend({
    classNames: { root: classes.glassSurface },
    defaultProps: { radius: 'md', padding: 'md' },
  }),

  /**
   * Figma Button: gradient "Solid" fill, glass "Outline", 10px default radius. "Rounded" in Figma
   * is the same button at `radius="round"`, so it is a radius rather than a variant.
   *
   * Both `classNames` and `vars` use their function form here because the output genuinely depends
   * on the props:
   *
   * - `classNames` withholds the hover-lift/press class from buttons that shouldn't react.
   *   `:disabled` is expressible in CSS, but Mantine's `loading` state is not — a loading button is
   *   still an enabled button — so the decision is made here instead.
   * - `vars` maps the Figma size ramp onto Mantine's button CSS variables. Mantine's own `sm/md/lg`
   *   geometry doesn't match the source design, and its icon gap is hardcoded to `spacing.xs`,
   *   so both are driven from `tokens.buttonSizes`.
   */
  Button: Button.extend({
    defaultProps: { size: 'md', radius: 'lg' },

    classNames: (_theme, props) => {
      const isInert = props.disabled || props.loading
      return {
        root: isInert ? classes.button : `${classes.button} ${classes.buttonInteractive}`,
        section: classes.buttonSection,
      }
    },

    vars: (_theme, props) => {
      const size = (props.size ?? 'md') as string
      const spec = buttonSizes[size as ButtonSizeKey]

      // Unknown or `compact-*` sizes fall through to Mantine's own scale untouched.
      if (!spec) return { root: {} }

      return {
        root: {
          '--button-height': spec.height,
          '--button-fz': spec.fontSize,
          '--button-padding-x': spec.paddingX,
          '--sds-button-gap': spec.gap,
        },
      }
    },
  }),

  /** Figma Tabs: glass pill bar with a gradient selected pill. */
  Tabs: Tabs.extend({
    classNames: { list: classes.tabsList, tab: classes.tab },
    defaultProps: { variant: 'pills', radius: 'round' },
  }),

  Accordion: Accordion.extend({
    classNames: {
      item: classes.accordionItem,
      control: classes.accordionControl,
      label: classes.accordionLabel,
      chevron: classes.accordionChevron,
      content: classes.accordionPanelContent,
    },
    defaultProps: { radius: 'lg' },
  }),

  /** Selection controls share the Figma gradient fill and pop-in animation. Note the differing
   *  selector names: Checkbox exposes `input`, Radio exposes `radio`. */
  Checkbox: Checkbox.extend({
    classNames: { input: classes.controlInput, icon: classes.controlIcon },
    defaultProps: { size: 'md', radius: 'xs' },
  }),

  Radio: Radio.extend({
    classNames: { radio: classes.controlInput, icon: classes.controlIcon },
    defaultProps: { size: 'md' },
  }),

  TextInput: TextInput.extend({
    classNames: { input: classes.inputElement },
    defaultProps: { size: 'md', radius: 'md' },
  }),

  Pagination: Pagination.extend({
    classNames: { control: classes.paginationControl },
    defaultProps: { radius: 'lg' },
  }),

  /** Figma Tag: "Tonal" maps to Mantine's `light`, "Outline" to `outline`. */
  Badge: Badge.extend({
    classNames: { label: classes.badge },
    defaultProps: { variant: 'light', radius: 'sm', size: 'md' },
  }),

  /** Figma Label/Chip. */
  Chip: Chip.extend({
    classNames: { label: classes.chipLabel },
    defaultProps: { radius: 'md', size: 'sm' },
  }),

  /** Body copy defaults to the Figma secondary text colour; headings to primary. */
  Text: Text.extend({
    defaultProps: { c: 'var(--sds-text-secondary)' },
  }),

  Title: Title.extend({
    defaultProps: { c: 'var(--sds-text-primary)' },
  }),

  Anchor: Anchor.extend({
    defaultProps: { c: 'var(--sds-link-default)', underline: 'hover' },
  }),
}
