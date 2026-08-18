# Solutions Design System

React + TypeScript + Tailwind component library generated from the Figma **"Solutions Library- 2026"** design library (file key `KihJKyGA20stc2SSjAlxYU`).

## Install

Requires [pnpm](https://pnpm.io) (this repo does not use npm/yarn). Version and Node requirement
are pinned in `package.json`'s `packageManager`/`engines` fields.

```bash
pnpm install
```

### Workspace security policies

`pnpm-workspace.yaml` sets a few supply-chain hardening options for this repo — see the comments
in that file for details:

- `engineStrict: true` — fail instead of warn if the running Node version doesn't satisfy `engines`.
- `minimumReleaseAge: 10080` — don't install any dependency (direct or transitive) until it's been
  published for at least a week.
- `blockExoticSubdeps: true` — only direct dependencies may resolve from a git/tarball URL.
- `trustPolicy: no-downgrade` with `trustPolicyIgnoreAfter: 131040` — refuse a publisher
  trust-level downgrade for a version already in the lockfile, unless that version has been out
  for more than a quarter year.

## Use

```tsx
import { Button, Input, Badge } from 'solutions-design-system'
import 'solutions-design-system/dist/style.css'

function Example() {
  return (
    <div>
      <Badge>New</Badge>
      <Input label="Email" placeholder="you@company.com" />
      <Button color="primary" variant="solid" size="medium">
        Continue
      </Button>
    </div>
  )
}
```

## Structure

- `src/tokens/` — colors, typography, spacing, and shadow tokens extracted from the Figma library's variables and styles. Wired into `tailwind.config.ts` as theme extensions.
- `src/components/` — one folder per component, each exporting a named component + a `<Name>Props` TypeScript type, plus any real exported icon/image assets used by that component.
- `src/assets/glass-icons/` — the exported "glass icon" illustration set (Figma's `card-icon variable` component), organized by category. Any illustrative icon inside a card (`Card`, `IconCard`, and their Storybook examples) should use one of these rather than a hand-drawn placeholder — import the specific `.svg` and render it with `<img src={icon} className="size-full" />`, matching the existing usage in `Card.stories.tsx`/`IconCard.stories.tsx`.

## Components

Accordion, Badge, Button, Card, Checkbox, Form, IconCard, Input, Label, Pagination, Radio, Search, TableOfContents, Tabs, Tag.

`Card` maps to the Figma **card-main** component (node `16728:26513`) and models its `align`
(vertical/horizontal) and `padding` (true/false) variants as props, with slots for image, icon,
title/description, top/main/bottom content. The "Special Cards" shown alongside card-main in
Figma (Resource, Stat Highlight, CS-Stat, CS-Quote, Quick Link, Icon-Left, ...) aren't separate
components — they're this same `Card` composed with different slot content. See the Storybook
stories for examples of each.

## Verified

`pnpm install && pnpm run build` (tsc + vite) passes clean. The component set was also visually smoke-tested in a live browser preview (see `preview/main.tsx`), which caught and fixed four real bugs before this was usable:

- **Checkbox** — the checkmark glyph was rotated the wrong direction and rendered as a `>` arrow instead of a tick.
- **Accordion** — the expand/collapse chevron used an invalid Tailwind class (`-rotate-135`, not a real utility — Tailwind only ships 45/90/180 by default) so it never rotated, and the expanded-state icon transform pointed the wrong way; the panel content also had no text color set, making it invisible on the dark background.
- **Input** — when a `label` was passed alongside a native `placeholder`, both rendered on top of each other in the resting (unfocused, empty) state. The placeholder now only shows once the label has floated up.
- **IconCard** — the icon was left-aligned above centered title/description text in the vertical layout; now centered to match.

## Known gaps to review against the live Figma file

A handful of components were generated from an ambiguous or mismatched Figma node and are worth a design review (not a code bug, but worth confirming against source):

- **Pagination** — no assembled pagination bar existed at the given node; rebuilt from the library's link/arrow styles.
- **Search** — no standalone Search input was reachable via the API; built from the search icon + Input field chrome.
- **Input** — the given node resolved to a Dropdown component, not Input; built from the actual Input component set instead.
- **Label** — the given node's reusable component is named "Chip" in Figma; there's a separate "Label CTA" component that may have been the intended target.
- **Button** — the given node was a single instance, not the component set; built from the actual component set found elsewhere in the file.
- **IconCard** — only the vertical/desktop variant was available to inspect; horizontal layout is inferred, not traced.
