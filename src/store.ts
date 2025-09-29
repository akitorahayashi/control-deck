import { create } from 'zustand';
import { RefObject, createRef } from 'react';
import { Agent } from '@/types/agent';
import { ChatCompletionMessagePayload, ChatMessage } from '@/types/chat';

const createMessageId = (): string => {
  const globalCrypto =
    typeof globalThis !== 'undefined'
      ? (globalThis as typeof globalThis & { crypto?: Crypto }).crypto
      : undefined;

  if (globalCrypto?.randomUUID) {
    return `msg-${globalCrypto.randomUUID()}`;
  }

  return `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const buildTimestamp = (): string => new Date().toISOString();

const mapMessagesToPayload = (
  messages: ChatMessage[]
): ChatCompletionMessagePayload[] => {
  return messages
    .filter((message) => {
      if (message.role === 'user') return true;
      if (message.role === 'agent') {
        return Boolean(message.content?.trim());
      }
      return false;
    })
    .map((message) => {
      if (message.role === 'user') {
        return {
          role: 'user' as const,
          content: message.content
        } satisfies ChatCompletionMessagePayload;
      }

      return {
        role: 'assistant' as const,
        content: message.content
      } satisfies ChatCompletionMessagePayload;
    });
};

interface Store {
  agents: Agent[];
  setAgents: (agents: Agent[]) => void;
  selectedAgent: Agent | null;
  setSelectedAgent: (agent: Agent | null) => void;
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
  clearMessages: () => void;
  appendUserMessage: (content: string) => ChatMessage;
  appendAssistantPlaceholder: (agentId: string) => ChatMessage;
  appendAssistantContent: (id: string, chunk: string) => void;
  appendAssistantThinking: (id: string, chunk: string) => void;
  replaceMessage: (id: string, patch: Partial<ChatMessage>) => void;
  buildRequestMessages: () => ChatCompletionMessagePayload[];
  isStreaming: boolean;
  setIsStreaming: (isStreaming: boolean) => void;
  chatInputRef: RefObject<HTMLTextAreaElement | null>;
}

export const useStore = create<Store>()((set, get) => ({
  agents: [],
  setAgents: (agents) => set({ agents }),
  selectedAgent: null,
  setSelectedAgent: (agent) =>
    set((state) => {
      const currentId = state.selectedAgent?.id ?? null;
      const nextId = agent?.id ?? null;
      if (currentId === nextId) {
        console.log('[store] select same agent', nextId);
        return { selectedAgent: agent };
      }
      console.log('[store] select agent', nextId);
      return { selectedAgent: agent, messages: [] };
    }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  clearMessages: () =>
    set((state) => (state.messages.length ? { messages: [] } : state)),
  appendUserMessage: (content) => {
    const message: ChatMessage = {
      id: createMessageId(),
      role: 'user',
      content,
      timestamp: buildTimestamp()
    };
    set((state) => ({ messages: [...state.messages, message] }));
    return message;
  },
  appendAssistantPlaceholder: (agentId) => {
    const message: ChatMessage = {
      id: createMessageId(),
      role: 'agent',
      agentId,
      content: '',
      thinking: '',
      timestamp: buildTimestamp()
    };
    set((state) => ({ messages: [...state.messages, message] }));
    return message;
  },
  appendAssistantContent: (id, chunk) => {
    if (!chunk) return;
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id
          ? { ...msg, content: `${msg.content ?? ''}${chunk}` }
          : msg
      )
    }));
  },
  appendAssistantThinking: (id, chunk) => {
    if (!chunk) return;
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id
          ? { ...msg, thinking: `${msg.thinking ?? ''}${chunk}` }
          : msg
      )
    }));
  },
  replaceMessage: (id, patch) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              ...patch
            }
          : msg
      )
    }));
  },
  buildRequestMessages: () => mapMessagesToPayload(get().messages),
  isStreaming: false,
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  chatInputRef: createRef<HTMLTextAreaElement>()
}));
