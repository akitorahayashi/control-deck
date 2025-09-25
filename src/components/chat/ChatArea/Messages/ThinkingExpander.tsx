import { useState } from 'react';
import Icon from '@/components/ui/icon';

const thinkingAnimation = {
  animation: 'thinking 1.2s ease-in-out infinite'
};

const thinkingKeyframes = `
@keyframes thinking {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}`;

interface ThinkingExpanderProps {
  thinking: string;
  content: string;
  isStreamingThinking?: boolean;
}

const ThinkingExpander = ({
  thinking,
  content,
  isStreamingThinking = false
}: ThinkingExpanderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!thinking && !isStreamingThinking) {
    return null;
  }

  const isThinking = thinking && !content;
  const buttonText = isThinking ? '思考中...' : '思考プロセスを表示';

  return (
    <>
      <style>{thinkingKeyframes}</style>
      <div className="mb-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500"
        >
          <span style={isThinking ? thinkingAnimation : {}}>{buttonText}</span>
          <Icon
            type={isExpanded ? 'chevron-up' : 'chevron-down'}
            className="ml-auto h-4 w-4"
          />
        </button>

        {isExpanded && (
          <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="whitespace-pre-wrap text-sm text-gray-600">
              {thinking}
              {isStreamingThinking && (
                <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-gray-400" />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ThinkingExpander;
