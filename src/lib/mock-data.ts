import { Agent, Task, TaskConversation } from '@/types/control-deck'
import dayjs from 'dayjs'

// Mock Agents
export const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Research Assistant',
    description:
      'An agent specialized in gathering and summarizing information.'
  },
  {
    id: 'agent-002',
    name: 'Code Generator',
    description: 'An agent that generates code snippets based on requirements.'
  },
  {
    id: 'agent-003',
    name: 'Data Analyst',
    description: 'An agent for analyzing and visualizing data.'
  }
]

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: 'task-001',
    title: 'Analyze Q2 Sales Data',
    agent: mockAgents[2],
    status: 'completed',
    createdAt: dayjs().subtract(2, 'day').toISOString(),
    lastUpdatedAt: dayjs().subtract(1, 'day').toISOString()
  },
  {
    id: 'task-002',
    title: 'Generate a React component for a login form',
    agent: mockAgents[1],
    status: 'running',
    createdAt: dayjs().subtract(1, 'hour').toISOString(),
    lastUpdatedAt: dayjs().subtract(5, 'minute').toISOString()
  },
  {
    id: 'task-003',
    title: 'Research the latest trends in AI',
    agent: mockAgents[0],
    status: 'pending',
    createdAt: dayjs().subtract(30, 'minute').toISOString(),
    lastUpdatedAt: dayjs().subtract(30, 'minute').toISOString()
  },
  {
    id: 'task-004',
    title: 'Summarize the attached earnings report',
    agent: mockAgents[0],
    status: 'error',
    createdAt: dayjs().subtract(3, 'day').toISOString(),
    lastUpdatedAt: dayjs().subtract(2, 'day').toISOString()
  }
]

// Mock Conversations
export const mockConversations: TaskConversation[] = [
  {
    taskId: 'task-001',
    messages: [
      {
        id: 'msg-1-1',
        role: 'user',
        content: 'Please analyze the Q2 sales data and provide a summary.',
        timestamp: dayjs().subtract(2, 'day').add(1, 'minute').toISOString()
      },
      {
        id: 'msg-1-2',
        role: 'agent',
        agentId: 'agent-003',
        content:
          'Certainly. I have analyzed the Q2 sales data. Here is the summary: Revenue is up 15% year-over-year, with the strongest growth in the North America region. I have attached a detailed report.',
        timestamp: dayjs().subtract(1, 'day').toISOString()
      }
    ]
  },
  {
    taskId: 'task-002',
    messages: [
      {
        id: 'msg-2-1',
        role: 'user',
        content:
          'I need a React component for a login form. It should have fields for username and password, and a submit button.',
        timestamp: dayjs().subtract(1, 'hour').toISOString()
      },
      {
        id: 'msg-2-2',
        role: 'agent',
        agentId: 'agent-002',
        content: 'I am on it. Generating the React component now...',
        timestamp: dayjs().subtract(5, 'minute').toISOString()
      }
    ]
  },
  {
    taskId: 'task-003',
    messages: []
  },
  {
    taskId: 'task-004',
    messages: [
      {
        id: 'msg-4-1',
        role: 'user',
        content: 'Can you summarize the attached earnings report for me?',
        timestamp: dayjs().subtract(3, 'day').toISOString()
      },
      {
        id: 'msg-4-2',
        role: 'agent',
        agentId: 'agent-001',
        content:
          'An error occurred while processing the document. Please try again or use a different file format.',
        timestamp: dayjs().subtract(2, 'day').toISOString()
      }
    ]
  }
]
