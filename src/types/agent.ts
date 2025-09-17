export type AgentSpecialty = 'research' | 'summarization' | 'prompt-generation' | 'coding' | 'analysis' | 'creative-writing'

export interface Agent {
    id: string
    name: string
    description: string
    specialty: AgentSpecialty
    avatarUrl?: string
}

export interface AgentInfoProps {
    agent: Agent
    className?: string
}