import { type FC } from 'react'

import { cn } from '@/lib/utils'

import { ICONS } from './constants'
import { type IconProps } from './types'

const Icon: FC<IconProps> = ({
  type,
  size = 'sm',
  className,
  color,
  disabled = false
}) => {
  const IconElement = ICONS[type]

  return (
    <IconElement
      className={cn(
        color && !disabled ? `text-${color}` : 'text-primary',
        disabled && 'cursor-default text-muted/50',
        className,
        size === 'xxs' && 'w-3 h-3',
        size === 'xs' && 'w-4 h-4',
        size === 'sm' && 'w-6 h-6',
        size === 'md' && 'w-9 h-9',
        size === 'lg' && 'w-7 h-7',
        size === 'dot' && 'w-2 h-2',
        size === 'default' && 'w-6 h-6'
      )}
    />
  )
}

export default Icon
