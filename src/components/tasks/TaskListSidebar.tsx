'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import toggleSidebarIcon from '@/assets/icons/toggle-sidebar.svg'
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
  const { tasks, setTasks, selectedTask } = useStore()

  useEffect(() => {
    // Load mock tasks into the store on component mount
    setTasks(mockTasks)
  }, [setTasks])

  return (
    <motion.aside
      className="relative flex h-screen shrink-0 grow-0 flex-col overflow-y-auto border-r bg-background/50 p-2 font-dmmono"
      initial={{ width: '20rem' }}
      animate={{ width: isCollapsed ? '2.5rem' : '20rem' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-0 top-2 z-10 p-2 text-muted border border-border hover:bg-muted/20 rounded-md transition-colors"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        type="button"
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src={toggleSidebarIcon}
          alt="Toggle sidebar"
          width={24}
          height={24}
          className={`transform transition-transform ${isCollapsed ? 'rotate-180' : 'rotate-0'}`}
        />
      </motion.button>
      <motion.div
        className="w-[19rem] space-y-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isCollapsed ? 0 : 1, x: isCollapsed ? -20 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          pointerEvents: isCollapsed ? 'none' : 'auto'
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
