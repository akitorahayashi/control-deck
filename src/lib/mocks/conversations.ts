import { AgentConversation } from '@/types/chat';
import dayjs from 'dayjs';

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
        content:
          "I'll help you research the latest AI trends. Let me gather comprehensive information about the most significant developments in AI for 2024.",
        thinking:
          'The user is asking about AI trends for 2024. I need to consider the most significant developments this year, including: 1) Large language models becoming more capable and efficient, 2) Multimodal AI systems gaining traction, 3) AI regulation frameworks being established, 4) Edge AI and on-device processing improvements, 5) AI in healthcare and scientific research breakthroughs. I should structure my response to cover these key areas comprehensively.',
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
        content:
          'I need a React component for a login form with username and password fields.',
        timestamp: dayjs().subtract(2, 'hour').toISOString()
      },
      {
        id: 'msg-4-2',
        role: 'agent',
        agentId: 'agent-004',
        content:
          "I'll create a clean, modern React login component for you. Let me build that with proper form validation and styling.",
        thinking:
          "The user needs a React login form component. I should consider: 1) Using TypeScript for better type safety, 2) Implementing proper form validation with error handling, 3) Using controlled components for form inputs, 4) Adding accessibility features like proper labels and ARIA attributes, 5) Styling with modern CSS or a styling library, 6) Including loading states and submit handling. I'll create a comprehensive solution that follows React best practices.",
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
];
