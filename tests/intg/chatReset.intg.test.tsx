import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act
} from '@testing-library/react';
import Page from '@/app/page';
import { useStore } from '@/store';
import { mockAgents } from '@/lib/mocks';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { sendChat } from '@/lib/chatService';

vi.mock('@/lib/chatService', () => ({
  sendChat: vi.fn()
}));

const sendChatMock = vi.mocked(sendChat);

const resetStore = () => {
  act(() => {
    useStore.setState({
      selectedAgent: null,
      isStreaming: false,
      messages: []
    });
  });
};

describe('Integration Test: Chat Reset Workflow', () => {
  const agentToSelect = mockAgents.find(
    (agent) => agent.name === 'Code Wizard'
  );

  beforeEach(async () => {
    resetStore();
    sendChatMock.mockReset();

    sendChatMock.mockImplementation(
      async ({ messages, onChunk, onComplete }) => {
        const lastMessage = messages[messages.length - 1];
        const content = lastMessage?.content ?? '';
        onChunk?.({
          choices: [{ delta: { content: `Response to: ${content}` } }]
        } as any);
        onComplete?.();
      }
    );

    render(<Page />);

    if (!agentToSelect) throw new Error('Code Wizard agent not found');
    fireEvent.click(screen.getByText(agentToSelect.name));

    await waitFor(() =>
      expect(
        screen.getByPlaceholderText(`Chat with ${agentToSelect.name}...`)
      ).toBeInTheDocument()
    );

    const chatInput = screen.getByPlaceholderText(
      `Chat with ${agentToSelect.name}...`
    );
    const sendButton = screen.getByRole('button', { name: 'Send message' });

    fireEvent.change(chatInput, { target: { value: 'Message 1' } });
    fireEvent.click(sendButton);
    await screen.findByText('Response to: Message 1');

    fireEvent.change(chatInput, { target: { value: 'Message 2' } });
    fireEvent.click(sendButton);
    await screen.findByText('Response to: Message 2');
  });

  it('clears the conversation history when reset is confirmed', async () => {
    if (!agentToSelect) throw new Error('Code Wizard agent not found');

    expect(screen.getByText('Message 1')).toBeInTheDocument();
    expect(screen.getByText('Response to: Message 1')).toBeInTheDocument();
    expect(screen.getByText('Message 2')).toBeInTheDocument();
    expect(screen.getByText('Response to: Message 2')).toBeInTheDocument();

    const resetButton = screen.getByRole('button', { name: 'Reset chat' });
    fireEvent.click(resetButton);

    expect(
      await screen.findByRole('heading', { name: 'Reset chat?' })
    ).toBeInTheDocument();

    const confirmResetButton = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(confirmResetButton);

    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: 'Reset chat?' })
      ).not.toBeInTheDocument();
    });

    expect(screen.queryByText('Message 1')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Response to: Message 1')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Message 2')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Response to: Message 2')
    ).not.toBeInTheDocument();

    const agentNameInBlankState = await screen.findByText(agentToSelect.name, {
      selector: 'h1'
    });
    expect(agentNameInBlankState).toBeInTheDocument();
    expect(
      screen.getByText(agentToSelect.description, {
        selector: 'p.text-base.text-muted-foreground.text-center'
      })
    ).toBeInTheDocument();
  });
});
