# Game Dev OS – Architecture

## Architecture Goal

Game Dev OS should be built as a modular, scalable web application.

The product will start small, but the structure must support future modules such as playtests, tasks, bugs, design docs, budgets, milestones, AI assistance, and community features.

---

# Tech Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- App Router

## Backend / Data

- Supabase Postgres
- Supabase Auth
- Supabase Storage

## Deployment

- Vercel

## AI

- OpenAI API later
- AI is not part of the first MVP build

---

# Core Product Structure

Game Dev OS is organised around Projects.

A project represents one game.

Each project can contain:

- Playtests
- Feedback
- Tasks
- Bugs
- Builds
- Design Docs
- Milestones
- Team members
- Budget data
- AI summaries

Projects are the centre of the platform.

---

# Application Modules

## Public Website

Pages:

- Landing page
- Login
- Signup

Purpose:

Introduce the product and allow users to access the app.

---

## App Dashboard

Pages:

- Main dashboard
- Project list
- Recent activity
- Quick actions

Purpose:

Give users a high-level overview of their development work.

---

## Project Workspace

Pages:

- Project overview
- Playtests
- Tasks
- Bugs
- Builds
- Design Docs
- Team
- Settings

Purpose:

Provide one connected workspace for each game.

---

## Playtest Module

Purpose:

Help teams record, organise, and analyse playtest sessions.

Contains:

- Session details
- Test goals
- Notes
- Observations
- Feedback categories
- Severity levels

---

## Task Module

Purpose:

Turn feedback and issues into actionable work.

Contains:

- Todo
- In Progress
- Done
- Priority
- Assignment
- Linked feedback

---

## Bug Module

Purpose:

Track technical and design issues found during development.

Contains:

- Bug title
- Description
- Severity
- Status
- Related build
- Screenshot attachment later

---

# Folder Structure

```text
app/
  page.tsx
  layout.tsx

components/
  ui/
  layout/
  dashboard/
  projects/
  playtests/
  tasks/

data/
  mock-data.ts

lib/
  utils.ts
  supabase.ts

types/
  index.ts

docs/
  PRODUCT_VISION.md
  MVP.md
  ROADMAP.md
  ARCHITECTURE.md
  DATABASE.md
  DESIGN_SYSTEM.md
  CODING_GUIDELINES.md
  CHANGELOG.md
  DEVELOPMENT_LOG.md