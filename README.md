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
│   ├── mocks/           # Mock data for development
│   │   ├── agents.ts    # Sample agent definitions
│   │   ├── conversations.ts # Sample conversations
│   │   └── streaming.ts # Mock streaming responses
│   ├── agentUtils.ts    # Agent-related utilities
│   └── utils.ts         # General utilities
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
- `addMessage()`: Add new messages to conversation
- `updateMessageContent()`: Update streaming message content
- `updateMessageThinking()`: Update agent thinking process

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

- **Backend Integration**: Connect to Django REST API or similar backend
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
