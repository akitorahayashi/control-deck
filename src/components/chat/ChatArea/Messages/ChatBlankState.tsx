'use client'

import { useStore } from '@/store'
import Heading from '@/components/ui/typography/Heading'
import Paragraph from '@/components/ui/typography/Paragraph'

const ChatBlankState = () => {
  const { selectedAgent } = useStore()

  if (selectedAgent) {
    return (
      <section
        className="flex h-full flex-col items-center justify-center text-center font-geist"
        aria-label="Agent information"
      >
        <div className="flex max-w-3xl flex-col gap-y-4">
          <Heading size={1} className="tracking-tight">
            {selectedAgent.name}
          </Heading>
          <Paragraph className="text-muted-foreground">
            {selectedAgent.description}
          </Paragraph>
        </div>
      </section>
    )
  }

  return (
    <section
      className="flex h-full flex-col items-center justify-center text-center font-geist"
      aria-label="Welcome message"
    >
      <div className="flex max-w-3xl flex-col gap-y-4">
        <Heading size={1} className="tracking-tight">
          Control Deck UI
        </Heading>
      </div>
    </section>
  )
}

export default ChatBlankState
