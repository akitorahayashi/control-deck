import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AgentView } from '@/components/agents/AgentView';
import { mockAgents } from '@/lib/mocks';

vi.mock('@/store', () => ({
  useStore: vi.fn()
}));

import { useStore } from '@/store';

const mockUseStore = vi.mocked(useStore);

describe('AgentView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the fallback when no agent is selected and clears messages', () => {
    const clearMessages = vi.fn();
    const state = { selectedAgent: null, clearMessages, messages: [] };
    mockUseStore.mockImplementation((selector?: any) =>
      typeof selector === 'function' ? selector(state) : state
    );

    render(<AgentView />);

    expect(clearMessages).not.toHaveBeenCalled();
    expect(screen.getByText('No Agent Selected')).toBeInTheDocument();
  });

  it('renders chat view when an agent is selected and clears messages', () => {
    const clearMessages = vi.fn();
    const selectedAgent = mockAgents[0];

    const state = { selectedAgent, clearMessages, messages: [{ id: '1', role: 'user', content: 'hi', timestamp: '2024-01-01T00:00:00Z' }] };
    mockUseStore.mockImplementation((selector?: any) =>
      typeof selector === 'function' ? selector(state) : state
    );

    render(<AgentView />);

    expect(clearMessages).not.toHaveBeenCalled();
    expect(screen.queryByText('No Agent Selected')).not.toBeInTheDocument();
  });
});
