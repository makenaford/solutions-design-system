// url=https://www.figma.com/design/KihJKyGA20stc2SSjAlxYU/Solutions-Library--2026?node-id=16988-69247
// source=src/index.ts
// component=Badge
//
// Figma's "Tag" is Mantine's Badge here: Style=Tonal -> variant="light",
// Style=Outline -> variant="outline".
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Style', {
  Tonal: 'light',
  Outline: 'outline',
})
const size = instance.getEnum('Size', {
  Regular: 'md',
  Small: 'sm',
})

const label = instance.getString('Text')

const hasLeftIcon = instance.getBoolean('Left Icon')
const leftIcon = hasLeftIcon ? instance.getInstanceSwap('↳ Left Icon') : null
let leftIconCode
if (leftIcon && leftIcon.type === 'INSTANCE') {
  leftIconCode = leftIcon.executeTemplate().example
}

const hasRightIcon = instance.getBoolean('Right Icon')
const rightIcon = hasRightIcon ? instance.getInstanceSwap('↳ Right Icon') : null
let rightIconCode
if (rightIcon && rightIcon.type === 'INSTANCE') {
  rightIconCode = rightIcon.executeTemplate().example
}

export default {
  example: figma.code`
    <Badge
      variant="${variant}"
      size="${size}"
      ${leftIconCode ? figma.code`leftSection={${leftIconCode}}` : ''}
      ${rightIconCode ? figma.code`rightSection={${rightIconCode}}` : ''}
    >
      ${label}
    </Badge>
  `,
  imports: ['import { Badge } from "solutions-design-system"'],
  id: 'badge',
  metadata: { nestable: true },
}
