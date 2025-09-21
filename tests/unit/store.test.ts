import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useStore } from '@/store'
import { Agent } from '@/types/agent'
import { ChatMessage } from '@/types/chat'

describe('Zustand Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useStore.getState().setAgents([])
    useStore.getState().setSelectedAgent(null)
    useStore.getState().setMessages([])
    useStore.getState().setIsStreaming(false)
  })

  describe('setSelectedAgent', () => {
    it('should set selectedAgent correctly', () => {
      const { result } = renderHook(() => useStore())

      const mockAgent: Agent = {
        id: 'agent-001',
        name: 'Test Agent',
        description: 'Test Description',
        specialty: 'research'
      }

      act(() => {
        result.current.setSelectedAgent(mockAgent)
      })

      expect(result.current.selectedAgent).toEqual(mockAgent)
    })
  })

  describe('addMessage', () => {
    it('should add a message to the messages array', () => {
      const { result } = renderHook(() => useStore())

      const mockMessage: ChatMessage = {
        id: 'msg-1',
        role: 'user',
        content: 'Hello',
        timestamp: '2024-01-01T00:00:00Z'
      }

      act(() => {
        result.current.addMessage(mockMessage)
      })

      expect(result.current.messages).toHaveLength(1)
      expect(result.current.messages[0]).toEqual(mockMessage)
    })
  })

  describe('updateMessageContent', () => {
    it('should update the content of the specified message', () => {
      const { result } = renderHook(() => useStore())

      const mockMessage: ChatMessage = {
        id: 'msg-1',
        role: 'agent',
        agentId: 'agent-001',
        content: 'Initial content',
        timestamp: '2024-01-01T00:00:00Z'
      }

      act(() => {
        result.current.addMessage(mockMessage)
        result.current.updateMessageContent('msg-1', 'Updated content')
      })

      expect(result.current.messages[0].content).toBe(
        'Initial contentUpdated content'
      )
    })
  })

  describe('updateMessageThinking', () => {
    it('should update the thinking of the specified message', () => {
      const { result } = renderHook(() => useStore())

      const mockMessage: ChatMessage = {
        id: 'msg-1',
        role: 'agent',
        agentId: 'agent-001',
        content: '',
        thinking: '',
        timestamp: '2024-01-01T00:00:00Z'
      }

      act(() => {
        result.current.addMessage(mockMessage)
        result.current.updateMessageThinking('msg-1', 'Thinking content')
      })

      expect(result.current.messages[0].thinking).toBe('Thinking content')
    })
  })

  describe('setIsStreaming', () => {
    it('should set isStreaming correctly', () => {
      const { result } = renderHook(() => useStore())

      act(() => {
        result.current.setIsStreaming(true)
      })

      expect(result.current.isStreaming).toBe(true)

      act(() => {
        result.current.setIsStreaming(false)
      })

      expect(result.current.isStreaming).toBe(false)
    })
  })
})
