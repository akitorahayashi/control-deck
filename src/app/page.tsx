'use client'
import { AgentListSidebar } from '@/components/agents/AgentListSidebar'
import { AgentView } from '@/components/agents/AgentView'
import { Suspense } from 'react'

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-screen bg-background/80">
        <AgentListSidebar />
        <AgentView />
      </div>
    </Suspense>
  )
}
