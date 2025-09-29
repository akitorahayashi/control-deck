'use client';

import React, { useState, useMemo } from 'react';
import { TextArea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import Icon from '@/components/ui/icon';
import { sendChat } from '@/lib/chatService';

const ERROR_FALLBACK_MESSAGE =
  'Sorry, something went wrong while contacting the agent. Please try again.';

const ChatInput = () => {
  const [inputMessage, setInputMessage] = useState('');
  const selectedAgentRaw = useStore((state) => state.selectedAgent);
  const chatInputRef = useStore((state) => state.chatInputRef);
  const isStreaming = useStore((state) => state.isStreaming);
  const setIsStreaming = useStore((state) => state.setIsStreaming);
  const appendUserMessage = useStore((state) => state.appendUserMessage);
  const appendAssistantPlaceholder = useStore((state) => state.appendAssistantPlaceholder);
  const appendAssistantContent = useStore((state) => state.appendAssistantContent);
  const appendAssistantThinking = useStore((state) => state.appendAssistantThinking);
  const replaceMessage = useStore((state) => state.replaceMessage);
  const buildRequestMessages = useStore((state) => state.buildRequestMessages);

  const selectedAgent = useMemo(() => selectedAgentRaw, [selectedAgentRaw?.id]);

  const handleSubmit = async () => {
    const trimmed = inputMessage.trim();
    if (!trimmed || !selectedAgent || isStreaming) return;

    let assistantMessageId: string | null = null;
    let didError = false;

    try {
      appendUserMessage(trimmed);
      assistantMessageId = appendAssistantPlaceholder(selectedAgent.id).id;
      setInputMessage('');
      setIsStreaming(true);

      await sendChat({
        agentId: selectedAgent.id,
        messages: buildRequestMessages(),
        stream: true,
        onChunk: (chunk) => {
          if (!assistantMessageId) return;
          const choice = chunk.choices?.[0];
          const delta = choice?.delta;
          if (!delta) return;

          if (typeof delta.think === 'string' && delta.think) {
            appendAssistantThinking(assistantMessageId, delta.think);
          }
          if (typeof delta.content === 'string' && delta.content) {
            appendAssistantContent(assistantMessageId, delta.content);
          }
        },
        onComplete: () => {
          setIsStreaming(false);
        },
        onError: (error) => {
          didError = true;
          setIsStreaming(false);
          if (assistantMessageId) {
            replaceMessage(assistantMessageId, {
              content: ERROR_FALLBACK_MESSAGE,
              thinking: undefined
            });
          }
          console.error('Chat streaming error:', error);
        }
      });
    } catch (error) {
      if (!didError && assistantMessageId) {
        replaceMessage(assistantMessageId, {
          content: ERROR_FALLBACK_MESSAGE,
          thinking: undefined
        });
      }
      if (error instanceof Error) {
        console.error('Chat submission error:', error);
      } else {
        console.error('Unknown chat submission error');
      }
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="relative mx-auto mb-1 flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-gray-300 bg-white px-4 py-3 font-geist shadow-sm">
      <TextArea
        placeholder={
          selectedAgent
            ? `Chat with ${selectedAgent.name}...`
            : 'Select an agent to start a conversation'
        }
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        className="!focus:outline-none !focus:ring-0 flex-1 resize-none !rounded-none !border-0 !bg-transparent px-3 py-2 text-sm text-gray-900 placeholder-gray-500 !shadow-none !outline-none"
        disabled={!selectedAgent || isStreaming}
        ref={chatInputRef}
      />
      <Button
        onClick={handleSubmit}
        disabled={!selectedAgent || !inputMessage.trim() || isStreaming}
        size="icon"
        aria-label="Send message"
        className="flex-shrink-0 rounded-full bg-black p-2 text-white hover:bg-gray-800 disabled:bg-gray-400"
      >
        <Icon type="send" size="xs" color="white" />
      </Button>
    </div>
  );
};

export default ChatInput;
