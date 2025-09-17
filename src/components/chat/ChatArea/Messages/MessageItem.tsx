import Icon from '@/components/ui/icon'
import MarkdownRenderer from '@/components/ui/typography/MarkdownRenderer'
import { useStore } from '@/store'
import type { ChatMessage } from '@/types/chat'
import Videos from './Multimedia/Videos'
import Images from './Multimedia/Images'
import Audios from './Multimedia/Audios'
import { memo } from 'react'
import AgentThinkingLoader from './AgentThinkingLoader'
import ThinkingExpander from './ThinkingExpander'

interface MessageProps {
  message: ChatMessage
}

const AgentMessage = ({ message }: MessageProps) => {
  return (
    <div className="flex items-start gap-4 font-geist">
      <div className="flex flex-col max-w-xs">
        <ThinkingExpander thinking={message.thinking || ''} />
        <div className="text-md rounded-lg font-geist p-3 bg-background-secondary text-chat-text-agent">
          {message.content}
        </div>
      </div>
    </div>
  )
}

const UserMessage = memo(({ message }: MessageProps) => {
  return (
    <div className="flex justify-end">
      <div className="text-md rounded-lg font-geist p-3 bg-chat-bubble-user text-chat-text-user max-w-xs">
        {message.content}
      </div>
    </div>
  )
})

AgentMessage.displayName = 'AgentMessage'
UserMessage.displayName = 'UserMessage'
export { AgentMessage, UserMessage }
