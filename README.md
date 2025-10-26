<div align="center">
  <img src="strawberries_web/public/logo.png" alt="Stubborn Strawberry Logo" width="120"/>
  <h1>Strawberries</h1>
  <p>An AI-powered workspace platform that combines your personal documents with external data sources. Built with FastAPI, Next.js, and PostgreSQL with vector search capabilities.</p>
</div>

## Features

- **🤖 AI Chat Interface** - Ask questions and get cited answers from your knowledge base
- **📁 Document Management** - Upload and organize documents with intelligent chunking
- **🔍 Hybrid Search** - Combines semantic vector search with full-text search using Reciprocal Rank Fusion
- **🎙️ Podcast Generation** - Convert documents and conversations into audio podcasts
- **📚 Study Mode** - Generate flashcards and MCQs from your documents
- **🔌 External Connectors** - Integrate with GitHub, Notion, and Linear
- **🏠 Self-Hosted** - Complete control over your data with local deployment
- **🔐 Multi-Tenant** - Workspace isolation with user authentication (JWT/OAuth)

## Supported File Formats

- **Documents**: `.pdf`, `.doc`, `.docx`
- **Presentations**: `.pptx`
- **Audio/Video**: `.mp3`, `.m4a`, `.webm`

## External Connectors

Currently supported integrations:
- **GitHub** - Repository content and issues
- **Notion** - Pages and databases
- **Linear** - Issues and projects

## Tech Stack

### Backend
- **FastAPI** - Python web framework
- **PostgreSQL + pgvector** - Database with vector search
- **SQLAlchemy** - ORM and database migrations
- **Celery + Redis** - Background task processing
- **LangChain** - AI agent framework
- **LiteLLM** - Multi-provider LLM integration

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Component library

## Quick Start

