export type AgentSpecialty = 'research' | 'summarization' | 'prompt-generation' | 'coding' | 'analysis' | 'creative-writing'

export interface Agent {
  id: string
  name: string
  description: string
  specialty: AgentSpecialty
  avatarUrl?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'agent'
  agentId?: string
  content: string
  timestamp: string
}

export interface AgentConversation {
  agentId: string
  messages: ChatMessage[]
}
