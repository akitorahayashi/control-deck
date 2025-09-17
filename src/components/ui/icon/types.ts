import { type ElementType } from 'react'

export type IconType =
  | 'user'
  | 'agent'
  | 'reasoning'
  | 'refresh'
  | 'edit'
  | 'save'
  | 'x'
  | 'arrow-down'
  | 'send'
  | 'download'
  | 'hammer'
  | 'check'
  | 'chevron-down'
  | 'chevron-up'
  | 'plus-icon'
  | 'references'
  | 'trash'
  | 'toggle-sidebar'
  | 'search'
  | 'file-text'
  | 'sparkle'
  | 'code'
  | 'chart-bar'
  | 'pencil'
  | 'settings'

export interface IconProps {
  type: IconType
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'dot' | 'xxs' | 'default'
  className?: string
  color?: string
  disabled?: boolean
}

export type IconTypeMap = {
  [key in IconType]: ElementType
}
