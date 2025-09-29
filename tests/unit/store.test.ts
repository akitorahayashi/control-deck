import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useStore } from '@/store';
import type { Agent } from '@/types/agent';

const resetStore = () => {
  const store = useStore.getState();
  store.setAgents([]);
  store.setSelectedAgent(null);
  store.setMessages([]);
  store.setIsStreaming(false);
};

describe('Zustand Store', () => {
  beforeEach(() => {
    resetStore();
  });

  it('sets selectedAgent correctly', () => {
    const { result } = renderHook(() => useStore());
    const mockAgent: Agent = {
      id: 'agent-001',
      name: 'Test Agent',
      description: 'Test Description',
      specialty: 'research'
    };

    act(() => {
      result.current.setSelectedAgent(mockAgent);
    });

    expect(result.current.selectedAgent).toEqual(mockAgent);
  });

  it('appends user messages with generated metadata', () => {
    const { result } = renderHook(() => useStore());
    let messageId = '';

    act(() => {
      messageId = result.current.appendUserMessage('Hello world').id;
    });

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0]).toMatchObject({
      id: messageId,
      role: 'user',
      content: 'Hello world'
    });
    expect(result.current.messages[0].timestamp).toBeTruthy();
  });

  it('creates an assistant placeholder and streams content/thinking into it', () => {
    const { result } = renderHook(() => useStore());
    let messageId = '';

    act(() => {
      messageId = result.current.appendAssistantPlaceholder('agent-001').id;
      result.current.appendAssistantThinking(messageId, 'Thought 1. ');
      result.current.appendAssistantThinking(messageId, 'Thought 2.');
      result.current.appendAssistantContent(messageId, 'Answer ');
      result.current.appendAssistantContent(messageId, 'segment.');
    });

    const assistantMessage = result.current.messages.find(
      (msg) => msg.id === messageId
    );

    expect(assistantMessage).toBeDefined();
    expect(assistantMessage?.thinking).toBe('Thought 1. Thought 2.');
    expect(assistantMessage?.content).toBe('Answer segment.');
  });

  it('replaces message content when requested', () => {
    const { result } = renderHook(() => useStore());
    let messageId = '';

    act(() => {
      messageId = result.current.appendAssistantPlaceholder('agent-001').id;
      result.current.replaceMessage(messageId, {
        content: 'Static error message',
        thinking: undefined
      });
    });

    const message = result.current.messages.find((msg) => msg.id === messageId);
    expect(message?.content).toBe('Static error message');
    expect(message?.thinking).toBeUndefined();
  });

  it('builds API-ready message payloads from the transcript', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.appendUserMessage('Hi');
      const assistantId =
        result.current.appendAssistantPlaceholder('agent-001').id;
      result.current.appendAssistantContent(assistantId, 'Hello there');
    });

    const payload = result.current.buildRequestMessages();
    expect(payload).toEqual([
      { role: 'user', content: 'Hi' },
      { role: 'assistant', content: 'Hello there' }
    ]);
  });

  it('clears messages when requested', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.appendUserMessage('Hi');
      result.current.clearMessages();
    });

    expect(result.current.messages).toHaveLength(0);
  });

  it('toggles isStreaming state', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setIsStreaming(true);
    });
    expect(result.current.isStreaming).toBe(true);

    act(() => {
      result.current.setIsStreaming(false);
    });
    expect(result.current.isStreaming).toBe(false);
  });
});
