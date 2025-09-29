import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Page from '@/app/page';
import { useStore } from '@/store';
import { mockAgents } from '@/lib/mocks';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { sendChat } from '@/lib/chatService';

vi.mock('@/lib/chatService', () => ({
  sendChat: vi.fn()
}));

const sendChatMock = vi.mocked(sendChat);

const resetStore = () => {
  act(() => {
    const store = useStore.getState();
    store.setSelectedAgent(null);
    store.clearMessages();
    store.setIsStreaming(false);
  });
};

describe('Integration Test: Chat Streaming Workflow', () => {
  const agentToSelect = mockAgents.find(
    (agent) => agent.name === 'Code Wizard'
  );

  beforeEach(() => {
    resetStore();
    sendChatMock.mockReset();

    render(<Page />);

    if (!agentToSelect) throw new Error('Code Wizard agent not found');
    fireEvent.click(screen.getByText(agentToSelect.name));
  });

  afterEach(() => {
    resetStore();
  });

  it('handles message submission and streaming updates', async () => {
    if (!agentToSelect) throw new Error('Code Wizard agent not found');

    sendChatMock.mockImplementation(async ({ onChunk, onComplete }) => {
      onChunk?.({ choices: [{ delta: { think: 'Analyzing... ' } }] } as any);
      onChunk?.({
        choices: [{ delta: { content: 'Hello! How can I help you?' } }]
      } as any);
      onComplete?.();
    });

    const chatInput = screen.getByPlaceholderText(
      `Chat with ${agentToSelect.name}...`
    );
    const sendButton = screen.getByRole('button', { name: 'Send message' });

    fireEvent.change(chatInput, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(sendChatMock).toHaveBeenCalled();
    });

    expect(await screen.findByText('Hello')).toBeInTheDocument();
    expect(
      await screen.findByText('Hello! How can I help you?')
    ).toBeInTheDocument();
  });
});
