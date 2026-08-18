// url=https://www.figma.com/design/KihJKyGA20stc2SSjAlxYU/Solutions-Library--2026?node-id=16123-189647
// source=src/index.ts
// component=Button
//
// Button is Mantine's Button styled by this library's theme, so the Figma axes map onto Mantine
// props: Style=Solid -> variant="filled", Style=Outline -> variant="outline", and Style=Rounded is
// a radius rather than a variant.
import figma from 'figma'
const instance = figma.selectedInstance

const color = instance.getEnum('Color', {
  Primary: 'brand',
  Neutral: 'neutral',
})
const variant = instance.getEnum('Style', {
  Solid: 'filled',
  Outline: 'outline',
  Rounded: 'filled',
})
const isRounded = instance.getEnum('Style', {
  Solid: false,
  Outline: false,
  Rounded: true,
})
const size = instance.getEnum('Size', {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
})
const disabled = instance.getEnum('State', {
  Default: false,
  Hover: false,
  Focus: false,
  Pressed: false,
  Disabled: true,
})

const hasIconLeft = instance.getBoolean('Icon Left')
const iconLeft = hasIconLeft ? instance.getInstanceSwap('↳ Icon Left') : null
let iconLeftCode
if (iconLeft && iconLeft.type === 'INSTANCE') {
  iconLeftCode = iconLeft.executeTemplate().example
}

const hasIconRight = instance.getBoolean('Icon Right')
const iconRight = hasIconRight ? instance.getInstanceSwap('↳ Icon Right') : null
let iconRightCode
if (iconRight && iconRight.type === 'INSTANCE') {
  iconRightCode = iconRight.executeTemplate().example
}

export default {
  example: figma.code`
    <Button
      color="${color}"
      variant="${variant}"
      size="${size}"
      ${isRounded ? 'radius="round"' : ''}
      ${disabled ? 'disabled' : ''}
      ${iconLeftCode ? figma.code`leftSection={${iconLeftCode}}` : ''}
      ${iconRightCode ? figma.code`rightSection={${iconRightCode}}` : ''}
    >
      Continue
    </Button>
  `,
  imports: ['import { Button } from "solutions-design-system"'],
  id: 'button',
  metadata: { nestable: true },
}
