import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mockStreamingResponse } from '@/lib/mocks/streaming';
import { useStore } from '@/store';
import { mockAgents } from '@/lib/mocks';

vi.mock('@/store', () => ({
  useStore: {
    getState: vi.fn()
  }
}));

describe('Streaming Mock', () => {
  let mockStore: any;

  beforeEach(() => {
    mockStore = {
      selectedAgent: mockAgents[0],
      appendUserMessage: vi.fn(),
      appendAssistantPlaceholder: vi.fn().mockReturnValue({
        id: 'agent-message'
      }),
      appendAssistantContent: vi.fn(),
      appendAssistantThinking: vi.fn(),
      setIsStreaming: vi.fn()
    };
    (useStore.getState as any).mockReturnValue(mockStore);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should not run when no agent is selected', () => {
    mockStore.selectedAgent = null;
    mockStreamingResponse('test message');
    expect(mockStore.appendUserMessage).not.toHaveBeenCalled();
    expect(mockStore.appendAssistantPlaceholder).not.toHaveBeenCalled();
  });

  it('streams thinking and content chunks into the assistant placeholder', () => {
    vi.useFakeTimers();

    mockStreamingResponse('test message');

    expect(mockStore.appendUserMessage).toHaveBeenCalledWith('test message');
    expect(mockStore.appendAssistantPlaceholder).toHaveBeenCalledWith(
      mockAgents[0].id
    );
    expect(mockStore.setIsStreaming).toHaveBeenCalledWith(true);

    vi.advanceTimersByTime(100 * 12);
    expect(mockStore.appendAssistantThinking).toHaveBeenCalled();

    vi.advanceTimersByTime(150 * 13);
    expect(mockStore.appendAssistantContent).toHaveBeenCalled();
    expect(mockStore.setIsStreaming).toHaveBeenLastCalledWith(false);
  });

  it('streams thinking before content chunks', () => {
    vi.useFakeTimers();

    mockStreamingResponse('test message');
    vi.advanceTimersByTime(100 * 12 + 150 * 13);

    const thinkingCalls = mockStore.appendAssistantThinking.mock.calls;
    const contentCalls = mockStore.appendAssistantContent.mock.calls;

    expect(thinkingCalls.length).toBeGreaterThan(0);
    expect(contentCalls.length).toBeGreaterThan(0);
    expect(mockStore.appendAssistantPlaceholder).toHaveBeenCalledTimes(1);
    expect(thinkingCalls[0][0]).toBe('agent-message');
    expect(contentCalls[0][0]).toBe('agent-message');
  });
});
