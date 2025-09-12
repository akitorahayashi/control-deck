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
    <div className="relative mx-auto mb-1 flex w-full max-w-2xl items-end justify-center gap-x-2 font-geist">
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
        className="w-full border border-accent bg-primaryAccent px-4 text-sm text-primary focus:border-accent"
        disabled={!selectedTask}
        ref={chatInputRef}
      />
      <Button
        onClick={handleSubmit}
        disabled={!selectedTask || !inputMessage.trim()}
        size="icon"
        className="rounded-xl bg-primary p-5 text-primaryAccent"
      >
        <Icon type="send" color="primaryAccent" />
      </Button>
    </div>
  )
}

export default ChatInput
