import type { CSSProperties, ReactNode } from 'react'
import type { TextStyle } from '../tokens/typography'

const cell: CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid rgba(128,128,128,0.2)',
  fontSize: 13,
  verticalAlign: 'middle',
  textAlign: 'left',
}

const mono: CSSProperties = { ...cell, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }

function Table({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} style={{ ...cell, fontWeight: 700, opacity: 0.7 }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}

export function ColorTable({ group, tokens }: { group: string; tokens: Record<string, string> }) {
  return (
    <Table headers={['', 'Token', 'Tailwind class', 'Value']}>
      {Object.entries(tokens).map(([name, value]) => (
        <tr key={name}>
          <td style={{ ...cell, width: 56 }}>
            <span
              style={{
                display: 'block',
                width: 40,
                height: 24,
                borderRadius: 4,
                background: value,
                border: '1px solid rgba(128,128,128,0.35)',
              }}
            />
          </td>
          <td style={mono}>
            {group}.{name}
          </td>
          <td style={mono}>
            bg-{group}-{name}
          </td>
          <td style={mono}>{value}</td>
        </tr>
      ))}
    </Table>
  )
}

export function TypeTable({ group, tokens }: { group: string; tokens: Record<string, TextStyle> }) {
  return (
    <Table headers={['Preview', 'Token', 'Size / Line height / Weight']}>
      {Object.entries(tokens).map(([name, style]) => (
        <tr key={name}>
          <td style={{ ...cell, maxWidth: 380 }}>
            <span
              style={{
                fontFamily: style.fontFamily,
                fontSize: style.fontSize,
                fontWeight: style.fontWeight,
                lineHeight: `${style.lineHeight}px`,
                letterSpacing: style.letterSpacing,
              }}
            >
              The quick brown fox
            </span>
          </td>
          <td style={mono}>
            {group}.{name}
          </td>
          <td style={mono}>
            {style.fontSize}px / {style.lineHeight}px / {style.fontWeight}
          </td>
        </tr>
      ))}
    </Table>
  )
}

export function ScaleTable({
  tokens,
  classPrefix,
}: {
  tokens: Record<string, string>
  classPrefix: string
}) {
  return (
    <Table headers={['', 'Token', 'Example class', 'Value']}>
      {Object.entries(tokens).map(([name, value]) => (
        <tr key={name}>
          <td style={{ ...cell, width: 140 }}>
            <span style={{ display: 'block', width: value, height: 12, background: '#0b5fff', borderRadius: 2 }} />
          </td>
          <td style={mono}>{name}</td>
          <td style={mono}>
            {classPrefix}-{name}
          </td>
          <td style={mono}>{value}</td>
        </tr>
      ))}
    </Table>
  )
}

export function RadiusTable({ tokens }: { tokens: Record<string, string> }) {
  return (
    <Table headers={['Preview', 'Token', 'Tailwind class', 'Value']}>
      {Object.entries(tokens).map(([name, value]) => (
        <tr key={name}>
          <td style={{ ...cell, width: 100 }}>
            <span
              style={{
                display: 'block',
                width: 64,
                height: 40,
                background: '#1f2531',
                border: '1px solid #0b5fff',
                borderRadius: value,
              }}
            />
          </td>
          <td style={mono}>{name}</td>
          <td style={mono}>rounded-{name}</td>
          <td style={mono}>{value}</td>
        </tr>
      ))}
    </Table>
  )
}

export function ShadowTable({ tokens }: { tokens: Record<string, string> }) {
  return (
    <Table headers={['Preview', 'Token', 'Tailwind class', 'Value']}>
      {Object.entries(tokens).map(([name, value]) => (
        <tr key={name}>
          <td style={{ ...cell, width: 120 }}>
            <span
              style={{
                display: 'block',
                width: 72,
                height: 40,
                borderRadius: 8,
                background: '#1f2531',
                boxShadow: value,
              }}
            />
          </td>
          <td style={mono}>{name}</td>
          <td style={mono}>shadow-{name}</td>
          <td style={{ ...mono, fontSize: 11 }}>{value}</td>
        </tr>
      ))}
    </Table>
  )
}
