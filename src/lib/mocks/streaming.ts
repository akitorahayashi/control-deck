import { ChatMessage } from '@/types/chat'
import { useStore } from '@/store'
import dayjs from 'dayjs'

export const mockStreamingResponse = (userInput: string) => {
  const { selectedAgent, addMessage, updateMessageContent, updateMessageThinking, setIsStreaming } = useStore.getState()

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
    thinking: '',
    timestamp: dayjs().toISOString(),
  }
  addMessage(agentMessage)
  setIsStreaming(true)

  const thinkingChunks = [
    'The user has asked me about "',
    userInput,
    '". Let me think about the best approach. ',
    'As a ',
    selectedAgent.name,
    ', my specialty is ',
    selectedAgent.specialty,
    '. I should leverage this expertise. ',
    'First, I need to analyze what they\'re asking for. ',
    'I should provide a comprehensive and helpful response. ',
    'Let me structure my thoughts and provide the best solution.'
  ]

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
    'Let me know how you\'d like to proceed!',
  ]

  // First stream thinking
  let thinkingIndex = 0
  const thinkingInterval = setInterval(() => {
    if (thinkingIndex < thinkingChunks.length) {
      updateMessageThinking(agentMessageId, thinkingChunks[thinkingIndex])
      thinkingIndex++
    } else {
      clearInterval(thinkingInterval)

      // Start response after thinking is complete
      let responseIndex = 0
      const responseInterval = setInterval(() => {
        if (responseIndex < responseChunks.length) {
          updateMessageContent(agentMessageId, responseChunks[responseIndex])
          responseIndex++
        } else {
          clearInterval(responseInterval)
          setIsStreaming(false)
        }
      }, 150)
    }
  }, 100)
}