import { forwardRef, useState } from 'react'
import { CloseButton, TextInput } from '@mantine/core'
import type { TextInputProps } from '@mantine/core'

/**
 * Magnifying-glass glyph traced from the Figma library's "search" icon asset. The raw export is
 * kept at `./assets/search.svg` for reference. Mantine ships no icon set, so the design system's
 * own glyph is used rather than pulling in an icon dependency.
 */
function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width={16} height={16}>
      <path
        d="M14.7556 16L9.15556 10.4C8.71111 10.7556 8.2 11.037 7.62222 11.2444C7.04444 11.4519 6.42963 11.5556 5.77778 11.5556C4.16296 11.5556 2.7963 10.9963 1.67778 9.87778C0.559259 8.75926 0 7.39259 0 5.77778C0 4.16296 0.559259 2.7963 1.67778 1.67778C2.7963 0.559259 4.16296 0 5.77778 0C7.39259 0 8.75926 0.559259 9.87778 1.67778C10.9963 2.7963 11.5556 4.16296 11.5556 5.77778C11.5556 6.42963 11.4519 7.04444 11.2444 7.62222C11.037 8.2 10.7556 8.71111 10.4 9.15556L16 14.7556L14.7556 16ZM5.77778 9.77778C6.88889 9.77778 7.83333 9.38889 8.61111 8.61111C9.38889 7.83333 9.77778 6.88889 9.77778 5.77778C9.77778 4.66667 9.38889 3.72222 8.61111 2.94444C7.83333 2.16667 6.88889 1.77778 5.77778 1.77778C4.66667 1.77778 3.72222 2.16667 2.94444 2.94444C2.16667 3.72222 1.77778 4.66667 1.77778 5.77778C1.77778 6.88889 2.16667 7.83333 2.94444 8.61111C3.72222 9.38889 4.66667 9.77778 5.77778 9.77778Z"
        fill="currentColor"
      />
    </svg>
  )
}

export interface SearchProps extends Omit<TextInputProps, 'leftSection' | 'type'> {
  /** Renders a clear button once the field has a value, and is called when it's pressed. */
  onClear?: () => void
}

/**
 * Search field — the library's search input, built on Mantine's `TextInput` with the Figma search
 * glyph in the left section and an optional clear button on the right.
 */
export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  { onClear, value, defaultValue, onChange, placeholder = 'Search', ...props },
  ref,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState(String(defaultValue ?? ''))
  const currentValue = value !== undefined ? String(value) : uncontrolledValue
  const showClear = Boolean(onClear) && currentValue.length > 0

  return (
    <TextInput
      ref={ref}
      type="search"
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => {
        setUncontrolledValue(event.currentTarget.value)
        onChange?.(event)
      }}
      leftSection={<SearchIcon />}
      rightSection={
        showClear ? <CloseButton size="sm" aria-label="Clear search" onClick={onClear} /> : null
      }
      rightSectionPointerEvents={showClear ? 'auto' : 'none'}
      {...props}
    />
  )
})
