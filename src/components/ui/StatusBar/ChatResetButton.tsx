'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Sparkles } from 'lucide-react'

interface ChatResetButtonProps {
  onReset?: () => void
  className?: string
}

export const ChatResetButton = ({
  onReset,
  className
}: ChatResetButtonProps) => {
  const [open, setOpen] = useState(false)

  const handleConfirmReset = () => {
    if (onReset) {
      onReset()
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 ${className}`}
          title="新しいチャットを開始"
        >
          <Sparkles size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-4 text-center">
          <DialogTitle className="text-xl font-semibold">
            チャットをリセットしますか？
          </DialogTitle>
          <DialogDescription className="leading-relaxed text-gray-600">
            現在のチャット履歴がすべて削除され、
            <br />
            新しいチャットが開始されます。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3 pt-6">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1"
          >
            キャンセル
          </Button>
          <Button
            onClick={handleConfirmReset}
            className="flex-1 bg-red-500 text-white hover:bg-red-600"
          >
            リセット
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
