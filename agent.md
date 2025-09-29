# Agent Architecture

## Purpose
This document captures how the Open Lovable project orchestrates AI-assisted code generation and sandbox management.

## High-Level Flow
1. The Next.js UI (`app/page.tsx`) collects user prompts and keeps local session state (sandbox data, chat log, generation progress).
2. When a prompt is submitted, the client calls `/api/generate-ai-code-stream` with the active sandbox context.
3. The streaming endpoint enriches the prompt with file/context metadata, optionally calls `/api/analyze-edit-intent` to build a search plan, executes that plan against the cached file manifest, then streams model output back to the browser.
4. Model responses are parsed on the server (`/api/apply-ai-code`) to detect `<file>`, `<packages>`, and `<command>` directives. Files are written into the remote E2B sandbox and package installs/commands are triggered via dedicated APIs.
5. Sandbox progress and Vite status are polled through monitoring endpoints; the UI reflects changes through `CodeApplicationProgress` and live iframe previews.

## Generation Modes
- **Reference URL (default)**: The home overlay accepts a source URL and a target industry. The client scrapes the reference site, captures an optional screenshot, and instructs the model to rebuild the layout for the new niche while reusing the original visual rhythm.
- **Prompt Builder**: Users can switch modes to provide a free-form brief. The shared `runGenerationRequest` utility streams generation without scraping, building a fresh React/Tailwind experience from the supplied narrative, optional industry, and extra instructions.

## Frontend Orchestrator
- **App Router + Client Page**: `app/page.tsx` manages the AI workflow, keeps conversation context, and drives UI state (tabs, sandbox tree, preview iframe, generation file list).
- **Theme & UI primitives**: Theme toggling lives under `app/components/*`, while reusable inputs/buttons reside in `components/ui/*` (shadcn/tailwind style).
- **Progress & Preview**: `components/CodeApplicationProgress.tsx` renders streaming status, and `components/SandboxPreview.tsx` handles iframe previewing of the sandbox build.

## Serverless/Agent Endpoints (app/api)
- `create-ai-sandbox`: spins up an E2B sandbox, seeds a Vite + Tailwind starter, stores handles in `global.activeSandbox` and `global.sandboxState`.
- `generate-ai-code-stream`: main orchestrator; selects an AI client (`@ai-sdk/*` wrappers), prunes conversation state, builds enhanced prompts via `lib/context-selector`, runs search plans through `lib/file-search-executor`, and streams `text/event-stream` chunks.
- `analyze-edit-intent`: validates the user request against the manifest and returns a structured search plan (terms, regex, expected matches) using the `ai` SDK's `generateObject` helper.
- `apply-ai-code`: parses XML/HTML-like tags in model output, deduplicates files, installs packages (delegating to `install-packages`), writes files into the sandbox, and records results for the UI.
- Support endpoints (`apply-ai-code-stream`, `detect-and-install-packages`, `monitor-vite-logs`, `sandbox-status`, etc.) expose operational controls so the UI can react without direct sandbox access.

## Context Building & Search Heuristics
- `lib/context-selector.ts` combines manifest metadata and heuristics (e.g., always include `App.jsx`, Tailwind config) to prime the model with precise instructions and constraints.
- `lib/edit-intent-analyzer.ts` classifies user requests into `EditType`s and predicts target files using regex-driven resolvers that traverse the manifest's component tree.
- `lib/file-search-executor.ts` runs AI-generated search plans across cached file contents to produce high-confidence line-level hits that get injected into the system prompt before generation.

## State & Data Contracts
- **SandboxState** (`types/sandbox.ts`): cached manifest, file contents, and metadata for the current E2B sandbox.
- **ConversationState** (`types/conversation.ts`): rolling history (messages, edits, user preferences) kept in `global.conversationState` to personalize future prompts.
- **FileManifest** (`types/file-manifest.ts`): normalized view of project files, imports, component relationships, and routes; created when the sandbox is initialized and reused by search/intents.

## External Dependencies
- **E2B Code Interpreter**: remote execution environment for applying code, installing packages, and running Vite.
- **AI Providers**: Anthropic, OpenAI, Groq (for OSS GPT), Google Gemini via `@ai-sdk/*` clients; selected per request based on `config/app.config.ts`.
- **Framer Motion/Tailwind**: used on the client for rich animations and theming.

## Configuration & Deployment
- `config/app.config.ts` centralizes knobs (model list, sandbox timeouts, retry policies, UI flags).
- Environment variables (`.env.example`, `.env.local`) carry API keys for E2B, Firecrawl, and each LLM provider.
- Multiple deployment targets are supported: Dockerfiles (`Dockerfile`, `.simple`, `.extended`), `nixpacks.toml`, `railway.json`, and docs (`RAILWAY_DEPLOY.md`) outline hosting on Railway.

## Notable Operational Considerations
- Several server files rely on Node global state; deploy to a single process or ensure globals are scoped per worker.
- Some legacy text assets still contain mojibake (e.g., `.env.example`, `README.md`, `layout.tsx` metadata); convert to UTF-8 before production.
- Test scripts (`npm run test:*`) reference `tests/*.js`, but that folder is absent locally; recreate or adjust before enabling CI gating.
