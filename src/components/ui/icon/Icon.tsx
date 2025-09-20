import React, { type FC } from 'react'

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
        size === 'xxs' && 'h-3 w-3',
        size === 'xs' && 'h-4 w-4',
        size === 'sm' && 'h-6 w-6',
        size === 'md' && 'h-9 w-9',
        size === 'lg' && 'h-7 w-7',
        size === 'dot' && 'h-2 w-2',
        size === 'default' && 'h-6 w-6'
      )}
    />
  )
}

export default Icon
