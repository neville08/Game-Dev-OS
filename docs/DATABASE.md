# Game Dev OS – Database Plan

## Database Philosophy

Game Dev OS will use Supabase Postgres as its main database.

The database should be designed around projects, because each game project is the centre of the workspace.

The first version will use mock data. Supabase will be connected only after the UI and user flows are clear.

---

# Core Tables

## users

Stores user profile information.

Fields:

- id
- email
- full_name
- avatar_url
- created_at

---

## teams

Stores teams or studios.

Fields:

- id
- name
- description
- created_at

---

## team_members

Connects users to teams.

Fields:

- id
- team_id
- user_id
- role
- created_at

Roles:

- owner
- admin
- member
- viewer

---

## projects

Stores game projects.

Fields:

- id
- team_id
- name
- description
- genre
- engine
- status
- current_build_id
- created_at
- updated_at

---

## builds

Stores project build versions.

Fields:

- id
- project_id
- version
- notes
- release_date
- created_at

---

## playtest_sessions

Stores playtest events.

Fields:

- id
- project_id
- build_id
- title
- date
- objective
- notes
- created_at

---

## feedback_entries

Stores feedback from playtests.

Fields:

- id
- playtest_session_id
- category
- severity
- description
- suggested_fix
- created_at

Categories:

- fun
- clarity
- balance
- bugs
- materials
- map_control
- controls
- performance

Severity:

- low
- medium
- high
- critical

---

## tasks

Stores actionable work.

Fields:

- id
- project_id
- feedback_entry_id
- title
- description
- priority
- status
- assigned_to
- created_at
- updated_at

Statuses:

- todo
- in_progress
- done

Priorities:

- low
- medium
- high
- critical

---

## bugs

Stores bugs and technical issues.

Fields:

- id
- project_id
- build_id
- title
- description
- severity
- status
- steps_to_reproduce
- created_at
- updated_at

---

# Future Tables

These are not part of the MVP but may be added later.

## design_documents

For GDDs, LDDs, mechanics, systems, and narrative docs.

## milestones

For sprint planning and production timelines.

## budgets

For project costs, expenses, funding, and revenue planning.

## publisher_contacts

For publisher research and pitching.

## ai_summaries

For AI-generated summaries of playtests, tasks, bugs, and design docs.

---

# Relationships

A team has many users.

A team has many projects.

A project has many builds.

A project has many playtests.

A playtest has many feedback entries.

Feedback entries can become tasks.

Tasks belong to projects.

Bugs belong to projects and can be linked to builds.

---

# MVP Database Priority

When Supabase is added, build the database in this order:

1. users
2. teams
3. team_members
4. projects
5. builds
6. playtest_sessions
7. feedback_entries
8. tasks
9. bugs

---

# Database Principle

Design the database around real workflows, not around features.

The main workflow is:

Project → Build → Playtest → Feedback → Task → Improvement