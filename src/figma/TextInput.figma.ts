// url=https://www.figma.com/design/KihJKyGA20stc2SSjAlxYU/Solutions-Library--2026?node-id=16166-23969
// source=src/index.ts
// component=TextInput
//
// Figma's "Input" is Mantine's TextInput here. This template covers Type=Text; the component set
// also defines Type=Dropdown (Mantine's `Select`) and Type=Text Area (`Textarea`), which share the
// same input chrome from the theme.
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('Condensed', {
  True: 'md',
  False: 'lg',
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
    <TextInput
      ${hasLabel ? figma.code`label="${label}"` : ''}
      size="${size}"
      placeholder="${placeholder}"
      ${required ? 'required withAsterisk' : ''}
      ${disabled ? 'disabled' : ''}
      ${hasHelpText ? 'description="..."' : ''}
      ${iconLeftCode ? figma.code`leftSection={${iconLeftCode}}` : ''}
      ${iconRightCode ? figma.code`rightSection={${iconRightCode}}` : ''}
    />
  `,
  imports: ['import { TextInput } from "solutions-design-system"'],
  id: 'text-input',
  metadata: { nestable: true },
}
