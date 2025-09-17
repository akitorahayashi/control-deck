'use client'
import Icon from '@/components/ui/icon'
import { Button } from '@/components/ui/button'

interface StatusBarProps {
  className?: string
}

export const StatusBar = ({ className }: StatusBarProps) => {
  const handleSettingsClick = () => {
    // 未実装
    console.log('Settings clicked')
  }

  return (
    <div className={`flex items-center justify-between px-4 py-2 border-b bg-background/50 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">User</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Online
            </span>
          </div>
        </div>
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
      </div>
    </div>
  )
}