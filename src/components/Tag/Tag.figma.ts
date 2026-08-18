// url=https://www.figma.com/design/KihJKyGA20stc2SSjAlxYU/Solutions-Library--2026?node-id=16988-69247
// source=src/components/Tag/Tag.tsx
// component=Tag
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Style', {
  Tonal: 'tonal',
  Outline: 'outline',
})
const size = instance.getEnum('Size', {
  Regular: 'regular',
  Small: 'small',
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
    <Tag
      variant="${variant}"
      size="${size}"
      ${leftIconCode ? figma.code`leftIcon={${leftIconCode}}` : ''}
      ${rightIconCode ? figma.code`rightIcon={${rightIconCode}}` : ''}
    >
      ${label}
    </Tag>
  `,
  imports: ['import { Tag } from "solutions-design-system"'],
  id: 'tag',
  metadata: { nestable: true },
}
