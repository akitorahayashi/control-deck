import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import Page from '@/app/page'
import { useStore } from '@/store'
import { mockAgents } from '@/lib/mocks'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Integration Test: Agent Selection Workflow', () => {
  beforeEach(() => {
    // Reset store before each test
    act(() => {
      useStore.setState({
        selectedAgent: null,
        isStreaming: false
      })
    })
    render(<Page />)
  })

  it('should correctly update the UI and state upon agent selection', async () => {
    // 1. Initial state validation
    expect(screen.getByText('No Agent Selected')).toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText('Select an agent to start chatting...')
    ).not.toBeInTheDocument()

    // 2. Select an agent
    const agentToSelect = mockAgents.find(
      (agent) => agent.name === 'Research Pro'
    )
    if (!agentToSelect) {
      throw new Error('"Research Pro" agent not found in mock data')
    }
    fireEvent.click(screen.getByText(agentToSelect.name))

    // 3. State change validation
    await waitFor(() => {
      expect(screen.queryByText('No Agent Selected')).not.toBeInTheDocument()
    })

    // Check for agent name in ChatBlankState
    const agentNameInBlankState = await screen.findByText(agentToSelect.name, {
      selector: 'h1'
    })
    expect(agentNameInBlankState).toBeInTheDocument()

    const updatedChatInput = screen.getByPlaceholderText(
      `Chat with ${agentToSelect.name}...`
    )
    expect(updatedChatInput).not.toBeDisabled()

    // (Optional) Verify store state
    expect(useStore.getState().selectedAgent?.id).toBe(agentToSelect.id)
  })
})
