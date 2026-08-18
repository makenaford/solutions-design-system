// url=https://www.figma.com/design/KihJKyGA20stc2SSjAlxYU/Solutions-Library--2026?node-id=16166-23969
// source=src/components/Input/Input.tsx
// component=Input
//
// The Figma component set also defines Type=Dropdown and Type=Text Area variants; this file's
// Input component only implements Type=Text, so this template covers that variant only.
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('Condensed', {
  True: 'default',
  False: 'large',
})
const disabled = instance.getEnum('State', {
  Default: false,
  Active: false,
  'Disabled (Read Only)': true,
})

const hasLabel = instance.getBoolean('Label')
const label = hasLabel ? instance.getString('Label Text') : undefined
const required = instance.getBoolean('Required')
const hasHelpText = instance.getBoolean('Help Text')
const placeholder = instance.getString('Placeholder Text')

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
    <Input
      ${hasLabel ? figma.code`label="${label}"` : ''}
      size="${size}"
      placeholder="${placeholder}"
      ${required ? 'required' : ''}
      ${disabled ? 'disabled' : ''}
      ${hasHelpText ? 'helpText="..."' : ''}
      ${iconLeftCode ? figma.code`leftIcon={${iconLeftCode}}` : ''}
      ${iconRightCode ? figma.code`rightIcon={${iconRightCode}}` : ''}
    />
  `,
  imports: ['import { Input } from "solutions-design-system"'],
  id: 'input',
  metadata: { nestable: true },
}
