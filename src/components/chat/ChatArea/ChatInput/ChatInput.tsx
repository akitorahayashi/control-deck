'use client'
import { useState } from 'react'
import { TextArea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'
import Icon from '@/components/ui/icon'

const ChatInput = () => {
  const { chatInputRef, selectedTask } = useStore()
  const [inputMessage, setInputMessage] = useState('')

  const handleSubmit = async () => {
    // This is a no-op for now as the chat is not interactive.
    // In the future, this would send the message to the backend.
    console.log('Sending message:', inputMessage)
  }

  return (
    <div className="relative mx-auto mb-1 flex w-full max-w-2xl items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 font-geist shadow-sm">
      <TextArea
        placeholder={
          selectedTask
            ? 'Chat is view-only for now...'
            : 'Select a task to view the conversation'
        }
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
          }
        }}
        className="flex-1 resize-none border-0 bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0"
        disabled={!selectedTask}
        ref={chatInputRef}
        rows={1}
      />
      <Button
        onClick={handleSubmit}
        disabled={!selectedTask || !inputMessage.trim()}
        size="icon"
        className="flex-shrink-0 rounded-full bg-black p-2 text-white hover:bg-gray-800"
      >
        <Icon type="arrow-up" />
      </Button>
    </div>
  )
}

export default ChatInput
