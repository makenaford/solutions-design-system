import type { CSSProperties, FormEvent, ReactNode } from 'react'
import clsx from 'clsx'
import { components, action as actionColor } from '../../tokens/colors'
import { paragraph, action as actionType, fontFamily, type TextStyle } from '../../tokens/typography'
import chevronDownAsset from './assets/chevron-down.svg'
import flagUsAsset from './assets/flag-us.svg'

/**
 * Figma reference: "Solutions Library- 2026" (KihJKyGA20stc2SSjAlxYU), node 24140:3535 — "Form".
 *
 * This node is a composed example screen (glass card + heading + 8 field rows + terms copy +
 * submit button + secondary link), not a single atomic component. Per the parallel build plan,
 * this file does NOT import the library's Input/Checkbox/Button components (they're being built
 * concurrently by other agents and may not exist yet) — every field below is a plain native
 * `<input>`/`<select>`/`<button>` styled directly from the token files. Once Input/Checkbox/Button
 * land, the field rows here are good candidates to refactor to compose them instead.
 *
 * Content notes carried over verbatim from the design (flagged as-is rather than "fixed", since
 * they may be intentional placeholder copy from the Figma source):
 * - The "Job Role" and "Phone" fields both show a literal "USA" placeholder in the source design.
 * - "City" is the only optional field in the grid (no required-asterisk in the source).
 */

const toTextStyle = (style: TextStyle): CSSProperties => ({
  fontFamily: style.fontFamily,
  fontSize: style.fontSize,
  fontWeight: style.fontWeight,
  lineHeight: `${style.lineHeight}px`,
  letterSpacing: `${style.letterSpacing}px`,
})

const headingStyle: CSSProperties = {
  fontFamily: fontFamily.sans,
  fontSize: 28,
  fontWeight: 600,
  lineHeight: '35px',
  letterSpacing: 0,
}

function Chevron({ className }: { className?: string }) {
  return (
    <span className={clsx('relative flex size-large shrink-0 items-center justify-center', className)}>
      <img src={chevronDownAsset} alt="" className="size-[11px] -rotate-[135deg]" />
    </span>
  )
}

interface FieldShellProps {
  label: string
  required?: boolean
  leading?: ReactNode
  trailingChevron?: boolean
  children: ReactNode
}

function FieldShell({ label, required, leading, trailingChevron, children }: FieldShellProps) {
  return (
    <div className="relative flex w-full flex-1 flex-col items-start gap-1">
      <div className="flex w-full items-center gap-4 rounded-lg border border-neutral-4 px-5 py-4">
        {leading}
        {children}
        {trailingChevron ? <Chevron /> : null}
      </div>
      <div
        className="absolute left-[11px] top-[-11px] flex items-center whitespace-nowrap rounded-lg bg-surfaces-pageBg px-1"
      >
        <span className="text-surfaces-textPrimary opacity-80" style={toTextStyle(paragraph.extraSmallSemiBold)}>
          {label}
        </span>
        {required ? (
          <span className="italic text-status-errorBase opacity-80" style={toTextStyle(paragraph.extraSmallSemiBold)}>
            *
          </span>
        ) : null}
      </div>
    </div>
  )
}

interface TextFieldProps {
  label: string
  name: string
  placeholder: string
  required?: boolean
  type?: string
}

function TextField({ label, name, placeholder, required, type = 'text' }: TextFieldProps) {
  return (
    <FieldShell label={label} required={required}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full flex-1 bg-transparent text-neutral-10 outline-none placeholder:text-neutral-10"
        style={toTextStyle(paragraph.default)}
      />
    </FieldShell>
  )
}

interface SelectFieldProps {
  label: string
  name: string
  placeholder: string
  options: string[]
  required?: boolean
  leading?: ReactNode
}

