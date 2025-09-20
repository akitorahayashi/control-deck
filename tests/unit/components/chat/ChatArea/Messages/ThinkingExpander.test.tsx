import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ThinkingExpander from '@/components/chat/ChatArea/Messages/ThinkingExpander'

describe('ThinkingExpander', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return null when thinking is empty and not streaming', () => {
    const { container } = render(
      <ThinkingExpander
        thinking=""
        content="Some content"
        isStreamingThinking={false}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('should display "思考中..." when thinking exists but content is empty', () => {
    render(
      <ThinkingExpander
        thinking="Thinking process..."
        content=""
        isStreamingThinking={false}
      />
    )

    expect(screen.getByText('思考中...')).toBeInTheDocument()
  })

  it('should display "思考プロセスを表示" when thinking and content both exist', () => {
    render(
      <ThinkingExpander
        thinking="Thinking process..."
        content="Response content"
        isStreamingThinking={false}
      />
    )

    expect(screen.getByText('思考プロセスを表示')).toBeInTheDocument()
  })

  it('should toggle expanded state when button is clicked', () => {
    render(
      <ThinkingExpander
        thinking="Thinking process..."
        content="Response content"
        isStreamingThinking={false}
      />
    )

    const button = screen.getByText('思考プロセスを表示')
    expect(screen.queryByText('Thinking process...')).not.toBeInTheDocument()

    fireEvent.click(button)
    expect(screen.getByText('Thinking process...')).toBeInTheDocument()

    fireEvent.click(button)
    expect(screen.queryByText('Thinking process...')).not.toBeInTheDocument()
  })

  it('should display thinking content when expanded', () => {
    render(
      <ThinkingExpander
        thinking="This is my thinking process"
        content="Response"
        isStreamingThinking={false}
      />
    )

    const button = screen.getByText('思考プロセスを表示')
    fireEvent.click(button)

    expect(screen.getByText('This is my thinking process')).toBeInTheDocument()
  })

  it('should render pulse animation when isStreamingThinking is true', () => {
    render(
      <ThinkingExpander
        thinking="Thinking..."
        content=""
        isStreamingThinking={true}
      />
    )

    // Check for the pulse element (inline style animation)
    const pulseElement = document.querySelector('span[style*="thinking"]')
    expect(pulseElement).toBeInTheDocument()
  })

  it('should not render pulse animation when isStreamingThinking is false', () => {
    render(
      <ThinkingExpander
        thinking="Thinking..."
        content=""
        isStreamingThinking={false}
      />
    )

    const pulseElement = document.querySelector('.animate-pulse')
    expect(pulseElement).toBeNull()
  })

  it('should handle empty thinking with streaming', () => {
    render(
      <ThinkingExpander
        thinking=""
        content="Some content"
        isStreamingThinking={true}
      />
    )

    // When thinking is empty but isStreamingThinking is true, component should still render
    expect(screen.getByText('思考プロセスを表示')).toBeInTheDocument()
  })
})
