'use client'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import Icon from '@/components/ui/icon'
import Heading from '@/components/ui/typography/Heading'
import { useStore } from '@/store'
import { mockTasks } from '@/lib/mock-data'
import { Task } from '@/types/control-deck'
import { cn } from '@/lib/utils'

const SidebarHeader = () => (
  <div className="flex items-center gap-2 p-2">
    <Heading size={2}>
      Control Deck
    </Heading>
  </div>
)

const TaskItem = ({
  task,
  isSelected
}: {
  task: Task
  isSelected: boolean
}) => {
  const { setSelectedTask } = useStore()
  const statusColors: { [key: string]: string } = {
    pending: 'bg-yellow-500',
    running: 'bg-blue-500',
    completed: 'bg-green-500',
    error: 'bg-red-500'
  }

  return (
    <div
      onClick={() => setSelectedTask(task)}
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors',
        isSelected ? 'bg-accent' : 'hover:bg-accent/50'
      )}
    >
      <div
        className={cn('h-2 w-2 rounded-full', statusColors[task.status])}
      />
      <div className="flex-grow">
        <p className="text-sm font-medium">{task.title}</p>
        <p className="text-xs text-muted-foreground">{task.agent.name}</p>
      </div>
    </div>
  )
}

export const TaskListSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(320) // 20rem = 320px
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { tasks, setTasks, selectedTask } = useStore()
  
  const MIN_WIDTH = 200
  const MAX_WIDTH = 600
  const COLLAPSED_WIDTH = 53 // 3.3rem = 53px

  useEffect(() => {
    // Load mock tasks into the store on component mount
    setTasks(mockTasks)
  }, [setTasks])

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
      className="relative flex h-screen shrink-0 grow-0 flex-col overflow-y-auto border-r bg-background/50 p-2 font-dmmono"
      initial={{ width: sidebarWidth }}
      animate={{ width: isCollapsed ? COLLAPSED_WIDTH : sidebarWidth }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Resize handle */}
      {!isCollapsed && (
        <div
          className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/20 active:bg-primary/30"
          onMouseDown={handleMouseDown}
        />
      )}
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-1.5 top-3.5 z-10 p-2 text-muted hover:bg-muted/20 rounded-md transition-colors"
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
          width: isCollapsed ? 0 : sidebarWidth - 16 // subtract padding
        }}
      >
        <SidebarHeader />
        <div className="flex flex-col gap-1">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isSelected={selectedTask?.id === task.id}
            />
          ))}
        </div>
      </motion.div>
    </motion.aside>
  )
}
