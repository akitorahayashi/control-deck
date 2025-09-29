import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatInput from '@/components/chat/ChatArea/ChatInput/ChatInput';
import { mockAgents } from '@/lib/mocks';
import { sendChat } from '@/lib/chatService';
import { useStore } from '@/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/store', () => ({
  useStore: vi.fn()
}));

vi.mock('@/lib/chatService', () => ({
  sendChat: vi.fn()
}));

const mockUseStore = vi.mocked(useStore);
const sendChatMock = vi.mocked(sendChat);

const baseStateFactory = () => ({
  chatInputRef: { current: null },
  selectedAgent: null as (typeof mockAgents)[number] | null,
  isStreaming: false,
  setIsStreaming: vi.fn(),
  appendUserMessage: vi.fn().mockReturnValue({ id: 'user-msg' }),
  appendAssistantPlaceholder: vi.fn().mockReturnValue({ id: 'assistant-msg' }),
  appendAssistantContent: vi.fn(),
  appendAssistantThinking: vi.fn(),
  replaceMessage: vi.fn(),
  buildRequestMessages: vi.fn().mockReturnValue([])
});

const setupStore = (overrides: Partial<ReturnType<typeof baseStateFactory>> = {}) => {
  const state = createStoreState(overrides);
  mockUseStore.mockImplementation((selector?: any) =>
    typeof selector === 'function' ? selector(state) : state
  );
  return state;
};

describe('ChatInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('disables input when no agent is selected', () => {
    setupStore({ selectedAgent: null, isStreaming: false });

    render(<ChatInput />);

    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disables input while streaming', () => {
    const agent = mockAgents[0];
    setupStore({ selectedAgent: agent, isStreaming: true });

    render(<ChatInput />);

    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('updates placeholder text based on the selected agent', () => {
    const agent = mockAgents[0];
    setupStore({ selectedAgent: agent });

    render(<ChatInput />);

    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      `Chat with ${agent.name}...`
    );
  });

  it('sends messages through the chat service and clears the input', async () => {
    const agent = mockAgents[0];
    const appendUserMessage = vi.fn().mockReturnValue({ id: 'user-msg' });
    const appendAssistantPlaceholder = vi.fn().mockReturnValue({ id: 'assistant-msg' });
    const buildRequestMessages = vi
      .fn()
      .mockReturnValue([{ role: 'user', content: 'Test message' }]);
    const state = setupStore({
      selectedAgent: agent,
      appendUserMessage,
      appendAssistantPlaceholder,
      buildRequestMessages
    });
    sendChatMock.mockResolvedValue(undefined);

    render(<ChatInput />);
    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(sendChatMock).toHaveBeenCalled();
    });

    expect(textarea).toHaveValue('');
    expect(appendUserMessage).toHaveBeenCalledWith('Test message');
    expect(appendAssistantPlaceholder).toHaveBeenCalledWith(agent.id);
    expect(state.setIsStreaming).toHaveBeenCalledWith(true);
    const callArgs = sendChatMock.mock.calls[0][0];
    expect(callArgs.agentId).toBe(agent.id);
    expect(callArgs.messages).toEqual([
      { role: 'user', content: 'Test message' }
    ]);
  });

  it('streams assistant chunks into the placeholder message', async () => {
    const agent = mockAgents[0];
    const appendAssistantThinking = vi.fn();
    const appendAssistantContent = vi.fn();
    const appendAssistantPlaceholder = vi.fn().mockReturnValue({ id: 'assistant-msg' });
    setupStore({
      selectedAgent: agent,
      appendAssistantPlaceholder,
      appendAssistantThinking,
      appendAssistantContent,
      buildRequestMessages: vi
        .fn()
        .mockReturnValue([{ role: 'user', content: 'Hi' }])
    });

    sendChatMock.mockImplementation(async ({ onChunk, onComplete }) => {
      onChunk?.({ choices: [{ delta: { think: 'Thinking... ' } }] } as any);
      onChunk?.({ choices: [{ delta: { content: 'Hello' } }] } as any);
      onComplete?.();
    });

    render(<ChatInput />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hi' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(sendChatMock).toHaveBeenCalled();
    });

    expect(appendAssistantThinking).toHaveBeenCalledWith('assistant-msg', 'Thinking... ');
    expect(appendAssistantContent).toHaveBeenCalledWith('assistant-msg', 'Hello');
  });

  it('replaces assistant content with an error fallback when streaming fails', async () => {
    const agent = mockAgents[0];
    const replaceMessage = vi.fn();
    const appendAssistantPlaceholder = vi.fn().mockReturnValue({ id: 'assistant-msg' });
    const setIsStreaming = vi.fn();
    setupStore({
      selectedAgent: agent,
      replaceMessage,
      appendAssistantPlaceholder,
      setIsStreaming,
      buildRequestMessages: vi.fn().mockReturnValue([{ role: 'user', content: 'Hi' }])
    });

    sendChatMock.mockImplementation(async ({ onError }) => {
      onError?.(new Error('network failure'));
      throw new Error('network failure');
    });

    render(<ChatInput />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hi' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(sendChatMock).toHaveBeenCalled();
    });

    expect(replaceMessage).toHaveBeenCalledWith(
      'assistant-msg',
      expect.objectContaining({ content: expect.stringMatching(/something went wrong/i) })
    );
    expect(setIsStreaming).toHaveBeenCalledWith(false);
  });

  it('submits on Enter and not on Shift+Enter', async () => {
    const agent = mockAgents[0];
    setupStore({
      selectedAgent: agent,
      buildRequestMessages: vi.fn().mockReturnValue([{ role: 'user', content: 'Hi' }])
    });
    sendChatMock.mockResolvedValue(undefined);

    render(<ChatInput />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'Hi' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
    await waitFor(() => {
      expect(sendChatMock).toHaveBeenCalledTimes(1);
    });

    fireEvent.change(textarea, { target: { value: 'Another' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
    expect(sendChatMock).toHaveBeenCalledTimes(1);
  });
});


const createStoreState = (overrides: Partial<ReturnType<typeof baseStateFactory>> = {}) => {
  const base = baseStateFactory();
  return { ...base, ...overrides };
};

