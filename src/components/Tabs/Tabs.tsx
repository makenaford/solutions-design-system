import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import { action as actionText } from '../../tokens/typography'

export type TabsSize = 'desktop' | 'mobile'

export interface TabItem {
  /** Stable identifier used for selection tracking. */
  id: string
  /** Label rendered in the tab button. */
  label: string
  /** Optional leading icon, rendered faded to match the Figma "Icon Left" treatment. */
  icon?: ReactNode
  /** Panel content shown when this tab is active. */
  panel: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  /** The tabs, in display order, each paired with its panel content. */
  tabs: TabItem[]
  /** Controlled active tab id. Pass together with `onTabChange`. */
  activeTab?: string
  /** Uncontrolled initial active tab id. Ignored if `activeTab` is provided. Defaults to the first tab. */
  defaultActiveTab?: string
  /** Called with the newly selected tab id. */
  onTabChange?: (id: string) => void
  /** Matches the Figma "Size" variant (Desktop pill tabs vs. compact Mobile tabs). */
  size?: TabsSize
  className?: string
}

export function Tabs({ tabs, activeTab, defaultActiveTab, onTabChange, size = 'desktop', className }: TabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<string | undefined>(defaultActiveTab ?? tabs[0]?.id)
  const isControlled = activeTab !== undefined
  const activeId = isControlled ? activeTab : internalActiveTab
  const baseId = useId()
  const isMobile = size === 'mobile'

  function selectTab(id: string) {
    if (!isControlled) setInternalActiveTab(id)
    onTabChange?.(id)
  }

  return (
    <div className={clsx('flex flex-col gap-5', className)}>
      <div
        role="tablist"
        className={clsx(
          'inline-flex items-center rounded-full border border-components-glassLine-1 bg-surfaces-cardBgTranslucent p-3',
          isMobile ? 'w-full flex-wrap gap-4' : 'w-fit gap-1'
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId
          const textStyle = isActive ? actionText.linkMediumActive : actionText.linkMedium
          const tabId = `${baseId}-tab-${tab.id}`
          const panelId = `${baseId}-tabpanel-${tab.id}`

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={isActive}
              aria-controls={panelId}
              disabled={tab.disabled}
              onClick={() => selectTab(tab.id)}
              className={clsx(
                'inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full text-center transition-colors',
                isMobile ? 'p-4' : 'px-9 py-4',
                isActive
                  ? 'bg-brand-primary text-action-neutralInverted shadow-focusShadowTab'
                  : 'text-surfaces-textSecondary hover:text-action-linkHover',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
                tab.disabled && 'cursor-not-allowed opacity-50'
              )}
              style={{
                fontFamily: textStyle.fontFamily,
                fontSize: textStyle.fontSize,
                fontWeight: textStyle.fontWeight,
                lineHeight: `${textStyle.lineHeight}px`,
                letterSpacing: textStyle.letterSpacing,
              }}
            >
              {tab.icon && (
                <span className={clsx('shrink-0', !isActive && 'opacity-50')} aria-hidden="true">
                  {tab.icon}
                </span>
              )}
              {tab.label}
            </button>
          )
        })}
      </div>

      {tabs.map((tab) => {
        const tabId = `${baseId}-tab-${tab.id}`
        const panelId = `${baseId}-tabpanel-${tab.id}`
        const isActive = tab.id === activeId
        return (
          <div key={tab.id} role="tabpanel" id={panelId} aria-labelledby={tabId} hidden={!isActive}>
            {isActive && tab.panel}
          </div>
        )
      })}
    </div>
  )
}
