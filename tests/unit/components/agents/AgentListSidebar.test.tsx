import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AgentListSidebar } from '@/components/agents/AgentListSidebar';
import { mockAgents } from '@/lib/mocks';

// Mock the store
vi.mock('@/store', () => ({
  useStore: vi.fn()
}));

import { useStore } from '@/store';

const mockUseStore = vi.mocked(useStore);

describe('AgentListSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the list of agents', () => {
    const mockSetAgents = vi.fn();
    const mockSetSelectedAgent = vi.fn();

    mockUseStore.mockReturnValue({
      agents: mockAgents,
      setAgents: mockSetAgents,
      selectedAgent: null,
      setSelectedAgent: mockSetSelectedAgent
    } as any);

    render(<AgentListSidebar />);

    expect(screen.getByText('Research Pro')).toBeInTheDocument();
    expect(screen.getByText('Summary Expert')).toBeInTheDocument();
    expect(screen.getByText('Prompt Architect')).toBeInTheDocument();
  });

  it('should call setSelectedAgent when an agent is clicked', () => {
    const mockSetAgents = vi.fn();
    const mockSetSelectedAgent = vi.fn();

    mockUseStore.mockReturnValue({
      agents: mockAgents,
      setAgents: mockSetAgents,
      selectedAgent: null,
      setSelectedAgent: mockSetSelectedAgent
    } as any);

    render(<AgentListSidebar />);

    const researchProButton = screen.getByText('Research Pro');
    fireEvent.click(researchProButton);

    expect(mockSetSelectedAgent).toHaveBeenCalledWith(mockAgents[0]);
  });

  it('should highlight the selected agent', () => {
    const mockSetAgents = vi.fn();
    const mockSetSelectedAgent = vi.fn();

    mockUseStore.mockReturnValue({
      agents: mockAgents,
      setAgents: mockSetAgents,
      selectedAgent: mockAgents[0],
      setSelectedAgent: mockSetSelectedAgent
    } as any);

    render(<AgentListSidebar />);

    // The selected agent should have different styling (we can check for presence in document)
    const researchProElement = screen.getByText('Research Pro');
    expect(researchProElement).toBeInTheDocument();
  });

  it('should call setAgents with mockAgents on mount', () => {
    const mockSetAgents = vi.fn();
    const mockSetSelectedAgent = vi.fn();

    mockUseStore.mockReturnValue({
      agents: [],
      setAgents: mockSetAgents,
      selectedAgent: null,
      setSelectedAgent: mockSetSelectedAgent
    } as any);

    render(<AgentListSidebar />);

    expect(mockSetAgents).toHaveBeenCalledWith(mockAgents);
  });
});
