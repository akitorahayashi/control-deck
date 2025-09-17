import { create } from 'zustand'
import { RefObject, createRef } from 'react'
import {
  Agent,
  ChatMessage
} from '@/types/control-deck'

interface Store {
  agents: Agent[]
  setAgents: (agents: Agent[]) => void
  selectedAgent: Agent | null
  setSelectedAgent: (agent: Agent | null) => void
  messages: ChatMessage[]
  setMessages: (messages: ChatMessage[]) => void,
  isStreaming: boolean,
  setIsStreaming: (isStreaming: boolean) => void,
  chatInputRef: RefObject<HTMLTextAreaElement | null>
}

export const useStore = create<Store>()((set) => ({
  agents: [],
  setAgents: (agents) => set({ agents }),
  selectedAgent: null,
  setSelectedAgent: (agent) => set({ selectedAgent: agent }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  isStreaming: false,
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  chatInputRef: createRef<HTMLTextAreaElement>(),
}))
