'use client';
import React, { Suspense } from 'react';
import { AgentListSidebar } from '@/components/agents/AgentListSidebar';
import { AgentView } from '@/components/agents/AgentView';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-screen bg-background/80">
        <AgentListSidebar />
        <AgentView />
      </div>
    </Suspense>
  );
}
