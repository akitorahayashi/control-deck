'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import Icon, { IconType } from '@/components/ui/icon'
import Heading from '@/components/ui/typography/Heading'
import { useStore } from '@/store'
import { mockAgents } from '@/lib/mocks'
import { Agent } from '@/types/agent'
import { cn } from '@/lib/utils'

const SidebarHeader = () => (
  <div className="flex items-center gap-2 p-2">
    <Heading size={2}>Control Deck</Heading>
  </div>
)

const specialtyColors: Record<string, string> = {
  research: 'bg-blue-500',
  summarization: 'bg-purple-500',
  'prompt-generation': 'bg-green-500',
  coding: 'bg-orange-500',
  analysis: 'bg-pink-500',
  'creative-writing': 'bg-yellow-500'
}

const specialtyIcons: Record<string, string> = {
  research: 'search',
  summarization: 'file-text',
  'prompt-generation': 'sparkle',
  coding: 'code',
  analysis: 'chart-bar',
  'creative-writing': 'pencil'
}

const AgentItem = ({
  agent,
  isSelected
}: {
  agent: Agent
  isSelected: boolean
}) => {
  const { setSelectedAgent } = useStore()

  return (
    <div
      onClick={() => setSelectedAgent(agent)}
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors',
        isSelected ? 'bg-accent' : 'hover:bg-accent/50'
      )}
    >
      <div
        className={cn(
          'flex h-8 min-h-8 w-8 min-w-8 shrink-0 items-center justify-center rounded-full',
          specialtyColors[agent.specialty]
        )}
      >
        <Icon
          type={specialtyIcons[agent.specialty] as IconType}
          size="xs"
          className="text-white"
        />
      </div>
      <div className="flex-grow">
        <p className="text-sm font-medium">{agent.name}</p>
        <p className="text-muted-foreground text-xs">{agent.description}</p>
      </div>
    </div>
  )
}

export const AgentListSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { agents, setAgents, selectedAgent } = useStore()

  const MIN_WIDTH = 200
  const MAX_WIDTH = 600
  const COLLAPSED_WIDTH = 53

  useEffect(() => {
    setAgents(mockAgents)
  }, [setAgents])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return

      const newWidth = e.clientX
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing])

  return (
    <motion.aside
      ref={sidebarRef}
      className="relative flex h-screen shrink-0 grow-0 flex-col overflow-y-auto border-r bg-background/50 p-2 font-geist"
      initial={{ width: sidebarWidth }}
      animate={{ width: isCollapsed ? COLLAPSED_WIDTH : sidebarWidth }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {!isCollapsed && (
        <div
          className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/20 active:bg-primary/30"
          onMouseDown={handleMouseDown}
        />
      )}
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-1.5 top-3.5 z-10 rounded-md p-2 text-muted transition-colors hover:bg-muted/20"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        type="button"
        whileTap={{ scale: 0.95 }}
      >
        <Icon
          type="toggle-sidebar"
          size="sm"
          className={`transform transition-transform ${isCollapsed ? 'rotate-180' : 'rotate-0'}`}
        />
      </motion.button>
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isCollapsed ? 0 : 1, x: isCollapsed ? -20 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          pointerEvents: isCollapsed ? 'none' : 'auto',
          width: isCollapsed ? 0 : sidebarWidth - 16
        }}
      >
        <SidebarHeader />
        <div className="flex flex-col gap-1">
          {agents.map((agent) => (
            <AgentItem
              key={agent.id}
              agent={agent}
              isSelected={selectedAgent?.id === agent.id}
            />
          ))}
        </div>
      </motion.div>
    </motion.aside>
  )
}
