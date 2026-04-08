# AI Business Automation OS

Production-ready fullstack monorepo for an AI-powered business automation platform.

## Stack

- Frontend: Next.js (App Router), Tailwind CSS, Framer Motion, shadcn-style custom UI
- Backend: FastAPI, JWT Auth, REST APIs
- Database: PostgreSQL
- AI Layer: modular AI service (can run mock logic or OpenAI)

## Project Structure

- `frontend/` - Next.js futuristic SaaS web app
- `backend/` - FastAPI clean architecture backend
- `docker-compose.yml` - PostgreSQL + backend + frontend

## Prerequisites

- Node.js 20+ (includes npm)
- Python 3.11+
- PostgreSQL 16+ (or Docker Desktop)

## Quick Start

### Windows One-Command Start

```powershell
.\start.ps1
```

This script validates prerequisites, creates env files, starts PostgreSQL (if Docker exists), then launches backend and frontend in separate terminals.

### 1) Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --port 8000
```

### 2) Frontend

```bash
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

### 3) Database

Run PostgreSQL locally and update env vars, or use Docker:

```bash
docker compose up --build
```

Frontend: `http://localhost:3000`  
Backend docs: `http://localhost:8001/docs`

## Auth Flow

- Open `http://localhost:3000/signup` to create your first account.
- Login from `http://localhost:3000/login`.
- All business modules are protected and require a valid JWT.

## Troubleshooting

- If `node` or `npm` is not recognized, install Node.js and reopen terminal.
- If `python` is not recognized, install Python and enable `Add python.exe to PATH`.
- If signup fails with email validation errors, re-run `pip install -r requirements.txt`.
