# Control Deck UI

A standalone UI for managing LLM agents with specialized capabilities.

## Overview

Control Deck UI provides a comprehensive interface for interacting with AI agents, each specialized in different domains such as research, coding, analysis, and creative writing. The application features a sidebar for agent selection and a main chat area for conversations.

## Features

### Core Functionality
- **Agent Management**: Browse and select from specialized AI agents
- **Chat Interface**: Familiar chat-based conversation with streaming responses
- **Thinking Process Visualization**: View agent's reasoning process in expandable sections
- **Real-time Streaming**: Support for streaming responses with thinking indicators
- **Responsive Design**: Mobile-friendly interface with adaptive layouts

### Agent Specialties
- **Research**: Deep research, fact-checking, and information synthesis
- **Summarization**: Concise summaries of complex documents
- **Prompt Generation**: Effective prompt design for AI interactions
- **Coding**: Clean, efficient code generation in multiple languages
- **Analysis**: Data pattern analysis and visualization
- **Creative Writing**: Engaging stories, articles, and creative content

### Technical Features
- **TypeScript**: Full type safety across the application
- **Component Architecture**: Modular, reusable React components
- **State Management**: Zustand for efficient global state
- **Styling**: Tailwind CSS with shadcn/ui components
- **Theme Support**: Light/dark mode with next-themes
- **Icons**: Lucide React icon library
- **Animation**: Framer Motion for smooth transitions

## Architecture

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── agents/           # Agent-related components
│   │   ├── AgentInfo.tsx         # Agent details display
│   │   ├── AgentListSidebar.tsx  # Agent selection sidebar
│   │   └── AgentView.tsx         # Main agent interaction view
│   ├── chat/             # Chat functionality
│   │   └── ChatArea/     # Chat interface components
│   │       ├── ChatArea.tsx      # Main chat container
│   │       ├── ChatInput/        # Message input components
│   │       ├── MessageArea.tsx   # Message display area
│   │       ├── Messages/         # Message-related components
│   │       └── ScrollToBottom.tsx # Auto-scroll functionality
│   └── ui/               # Reusable UI components
│       ├── StatusBar/    # Application status components
│       ├── button.tsx    # Button component
│       ├── dialog.tsx    # Modal dialog component
│       ├── select.tsx    # Select dropdown component
│       ├── skeleton.tsx  # Loading skeleton component
│       ├── sonner.tsx    # Toast notifications
│       ├── textarea.tsx  # Text area component
│       ├── tooltip/      # Tooltip components
│       └── typography/   # Text and markdown components
├── lib/                  # Utilities and helpers
│   ├── chatService.ts   # Wrapper around the Django chat API
│   ├── agentUtils.ts    # Agent-related utilities
│   ├── utils.ts         # General utilities
│   └── mocks/           # Dev/test-only mock data (not used in production)
│       ├── agents.ts    # Sample agent definitions
│       ├── conversations.ts # Sample conversations
│       └── streaming.ts # Local streaming simulator
├── store.ts             # Zustand global state management
└── types/               # TypeScript type definitions
    ├── agent.ts         # Agent-related types
    └── chat.ts          # Chat message types
```

### Data Models

#### Agent Interface
```typescript
interface Agent {
  id: string
  name: string
  description: string
  specialty: AgentSpecialty
  avatarUrl?: string
}

type AgentSpecialty =
  | 'research'
  | 'summarization'
  | 'prompt-generation'
  | 'coding'
  | 'analysis'
  | 'creative-writing'
