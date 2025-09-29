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
  // Reset conversations
  useStore.setState({ conversations: {} });
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
    const agent: Agent = {
      id: 'agent-1',
      name: 'Agent 1',
      description: 'Desc',
      specialty: 'research'
    };

    act(() => {
      result.current.setSelectedAgent(agent);
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

  it('clears messages when selectedAgent changes', () => {
    const { result } = renderHook(() => useStore());
    const agent1: Agent = {
      id: 'agent-1',
      name: 'Agent 1',
      description: 'Desc',
      specialty: 'research'
    };
    const agent2: Agent = {
      id: 'agent-2',
      name: 'Agent 2',
      description: 'Desc',
      specialty: 'research'
    };

    act(() => {
      result.current.setSelectedAgent(agent1);
      result.current.appendUserMessage('Hello');
    });
    expect(result.current.messages).toHaveLength(1);

    act(() => {
      result.current.setSelectedAgent(agent2);
    });
    expect(result.current.messages).toHaveLength(0);
  });

  it('does not clear messages when same agent is selected', () => {
    const { result } = renderHook(() => useStore());
    const agent: Agent = {
      id: 'agent-1',
      name: 'Agent 1',
      description: 'Desc',
      specialty: 'research'
    };

    act(() => {
      result.current.setSelectedAgent(agent);
      result.current.appendUserMessage('Hello');
    });
    expect(result.current.messages).toHaveLength(1);

    act(() => {
      result.current.setSelectedAgent({ ...agent, name: 'Updated Name' });
    });
    expect(result.current.messages).toHaveLength(1);
  });

  it('filters out empty assistant messages in buildRequestMessages', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.appendUserMessage('Hi');
      const assistantId =
        result.current.appendAssistantPlaceholder('agent-001').id;
      // Empty content assistant message should be filtered out
      result.current.appendAssistantContent(assistantId, '');
      result.current.appendUserMessage('How are you?');
      const assistantId2 =
        result.current.appendAssistantPlaceholder('agent-001').id;
      result.current.appendAssistantContent(assistantId2, 'I am fine');
    });

    const payload = result.current.buildRequestMessages();
    expect(payload).toEqual([
      { role: 'user', content: 'Hi' },
      { role: 'user', content: 'How are you?' },
      { role: 'assistant', content: 'I am fine' }
    ]);
  });

  it('saves and restores conversation history when switching agents', () => {
    const { result } = renderHook(() => useStore());
    const agentA: Agent = {
      id: 'agent-a',
      name: 'Agent A',
      description: 'Desc A',
      specialty: 'research'
    };
    const agentB: Agent = {
      id: 'agent-b',
      name: 'Agent B',
      description: 'Desc B',
      specialty: 'coding'
    };

    // Switch to Agent A and add messages
    act(() => {
      result.current.setSelectedAgent(agentA);
      result.current.appendUserMessage('Hello from A');
      result.current.appendAssistantPlaceholder(agentA.id);
    });
    expect(result.current.messages).toHaveLength(2);

    // Switch to Agent B
    act(() => {
      result.current.setSelectedAgent(agentB);
    });
    expect(result.current.messages).toHaveLength(0);

    // Switch back to Agent A
    act(() => {
      result.current.setSelectedAgent(agentA);
    });
    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0].content).toBe('Hello from A');
    expect(result.current.messages[1].agentId).toBe('agent-a');
  });

  it('clears messages when switching to an agent with no history', () => {
    const { result } = renderHook(() => useStore());
    const agentA: Agent = {
      id: 'agent-a',
      name: 'Agent A',
      description: 'Desc A',
      specialty: 'research'
    };
    const agentC: Agent = {
      id: 'agent-c',
      name: 'Agent C',
      description: 'Desc C',
      specialty: 'analysis'
    };

    // Switch to Agent A and add messages
    act(() => {
      result.current.setSelectedAgent(agentA);
      result.current.appendUserMessage('Message for A');
    });
    expect(result.current.messages).toHaveLength(1);

    // Switch to Agent C (no history)
    act(() => {
      result.current.setSelectedAgent(agentC);
    });
    expect(result.current.messages).toHaveLength(0);
  });

  it('clearMessages only affects the current agent', () => {
    const { result } = renderHook(() => useStore());
    const agentA: Agent = {
      id: 'agent-a',
      name: 'Agent A',
      description: 'Desc A',
      specialty: 'research'
    };
    const agentB: Agent = {
      id: 'agent-b',
      name: 'Agent B',
      description: 'Desc B',
      specialty: 'coding'
    };

    // Set up Agent A with messages
    act(() => {
      result.current.setSelectedAgent(agentA);
      result.current.appendUserMessage('Message A1');
      result.current.appendUserMessage('Message A2');
    });
    expect(result.current.messages).toHaveLength(2);

    // Switch to Agent B and add messages
    act(() => {
      result.current.setSelectedAgent(agentB);
      result.current.appendUserMessage('Message B1');
    });
    expect(result.current.messages).toHaveLength(1);

    // Switch back to Agent A and clear messages
    act(() => {
      result.current.setSelectedAgent(agentA);
      result.current.clearMessages();
    });
    expect(result.current.messages).toHaveLength(0);

    // Switch back to Agent B - history should still be there
    act(() => {
      result.current.setSelectedAgent(agentB);
    });
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].content).toBe('Message B1');
  });

  it('maintains separate histories for multiple agents', () => {
    const { result } = renderHook(() => useStore());
    const agentA: Agent = {
      id: 'agent-a',
      name: 'Agent A',
      description: 'Desc A',
      specialty: 'research'
    };
    const agentB: Agent = {
      id: 'agent-b',
      name: 'Agent B',
      description: 'Desc B',
      specialty: 'coding'
    };
    const agentC: Agent = {
      id: 'agent-c',
      name: 'Agent C',
      description: 'Desc C',
      specialty: 'analysis'
    };

    // Agent A: 2 messages
    act(() => {
      result.current.setSelectedAgent(agentA);
      result.current.appendUserMessage('A1');
      result.current.appendUserMessage('A2');
    });
    expect(result.current.messages).toHaveLength(2);

    // Agent B: 1 message
    act(() => {
      result.current.setSelectedAgent(agentB);
      result.current.appendUserMessage('B1');
    });
    expect(result.current.messages).toHaveLength(1);

    // Agent C: 3 messages
    act(() => {
      result.current.setSelectedAgent(agentC);
      result.current.appendUserMessage('C1');
      result.current.appendUserMessage('C2');
      result.current.appendUserMessage('C3');
    });
    expect(result.current.messages).toHaveLength(3);

    // Back to Agent A
    act(() => {
      result.current.setSelectedAgent(agentA);
    });
    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages.map((m) => m.content)).toEqual(['A1', 'A2']);

    // Back to Agent B
    act(() => {
      result.current.setSelectedAgent(agentB);
    });
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].content).toBe('B1');

    // Back to Agent C
    act(() => {
      result.current.setSelectedAgent(agentC);
    });
    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages.map((m) => m.content)).toEqual([
      'C1',
      'C2',
      'C3'
    ]);
  });
});
