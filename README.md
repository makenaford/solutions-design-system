# Solutions Design System

React component library built on **Mantine v9**, generated from the Figma library
**"Solutions Library- 2026"** (file key `KihJKyGA20stc2SSjAlxYU`).

📖 **[Storybook docs](https://makenaford.github.io/solutions-design-system/)**

## Install

Requires [pnpm](https://pnpm.io) (this repo does not use npm/yarn). The pnpm version and Node
requirement are pinned in `package.json`'s `packageManager` / `engines` fields — Mantine v9 needs
**Node ≥ 22.13** and **React ≥ 19.2**.

```bash
pnpm install
```

### Workspace security policies

`pnpm-workspace.yaml` sets supply-chain hardening options for this repo — see the comments in that
file for details:

- `engineStrict: true` — fail instead of warn if the running Node version doesn't satisfy `engines`.
- `minimumReleaseAge: 10080` — don't install any dependency (direct or transitive) until it's been
  published for at least a week.
- `blockExoticSubdeps: true` — only direct dependencies may resolve from a git/tarball URL.
- `trustPolicy: no-downgrade` with `trustPolicyIgnoreAfter: 131040` — refuse a publisher
  trust-level downgrade for a version already in the lockfile, unless that version has been out for
  more than a quarter year.

## Use

```tsx
import '@mantine/core/styles.css'
import { SolutionsProvider, Button, Card, TextInput } from 'solutions-design-system'

function App() {
  return (
    <SolutionsProvider defaultColorScheme="dark">
      <Card title="Get started" description="Everything is themed from Figma.">
        <TextInput label="Work email" placeholder="you@company.com" />
        <Button>Continue</Button>
      </Card>
    </SolutionsProvider>
  )
}
```

`@mantine/core`, `@mantine/hooks`, `react` and `react-dom` are peer dependencies.

## Architecture

The design system is **mostly a Mantine theme**. Rather than wrapping every primitive, the Figma
styling is configured centrally and the underlying Mantine components are re-exported, so:

- A treatment is defined **once** and reached through a `variant` prop — `<Card variant="glass">`,
  `<Button variant="outline">` — never repeated at call sites.
- Components take **Mantine's own props**, so the Mantine docs apply directly.
- Only components with structure of their own are wrapped.

```
src/theme/
  tokens.ts             Raw Figma values for both modes — the only place a colour is written
  theme.ts              createTheme(): colours, spacing, radius, typography, shadows
  components.ts         Per-component defaults + variant class wiring
  components.module.css Each shared treatment, written exactly once
  cssVariables.ts       Semantic tokens as --sds-* variables that flip with the colour scheme
  SolutionsProvider.tsx MantineProvider preconfigured with the above

src/components/         Compositions: Card, IconCard, Form, Search, TableOfContents
src/stories/            Stories for the themed Mantine primitives
src/assets/glass-icons/ Exported glass icon set, by category
src/figma/              Code Connect templates
```

### Tokens

All tokens are read from Figma via the Figma MCP, for **both** colour modes:

| Mode | Figma frame | Node |
| --- | --- | --- |
| Light | `UI Components — Light Mode` | `24146:44359` |
| Dark | `UI Components — Dark Mode` | `24148:4298` |

Two things worth knowing:

- The `Neutral/01`–`Neutral/10` ramp **inverts between modes**, so it's registered as a Mantine
  [`virtualColor`](https://mantine.dev/theming/colors/) — `c="neutral.5"` reads the same in either
  mode.
- Semantic, non-ramp values (text, card surfaces, glass, tab gradients) are emitted as `--sds-*`
  CSS variables by a `cssVariablesResolver`, so they switch automatically with
  `data-mantine-color-scheme`.

Dark is the library's native mode in Figma and is the provider default.

## Components

**Compositions** — `Card`, `IconCard`, `Form`, `Search`, `TableOfContents`.

`Card` maps to the Figma `card-main` component (node `16728:26513`) and models its slots (image,
top content, header, two main-content slots, bottom content) plus its `orientation` axis. The
"Special Cards" in Figma (Resource, Stat Highlight, CS-Stat, CS-Quote, Quick Link, Icon-Left) are
this same `Card` composed with different slot content — see the Storybook stories.

**Themed Mantine primitives** — `Button`, `Badge`, `Chip`, `Checkbox`, `Radio`, `TextInput`,
`Select`, `Tabs`, `Accordion`, `Pagination`, `Paper`, `Group`, `Stack`, `Text`, `Title`, `Anchor`,
`Image`, `Box`, `Divider`.

Illustrative icons inside cards should come from `src/assets/glass-icons/` (the Figma
`card-icon variable` set) rather than a hand-drawn placeholder — import the `.svg` and render it
at 48px, as the `Card` / `IconCard` stories do.

> **Tables** are the one exception to Mantine: build them with
> [TanStack Table](https://tanstack.com/table).

## Migrating from the Tailwind version

| Before | Now |
| --- | --- |
| `Input` | `TextInput` |
| `Tag` | `Badge` |
| `Label` | `Chip` |
| `Button`, `Checkbox`, `Radio`, `Tabs`, `Accordion`, `Pagination`, `Badge` | same names, now Mantine's components with Mantine props |
| `Card`, `IconCard`, `Form`, `Search`, `TableOfContents` | unchanged names, rebuilt on Mantine |

Prop shapes follow Mantine rather than the previous bespoke APIs — `<Button color="primary"
variant="solid">` becomes `<Button variant="filled">`, and the list-driven `Tabs tabs={[…]}` /
`Accordion items={[…]}` APIs are now Mantine's compound `Tabs.Tab` / `Accordion.Item` children.

## Verified

`pnpm build` (tsc + vite) and `pnpm build-storybook` both pass clean, and every component was
checked in the browser in **both** colour schemes. Two real bugs were caught that way during the
migration:

- **Tabs** — the `Components/Glass Tab/bg-gradient-*` tokens were applied to the tab *bar* rather
  than the *selected pill*. That reads acceptably in dark mode (both are translucent) but paints
  the entire bar solid blue in light mode, where those tokens resolve to brand blues. The bar uses
  `tab fill 1`; the pill uses the gradients.
- **Design Tokens docs page** — content in an MDX body renders outside the preview decorators, so
  the token tables had no `MantineProvider` and the page crashed. They are now defined as stories
  and embedded, which also makes them follow the colour-scheme toolbar.
