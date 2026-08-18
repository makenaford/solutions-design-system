import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import {
  Accordion,
  Badge,
  Button,
  Checkbox,
  Chip,
  Group,
  Pagination,
  Radio,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
} from '@mantine/core'
import { Card, Form, IconCard, Search, SolutionsProvider, TableOfContents } from '../src'
import iconCiCd from '../src/assets/glass-icons/Product Modules/CI CD.svg'

/**
 * Local smoke-test page for `pnpm dev`. Storybook is the real documentation surface; this exists
 * to eyeball the whole set on one page, in both colour schemes.
 */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack gap="sm">
      <Title order={2} size="h4">
        {title}
      </Title>
      <Group align="flex-start" gap="md">
        {children}
      </Group>
    </Stack>
  )
}

function SchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  return (
    <Button variant="outline" size="sm" onClick={toggleColorScheme}>
      Switch to {colorScheme === 'dark' ? 'light' : 'dark'} mode
    </Button>
  )
}

function App() {
  const [page, setPage] = useState(3)

  return (
    <Stack p="xl" gap="xl" maw={1000} mx="auto">
      <Group justify="space-between">
        <Title order={1} size="h2">
          Solutions Design System
        </Title>
        <SchemeToggle />
      </Group>

      <Section title="Button">
        <Button>Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button radius="round">Rounded</Button>
        <Button color="neutral">Neutral</Button>
        <Button disabled>Disabled</Button>
      </Section>

      <Section title="Badge / Chip">
        <Badge>Tonal</Badge>
        <Badge variant="outline">Outline</Badge>
        <Chip defaultChecked>Selected</Chip>
        <Chip>Default</Chip>
      </Section>

      <Section title="Selection controls">
        <Checkbox label="Checkbox" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
        <Radio label="Radio A" name="preview" defaultChecked />
        <Radio label="Radio B" name="preview" />
      </Section>

      <Section title="Inputs">
        <TextInput label="Email" placeholder="you@company.com" w={260} />
        <Search placeholder="Search…" w={260} />
      </Section>

      <Stack gap="sm">
        <Title order={2} size="h4">
          Tabs
        </Title>
        <Tabs defaultValue="overview">
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="features">Features</Tabs.Tab>
            <Tabs.Tab value="pricing">Pricing</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview" pt="md">
            <Text>Overview panel</Text>
          </Tabs.Panel>
          <Tabs.Panel value="features" pt="md">
            <Text>Features panel</Text>
          </Tabs.Panel>
          <Tabs.Panel value="pricing" pt="md">
            <Text>Pricing panel</Text>
          </Tabs.Panel>
        </Tabs>
      </Stack>

      <Stack gap="sm">
        <Title order={2} size="h4">
          Accordion
        </Title>
        <Accordion defaultValue="one">
          <Accordion.Item value="one">
            <Accordion.Control>Section one</Accordion.Control>
            <Accordion.Panel>
              <Text>Content for section one.</Text>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="two">
            <Accordion.Control>Section two</Accordion.Control>
            <Accordion.Panel>
              <Text>Content for section two.</Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>

      <Section title="Pagination">
        <Pagination total={10} value={page} onChange={setPage} />
      </Section>

      <Section title="Cards">
        <Card
          title="Card Title"
          description="Lorem ipsum dolor sit amet."
          icon={<img src={iconCiCd} alt="" width={48} height={48} />}
          w={320}
        />
        <IconCard
          icon={<img src={iconCiCd} alt="" width={48} height={48} />}
          title="Ship faster"
          description="Reuse audited components."
          size="mobile"
          w={320}
        />
      </Section>

      <Section title="Table of contents">
        <TableOfContents
          items={[
            { id: 'intro', label: 'Introduction' },
            { id: 'usage', label: 'Usage' },
            { id: 'api', label: 'API Reference', level: 2 },
          ]}
          activeId="usage"
        />
      </Section>

      <Stack gap="sm">
        <Title order={2} size="h4">
          Form
        </Title>
        <Form />
      </Stack>
    </Stack>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SolutionsProvider>
      <App />
    </SolutionsProvider>
  </StrictMode>,
)