```

#### Chat Message Interface
```typescript
interface ChatMessage {
  id: string
  role: 'user' | 'agent'
  agentId?: string
  content: string
  thinking?: string  // Agent's reasoning process
  timestamp: string
}
```

### State Management

The application uses Zustand for state management with the following store structure:

- **agents**: Available AI agents list
- **selectedAgent**: Currently active agent
- **messages**: Chat conversation history
- **isStreaming**: Streaming response status
- **chatInputRef**: Reference to chat input element

Key state actions:
- `setSelectedAgent()`: Switch between agents
- `clearMessages()`: Reset the transcript when changing agents
- `appendUserMessage()`: Append a user turn and capture its timestamp
- `appendAssistantPlaceholder()`: Prepare an empty assistant turn for streaming updates
- `appendAssistantThinking()` / `appendAssistantContent()`: Stream reasoning and answer chunks into the placeholder
- `replaceMessage()`: Patch an existing message (e.g., to surface errors)
- `buildRequestMessages()`: Transform the current transcript into API-ready payloads

## Chat Backend Integration

The chat experience is backed by the Django API introduced in Phase 1. The helper at `src/lib/chatService.ts` wraps the `/api/v1/agents/{agentId}/chat/` endpoint, parses Server-Sent Events, and exposes ergonomic callbacks (`onChunk`, `onComplete`, `onError`) for the UI store.

Configure the browser-visible base URL with `NEXT_PUBLIC_BACKEND_URL`. When omitted, the helper defaults to `/api/v1`, which aligns with the development proxy configured in `next.config.ts`. Ensure `API_HOST` and `API_PORT` remain set so Next.js can forward `/api/*` calls to the Django server during local development.

Mock data under `src/lib/mocks` is preserved for tests and manual demos only; runtime components now rely exclusively on the streaming API.

## Development

### Prerequisites
- Node.js 20+
- pnpm package manager

### Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start development server:**
   ```bash
   pnpm dev
   ```

3. **Open application:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
pnpm dev                # Start development server
pnpm build             # Build for production
pnpm start             # Start production server

# Code Quality
pnpm lint              # Run ESLint
pnpm lint:fix          # Fix ESLint issues
pnpm format            # Check formatting with Prettier
pnpm format:fix        # Fix formatting issues
pnpm typecheck         # Run TypeScript type checking
pnpm validate          # Run all quality checks

# Testing
pnpm test              # Run all tests
pnpm unit-test         # Run unit tests only
pnpm build-test        # Test production build
pnpm test:watch        # Run tests in watch mode
pnpm test:coverage     # Run tests with coverage

# Maintenance
pnpm clean             # Clean build artifacts and dependencies
```

### Docker Support

Build and run with Docker:

```bash
# Build image
docker build -t control-deck-ui .

# Run container
docker run -p 3000:3000 control-deck-ui
```

## CI/CD

The project includes GitHub Actions workflows:

- **Format and Lint**: Code quality checks (ESLint, Prettier, TypeScript)
- **Run Tests**: Unit tests and build verification
- **CI Pipeline**: Orchestrates all quality checks

Workflows run on:
- Push to `main` branch
- Pull requests to `main`
- Manual trigger

## Technology Stack

### Core Framework
- **Next.js 15.2.3**: React framework with App Router
- **React 18.3.1**: UI library
- **TypeScript 5**: Static typing

### Styling & UI
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI component library
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Framer Motion**: Animation library

### State & Data
- **Zustand 5.0.3**: Lightweight state management
- **nuqs 2.3.2**: URL state synchronization

### Development Tools
- **ESLint 9**: Code linting
- **Prettier 3.4.2**: Code formatting
- **Vitest 2.1.8**: Fast unit testing
- **pnpm**: Fast, disk space efficient package manager

### Content Processing
- **react-markdown**: Markdown rendering
- **rehype-raw**: HTML in markdown support
- **rehype-sanitize**: HTML sanitization
- **remark-gfm**: GitHub Flavored Markdown

## Future Enhancements

- **Backend Enhancements**: Extend the Django proxy with advanced capabilities (tool calls, vision, etc.)
- **Authentication**: User management and session handling
- **Agent Customization**: Create and configure custom agents
- **Conversation History**: Persistent chat history across sessions
- **File Upload**: Support for document and image uploads
- **Export Functionality**: Export conversations and analysis results
- **Plugin System**: Extensible agent capabilities
- **Multi-language Support**: Internationalization support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use the existing component patterns
- Write tests for new functionality
- Ensure all quality checks pass (`pnpm validate`)
- Follow the established Git commit message format

## License

This project is licensed under the MIT License - see the LICENSE file for details.
