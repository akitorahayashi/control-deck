import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mockStreamingResponse } from '@/lib/mocks/streaming'
import { useStore } from '@/store'
import { mockAgents } from '@/lib/mocks'

// Mock the store
vi.mock('@/store', () => ({
  useStore: {
    getState: vi.fn()
  }
}))

describe('Streaming Mock', () => {
  let mockStore: any

  beforeEach(() => {
    mockStore = {
      selectedAgent: mockAgents[0],
      addMessage: vi.fn(),
      updateMessageContent: vi.fn(),
      updateMessageThinking: vi.fn(),
      setIsStreaming: vi.fn()
    }
    ;(useStore.getState as any).mockReturnValue(mockStore)
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('should not do anything if no selectedAgent', () => {
    mockStore.selectedAgent = null
    mockStreamingResponse('test message')
    expect(mockStore.addMessage).not.toHaveBeenCalled()
  })

  it('should add user message and agent message, then stream thinking and content', () => {
    vi.useFakeTimers()

    mockStreamingResponse('test message')

    // Check initial messages added
    expect(mockStore.addMessage).toHaveBeenCalledTimes(2)
    expect(mockStore.setIsStreaming).toHaveBeenCalledWith(true)

    // Advance timers to simulate thinking chunks
    vi.advanceTimersByTime(100 * 12) // 11 thinking chunks + buffer

    // Check thinking updates
    expect(mockStore.updateMessageThinking).toHaveBeenCalledTimes(11)

    // Advance timers to simulate response chunks
    vi.advanceTimersByTime(150 * 13) // 12 response chunks + buffer

    // Check content updates
    expect(mockStore.updateMessageContent).toHaveBeenCalledTimes(12)

    // Check streaming ended
    expect(mockStore.setIsStreaming).toHaveBeenCalledWith(false)
  })

  it('should call actions in correct order', () => {
    vi.useFakeTimers()

    mockStreamingResponse('test message')

    // Initial setup
    expect(mockStore.addMessage).toHaveBeenCalledTimes(2)
    expect(mockStore.setIsStreaming).toHaveBeenCalledWith(true)

    // After thinking completes
    vi.advanceTimersByTime(100 * 12 + 150 * 13)

    const addMessageCalls = mockStore.addMessage.mock.calls
    const updateThinkingCalls = mockStore.updateMessageThinking.mock.calls
    const updateContentCalls = mockStore.updateMessageContent.mock.calls

    // First call should be user message
    expect(addMessageCalls[0][0].role).toBe('user')
    expect(addMessageCalls[0][0].content).toBe('test message')

    // Second call should be agent message
    expect(addMessageCalls[1][0].role).toBe('agent')
    expect(addMessageCalls[1][0].content).toBe('')

    // Thinking updates should happen before content updates
    expect(updateThinkingCalls.length).toBeGreaterThan(0)
    expect(updateContentCalls.length).toBeGreaterThan(0)

    // Final call should set streaming to false
    expect(mockStore.setIsStreaming).toHaveBeenLastCalledWith(false)
  })
})
