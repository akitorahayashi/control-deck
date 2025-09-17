import { create } from 'zustand'
import { RefObject, createRef } from 'react'
import { Agent } from '@/types/agent'
import { ChatMessage } from '@/types/chat'

interface Store {
  agents: Agent[]
  setAgents: (agents: Agent[]) => void
  selectedAgent: Agent | null
  setSelectedAgent: (agent: Agent | null) => void
  messages: ChatMessage[]
  setMessages: (messages: ChatMessage[]) => void
  addMessage: (message: ChatMessage) => void
  updateMessageContent: (id: string, newContent: string) => void
  updateMessageThinking: (id: string, newThinking: string) => void
  isStreaming: boolean
  setIsStreaming: (isStreaming: boolean) => void
  chatInputRef: RefObject<HTMLTextAreaElement | null>
}

export const useStore = create<Store>()((set, get) => ({
  agents: [],
  setAgents: (agents) => set({ agents }),
  selectedAgent: null,
  setSelectedAgent: (agent) => set({ selectedAgent: agent }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  updateMessageContent: (id, newContent) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, content: msg.content + newContent } : msg
      ),
    }))
  },
  updateMessageThinking: (id, newThinking) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, thinking: (msg.thinking || '') + newThinking } : msg
      ),
    }))
  },
  isStreaming: false,
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  chatInputRef: createRef<HTMLTextAreaElement>(),
}))
