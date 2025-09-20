import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import Page from '@/app/page'
import { useStore } from '@/store'
import { mockStreamingResponse } from '@/lib/mocks/streaming'
import { mockAgents } from '@/lib/mocks'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

// Mock the streaming module
vi.mock('@/lib/mocks/streaming', async (importOriginal) => {
  const original =
    await importOriginal<typeof import('@/lib/mocks/streaming')>()
  return {
    ...original,
    mockStreamingResponse: vi.fn()
  }
})

describe('Integration Test: Chat Reset Workflow', () => {
  const agentToSelect = mockAgents.find((agent) => agent.name === 'Code Wizard')

  beforeEach(async () => {
    // Reset store and mocks
    act(() => {
      useStore.setState({
        selectedAgent: null,
        isStreaming: false
      })
    })
    ;(mockStreamingResponse as Mock).mockClear()

    // Mock a simple, immediate response
    ;(mockStreamingResponse as Mock).mockImplementation((message: string) => {
      const { addMessage, updateMessageContent, setIsStreaming } =
        useStore.getState()

      // Add user message
      const userMessage = {
        id: `msg-${Date.now()}`,
        role: 'user' as const,
        content: message,
        timestamp: new Date().toISOString()
      }
      addMessage(userMessage)

      // Add agent message
      const agentMessageId = `msg-${Date.now() + 1}`
      const agentMessage = {
        id: agentMessageId,
        role: 'agent' as const,
        agentId: 'agent-004',
        content: `Response to: ${message}`,
        timestamp: new Date().toISOString()
      }
      addMessage(agentMessage)
      setIsStreaming(false)
    })

    render(<Page />)

    // Select an agent
    if (!agentToSelect) throw new Error('Code Wizard agent not found')
    fireEvent.click(screen.getByText(agentToSelect.name))

    // Create some conversation history
    await waitFor(() =>
      expect(
        screen.getByPlaceholderText(`Chat with ${agentToSelect.name}...`)
      ).toBeInTheDocument()
    )

    const chatInput = screen.getByPlaceholderText(
      `Chat with ${agentToSelect.name}...`
    )
    const sendButton = screen.getByRole('button', { name: 'Send message' })

    // Send message 1
    fireEvent.change(chatInput, { target: { value: 'Message 1' } })
    fireEvent.click(sendButton)
    await screen.findByText(/Response to: Message 1/)

    // Send message 2
    fireEvent.change(chatInput, { target: { value: 'Message 2' } })
    fireEvent.click(sendButton)
    await screen.findByText(/Response to: Message 2/)
  })

  it('should clear the conversation history when the reset button is clicked and confirmed', async () => {
    // 1. Initial state validation (messages exist)
    expect(screen.getByText('Message 1')).toBeInTheDocument()
    expect(screen.getByText('Response to: Message 1')).toBeInTheDocument()
    expect(screen.getByText('Message 2')).toBeInTheDocument()
    expect(screen.getByText('Response to: Message 2')).toBeInTheDocument()

    // 2. Reset operation
    const resetButton = screen.getByRole('button', { name: 'Reset chat' })
    fireEvent.click(resetButton)

    // Assert dialog appears
    expect(
      await screen.findByRole('heading', { name: 'Reset chat?' })
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'This will clear the current conversation history. This action cannot be undone.'
      )
    ).toBeInTheDocument()

    // Click the confirm reset button in the dialog
    const confirmResetButton = screen.getByRole('button', { name: 'Reset' })
    fireEvent.click(confirmResetButton)

    // 3. Post-reset validation
    // Assert dialog is closed
    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: 'Reset chat?' })
      ).not.toBeInTheDocument()
    })

    // Assert messages are gone
    expect(screen.queryByText('Message 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Response to: Message 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Message 2')).not.toBeInTheDocument()
    expect(screen.queryByText('Response to: Message 2')).not.toBeInTheDocument()

    // Assert ChatArea is back to its initial state (ChatBlankState)
    if (!agentToSelect) throw new Error('Code Wizard agent not found')
    const agentNameInBlankState = await screen.findByText(agentToSelect.name, {
      selector: 'h1'
    })
    expect(agentNameInBlankState).toBeInTheDocument()
    expect(
      screen.getByText(agentToSelect.description, {
        selector: 'p.text-base.text-muted-foreground.text-center'
      })
    ).toBeInTheDocument()
  })
})
