import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AgentView } from '@/components/agents/AgentView'
import { mockAgents } from '@/lib/mocks'

// Mock the store
vi.mock('@/store', () => ({
  useStore: vi.fn()
}))

import { useStore } from '@/store'

const mockUseStore = vi.mocked(useStore)

describe('AgentView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should display "No Agent Selected" when selectedAgent is null', () => {
    mockUseStore.mockReturnValue({
      selectedAgent: null,
      setMessages: vi.fn(),
      messages: []
    } as any)

    render(<AgentView />)

    expect(screen.getByText('No Agent Selected')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Please select an agent from the sidebar to start a conversation.'
      )
    ).toBeInTheDocument()
  })

  it('should render StatusBar and ChatArea when selectedAgent is set', () => {
    const mockAgent = mockAgents[0]
    const mockSetMessages = vi.fn()

    mockUseStore.mockReturnValue({
      selectedAgent: mockAgent,
      setMessages: mockSetMessages,
      messages: []
    } as any)

    render(<AgentView />)

    // Check that StatusBar and ChatArea are rendered (we can't easily test their content without more mocking)
    // For now, we check that the component doesn't crash and renders something
    expect(screen.queryByText('No Agent Selected')).not.toBeInTheDocument()
  })

  it('should call setMessages with empty array when selectedAgent is null', () => {
    const mockSetMessages = vi.fn()

    mockUseStore.mockReturnValue({
      selectedAgent: null,
      setMessages: mockSetMessages,
      messages: []
    } as any)

    render(<AgentView />)

    expect(mockSetMessages).toHaveBeenCalledWith([])
  })

  it('should call setMessages with conversation messages when selectedAgent is set', () => {
    const mockAgent = mockAgents[0]
    const mockSetMessages = vi.fn()
    const expectedMessages = [
      {
        id: 'msg-1-1',
        role: 'user',
        content: 'Can you research the latest trends in AI for 2024?',
        timestamp: expect.any(String)
      },
      {
        id: 'msg-1-2',
        role: 'agent',
        agentId: 'agent-001',
        content:
          "I'll help you research the latest AI trends. Let me gather comprehensive information about the most significant developments in AI for 2024.",
        thinking: expect.any(String),
        timestamp: expect.any(String)
      }
    ]

    mockUseStore.mockReturnValue({
      selectedAgent: mockAgent,
      setMessages: mockSetMessages,
      messages: []
    } as any)

    render(<AgentView />)

    expect(mockSetMessages).toHaveBeenCalledWith(expectedMessages)
  })
})
