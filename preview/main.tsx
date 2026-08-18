import { createRoot } from 'react-dom/client'
import '../src/index.css'
import {
  Accordion,
  Badge,
  Button,
  Checkbox,
  Form,
  IconCard,
  Input,
  Label,
  Pagination,
  Radio,
  Search,
  TableOfContents,
  Tabs,
  Tag,
} from '../src/index'
import { useState } from 'react'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-surfaces-textPrimary font-sans text-2xl font-bold mb-4">{title}</h2>
      <div className="flex flex-wrap items-start gap-4 p-6 rounded-lg bg-neutral-1">{children}</div>
    </section>
  )
}

function App() {
  const [page, setPage] = useState(3)
  const [activeTab, setActiveTab] = useState('one')

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-surfaces-textPrimary font-sans text-3xl font-bold mb-10">
        Solutions Design System — Component Preview
      </h1>

      <Section title="Button">
        <Button color="primary" variant="solid" size="small">Small Solid</Button>
        <Button color="primary" variant="solid" size="medium">Medium Solid</Button>
        <Button color="primary" variant="solid" size="large">Large Solid</Button>
        <Button color="primary" variant="outline" size="medium">Outline</Button>
        <Button color="primary" variant="rounded" size="medium">Rounded</Button>
        <Button color="neutral" variant="solid" size="medium">Neutral</Button>
        <Button color="primary" variant="solid" size="medium" disabled>Disabled</Button>
      </Section>

      <Section title="Badge">
        <Badge>New</Badge>
        <Badge>Beta</Badge>
      </Section>

      <Section title="Tag">
        <Tag variant="tonal" size="regular">Tonal</Tag>
        <Tag variant="outline" size="regular">Outline</Tag>
        <Tag variant="tonal" size="small">Small</Tag>
      </Section>

      <Section title="Label (Chip)">
        <Label>Default</Label>
        <Label selected>Selected</Label>
        <Label disabled>Disabled</Label>
      </Section>

      <Section title="Checkbox / Radio">
        <Checkbox label="Checkbox" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
        <Radio label="Radio A" name="r" defaultChecked />
        <Radio label="Radio B" name="r" />
      </Section>

      <Section title="Input / Search">
        <Input label="Email" placeholder="you@company.com" />
        <Search placeholder="Search..." />
      </Section>

      <Section title="Accordion">
        <div className="w-full">
          <Accordion
            items={[
              { id: 'a', header: 'Section one', content: 'Content for section one.' },
              { id: 'b', header: 'Section two', content: 'Content for section two.' },
            ]}
          />
        </div>
      </Section>

      <Section title="Tabs">
        <div className="w-full">
          <Tabs
            tabs={[
              { id: 'one', label: 'Overview', panel: <div className="text-surfaces-textPrimary">Overview panel</div> },
              { id: 'two', label: 'Details', panel: <div className="text-surfaces-textPrimary">Details panel</div> },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </Section>

      <Section title="Pagination">
        <Pagination page={page} totalPages={10} onPageChange={setPage} />
      </Section>

      <Section title="Table of Contents">
        <TableOfContents
          items={[
            { id: 'intro', label: 'Introduction' },
            { id: 'usage', label: 'Usage' },
            { id: 'api', label: 'API Reference', level: 2 },
          ]}
          activeId="usage"
        />
      </Section>

      <Section title="Icon Card">
        <IconCard icon={<span>★</span>} title="Fast" description="Ships in minutes, not days." />
      </Section>

      <Section title="Form">
        <div className="w-full">
          <Form />
        </div>
      </Section>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
