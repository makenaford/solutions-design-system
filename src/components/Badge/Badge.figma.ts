// url=https://www.figma.com/design/KihJKyGA20stc2SSjAlxYU/Solutions-Library--2026?node-id=22729-3208
// source=src/components/Badge/Badge.tsx
// component=Badge
import figma from 'figma'
const instance = figma.selectedInstance

const count = instance.findText('2')
const label = count && count.type === 'TEXT' ? count.textContent : '2'

export default {
  example: figma.code`<Badge>${label}</Badge>`,
  imports: ['import { Badge } from "solutions-design-system"'],
  id: 'badge',
  metadata: { nestable: true },
}
