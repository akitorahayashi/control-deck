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