'use client'
import Heading from '@/components/ui/typography/Heading'
import Paragraph from '@/components/ui/typography/Paragraph'
import { AgentInfoProps } from '@/types/agent'

export const AgentInfo = ({ agent, className = '' }: AgentInfoProps) => {
  return (
    <div className={`mx-auto w-full max-w-2xl text-center ${className}`}>
      <Heading size={1} className="tracking-tight">
        {agent.name}
      </Heading>
      <Paragraph className="text-muted-foreground mt-2">
        {agent.description}
      </Paragraph>
    </div>
  )
}
