'use client'
import { useStore } from '@/store'
import { ChatArea } from '@/components/chat/ChatArea'
import { mockConversations } from '@/lib/mocks'
import { useEffect } from 'react'
import Heading from '../ui/typography/Heading'
import Paragraph from '../ui/typography/Paragraph'
import { StatusBar } from '../ui/StatusBar/StatusBar'

export const AgentView = () => {
  const { selectedAgent, setMessages } = useStore()

  useEffect(() => {
    if (selectedAgent) {
      const conversation = mockConversations.find(
        (c) => c.agentId === selectedAgent.id
      )
      setMessages(conversation ? conversation.messages : [])
    } else {
      setMessages([])
    }
  }, [selectedAgent, setMessages])

  const handleChatReset = () => {
    setMessages([])
  }

  if (!selectedAgent) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <div className="p-4 text-center">
          <Heading size={2}>No Agent Selected</Heading>
          <Paragraph className="text-muted-foreground mt-2">
            Please select an agent from the sidebar to start a conversation.
          </Paragraph>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-1 flex-col">
      <StatusBar onChatReset={handleChatReset} />
      <div className="flex-1 overflow-y-auto">
        <ChatArea />
      </div>
    </div>
  )
}
