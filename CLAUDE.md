# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Plan & Review

### Before starting work
- Always use plan mode to make a plan
- After getting the plan, make sure you write the plan to .claude/tasks/TASK_NAME.md
- The plan should be a detailed implementation plan and the rationale behind it as well as tasks broken down
- If the tasks require external knowledge or certain packages, also research to get latest knowledge (Use Task Tool for research)
- Don't over plan. Always think MVP
- Once you write the plan, first ask me to review it. Do not continue until I approve the plan.

### While implementing
- You should update plan as you work
- After completing tasks in plan you should update and amend detailed descriptions of the changes you made so following tasks can be easily handed over to engineers

## Important Instruction Reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.


## Project Overview

This is a React-based web application for "Rayze" - an AI-first recruiting platform that uses the "Lynx AI" system. Rayze is disrupting the traditional IT recruiting industry by replacing fragmented agency models with AI-driven agents that automate the entire hiring process.

### Business Model
Rayze operates as an AI-powered recruiting engine and talent marketplace focused on IT hiring. The platform features multiple specialized AI agents:
- **Recruiting Agent**: Creates job descriptions, generates candidate skill reports, conducts outreach
- **Technical Testing Agent**: Implements cheat-proof video-based coding tests, psychological assessments
- **Financials Agent**: Handles margins, invoicing (receivables/payables), payments
- **Client Reporting Agent**: Provides candidate matching, skill gap analysis, coding fluency reports
- **AI Passive Matching Agent**: Uses AI-driven feature engineering for predictive candidate matching
- **Talent Scheduling Agent**: Coordinates interviews between clients and candidates

### Market Position
- Targets the $40B IT recruiting TAM (Total Addressable Market)
- Addresses a highly fragmented market with 26K+ recruiting agencies
- Solves problems of slow, opaque, time-consuming recruiting processes
- Provides higher quality hiring with measurable candidate assessments

## Development Commands

### Frontend (React)
- **Start development server**: `npm start` (uses legacy OpenSSL provider due to dependency requirements)
- **Build for production**: `npm run build`
- **Run tests**: `npm test` (interactive watch mode)
- **Eject configuration**: `npm run eject` (one-way operation - not recommended)

### Backend Services
- **Main API Server**: Located in `~/py/genAi/recruitBot/main_techops.py` (FastAPI)
- **Email/Calendar Service**: Located in `~/py/genAi/sendmail/sendmail.py` (FastAPI)
- **Start main API**: `uvicorn main_techops:app --reload` (from recruitBot directory)
- **Start email service**: `uvicorn sendmail:app --reload --port 8888` (from sendmail directory)

## Architecture

### Full-Stack Architecture
This is a **React frontend + Python FastAPI backend** system supporting the Rayze AI recruiting platform.

### Frontend Structure (React)
- **React 18** with Create React App foundation
- **React Router v6** for navigation with comprehensive routing in `src/App.js`
- **SCSS** for styling with component-specific stylesheets
- **Framer Motion** for animations

### Backend Structure (Python FastAPI)
**Main API Server** (`~/py/genAi/recruitBot/main_techops.py`):
- **FastAPI** framework with SQLAlchemy ORM
- **JWT authentication** with OAuth2 password bearer tokens
- **Multiple AI model support**: OpenAI (default), Claude (Anthropic), Grok (X.AI)
- **Database models**: Candidates, Clients, Transactions, Cashflows, Invoices, Users, OpenRoles
- **File upload/storage** integration with cloud storage
- **PDF processing** with PyPDF2 for resume parsing
- **AI evaluation system** for candidate testing and matching
- **CORS** configured for frontend integration

**Email/Calendar Service** (`~/py/genAi/sendmail/sendmail.py`):
- **FastAPI** microservice for communication workflows
- **Google Calendar API** integration for interview scheduling
- **Gmail API** for automated email communications
- **Google Meet** integration with auto-transcription and AI summary
- **OAuth 2.0** authentication for Google services
- **Timezone conversion** utilities for global scheduling

### Key Frontend Directories
- `src/pages/` - Page components organized by feature (LandingPage, Dashboard, Clients, etc.)
- `src/components/` - Reusable UI components (CollectionTable, Document, etc.)
- `src/layouts/` - Layout components (Header, Footer, Layout wrapper)
- `src/config/` - Configuration files (API endpoints, app configuration)
- `src/utils/` - Utility functions
- `src/assets/styles/` - Global styles and SCSS files


### Key Features
- **AI Agent Management**: Platform manages multiple specialized AI agents for end-to-end recruiting
- **Candidate Management**: Submit candidates, manage open roles, candidate testing and evaluation
- **Interview Coordination**: Schedule and confirm interviews between clients and candidates
- **Invoice System**: Generate and render invoices with PDF export for recruiting services
- **Client Stories**: Showcase success stories (Story1-Story6) demonstrating platform effectiveness
- **Dashboard & Console**: Administrative interfaces for managing the recruiting pipeline
- **Reporting**: Detailed candidate match reports, skill assessments, and hiring analytics

### Styling Approach
- Component-scoped SCSS files following naming convention: `component-name.scss`
- Global styles in `src/assets/styles/`
- Responsive design patterns


### Route Structure
The application has extensive routing supporting the AI recruiting platform:
- **Public pages**: `/` (landing), `/team`, `/accel`, `/clients`, `/policy`
- **Authentication**: `/login`, `/register`
- **Core platform**: `/dashboard`, `/candidates`, `/open_roles`, `/console` (Rayze Console)
- **Invoice system**: `/invoice`, `/select_invoice`, `/render_invoice/:id_str`
- **Client stories**: `/story1` through `/story6` (showcase recruiting success stories)
- **Interview management**: `/confirm/:interview_id`, `/confirm_timeslot/:interview_id/:slot?`
- **Work orders**: `/work_order/:workOrderId` (work order management)
- **Candidate workflow**: `/submit_candidates` (submit candidates to the platform)

### Platform Architecture Notes
- **Microservices approach**: Frontend communicates with multiple FastAPI backend services
- **AI-driven workflow**: Backend integrates with multiple LLM providers for candidate evaluation and matching
- **Communication automation**: Sendmail service handles all email/calendar operations via Google APIs
- **Database management**: SQLAlchemy models handle candidates, clients, transactions, and invoicing
- **Authentication**: JWT-based auth system with token expiration management
- **File processing**: PDF resume parsing and cloud storage integration
- **CORS configuration**: Both backend services configured to accept requests from React frontend

### Environment Variables Required
- `RAYZE_HOST`, `RAYZE_LOCALHOST` - Frontend/backend coordination
- `RAYZE_MODEL` - AI model selection (OPENAI/CLAUDE/GROK)
- `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GROK_API_KEY` - LLM API keys
- `RAYZE_KEY` - JWT secret key
- `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET` - Google OAuth credentials
- `REACT_APP_SENDMAIL_FROM`, `REACT_APP_SENDMAIL_CC_CLIENT`, `REACT_APP_SENDMAIL_CC` - Email configuration
- Database connection strings for SQLAlchemy