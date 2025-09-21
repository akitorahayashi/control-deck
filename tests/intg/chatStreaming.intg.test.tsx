import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import Page from '@/app/page'
import { useStore } from '@/store'
import { mockStreamingResponse } from '@/lib/mocks/streaming'
import { mockAgents } from '@/lib/mocks'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock
} from 'vitest'

// Mock the streaming module
vi.mock('@/lib/mocks/streaming', async (importOriginal) => {
  const original =
    await importOriginal<typeof import('@/lib/mocks/streaming')>()
  return {
    ...original,
    mockStreamingResponse: vi.fn()
  }
})

describe('Integration Test: Chat Streaming Workflow', () => {
  const agentToSelect = mockAgents.find((agent) => agent.name === 'Code Wizard')

  beforeEach(() => {
    // Reset store and mocks
    act(() => {
      useStore.setState({
        selectedAgent: null,
        isStreaming: false
      })
    })
      ; (mockStreamingResponse as Mock).mockClear()

    render(<Page />)

    // Select an agent
    if (!agentToSelect) throw new Error('Code Wizard agent not found')
    fireEvent.click(screen.getByText(agentToSelect.name))
  })

  it('should handle message submission and render streaming responses correctly', async () => {
    // Mock implementation for this specific test
    vi.mocked(mockStreamingResponse).mockImplementation((message: string) => {
      const { addMessage, setIsStreaming } = useStore.getState()

      // （ユーザーメッセージは UI 側で既に追加される前提）
      // Add agent message and respond immediately
      const agentMessageId = `msg-${Date.now() + 1}`
      const agentMessage = {
        id: agentMessageId,
        role: 'agent' as const,
        agentId: 'agent-004',
        content: 'Hello! How can I help you?',
        thinking: '',
        timestamp: new Date().toISOString()
      }
      addMessage(agentMessage)
      setIsStreaming(false)
    })

    if (!agentToSelect) throw new Error('Code Wizard agent not found')

    const chatInput = screen.getByPlaceholderText(
      `Chat with ${agentToSelect.name}...`
    )
    const sendButton = screen.getByRole('button', { name: 'Send message' })

    // 1. Send a message
    fireEvent.change(chatInput, { target: { value: 'Hello' } })
    fireEvent.click(sendButton)

    // 2. Post-submission validation
    await waitFor(() => {
      expect(mockStreamingResponse).toHaveBeenCalledWith('Hello')
    })
    expect(await screen.findByText('Hello')).toBeInTheDocument()
    expect(
      await screen.findByText('Hello! How can I help you?')
    ).toBeInTheDocument()
  })
})
