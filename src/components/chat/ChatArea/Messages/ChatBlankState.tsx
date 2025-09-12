'use client'

import Heading from '@/components/ui/typography/Heading'

const ChatBlankState = () => {
  return (
    <section
      className="flex flex-col items-center text-center font-geist"
      aria-label="Welcome message"
    >
      <div className="flex max-w-3xl flex-col gap-y-4">
        <Heading size={1} className="tracking-tight">
          Control Deck
        </Heading>
        <p className="text-muted-foreground">
          Select a task from the sidebar to get started.
        </p>
      </div>
    </section>
  )
}

export default ChatBlankState
