// url=https://www.figma.com/design/KihJKyGA20stc2SSjAlxYU/Solutions-Library--2026?node-id=16858-51126
// source=src/components/Label/Label.tsx
// component=Label
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')

const selected = instance.getEnum('State', {
  Default: false,
  Selected: true,
  Focused: false,
  Disabled: false,
  Dragged: false,
})
const dragged = instance.getEnum('State', {
  Default: false,
  Selected: false,
  Focused: false,
  Disabled: false,
  Dragged: true,
})
const disabled = instance.getEnum('State', {
  Default: false,
  Selected: false,
  Focused: false,
  Disabled: true,
  Dragged: false,
})

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
    <Label
      ${selected ? 'selected' : ''}
      ${dragged ? 'dragged' : ''}
      ${disabled ? 'disabled' : ''}
      ${leftIconCode ? figma.code`leftIcon={${leftIconCode}}` : ''}
      ${rightIconCode ? figma.code`rightIcon={${rightIconCode}}` : ''}
    >
      ${label}
    </Label>
  `,
  imports: ['import { Label } from "solutions-design-system"'],
  id: 'label',
  metadata: { nestable: true },
}
