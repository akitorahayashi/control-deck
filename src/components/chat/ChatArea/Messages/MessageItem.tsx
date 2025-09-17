import Icon from '@/components/ui/icon'
import MarkdownRenderer from '@/components/ui/typography/MarkdownRenderer'
import { useStore } from '@/store'
import type { ChatMessage } from '@/types/control-deck'
import { getAgentIcon } from '@/lib/agentIcons'
import Videos from './Multimedia/Videos'
import Images from './Multimedia/Images'
import Audios from './Multimedia/Audios'
import { memo } from 'react'
import AgentThinkingLoader from './AgentThinkingLoader'

interface MessageProps {
  message: ChatMessage
}

const AgentMessage = ({ message }: MessageProps) => {
  const agentIconType = message.agentId ? getAgentIcon(message.agentId) : 'agent'

  return (
    <div className="flex flex-col items-start gap-2 font-geist">
      <div className="flex-shrink-0">
        <Icon type={agentIconType} size="xs" />
      </div>
      <div className="text-md rounded-lg font-geist p-3 bg-background-secondary text-chat-text-agent max-w-xs">
        {message.content}
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
