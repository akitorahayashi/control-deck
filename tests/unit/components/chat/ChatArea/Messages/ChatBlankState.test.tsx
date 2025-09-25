import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import ChatBlankState from '@/components/chat/ChatArea/Messages/ChatBlankState'
import { mockAgents } from '@/lib/mocks'

// Mock the store
vi.mock('@/store', () => ({
  useStore: vi.fn()
}))

import { useStore } from '@/store'

const mockUseStore = vi.mocked(useStore)

describe('ChatBlankState', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should display selectedAgent name and description when agent is selected', () => {
    const mockAgent = mockAgents[0]

    mockUseStore.mockReturnValue({
      selectedAgent: mockAgent
    } as any)

    render(<ChatBlankState />)

    expect(screen.getByText(mockAgent.name)).toBeInTheDocument()
    expect(screen.getByText(mockAgent.description)).toBeInTheDocument()
  })

  it('should display "Control Deck UI" heading when no agent is selected', () => {
    mockUseStore.mockReturnValue({
      selectedAgent: null
    } as any)

    render(<ChatBlankState />)

    expect(screen.getByText('Control Deck UI')).toBeInTheDocument()
  })

  it('should render different content based on selectedAgent state', () => {
    // Test with agent selected
    const mockAgent = mockAgents[0]
    const { rerender } = render(<ChatBlankState />)

    mockUseStore.mockReturnValue({
      selectedAgent: mockAgent
    } as any)

    rerender(<ChatBlankState />)
    expect(screen.getByText(mockAgent.name)).toBeInTheDocument()

    // Test without agent selected
    mockUseStore.mockReturnValue({
      selectedAgent: null
    } as any)

    rerender(<ChatBlankState />)
    expect(screen.getByText('Control Deck UI')).toBeInTheDocument()
    expect(screen.queryByText(mockAgent.name)).not.toBeInTheDocument()
  })
})
