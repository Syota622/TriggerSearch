# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TriggerSearch (trigs)** is a health tracking application that helps users identify triggers for symptoms like headaches and allergies. Users record daily information (symptoms, sleep, weather, temperature, food intake), and the system analyzes patterns to identify potential triggers.

### Architecture

- **Backend**: FastAPI (Python 3.11+) with PostgreSQL database
- **Frontend**: React + Vite (document/UI directory - not primary development focus yet)
- **Infrastructure**: Docker Compose for local development, Terraform for AWS deployment (planned)
- **Mobile**: React Native (planned, directory currently empty)

## Project Structure

```
backend/           # FastAPI backend application
├── main.py        # FastAPI app entry point with API endpoints
├── models.py      # SQLAlchemy ORM models (User table)
├── database.py    # Database connection and session management
├── Dockerfile     # Backend container definition
├── docker-compose.yml  # Local development environment
├── requirements.txt    # Python dependencies (managed by uv)
└── pyproject.toml     # Python project configuration (uv format)

document/          # Design documents and specifications
├── API/rest_api.md    # REST API specification (v3)
├── APP/design.md      # Application design and UI guidelines
├── database/er.md     # Database ER diagram and table specs
└── infra/name.md      # Infrastructure naming conventions

infra/terraform/   # Infrastructure as Code (planned)
admin/             # Admin tools (empty)
mobile/            # React Native app (empty)
```

## Development Commands

### Backend Development

```bash
# Navigate to backend directory
cd backend

# Install uv if not already installed
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install dependencies using uv
uv pip install -r requirements.txt

# Run backend with Docker Compose (recommended)
docker-compose up

# Run backend locally (requires PostgreSQL)
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Run linter/formatter
ruff check .
ruff format .

# Run tests (when available)
pytest
```

### Frontend Development (document/UI)

```bash
cd document/UI

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

### Database

The backend uses **PostgreSQL** with **SQLAlchemy** ORM (async support via asyncpg).

**Connection String Format:**
```
postgresql+asyncpg://postgres:password@localhost:5432/triggerdb
```

**Docker Compose Database Credentials:**
- Host: localhost:5432
- Database: triggerdb
- User: postgres
- Password: password

**Database Schema:** See document/database/er.md for the complete ER diagram and table specifications. The schema includes:
- Core tables: users, daily_records, record_foods
- Master data: foods, weather_types, temperature_types, symptoms
- User customization: user_settings, custom_items

Note: Alembic migrations are not yet configured. Tables are currently created via `Base.metadata.create_all()` on startup (see main.py:startup event).

## Code Conventions

### Python (Backend)

- Use **async/await** for all database operations
- Database sessions obtained via dependency injection: `db: AsyncSession = Depends(get_db)`
- Models inherit from SQLAlchemy's `Base` class defined in database.py
- API endpoints follow RESTful conventions (see document/API/rest_api.md)
- Return JSON responses with consistent format:
  ```python
  {
    "status": "success" | "error",
    "data": {...} | "error": {"code": "...", "message": "..."}
  }
  ```

### Frontend (React)

- Use React 19.2+ with Vite
- ESLint configuration is already set up
- Component structure not yet defined

### Infrastructure Naming

All AWS resources follow the naming convention from document/infra/name.md:
```
{env}-{product}-{role}-{usage}
```

Examples:
- ECS service: `dev-trigs-api-mobile-backend`
- S3 bucket: `dev-trigs-tfstate`
- Product name: `trigs`

## API Endpoints (Current Implementation)

The backend currently has these endpoints implemented in main.py:

- `GET /` - Hello World test endpoint
- `GET /health` - Health check
- `GET /users` - Get all users
- `POST /users` - Create a user (params: name, email)

See document/API/rest_api.md for the full API specification including unimplemented endpoints.

## Key Application Features (From Design Docs)

1. **Daily Recording**: Users record symptoms (headache/allergy), sleep hours, weather, temperature, and foods consumed
2. **Calendar View**: Monthly calendar showing recorded days with symptom indicators
3. **Trigger Analysis**: Automatic pattern detection requiring minimum 7 days of data, recommended 30 days
4. **Custom Items**: Users can add custom weather/temperature/food items with emoji icons
5. **Notifications**: Daily reminder at configured time (20:00/21:00/22:00)

## Important Implementation Notes

- The current backend has only basic User CRUD operations implemented
- Most API endpoints from the specification (daily_records, analysis, custom_items, etc.) are NOT YET implemented
- Database models in models.py only include the User table; other tables from er.md need to be created
- The application uses emoji icons extensively for weather, temperature, food, and symptoms
- Analysis logic requires at least 7 days of records to provide meaningful results
- Frontend is currently a minimal React + Vite template; actual application screens are not implemented

## Running the Full Stack

```bash
# Start backend with PostgreSQL
cd backend
docker-compose up

# Backend will be available at http://localhost:8000
# PostgreSQL will be available at localhost:5432
```

Access the API documentation at http://localhost:8000/docs (FastAPI auto-generated Swagger UI).

## Design Philosophy

From document/APP/design.md, the application prioritizes:
- Simplicity for elderly users
- Large buttons and text
- Selection-based input (minimize keyboard usage)
- Consistent color coding (Orange=action, Green=result, Red=symptom present, Blue=symptom absent)
- Emoji-based visual language throughout the UI
