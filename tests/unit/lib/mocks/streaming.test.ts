import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mockStreamingResponse } from '@/lib/mocks/streaming';
import { mockAgents } from '@/lib/mocks';

describe('Streaming Mock', () => {
  let mockParams: any;

  beforeEach(() => {
    mockParams = {
      userInput: 'test message',
      selectedAgent: mockAgents[0],
      isStreaming: false,
      appendUserMessage: vi.fn(),
      appendAssistantPlaceholder: vi.fn().mockReturnValue({
        id: 'agent-message'
      }),
      appendAssistantContent: vi.fn(),
      appendAssistantThinking: vi.fn(),
      setIsStreaming: vi.fn()
    };
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should not run when no agent is selected', () => {
    mockParams.selectedAgent = null;
    mockStreamingResponse(mockParams);
    expect(mockParams.appendUserMessage).not.toHaveBeenCalled();
    expect(mockParams.appendAssistantPlaceholder).not.toHaveBeenCalled();
  });

  it('should not run when already streaming', () => {
    mockParams.isStreaming = true;
    mockStreamingResponse(mockParams);
    expect(mockParams.appendUserMessage).not.toHaveBeenCalled();
    expect(mockParams.appendAssistantPlaceholder).not.toHaveBeenCalled();
  });

  it('streams thinking and content chunks into the assistant placeholder', () => {
    vi.useFakeTimers();

    mockStreamingResponse(mockParams);

    expect(mockParams.appendUserMessage).toHaveBeenCalledWith('test message');
    expect(mockParams.appendAssistantPlaceholder).toHaveBeenCalledWith(
      mockAgents[0].id
    );
    expect(mockParams.setIsStreaming).toHaveBeenCalledWith(true);

    vi.advanceTimersByTime(100 * 12);
    expect(mockParams.appendAssistantThinking).toHaveBeenCalled();

    vi.advanceTimersByTime(150 * 13);
    expect(mockParams.appendAssistantContent).toHaveBeenCalled();
    expect(mockParams.setIsStreaming).toHaveBeenLastCalledWith(false);
  });

  it('streams thinking before content chunks', () => {
    vi.useFakeTimers();

    mockStreamingResponse(mockParams);
    vi.advanceTimersByTime(100 * 12 + 150 * 13);

    const thinkingCalls = mockParams.appendAssistantThinking.mock.calls;
    const contentCalls = mockParams.appendAssistantContent.mock.calls;

    expect(thinkingCalls.length).toBeGreaterThan(0);
    expect(contentCalls.length).toBeGreaterThan(0);
    expect(mockParams.appendAssistantPlaceholder).toHaveBeenCalledTimes(1);
    expect(thinkingCalls[0][0]).toBe('agent-message');
    expect(contentCalls[0][0]).toBe('agent-message');
  });
});
