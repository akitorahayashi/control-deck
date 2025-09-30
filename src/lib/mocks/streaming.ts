import { Agent } from '@/types/agent';
import { ChatMessage } from '@/types/chat';

interface MockStreamingParams {
  userInput: string;
  selectedAgent: Agent | null;
  isStreaming: boolean;
  appendUserMessage: (content: string) => ChatMessage;
  appendAssistantPlaceholder: (agentId: string) => ChatMessage;
  appendAssistantContent: (id: string, chunk: string) => void;
  appendAssistantThinking: (id: string, chunk: string) => void;
  setIsStreaming: (isStreaming: boolean) => void;
}

export const mockStreamingResponse = ({
  userInput,
  selectedAgent,
  isStreaming,
  appendUserMessage,
  appendAssistantPlaceholder,
  appendAssistantContent,
  appendAssistantThinking,
  setIsStreaming
}: MockStreamingParams) => {
  if (!selectedAgent || isStreaming) return;

  appendUserMessage(userInput);
  const agentMessageId = appendAssistantPlaceholder(selectedAgent.id).id;
  setIsStreaming(true);

  const thinkingChunks = [
    'The user has asked me about "',
    userInput,
    '". Let me think about the best approach. ',
    'As a ',
    selectedAgent.name,
    ', my specialty is ',
    selectedAgent.specialty,
    '. I should leverage this expertise. ',
    "First, I need to analyze what they're asking for. ",
    'I should provide a comprehensive and helpful response. ',
    'Let me structure my thoughts and provide the best solution.'
  ];

  const responseChunks = [
    'Of course! ',
    `I can certainly help you with "${userInput}". `,
    'As the ',
    `"${selectedAgent.name}", `,
    'my specialty is ',
    `"${selectedAgent.specialty}". `,
    'Let me start by gathering the necessary information. ',
    'This might take a moment... ',
    'Okay, I have a few ideas. ',
    'First, we could approach this by... ',
    'Another option would be to... ',
    "Let me know how you'd like to proceed!"
  ];

  let thinkingIndex = 0;
  let responseIndex = 0;
  let thinkingInterval: NodeJS.Timeout | null = null;
  let responseInterval: NodeJS.Timeout | null = null;

  thinkingInterval = setInterval(() => {
    if (thinkingIndex < thinkingChunks.length) {
      appendAssistantThinking(agentMessageId, thinkingChunks[thinkingIndex]);
      thinkingIndex++;
    } else {
      clearInterval(thinkingInterval!);
      thinkingInterval = null;

      responseInterval = setInterval(() => {
        if (responseIndex < responseChunks.length) {
          appendAssistantContent(agentMessageId, responseChunks[responseIndex]);
          responseIndex++;
        } else {
          clearInterval(responseInterval!);
          responseInterval = null;
          setIsStreaming(false);
        }
      }, 150);
    }
  }, 100);
};
