import type { FormEvent } from 'react'
import { Anchor, Button, Group, Paper, Select, Stack, Text, TextInput, Title } from '@mantine/core'
import type { PaperProps } from '@mantine/core'
import flagUsAsset from './assets/flag-us.svg'

export interface FormProps extends Omit<PaperProps, 'children' | 'onSubmit'> {
  heading?: string
  description?: string
  submitLabel?: string
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
}

const INDUSTRIES = ['Technology', 'Healthcare', 'Financial Services', 'Retail', 'Other']
const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Other']
const CITIES = ['New York', 'San Francisco', 'Austin', 'Other']
const JOB_ROLES = ['Executive', 'IT / Engineering', 'Marketing', 'Sales', 'Other']
const DIAL_CODES = ['USA +1', 'Canada +1', 'UK +44']

/**
 * Lead-capture form — Figma "Form" (node `21405:74359`, Format=Short).
 *
 * A glass panel wrapping the standard field set. Field chrome, focus rings and the submit button
 * all come from the theme, so this component only describes the fields and layout.
 */
export function Form({
  heading = 'Form Heading',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  submitLabel = 'Download',
  onSubmit,
  variant = 'glass',
  ...props
}: FormProps) {
  return (
    <Paper component="form" variant={variant} p="xl" onSubmit={onSubmit} {...props}>
      <Stack gap="xl">
        <Stack gap="sm">
          <Title order={2} size="h3">
            {heading}
          </Title>
          <Text size="lg">{description}</Text>
        </Stack>

        <Stack gap="lg">
          <TextInput
            label="Work Email"
            name="workEmail"
            type="email"
            placeholder="User Input"
            required
          />

          <Group grow align="flex-start">
            <TextInput label="First Name" name="firstName" placeholder="User Input" required />
            <TextInput label="Last Name" name="lastName" placeholder="User Input" required />
          </Group>

          <Group grow align="flex-start">
            <Select label="Industry" name="industry" placeholder="Technology" data={INDUSTRIES} required />
            <TextInput label="Company" name="company" placeholder="User Input" required />
          </Group>

          <Group grow align="flex-start">
            <Select label="Country" name="country" placeholder="USA" data={COUNTRIES} required />
            <Select label="City" name="city" placeholder="New York" data={CITIES} />
          </Group>

          {/* The source design's Job Role placeholder literally reads "USA" — kept verbatim. */}
          <Select label="Job Role" name="jobRole" placeholder="USA" data={JOB_ROLES} required />

          <Select
            label="Phone"
            name="phone"
            placeholder="USA"
            data={DIAL_CODES}
            required
            leftSectionWidth={40}
            leftSection={<img src={flagUsAsset} alt="" width={16} height={12} />}
          />

          <Text size="md">
            This site is protected by reCAPTCHA and the Google <Anchor href="#" fw={600}>Privacy Policy</Anchor> and{' '}
            <Anchor href="#" fw={600}>Terms of Service</Anchor> apply.
          </Text>
        </Stack>

        <Stack gap="sm">
          <Button type="submit" fullWidth>
            {submitLabel}
          </Button>
          <Text size="md">
            Already have a Liferay DXP trial?{' '}
            <Anchor href="#" fw={600}>Renew your trial license here.</Anchor>
          </Text>
        </Stack>
      </Stack>
    </Paper>
  )
}
