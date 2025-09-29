import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendChat } from '@/lib/chatService';
import type { ChatCompletionMessagePayload } from '@/types/chat';

// Mock fetch globally
const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('chatService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset environment
    delete process.env.NEXT_PUBLIC_BACKEND_URL;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('sendChat validation', () => {
    it('throws error when agentId is missing', async () => {
      await expect(
        sendChat({
          agentId: '',
          messages: [{ role: 'user', content: 'test' }]
        })
      ).rejects.toThrow('agentId is required');
    });

    it('throws error when messages is empty', async () => {
      await expect(
        sendChat({
          agentId: 'agent-1',
          messages: []
        })
      ).rejects.toThrow('messages must contain at least one entry');
    });

    it('throws error when messages is undefined', async () => {
      await expect(
        sendChat({
          agentId: 'agent-1',
          messages: undefined as any
        })
      ).rejects.toThrow('messages must contain at least one entry');
    });
  });

  describe('sendChat non-streaming', () => {
    it('sends POST request and returns data on success', async () => {
      const mockResponse = { choices: [{ message: { content: 'Hello' } }] };
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await sendChat({
        agentId: 'agent-1',
        messages: [{ role: 'user', content: 'Hi' }],
        stream: false
      });

      expect(fetchMock).toHaveBeenCalledWith(
        '/api/v1/agents/agent-1/chat/',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/event-stream'
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: 'Hi' }],
            stream: false
          })
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('calls onComplete callback for non-streaming', async () => {
      const mockResponse = { choices: [{ message: { content: 'Hello' } }] };
      const onComplete = vi.fn();
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      await sendChat({
        agentId: 'agent-1',
        messages: [{ role: 'user', content: 'Hi' }],
        stream: false,
        onComplete
      });

      expect(onComplete).toHaveBeenCalledWith(mockResponse);
    });

    it('handles HTTP errors for non-streaming', async () => {
      const errorResponse = { detail: 'Bad request' };
      const onError = vi.fn();
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve(errorResponse)
      });

      await expect(
        sendChat({
          agentId: 'agent-1',
          messages: [{ role: 'user', content: 'Hi' }],
          stream: false,
          onError
        })
      ).rejects.toThrow('Bad request');

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({ status: 400, detail: errorResponse }),
        errorResponse
      );
    });
  });

  describe('sendChat streaming', () => {
    it('processes SSE chunks correctly', async () => {
      const sseData = 'data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n';
      const doneData = 'data: [DONE]\n\n';

      const mockResponse = {
        ok: true,
        status: 200,
        headers: {
          get: (key: string) => {
            if (key === 'content-type') return 'text/event-stream';
            return null;
          }
        },
        body: {
          getReader: () => ({
            read: vi
              .fn()
              .mockResolvedValueOnce({
                value: new TextEncoder().encode(sseData),
                done: false
              })
              .mockResolvedValueOnce({
                value: new TextEncoder().encode(doneData),
                done: false
              })
              .mockResolvedValueOnce({ done: true }),
            cancel: vi.fn(),
            releaseLock: vi.fn()
          })
        }
      };
      fetchMock.mockResolvedValueOnce(mockResponse);

      const onChunk = vi.fn();
      const onComplete = vi.fn();

      await sendChat({
        agentId: 'agent-1',
        messages: [{ role: 'user', content: 'Hi' }],
        stream: true,
        onChunk,
        onComplete
      });

      expect(onChunk).toHaveBeenCalledWith({
        choices: [{ delta: { content: 'Hello' } }]
      });
      expect(onComplete).toHaveBeenCalled();
    });

    it('handles SSE error events', async () => {
      const errorData =
        'event: error\ndata: {"error":{"detail":"Stream error","status":500}}\n\n';

      const mockResponse = {
        ok: true,
        status: 200,
        headers: {
          get: (key: string) => {
            if (key === 'content-type') return 'text/event-stream';
            return null;
          }
        },
        body: {
          getReader: () => ({
            read: vi
              .fn()
              .mockResolvedValueOnce({
                value: new TextEncoder().encode(errorData),
                done: false
              })
              .mockResolvedValueOnce({ done: true }),
            cancel: vi.fn(),
            releaseLock: vi.fn()
          })
        }
      };
      fetchMock.mockResolvedValueOnce(mockResponse);

      await expect(
        sendChat({
          agentId: 'agent-1',
          messages: [{ role: 'user', content: 'Hi' }],
          stream: true
        })
      ).rejects.toThrow('Stream error');
    });

    it('handles abort signal', async () => {
      const onError = vi.fn();

      fetchMock.mockRejectedValueOnce(
        new DOMException('Aborted', 'AbortError')
      );

      await expect(
        sendChat({
          agentId: 'agent-1',
          messages: [{ role: 'user', content: 'Hi' }],
          onError
        })
      ).rejects.toThrow('Chat request was aborted');

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Chat request was aborted' }),
        undefined
      );
    });
  });

  describe('environment configuration', () => {
    it('uses default backend URL when env var not set', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({})
      });

      await sendChat({
        agentId: 'agent-1',
        messages: [{ role: 'user', content: 'Hi' }],
        stream: false
      });

      expect(fetchMock).toHaveBeenCalledWith(
        '/api/v1/agents/agent-1/chat/',
        expect.any(Object)
      );
    });

    it('uses custom backend URL from env var', async () => {
      process.env.NEXT_PUBLIC_BACKEND_URL = 'https://api.example.com';
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({})
      });

      await sendChat({
        agentId: 'agent-1',
        messages: [{ role: 'user', content: 'Hi' }],
        stream: false
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.example.com/agents/agent-1/chat/',
        expect.any(Object)
      );
    });
  });
});
