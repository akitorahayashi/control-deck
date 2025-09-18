import type { ChatMessage } from '@/types/chat'
import { useStore } from '@/store'
import Heading from '@/components/ui/typography/Heading'
import Paragraph from '@/components/ui/typography/Paragraph'

import { AgentMessage, UserMessage } from './MessageItem'

interface MessageListProps {
  messages: ChatMessage[]
}

const Messages = ({ messages }: MessageListProps) => {
  const { selectedAgent } = useStore()

  return (
    <>
      {selectedAgent && (
        <>
          <section
            className="flex flex-col items-center justify-center py-8 text-center font-geist"
            aria-label="Agent information"
          >
            <div className="flex max-w-3xl flex-col items-center gap-y-4">
              <Heading size={1} className="text-center tracking-tight">
                {selectedAgent.name}
              </Heading>
              <Paragraph className="text-muted-foreground text-center">
                {selectedAgent.description}
              </Paragraph>
            </div>
          </section>
          {messages.length > 0 && (
            <div className="mx-8 border-t border-border/50" />
          )}
        </>
      )}
      {messages.map((message, index) => {
        const key = `${message.role}-${message.timestamp}-${index}`

        if (message.role === 'agent') {
          return <AgentMessage key={key} message={message} />
        }
        return <UserMessage key={key} message={message} />
      })}
    </>
  )
}

export default Messages
