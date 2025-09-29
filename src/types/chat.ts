export interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  agentId?: string;
  content: string;
  thinking?: string;
  timestamp: string;
}

export interface AgentConversation {
  agentId: string;
  messages: ChatMessage[];
}

export type ChatCompletionRole = 'system' | 'user' | 'assistant' | 'tool';

export interface ChatCompletionMessagePayload {
  role: ChatCompletionRole;
  content?: string;
  think?: string;
  images?: string[];
  tool_calls?: unknown[];
}
