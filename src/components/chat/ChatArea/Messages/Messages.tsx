import type { ChatMessage } from '@/types/control-deck'
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
            className="flex flex-col items-center justify-center text-center font-geist py-8"
            aria-label="Agent information"
          >
            <div className="flex max-w-3xl flex-col gap-y-4 items-center">
              <Heading size={1} className="tracking-tight text-center">
                {selectedAgent.name}
              </Heading>
              <Paragraph className="text-muted-foreground text-center">
                {selectedAgent.description}
              </Paragraph>
            </div>
          </section>
          {messages.length > 0 && (
            <div className="border-t border-border/50 mx-8" />
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
