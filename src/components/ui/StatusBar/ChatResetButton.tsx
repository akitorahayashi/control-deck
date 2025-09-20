'use client'

import React from 'react'
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
          title="Reset chat"
        >
          <Sparkles size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-4 text-center">
          <DialogTitle className="text-xl font-semibold">
            Reset chat?
          </DialogTitle>
          <DialogDescription className="leading-relaxed text-gray-600">
            This will clear the current conversation history. This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3 pt-6">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmReset}
            className="flex-1 bg-red-500 text-white hover:bg-red-600"
          >
            Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
