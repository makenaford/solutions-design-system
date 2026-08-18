import { Box, Code, Group, Stack, Table, Text } from '@mantine/core'
import {
  brand,
  fontSizes,
  neutralDark,
  neutralLight,
  radius,
  semantic,
  spacing,
} from '../theme/tokens'

function Swatch({ value }: { value: string }) {
  return (
    <Box
      w={36}
      h={24}
      style={{
        borderRadius: 'var(--mantine-radius-sm)',
        border: '1px solid var(--sds-glass-line-01)',
        background: value,
      }}
    />
  )
}

/** Colour ramps registered as Mantine colours, shown with the index used to reference them. */
export function RampTable({ name, values }: { name: string; values: readonly string[] }) {
  return (
    <Table striped withTableBorder mb="xl">
      <Table.Thead>
        <Table.Tr>
          <Table.Th w={80}>Shade</Table.Th>
          <Table.Th w={80}>Swatch</Table.Th>
          <Table.Th>Value</Table.Th>
          <Table.Th>Reference</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {values.map((value, index) => (
          <Table.Tr key={index}>
            <Table.Td>{index}</Table.Td>
            <Table.Td>
              <Swatch value={value} />
            </Table.Td>
            <Table.Td>
              <Code>{value}</Code>
            </Table.Td>
            <Table.Td>
              <Code>{`${name}.${index}`}</Code>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

/** The brand ramp. */
export function BrandTable() {
  return <RampTable name="brand" values={brand} />
}

/**
 * The neutral ramp, shown for both modes side by side — Figma inverts it between light and dark,
 * which is why it is registered as a Mantine `virtualColor`.
 */
export function NeutralTable() {
  return (
    <Table striped withTableBorder mb="xl">
      <Table.Thead>
        <Table.Tr>
          <Table.Th w={80}>Shade</Table.Th>
          <Table.Th>Light</Table.Th>
          <Table.Th>Dark</Table.Th>
          <Table.Th>Reference</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {neutralLight.map((light, index) => (
          <Table.Tr key={index}>
            <Table.Td>{index}</Table.Td>
            <Table.Td>
              <Group gap="xs">
                <Swatch value={light} />
                <Code>{light}</Code>
              </Group>
            </Table.Td>
            <Table.Td>
              <Group gap="xs">
                <Swatch value={neutralDark[index]} />
                <Code>{neutralDark[index]}</Code>
              </Group>
            </Table.Td>
            <Table.Td>
              <Code>{`neutral.${index}`}</Code>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

/** Semantic surface tokens, published as `--sds-*` CSS variables that flip with the colour scheme. */
export function SemanticTable() {
  const keys = Object.keys(semantic.light) as Array<keyof typeof semantic.light>
  return (
    <Table striped withTableBorder mb="xl">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>CSS variable</Table.Th>
          <Table.Th>Light</Table.Th>
          <Table.Th>Dark</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {keys.map((key) => {
          const cssName = `--sds-${key.replace(/[A-Z0-9]+/g, (m) => `-${m.toLowerCase()}`)}`
          return (
            <Table.Tr key={key}>
              <Table.Td>
                <Code>{cssName}</Code>
              </Table.Td>
              <Table.Td>
                <Group gap="xs" wrap="nowrap">
                  <Swatch value={semantic.light[key]} />
                  <Code>{semantic.light[key]}</Code>
                </Group>
              </Table.Td>
              <Table.Td>
                <Group gap="xs" wrap="nowrap">
                  <Swatch value={semantic.dark[key]} />
                  <Code>{semantic.dark[key]}</Code>
                </Group>
              </Table.Td>
            </Table.Tr>
          )
        })}
      </Table.Tbody>
    </Table>
  )
}

/** Scale tokens (spacing, radius, font size) rendered as a simple key/value table. */
export function ScaleTable({
  scale,
  prefix,
}: {
  scale: Record<string, string>
  prefix: string
}) {
  return (
    <Table striped withTableBorder mb="xl">
      <Table.Thead>
        <Table.Tr>
          <Table.Th w={120}>Key</Table.Th>
          <Table.Th w={120}>Value</Table.Th>
          <Table.Th>Reference</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Object.entries(scale).map(([key, value]) => (
          <Table.Tr key={key}>
            <Table.Td>
              <Code>{key}</Code>
            </Table.Td>
            <Table.Td>
              <Code>{value}</Code>
            </Table.Td>
            <Table.Td>
              <Code>{`var(--mantine-${prefix}-${key})`}</Code>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export function SpacingTable() {
  return <ScaleTable scale={spacing} prefix="spacing" />
}

export function RadiusTable() {
  return <ScaleTable scale={radius} prefix="radius" />
}

export function FontSizeTable() {
  return (
    <Stack gap="xs" mb="xl">
      {Object.entries(fontSizes).map(([key, value]) => (
        <Group key={key} gap="md" align="baseline">
          <Code w={80}>{key}</Code>
          <Code w={80}>{value}</Code>
          <Text fz={value} c="var(--sds-text-primary)">
            The quick brown fox
          </Text>
        </Group>
      ))}
    </Stack>
  )
}
