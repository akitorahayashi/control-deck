'use client'
import { useStore } from '@/store'
import { ChatArea } from '@/components/chat/ChatArea'
import { mockConversations } from '@/lib/mock-data'
import { useEffect } from 'react'
import Heading from '../ui/typography/Heading'
import Paragraph from '../ui/typography/Paragraph'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const TaskView = () => {
  const { selectedTask, setMessages } = useStore()

  useEffect(() => {
    if (selectedTask) {
      const conversation = mockConversations.find(
        (c) => c.taskId === selectedTask.id
      )
      setMessages(conversation ? conversation.messages : [])
    } else {
      setMessages([])
    }
  }, [selectedTask, setMessages])

  if (!selectedTask) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <div className="text-center p-4">
          <Heading size={2}>
            No Task Selected
          </Heading>
          <Paragraph className="mt-2 text-muted-foreground">
            Please select a task from the sidebar to view its details.
          </Paragraph>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-1 flex-col">
      <header className="border-b p-4">
        <Heading size={1}>
          {selectedTask.title}
        </Heading>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Agent: {selectedTask.agent.name}</span>
          <span>Status: {selectedTask.status}</span>
          <span>Last Updated: {dayjs(selectedTask.lastUpdatedAt).fromNow()}</span>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        <ChatArea />
      </div>
    </div>
  )
}
