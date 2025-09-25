'use client';

import React from 'react';
import { useState } from 'react';
import { TextArea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import Icon from '@/components/ui/icon';
import { mockStreamingResponse } from '@/lib/mocks';

const ChatInput = () => {
  const { chatInputRef, selectedAgent, isStreaming, addMessage } = useStore();
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = async () => {
    if (!inputMessage.trim() || !selectedAgent || isStreaming) return;

    // Add user message to store
    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user' as const,
      content: inputMessage,
      timestamp: new Date().toISOString()
    };
    addMessage(userMessage);

    mockStreamingResponse(inputMessage);
    setInputMessage('');
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
