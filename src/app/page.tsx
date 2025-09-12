'use client'
import { TaskListSidebar } from '@/components/tasks/TaskListSidebar'
import { TaskView } from '@/components/tasks/TaskView'
import { Suspense } from 'react'

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-screen bg-background/80">
        <TaskListSidebar />
        <TaskView />
      </div>
    </Suspense>
  )
}
