# FlowBuilder MVP

A simplified workflow automation tool inspired by [n8n](https://github.com/n8n-io/n8n).

## Features

- 🎨 Visual workflow builder with drag-and-drop interface
- 🔄 HTTP Request node for making API calls
- ⚡ Real-time workflow execution
- 🎯 Simple and intuitive UI

## Quick Start

### Prerequisites

- Node.js >= 20.19
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This will start:
- Frontend at http://localhost:5173
- Backend API at http://localhost:5678

### Build

```bash
npm run build
npm start
```

## MVP Scope

This is a minimal viable product focusing on core workflow automation:

### Included
- Visual workflow editor
- HTTP Request node
- Workflow execution engine
- In-memory workflow storage

### Not Included (compared to full n8n)
- Authentication/Authorization
- Database persistence
- Multiple node types
- Credentials management
- Webhook triggers
- AI features
- Advanced scheduling

## Architecture

```
├── src/
│   ├── client/          # React frontend
│   │   ├── components/  # UI components
│   │   ├── App.tsx      # Main app component
│   │   └── main.tsx     # Entry point
│   ├── server/          # Express backend
│   │   ├── routes/      # API routes
│   │   ├── workflow/    # Workflow engine
│   │   └── index.ts     # Server entry
│   └── shared/          # Shared types
```

## Usage

1. Open the app at http://localhost:5173
2. Create a new workflow
3. Add an HTTP Request node
4. Configure the URL and method
5. Click "Execute Workflow" to run it
6. See the results in the output panel

## Technology Stack

- **Frontend**: React 18, ReactFlow (visual editor), TypeScript
- **Backend**: Express 5, TypeScript
- **Build**: Vite, tsx
- **Validation**: Zod

## License

MIT

## Acknowledgments

Inspired by [n8n](https://n8n.io) - an amazing workflow automation platform.
