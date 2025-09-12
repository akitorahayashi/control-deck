import { create } from 'zustand'
import {
  Task,
  ChatMessage
} from '@/types/control-deck'

interface Store {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  selectedTask: Task | null
  setSelectedTask: (task: Task | null) => void
  messages: ChatMessage[]
  setMessages: (messages: ChatMessage[]) => void,
  isStreaming: boolean,
  setIsStreaming: (isStreaming: boolean) => void,
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
}))