function SelectField({ label, name, placeholder, options, required, leading }: SelectFieldProps) {
  return (
    <FieldShell label={label} required={required} leading={leading} trailingChevron>
      <select
        name={name}
        defaultValue=""
        required={required}
        className="w-full flex-1 appearance-none bg-transparent text-neutral-10 opacity-80 outline-none"
        style={toTextStyle(paragraph.default)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

export interface FormProps {
  /** Heading shown above the field grid. */
  heading?: string
  /** Supporting copy under the heading. */
  description?: string
  /** Submit button label. */
  submitLabel?: string
  className?: string
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
}

export const Form = ({
  heading = 'Form Heading',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  submitLabel = 'Download',
  className,
  onSubmit,
}: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={clsx(
        'relative flex w-full flex-col items-center gap-10 overflow-hidden rounded-lg border border-components-glassLine-1 p-10 shadow-glassCard backdrop-blur-[50px]',
        className,
      )}
      style={{
        backgroundColor: 'rgba(0,0,0,0.2)',
        backgroundImage: `linear-gradient(60deg, ${components.glassCard.step01} 43%, ${components.glassCard.step02} 135%)`,
      }}
    >
      <div className="flex w-full flex-col gap-3">
        <h2 className="w-full text-surfaces-textPrimary" style={headingStyle}>
          {heading}
        </h2>
        <p className="w-full text-surfaces-textPrimary" style={toTextStyle(paragraph.default)}>
          {description}
        </p>
      </div>

      <div className="flex w-full flex-col gap-xlg">
        <div className="flex w-full gap-5">
          <TextField label="Work Email" name="workEmail" placeholder="User Input" type="email" required />
        </div>

        <div className="flex w-full gap-5">
          <TextField label="First Name" name="firstName" placeholder="User Input" required />
          <TextField label="Last Name" name="lastName" placeholder="User Input" required />
        </div>

        <div className="flex w-full gap-5">
          <SelectField
            label="Industry"
            name="industry"
            placeholder="Technology"
            options={['Technology', 'Healthcare', 'Financial Services', 'Retail', 'Other']}
            required
          />
          <TextField label="Company" name="company" placeholder="User Input" required />
        </div>

        <div className="flex w-full gap-5">
          <SelectField
            label="Country"
            name="country"
            placeholder="USA"
            options={['United States', 'Canada', 'United Kingdom', 'Other']}
            required
          />
          <SelectField
            label="City"
            name="city"
            placeholder="New York"
            options={['New York', 'San Francisco', 'Austin', 'Other']}
          />
        </div>

        <div className="flex w-full gap-5">
          {/* Source design's placeholder literally reads "USA" for Job Role — kept verbatim. */}
          <SelectField
            label="Job Role"
            name="jobRole"
            placeholder="USA"
            options={['Executive', 'IT / Engineering', 'Marketing', 'Sales', 'Other']}
            required
          />
        </div>

        <div className="flex w-full gap-5">
          <SelectField
            label="Phone"
            name="phone"
            placeholder="USA"
            options={['USA +1', 'Canada +1', 'UK +44']}
            required
            leading={
              <span className="flex shrink-0 items-center justify-center gap-[2px] rounded-md">
                <img src={flagUsAsset} alt="" className="h-[12px] w-[16px] shrink-0" />
                <Chevron />
              </span>
            }
          />
        </div>

        <p className="w-full text-surfaces-textPrimary" style={toTextStyle(paragraph.small)}>
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="#" className="font-semibold text-action-linkDefault">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="#" className="font-semibold text-action-linkDefault">
            Terms of Service
          </a>{' '}
          apply.
        </p>
      </div>

      <div className="flex w-full flex-col items-start gap-3">
        <div className="flex w-full items-center gap-large">
          <button
            type="submit"
            className="flex flex-1 items-center justify-center gap-3 rounded-lg px-5 py-4 text-action-neutralInverted"
            style={{
              backgroundImage: `linear-gradient(211deg, ${actionColor.primaryHover} 37%, ${actionColor.primaryDefault} 63%)`,
              ...toTextStyle(actionType.buttonMedium),
            }}
          >
            {submitLabel}
          </button>
        </div>
        <p className="w-full text-surfaces-textPrimary" style={toTextStyle(paragraph.small)}>
          Already have a Liferay DXP trial?{' '}
          <a href="#" className="font-semibold text-action-linkDefault">
            Renew your trial license here.
          </a>
        </p>
      </div>
    </form>
  )
}
