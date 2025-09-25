import type { ChatMessage } from '@/types/chat';
import { memo } from 'react';
import ThinkingExpander from './ThinkingExpander';

interface MessageProps {
  message: ChatMessage;
}

const AgentMessage = ({ message }: MessageProps) => {
  return (
    <div className="flex items-start gap-4 font-geist">
      <div className="flex max-w-xs flex-col">
        <ThinkingExpander
          thinking={message.thinking || ''}
          content={message.content}
        />
        {message.content && (
          <div className="text-md rounded-lg bg-background-secondary p-3 font-geist text-chat-text-agent">
            {message.content}
          </div>
        )}
      </div>
    </div>
  );
};

const UserMessage = memo(({ message }: MessageProps) => {
  return (
    <div className="flex justify-end">
      <div className="text-md max-w-xs rounded-lg bg-chat-bubble-user p-3 font-geist text-chat-text-user">
        {message.content}
      </div>
    </div>
  );
});

AgentMessage.displayName = 'AgentMessage';
UserMessage.displayName = 'UserMessage';
export { AgentMessage, UserMessage };
