import { Agent } from '@/types/agent'
import { AgentConversation, ChatMessage } from '@/types/chat'
import dayjs from 'dayjs'
import { useStore } from '@/store'

// Mock Agents
export const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Research Pro',
    description: 'Specialized in deep research, fact-checking, and information synthesis',
    specialty: 'research'
  },
  {
    id: 'agent-002',
    name: 'Summary Expert',
    description: 'Creates concise, insightful summaries of complex documents',
    specialty: 'summarization'
  },
  {
    id: 'agent-003',
    name: 'Prompt Architect',
    description: 'Designs effective prompts for optimal AI interactions',
    specialty: 'prompt-generation'
  },
  {
    id: 'agent-004',
    name: 'Code Wizard',
    description: 'Generates clean, efficient code in multiple languages',
    specialty: 'coding'
  },
  {
    id: 'agent-005',
    name: 'Data Analyst',
    description: 'Analyzes data patterns and creates meaningful visualizations',
    specialty: 'analysis'
  },
  {
    id: 'agent-006',
    name: 'Creative Writer',
    description: 'Crafts engaging stories, articles, and creative content',
    specialty: 'creative-writing'
  }
]

// Mock Conversations
export const mockConversations: AgentConversation[] = [
  {
    agentId: 'agent-001',
    messages: [
      {
        id: 'msg-1-1',
        role: 'user',
        content: 'Can you research the latest trends in AI for 2024?',
        timestamp: dayjs().subtract(1, 'hour').toISOString()
      },
      {
        id: 'msg-1-2',
        role: 'agent',
        agentId: 'agent-001',
        content: "I'll help you research the latest AI trends. Let me gather comprehensive information about the most significant developments in AI for 2024.",
        timestamp: dayjs().subtract(50, 'minute').toISOString()
      }
    ]
  },
  {
    agentId: 'agent-002',
    messages: []
  },
  {
    agentId: 'agent-003',
    messages: []
  },
  {
    agentId: 'agent-004',
    messages: [
      {
        id: 'msg-4-1',
        role: 'user',
        content: 'I need a React component for a login form with username and password fields.',
        timestamp: dayjs().subtract(2, 'hour').toISOString()
      },
      {
        id: 'msg-4-2',
        role: 'agent',
        agentId: 'agent-004',
        content: "I'll create a clean, modern React login component for you. Let me build that with proper form validation and styling.",
        timestamp: dayjs().subtract(1, 'hour').toISOString()
      }
    ]
  },
  {
    agentId: 'agent-005',
    messages: []
  },
  {
    agentId: 'agent-006',
    messages: []
  }
]

export const mockStreamingResponse = (userInput: string) => {
  const { selectedAgent, addMessage, updateMessageContent, setIsStreaming } = useStore.getState()

  if (!selectedAgent) return

  const userMessage: ChatMessage = {
    id: `msg-${Date.now()}`,
    role: 'user',
    content: userInput,
    timestamp: dayjs().toISOString(),
  }
  addMessage(userMessage)

  const agentMessageId = `msg-${Date.now() + 1}`
  const agentMessage: ChatMessage = {
    id: agentMessageId,
    role: 'agent',
    agentId: selectedAgent.id,
    content: '',
    timestamp: dayjs().toISOString(),
  }
  addMessage(agentMessage)
  setIsStreaming(true)

  const responseChunks = [
    'Of course! ',
    `I can certainly help you with '${userInput}'. `,
    'As the ',
    `'${selectedAgent.name}', `,
    'my specialty is ',
    `'${selectedAgent.specialty}'. `,
    'Let me start by gathering the necessary information. ',
    'This might take a moment... ',
    'Okay, I have a few ideas. ',
    'First, we could approach this by... ',
    'Another option would be to... ',
    'Let me know how you\'d like to proceed!',
  ]

  let chunkIndex = 0
  const interval = setInterval(() => {
    if (chunkIndex < responseChunks.length) {
      updateMessageContent(agentMessageId, responseChunks[chunkIndex])
      chunkIndex++
    } else {
      clearInterval(interval)
      setIsStreaming(false)
    }
  }, 150)
}
