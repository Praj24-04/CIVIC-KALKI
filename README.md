# CIVIC-KALKI

A metadata-driven Civic Operating System. One generic engine (entities, forms, workflows, approvals, rules, audit, reports, AI); every civic module is configuration, not code.

- Plan and status: [`docs/PLAN.md`](docs/PLAN.md)
- Assessment behind the plan: [`docs/ASSESSMENT.md`](docs/ASSESSMENT.md)
- Demo click path: [`docs/DEMO_SCRIPT.md`](docs/DEMO_SCRIPT.md)

## Run locally

The project runs on one machine. Nothing is deployed.

### Prerequisites

- Node.js 20 or newer (with npm)
- Docker Desktop running, **or** your own Postgres 14+ (see "Switching database")

### Two commands

```bash
npm run setup
```

```bash
npm run dev
```

Then open <http://localhost:5173>.

`npm run setup` does everything a fresh clone needs:

1. creates `backend/.env` from `backend/.env.local.example` with a new JWT secret (an existing `.env` is left alone);
2. starts the local Postgres from `docker-compose.yml` if nothing is listening on the database port;
3. installs backend and frontend dependencies;
4. applies the database migrations;
5. seeds the modules, the demo accounts and the demo records.

`npm run dev` starts the backend (port 3000) and the frontend (port 5173) together. Ctrl+C stops both.

### Demo accounts

All use the password `Password123`. They are local demo accounts only.

| Role | Email | Notes |
|---|---|---|
| Citizen | `citizen@example.com` | Owns the seeded demo records |
| Area coordinator | `coordinator_area@example.com` | Assigned to **Kothrud**; can approve only Kothrud records |
| General coordinator | `coordinator_general@example.com` | Handles records with no area |
| Director | `director@example.com` | Second approval level |
| Admin | `admin@example.com` | Module Builder, user admin |

### Reset the demo data

```bash
npm run demo:reset
```

Empties every record table (entities, field values, files, audit, approval history, AI logs, Civic Buzz) and restarts their ids, keeps the modules, localities and users, then reseeds the demo records. Run it before each demo run-through.

The reset refuses to run against a Supabase database, and against any other remote database unless `--allow-remote` is passed to `backend/scripts/resetDemo.js`.

### AI features

AI is optional. Put a Gemini key in `GEMINI_API_KEY` in `backend/.env` and restart `npm run dev`. Without a key, or without a network, the AI features show their labeled fallbacks; see the "AI-down path" in [`docs/DEMO_SCRIPT.md`](docs/DEMO_SCRIPT.md).

### Switching database

The database is chosen by `DATABASE_URL` in `backend/.env`.

- **Local (default, used for the demo):** `postgresql://civic:civic@localhost:5432/civic_kalki`, served by `docker-compose.yml`. `npm run db:up` and `npm run db:down` start and stop it; `docker compose down -v` deletes its data.
- **Your own Postgres:** create an empty database, put its URL in `DATABASE_URL`, run `npm run setup`.
- **Supabase (backup):** use the Session Pooler URI as described in `backend/.env.example`, then run `npx prisma migrate deploy` in `backend/`. Do **not** run `npm run setup`, `npm run seed` or `npm run demo:reset` against a Supabase database that holds records you want to keep: the seed rebuilds the forms of the seven core modules, which deletes the field values of existing records in those modules.

### Tests

```bash
npm test
```

Runs the backend Jest suites against the database in `backend/.env`. They need the seeded database from `npm run setup`; no Gemini key is needed. The tests create and remove their own records.
