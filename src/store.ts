import React from 'react'
import { create } from 'zustand'
import { Task, ChatMessage } from '@/types/control-deck'

interface Store {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  selectedTask: Task | null
  setSelectedTask: (task: Task | null) => void
  messages: ChatMessage[]
  setMessages: (messages: ChatMessage[]) => void
  isStreaming: boolean
  setIsStreaming: (isStreaming: boolean) => void
  chatInputRef: React.RefObject<HTMLTextAreaElement> | null
  setChatInputRef: (ref: React.RefObject<HTMLTextAreaElement> | null) => void
  streamingErrorMessage: string | null
  setStreamingErrorMessage: (message: string | null) => void
}

export const useStore = create<Store>()((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  selectedTask: null,
  setSelectedTask: (task) => set({ selectedTask: task }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  isStreaming: false,
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  chatInputRef: null,
  setChatInputRef: (ref) => set({ chatInputRef: ref }),
  streamingErrorMessage: null,
  setStreamingErrorMessage: (message) => set({ streamingErrorMessage: message })
}))
