import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatInput from '@/components/chat/ChatArea/ChatInput/ChatInput';
import { mockAgents } from '@/lib/mocks';

// Mock the store
vi.mock('@/store', () => ({
  useStore: vi.fn()
}));

// Mock the streaming function
vi.mock('@/lib/mocks/streaming', () => ({
  mockStreamingResponse: vi.fn()
}));

import { useStore } from '@/store';
import { mockStreamingResponse } from '@/lib/mocks/streaming';

const mockUseStore = vi.mocked(useStore);
const mockAddMessage = vi.fn();

describe('ChatInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should disable textarea and button when selectedAgent is null', () => {
    mockUseStore.mockReturnValue({
      chatInputRef: { current: null },
      selectedAgent: null,
      isStreaming: false,
      addMessage: mockAddMessage
    } as any);

    render(<ChatInput />);

    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    expect(textarea).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('should disable textarea and button when isStreaming is true', () => {
    const mockAgent = mockAgents[0];

    mockUseStore.mockReturnValue({
      chatInputRef: { current: null },
      selectedAgent: mockAgent,
      isStreaming: true,
      addMessage: mockAddMessage
    } as any);

    render(<ChatInput />);

    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    expect(textarea).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('should enable textarea and button when selectedAgent is set and not streaming', () => {
    const mockAgent = mockAgents[0];

    mockUseStore.mockReturnValue({
      chatInputRef: { current: null },
      selectedAgent: mockAgent,
      isStreaming: false,
      addMessage: mockAddMessage
    } as any);

    render(<ChatInput />);

    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    // Set input value to enable the button
    fireEvent.change(textarea, { target: { value: 'test message' } });

    expect(textarea).not.toBeDisabled();
    expect(button).not.toBeDisabled();
  });

  it('should update placeholder text based on selectedAgent', () => {
    const mockAgent = mockAgents[0];

    mockUseStore.mockReturnValue({
      chatInputRef: { current: null },
      selectedAgent: mockAgent,
      isStreaming: false,
      addMessage: mockAddMessage
    } as any);

    render(<ChatInput />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute(
      'placeholder',
      `Chat with ${mockAgent.name}...`
    );
  });

  it('should call mockStreamingResponse and clear input on submit', () => {
    const mockAgent = mockAgents[0];

    mockUseStore.mockReturnValue({
      chatInputRef: { current: null },
      selectedAgent: mockAgent,
      isStreaming: false,
      addMessage: mockAddMessage
    } as any);

    render(<ChatInput />);

    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.click(button);

    expect(mockAddMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        role: 'user',
        content: 'Test message'
      })
    );
    expect(mockStreamingResponse).toHaveBeenCalledWith('Test message');
    expect(textarea).toHaveValue('');
  });

  it('should handle Enter key press to submit', () => {
    const mockAgent = mockAgents[0];

    mockUseStore.mockReturnValue({
      chatInputRef: { current: null },
      selectedAgent: mockAgent,
      isStreaming: false,
      addMessage: mockAddMessage
    } as any);

    render(<ChatInput />);

    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });

    expect(mockAddMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        role: 'user',
        content: 'Test message'
      })
    );
    expect(mockStreamingResponse).toHaveBeenCalledWith('Test message');
  });

  it('should not submit on Shift+Enter', () => {
    const mockAgent = mockAgents[0];

    mockUseStore.mockReturnValue({
      chatInputRef: { current: null },
      selectedAgent: mockAgent,
      isStreaming: false,
      addMessage: mockAddMessage
    } as any);

    render(<ChatInput />);

    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });

    expect(mockStreamingResponse).not.toHaveBeenCalled();
  });
});
