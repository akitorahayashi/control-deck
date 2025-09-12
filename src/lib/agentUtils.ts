import { Agent } from '@/types/control-deck'
import { mockAgents } from './mock-data'

export const getAgentById = (agentId: string): Agent | null => {
  return mockAgents.find((agent) => agent.id === agentId) || null
}

export const getAgentName = (agentId: string): string => {
  const agent = getAgentById(agentId)
  return agent?.name || 'Unknown Agent'
}
