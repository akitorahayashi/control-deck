'use client'

import React from 'react'
import Icon from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { ChatResetButton } from './ChatResetButton'

interface StatusBarProps {
  className?: string
  onChatReset?: () => void
}

export const StatusBar = ({ className, onChatReset }: StatusBarProps) => {
  const handleSettingsClick = () => {
    // 未実装
    console.log('Settings clicked')
  }

  return (
    <div
      className={`flex items-center justify-between border-b bg-background/50 px-4 py-2 ${className}`}
    >
      <div className="flex items-center">
        <ChatResetButton onReset={onChatReset} />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSettingsClick}
          className="h-8 w-8 p-0"
        >
          <Icon type="settings" size="xs" />
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
          <span className="text-sm font-medium text-white">U</span>
        </div>
      </div>
    </div>
  )
}
