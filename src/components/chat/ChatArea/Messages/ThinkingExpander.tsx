import { useState } from 'react'
import Icon from '@/components/ui/icon'

interface ThinkingExpanderProps {
  thinking: string
  isStreamingThinking?: boolean
}

const ThinkingExpander = ({ thinking, isStreamingThinking = false }: ThinkingExpanderProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!thinking && !isStreamingThinking) {
    return null
  }

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-400 transition-colors"
      >
        <span>思考プロセスを表示</span>
        <Icon
          type={isExpanded ? "chevron-up" : "chevron-down"}
          className="w-4 h-4 ml-auto"
        />
      </button>

      {isExpanded && (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600 whitespace-pre-wrap">
            {thinking}
            {isStreamingThinking && (
              <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-pulse" />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ThinkingExpander