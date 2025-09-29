import { ChatCompletionMessagePayload } from '@/types/chat';

type NullableRecord = Record<string, unknown>;

type ErrorWithMeta = Error & {
  status?: number;
  detail?: unknown;
};

export interface ChatStreamChoiceDelta {
  role?: string;
  content?: string;
  think?: string;
  full_response?: string;
  tool_calls?: unknown[];
}

export interface ChatStreamChoice {
  index?: number;
  delta?: ChatStreamChoiceDelta;
  finish_reason?: string | null;
}

export interface ChatStreamChunk {
  id?: string;
  created?: number;
  model?: string;
  object?: string;
  choices?: ChatStreamChoice[];
  extras?: Record<string, unknown>;
}

export interface SendChatParams {
  agentId: string;
  messages: ChatCompletionMessagePayload[];
  stream?: boolean;
  signal?: AbortSignal;
  onChunk?: (chunk: ChatStreamChunk) => void;
  onComplete?: (finalPayload?: unknown) => void;
  onError?: (error: Error, detail?: unknown) => void;
  [key: string]: unknown;
}

const DEFAULT_BACKEND_BASE_PATH = '/api/v1';

const sanitizePayload = (payload: NullableRecord): NullableRecord => {
  return Object.entries(payload).reduce<NullableRecord>((acc, [key, value]) => {
    if (
      value === undefined ||
      key === 'onChunk' ||
      key === 'onComplete' ||
      key === 'onError' ||
      key === 'agentId' ||
      key === 'signal'
    ) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
};

const getBackendBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!url) {
    return DEFAULT_BACKEND_BASE_PATH;
  }
  return url.replace(/\/$/, '');
};

const parseSseEvent = (
  event: string
): { type: string; data: string | null } => {
  const lines = event.split('\n');
  let type = 'message';
  const dataParts: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith('event:')) {
      type = line.slice('event:'.length).trim() || 'message';
    } else if (line.startsWith('data:')) {
      dataParts.push(line.slice('data:'.length).trim());
    }
  }

  return { type, data: dataParts.length ? dataParts.join('\n') : null };
};

const buildError = (
  status: number,
  message: string,
  detail?: unknown
): ErrorWithMeta => {
  const error = new Error(message || 'Chat request failed') as ErrorWithMeta;
  error.status = status;
  error.detail = detail;
  return error;
};

export const sendChat = async (params: SendChatParams): Promise<unknown> => {
  const {
    agentId,
    messages,
    stream = true,
    signal,
    onChunk,
    onComplete,
    onError,
    ...rest
  } = params;

  if (!agentId) {
    throw new Error('agentId is required to send a chat request');
  }
  if (!messages || messages.length === 0) {
    throw new Error('messages must contain at least one entry');
  }

  const emitError = (error: Error, detail?: unknown) => {
    onError?.(error, detail ?? (error as ErrorWithMeta).detail);
  };

  const payload = sanitizePayload({ ...rest, messages, stream });
  const baseUrl = getBackendBaseUrl();
  const url = `${baseUrl}/agents/${agentId}/chat/`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal
    });
  } catch (error) {
    console.log('fetch error:', error);
    if (
      error &&
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      error.name === 'AbortError'
    ) {
      console.log('is AbortError');
      const abortError = new Error('Chat request was aborted');
      emitError(abortError);
      throw abortError;
    }
    console.log('not AbortError');
    const err =
      error instanceof Error
        ? error
        : new Error('Failed to reach chat backend endpoint');
    emitError(err);
    throw err;
  }

  if (!response.ok) {
    let detail: unknown;
    try {
      detail = await response.json();
    } catch {
      detail = await response.text();
    }
    const message =
      detail &&
      typeof detail === 'object' &&
      detail !== null &&
      'detail' in detail
        ? ((detail as Record<string, unknown>).detail as string) ||
          `Chat request failed with status ${response.status}`
        : `Chat request failed with status ${response.status}`;
    const error = buildError(response.status, message, detail);
    emitError(error, detail);
    throw error;
  }

  if (!stream) {
    const data = await response.json();
    onComplete?.(data);
    return data;
  }

  if (!response.body) {
    const error = new Error(
      'Streaming response is not supported in this environment'
    );
    emitError(error);
    throw error;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split('\n\n');
      buffer = events.pop() ?? '';

      for (const event of events) {
        const { type, data } = parseSseEvent(event);
        if (data === null) continue;

        if (data === '[DONE]') {
          onComplete?.();
          return;
        }

        if (type === 'error') {
          let detail: unknown = data;
          let message = 'Chat stream returned an error';
          let status = response.status;
          try {
            const parsed = JSON.parse(data) as {
              error?: { status?: number; detail?: string };
            };
            detail = parsed;
            if (parsed.error?.detail) {
              message = parsed.error.detail;
            }
            if (parsed.error?.status) {
              status = parsed.error.status;
            }
          } catch {
            if (data.trim()) {
              message = data.trim();
            }
          }
          throw buildError(status, message, detail);
        }

        try {
          const chunk = JSON.parse(data) as ChatStreamChunk;
          onChunk?.(chunk);
        } catch (error) {
          const err =
            error instanceof Error
              ? error
              : new Error('Failed to parse chat stream chunk');
          (err as ErrorWithMeta).detail = data;
          throw err;
        }
      }
    }

    buffer += decoder.decode(new Uint8Array(), { stream: false });
    const trimmedBuffer = buffer.trim();
    if (trimmedBuffer) {
      const { type, data } = parseSseEvent(trimmedBuffer);
      if (data && data !== '[DONE]') {
        if (type === 'error') {
          let status = response.status;
          let message = data;
          let detail: unknown = data;
          try {
            const parsed = JSON.parse(data) as {
              error?: { status?: number; detail?: string };
            };
            detail = parsed;
            if (parsed.error?.detail) {
              message = parsed.error.detail;
            }
            if (parsed.error?.status) {
              status = parsed.error.status;
            }
          } catch {
            // keep defaults
          }
          throw buildError(status, message, detail);
        }
        try {
          const chunk = JSON.parse(data) as ChatStreamChunk;
          onChunk?.(chunk);
        } catch (error) {
          const err =
            error instanceof Error
              ? error
              : new Error('Failed to parse trailing chat stream chunk');
          (err as ErrorWithMeta).detail = data;
          throw err;
        }
      } else if (data === '[DONE]') {
        onComplete?.();
        return;
      }
    }

    onComplete?.();
    return;
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      error.name === 'AbortError'
    ) {
      const abortError = new Error('Chat request was aborted');
      emitError(abortError);
      throw abortError;
    }
    if (error instanceof Error) {
      emitError(error);
      throw error;
    }
    const unknownError = new Error(
      'Unknown error while processing chat stream'
    );
    emitError(unknownError);
    throw unknownError;
  } finally {
    reader.releaseLock();
  }
};