### Prerequisites
- Docker and Docker Compose
- API keys for LLM provider (OpenAI, Anthropic, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/longle325/CoverGoAIHakathon2025.git
cd CoverGoAIHakathon2025
```

2. Configure environment variables:
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

3. Start the services:
```bash
docker-compose up -d
```

4. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- pgAdmin: http://localhost:5050

## Architecture

- **Frontend (Next.js)** - Server-side rendering and client-side interactivity
- **Backend API (FastAPI)** - RESTful API with async operations
- **Database (PostgreSQL)** - Relational data with vector embeddings
- **Task Queue (Celery)** - Asynchronous document processing
- **Cache/Broker (Redis)** - Task queue and result storage

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                        CLIENT LAYER                                      │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌────────────────────┐          ┌────────────────────┐         ┌───────────────────┐  │
│  │  Browser           │          │  Browser Extension │         │  Mobile App       │  │
│  │  (React/Next.js)   │──────────│  (Plasmo/Chrome)  │─────────│  (Future)         │  │
│  └────────────────────┘          └────────────────────┘         └───────────────────┘  │
│           │                                  │                            │              │
│           │              HTTP/REST API       │                            │              │
│           └──────────────────────────────────┴────────────────────────────┘              │
│                                              │                                           │
└──────────────────────────────────────────────┼───────────────────────────────────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                               FRONTEND - NEXT.JS 15 (Port 3000)                          │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────┐      │
│  │  React Server Components (RSC) - Server-Side Rendering                       │      │
│  │  • app/(home)/page.tsx - Landing page                                        │      │
│  │  • app/dashboard/[search_space_id]/*/page.tsx - Page shells                  │      │
│  └──────────────────────────────────────────────────────────────────────────────┘      │
│                                       │                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────────┐      │
│  │  Client Components (CSR) - Interactive UI                                    │      │
│  │  • Chat interface, Flashcards, Document viewer                               │      │
│  │  • Real-time updates, WebSocket connections                                  │      │
│  │  • LocalStorage auth (JWT token)                                             │      │
│  └──────────────────────────────────────────────────────────────────────────────┘      │
│                                       │                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────────┐      │
│  │  UI Components (Radix UI + Tailwind CSS)                                     │      │
│  │  • components/chat/, components/flashcards/, components/settings/            │      │
│  └──────────────────────────────────────────────────────────────────────────────┘      │
│                                                                                          │
└──────────────────────────────────────────────┬───────────────────────────────────────────┘
                                               │
                                HTTP/REST API  │  Bearer Token (JWT)
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND API - FASTAPI (Port 8000)                              │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────┐      │
│  │  API Gateway Layer (FastAPI Application)                                     │      │
│  │  • CORS middleware (allow all origins)                                       │      │
│  │  • Request validation (Pydantic)                                             │      │
│  │  • Response serialization                                                    │      │
│  │  • Error handling                                                            │      │
│  └──────────────────────────────────────────────────────────────────────────────┘      │
│                                       │                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────────┐      │
│  │  Authentication Layer (FastAPI-Users)                                        │      │
│  │  • JWT token validation                                                      │      │
│  │  • Google OAuth 2.0 (optional)                                               │      │
│  │  • User session management                                                   │      │
│  │  • Password hashing (Bcrypt)                                                 │      │
│  └──────────────────────────────────────────────────────────────────────────────┘      │
│                                       │                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────────┐      │
│  │  API Routes Layer (app/routes/)                                              │      │
│  │  ├─ /auth/*           → Authentication (JWT, OAuth)                          │      │
│  │  ├─ /api/v1/searchspaces/  → Workspace management                            │      │
│  │  ├─ /api/v1/documents/     → Document CRUD                                   │      │
│  │  ├─ /api/v1/chats/         → Q&A, Research chat                              │      │
│  │  ├─ /api/v1/study/         → Flashcards, MCQs                                │      │
│  │  ├─ /api/v1/podcasts/      → Podcast generation                              │      │
│  │  ├─ /api/v1/connectors/    → External integrations                           │      │
│  │  ├─ /api/v1/tasks/         → To-do management                                │      │
│  │  ├─ /api/v1/notes/         → Note taking                                     │      │
│  │  ├─ /api/v1/insights/      → AI insights                                     │      │
│  │  └─ /api/v1/email/         → Email service                                   │      │
│  └──────────────────────────────────────────────────────────────────────────────┘      │
│                                       │                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────────┐      │
│  │  Service Layer (app/services/)                                               │      │
│  │  ├─ QueryService          → Chat & research orchestration                    │      │
│  │  ├─ StudyService          → Flashcard/MCQ generation                         │      │
│  │  ├─ ConnectorService      → External data source integration                 │      │
│  │  ├─ LLMService            → LLM interaction wrapper                          │      │
│  │  ├─ RerankerService       → Search result reranking                          │      │
│  │  ├─ TaskService           → Task management                                  │      │
│  │  ├─ NoteService           → Note operations                                  │      │
│  │  ├─ InsightsService       → AI-powered insights                              │      │
│  │  ├─ EmailService          → SMTP email sending                               │      │
│  │  └─ StreamingService      → SSE response streaming                           │      │
│  └──────────────────────────────────────────────────────────────────────────────┘      │
│                     │                         │                    │                    │
│          ┌──────────┴─────────┬───────────────┴──────┬─────────────┴──────────┐        │
│          │                    │                      │                        │        │
│          ▼                    ▼                      ▼                        ▼        │
│  ┌──────────────┐   ┌──────────────────┐   ┌─────────────────┐   ┌──────────────────┐│
│  │  AI Agents   │   │  Retrieval Layer │   │  ETL Pipeline   │   │  External APIs   ││
│  │  (LangChain) │   │  (app/retriver/) │   │  (app/tasks/)   │   │  (app/connectors)││
│  ├──────────────┤   ├──────────────────┤   ├─────────────────┤   ├──────────────────┤│
│  │ • Researcher │   │ • HybridSearch   │   │ • Docling       │   │ • Slack API      ││
│  │ • Podcaster  │   │ • VectorSearch   │   │ • Unstructured  │   │ • Notion API     ││
│  │              │   │ • TextSearch     │   │ • LlamaCloud    │   │ • GitHub API     ││
│  │              │   │ • RRF Fusion     │   │ • Firecrawl     │   │ • Linear API     ││
│  └──────────────┘   └──────────────────┘   └─────────────────┘   └──────────────────┘│
│                                                                                          │
└──────────────┬───────────────────┬───────────────────┬───────────────────┬──────────────┘
               │                   │                   │                   │
               ▼                   ▼                   ▼                   ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────┐  ┌──────────────────┐
│   POSTGRESQL DB      │  │   REDIS BROKER   │  │  LITELLM     │  │  CHONKIE        │
│   with pgvector      │  │   (Port 6379)    │  │  Proxy       │  │  Embeddings      │
│   (Port 5432)        │  └──────────────────┘  └──────────────┘  └──────────────────┘
└──────────────────────┘           │                    │                   │
        │                          │                    │                   │
        │                          ▼                    ▼                   ▼
        │              ┌────────────────────────────────────────────────────────┐
        │              │        CELERY DISTRIBUTED TASK QUEUE                   │
        │              ├────────────────────────────────────────────────────────┤
        │              │                                                        │
        │              │  ┌──────────────────────────────────────────────┐    │
        │              │  │  CELERY WORKER (app.celery_app)              │    │
        │              │  │  • Async task execution                      │    │
        │              │  │  • Document processing tasks                 │    │
        │              │  │  • Podcast generation tasks                  │    │
        │              │  │  • Connector indexing tasks                  │    │
        │              │  │  • Email sending tasks                       │    │
        │              │  │  • Pool: solo (single-threaded)             │    │
        │              │  └──────────────────────────────────────────────┘    │
        │              │                      │                                │
        │              │  ┌──────────────────────────────────────────────┐    │
        │              │  │  CELERY BEAT (Scheduler)                     │    │
        │              │  │  • Periodic task scheduling                  │    │
        │              │  │  • Schedule checker (every 2 minutes)        │    │
        │              │  │  • Activity reminders (daily at 8 AM)        │    │
        │              │  │  • Connector auto-indexing                   │    │
        │              │  └──────────────────────────────────────────────┘    │
        │              │                      │                                │
        │              │  ┌──────────────────────────────────────────────┐    │
        │              │  │  FLOWER (Monitoring) - Optional              │    │
        │              │  │  • Web UI for task monitoring                │    │
        │              │  │  • Port 5555                                 │    │
        │              │  └──────────────────────────────────────────────┘    │
        │              │                                                        │
        │              └────────────────────────────────────────────────────────┘
        │                             │
        │                             │ Read/Write Tasks
        ▼                             ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                          DATABASE - POSTGRESQL + PGVECTOR                                │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────┐      │
│  │  Core Tables (SQLAlchemy ORM)                                                │      │
│  │  ├─ users             → User accounts (UUID)                                 │      │
│  │  ├─ searchspaces      → Workspaces (multi-tenant isolation)                  │      │
│  │  ├─ documents         → Indexed documents + embeddings (Vector)              │      │
│  │  ├─ chunks            → Document chunks for RAG (Vector)                     │      │
│  │  ├─ chats             → Conversation history (JSON messages)                 │      │
│  │  ├─ podcasts          → Generated audio content                              │      │
│  │  ├─ study_materials   → Flashcards & MCQs                                    │      │
│  │  ├─ tasks             → To-do items                                          │      │
│  │  ├─ notes             → User notes                                           │      │
│  │  ├─ search_source_connectors → External integrations config                 │      │
│  │  ├─ llm_configs       → User-specific LLM settings                           │      │
│  │  ├─ user_search_space_preferences → LLM preferences per workspace            │      │
│  │  └─ logs              → Activity & error tracking                            │      │
│  └──────────────────────────────────────────────────────────────────────────────┘      │
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────┐      │
│  │  Indexes & Extensions                                                        │      │
│  │  ├─ pgvector extension → Vector similarity search                            │      │
│  │  ├─ HNSW indexes       → Fast approximate nearest neighbor search            │      │
│  │  ├─ GIN indexes        → Full-text search on content                         │      │
│  │  └─ B-tree indexes     → Foreign keys, created_at                            │      │
│  └──────────────────────────────────────────────────────────────────────────────┘      │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                               │
                                               ▼
                                    ┌─────────────────────┐
                                    │   PGADMIN (5050)    │
                                    │   DB Management UI  │
                                    └─────────────────────┘
```


## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## License

See [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
