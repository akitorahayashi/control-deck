export interface Image {
  url: string
  name?: string
  revised_prompt?: string
}

export interface Video {
  id?: string
  url: string
  name?: string
}

export interface Audio {
  id?: string
  url?: string
  name?: string
  base64_audio?: string
  mime_type?: string
  content?: string
  sample_rate?: number
  channels?: number
}

export interface Reference {
  name: string
  content: string
  meta_data: {
    chunk: string
  }
}

export interface ReferenceData {
  query: string
  references: Reference[]
}

export interface ReasoningStep {
  title: string
  action: string
}

export interface ToolCall {
  tool_call_id?: string
  tool_name: string
  created_at?: string
}

// Props for components
export interface ToolCallProps {
  tools: ToolCall
}

export interface ReasoningStepProps {
  index: number
  stepTitle: string
}

export interface ReasoningProps {
  reasoning: ReasoningStep[]
}
