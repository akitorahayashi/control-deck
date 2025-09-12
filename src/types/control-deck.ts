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
  content: string
  timestamp: string
}

export interface TaskConversation {
  taskId: string
  messages: ChatMessage[]
}
