import { IconType } from '@/components/ui/icon'

const AGENT_ICON_MAP: Record<string, IconType> = {
  'agent-001': 'references', // Research Assistant
  'agent-002': 'hammer', // Code Generator  
  'agent-003': 'chevron-up' // Data Analyst
}

export const getAgentIcon = (agentId: string): IconType => {
  return AGENT_ICON_MAP[agentId] || 'agent'
}