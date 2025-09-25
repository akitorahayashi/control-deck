import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Messages from '@/components/chat/ChatArea/Messages/Messages';
import { mockAgents } from '@/lib/mocks';
import { ChatMessage } from '@/types/chat';

// Mock the store
vi.mock('@/store', () => ({
  useStore: vi.fn()
}));

import { useStore } from '@/store';

const mockUseStore = vi.mocked(useStore);

describe('Messages', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display selectedAgent name and description when agent is selected', () => {
    const mockAgent = mockAgents[0];
    const mockMessages: ChatMessage[] = [];

    mockUseStore.mockReturnValue({
      selectedAgent: mockAgent
    } as any);

    render(<Messages messages={mockMessages} />);

    expect(screen.getByText(mockAgent.name)).toBeInTheDocument();
    expect(screen.getByText(mockAgent.description)).toBeInTheDocument();
  });

  it('should render user messages correctly', () => {
    const mockAgent = mockAgents[0];
    const mockMessages: ChatMessage[] = [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Hello, how are you?',
        timestamp: '2024-01-01T00:00:00Z'
      }
    ];

    mockUseStore.mockReturnValue({
      selectedAgent: mockAgent
    } as any);

    render(<Messages messages={mockMessages} />);

    expect(screen.getByText('Hello, how are you?')).toBeInTheDocument();
  });

  it('should render agent messages correctly', () => {
    const mockAgent = mockAgents[0];
    const mockMessages: ChatMessage[] = [
      {
        id: 'msg-1',
        role: 'agent',
        agentId: mockAgent.id,
        content: 'I am doing well, thank you!',
        timestamp: '2024-01-01T00:00:00Z'
      }
    ];

    mockUseStore.mockReturnValue({
      selectedAgent: mockAgent
    } as any);

    render(<Messages messages={mockMessages} />);

    expect(screen.getByText('I am doing well, thank you!')).toBeInTheDocument();
  });

  it('should render multiple messages in correct order', () => {
    const mockAgent = mockAgents[0];
    const mockMessages: ChatMessage[] = [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Hello',
        timestamp: '2024-01-01T00:00:00Z'
      },
      {
        id: 'msg-2',
        role: 'agent',
        agentId: mockAgent.id,
        content: 'Hi there!',
        timestamp: '2024-01-01T00:00:01Z'
      },
      {
        id: 'msg-3',
        role: 'user',
        content: 'How are you?',
        timestamp: '2024-01-01T00:00:02Z'
      }
    ];

    mockUseStore.mockReturnValue({
      selectedAgent: mockAgent
    } as any);

    render(<Messages messages={mockMessages} />);

    const messages = screen.getAllByText(/Hello|Hi there!|How are you?/);
    expect(messages).toHaveLength(3);
  });

  it('should not display agent info when no agent is selected', () => {
    const mockMessages: ChatMessage[] = [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Hello',
        timestamp: '2024-01-01T00:00:00Z'
      }
    ];

    mockUseStore.mockReturnValue({
      selectedAgent: null
    } as any);

    render(<Messages messages={mockMessages} />);

    // Should not crash and should render messages without agent info
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
