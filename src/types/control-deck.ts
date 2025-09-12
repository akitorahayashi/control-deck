import {
  Image,
  Video,
  Audio,
  ReasoningStep,
  ReferenceData,
  ToolCall
} from '@/types/os'

export interface Agent {
  id: string
  name: string
  description: string
  avatarUrl?: string
}

export type TaskStatus = 'pending' | 'running' | 'completed' | 'error'

export interface Task {
  id: string
  title: string
  agent: Agent
  status: TaskStatus
  createdAt: string
  lastUpdatedAt: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'agent'
  agentId?: string
  content: string
  timestamp: string
  streamingError?: boolean
  videos?: Video[]
  images?: Image[]
  audio?: Audio[]
  response_audio?: string | Blob | { transcript: string; content: string }
  tool_calls?: ToolCall[]
  extra_data?: {
    reasoning_steps?: ReasoningStep[]
    references?: ReferenceData[]
  }
}

export interface TaskConversation {
  taskId: string
  messages: ChatMessage[]
}
