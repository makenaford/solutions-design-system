// url=https://www.figma.com/design/KihJKyGA20stc2SSjAlxYU/Solutions-Library--2026?node-id=16858-51126
// source=src/index.ts
// component=Chip
//
// The Figma component is named "Chip" (it was previously exported from this library as `Label`),
// and maps directly onto Mantine's Chip.
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')

const checked = instance.getEnum('State', {
  Default: false,
  Selected: true,
  Focused: false,
  Disabled: false,
  Dragged: false,
})
const disabled = instance.getEnum('State', {
  Default: false,
  Selected: false,
  Focused: false,
  Disabled: true,
  Dragged: false,
})

export default {
  example: figma.code`
    <Chip
      ${checked ? 'defaultChecked' : ''}
      ${disabled ? 'disabled' : ''}
    >
      ${label}
    </Chip>
  `,
  imports: ['import { Chip } from "solutions-design-system"'],
  id: 'chip',
  metadata: { nestable: true },
}
