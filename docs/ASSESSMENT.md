# CIVIC-KALKI — Assessment

Date: 11 Nov 2026. Read-only review of the repository; no code was run (see "Could not verify").

**Context:** the project is demoed locally, not deployed. Deadline Sat 14 Nov 2026.

**Stack as found:** Express 5, Prisma 6, Postgres (Supabase session pooler), JWT in an httpOnly cookie, Gemini via `@google/generative-ai`, Jest + Supertest. Frontend is vanilla JS + Vite 5 with Leaflet, Chart.js and i18next.

## 1. Deliverable status

| # | Deliverable | Status | Evidence |
|---|---|---|---|
| 1 | Conversational assistant + metadata forms | **Mostly done** | `backend/services/agentFormFiller.js` (intent → collect → confirm; status lookup at :842), `backend/routes/form.js:284` schema endpoint, `frontend/src/pages/entityNew.js`, `agentChat.js`. Sessions are an in-process `Map` (:156), lost if the server restarts mid-demo. |
| 2 | Two-level approval → rule auto-creation, audit, notifications | **Partial** | Metadata workflow, area scoping, audit and approval history are in `backend/services/workflowEngine.js`. Rule firing is neither atomic nor idempotent (2.1). **Notifications are missing:** `NotificationRule` and `EmailTemplate` tables exist, nothing reads them. `ApprovalMatrix` is unused by the engine. |
| 3 | No-code Module Builder, seven seeded modules | **Done, with thesis leaks** | `backend/services/moduleBuilderService.js:181` deploys in one transaction; `backend/seed.js:196-615` defines exactly seven modules. Leaks: `'Civic Campaign'` is special-cased by name seven times in `backend/routes/entity.js`; `ruleEngine.js` hardcodes field keys `linked_movement_id`, `movement_id`, `reference_number`; Buzz and Meme have six dedicated tables and about 1,900 lines of bespoke routes. |
| 4 | AI layer: fail-closed, labeled, human-confirmed | **Partial** | Director report in `backend/services/aiSuggestion.js` fails with 502 and logs to `AIExecutionLog`; governance has a deterministic mode with `analysis_mode` labels; Buzz and Meme safety run deterministic checks first. Gaps: no timeout on any AI call, three different model names, and `frontend/src/pages/entityDetail.js:651` builds a templated "problem_summary" on the client that must never be shown as AI output. |
| 5 | Role dashboards, PDF/Excel, Civic Buzz | **Partial** | Per-role dashboards in `frontend/src/pages/dashboard.js:1216-1310`; Buzz with deduplicated events in `backend/routes/buzz.js`. **PDF and Excel export are missing:** no library, no endpoint. |
| 6 | 3D rule graph and ward activity, 2D fallbacks | **Missing** | No 3D or graph code. The data is already served: `GET /forms/metadata`, `GET /entities/:id/lineage`, `/reports/:id/execute`. |
| 7 | Fast, correct backend; professional frontend | **Partial** | Sections 2 and 4. |

## 2. Key-path findings

### 2.1 Transactions in approval and rule firing
- `workflowEngine.js:144-178`: status is read and validated outside the transaction, then written unconditionally. Two concurrent approvals both pass and both write history.
- `workflowEngine.js:218-225`: rules fire after commit and any failure is caught and logged. An entity can be `approved` with no linked entity and no record of the miss.
- `ruleEngine.js`: one transaction per rule, no link from child to source, no uniqueness. A retry, a double click or `POST /entities/:id/fire-rules` creates duplicates.
- `routes/entity.js:1009-1036`: lineage is rebuilt from `reason contains "source entity #5"`, which also matches #50–#59, and from `ParameterValue.value = "5"`, which matches any field holding 5.

### 2.2 Auth and RBAC
- No auth on `POST /entities/entity-types` and `POST /entities/rules` (`entity.js:116,148`), every POST in `routes/form.js`, `POST`/`PUT /entities/:id/values`, all of `routes/file.js`, and `POST /translate`. Anyone can add rules, edit form metadata, overwrite another citizen's values or delete files.
- `POST /entities` (`entity.js:234,309`) accepts a client-supplied `status`, so an entity can be created as `approved`, skipping both approval levels.
- `GET /entities` scopes citizens to their own rows but returns everything, with owner emails, to anonymous callers (`entity.js:360-386`). `GET /entities/:id/audit` returns actor emails with no auth. `limit` has no upper bound.
- Sound: cookie JWT pinned to HS256, role re-read from the database, login rate limiting, CSRF header and origin check, location-visibility sanitizing.

### 2.3 Query shape
- Each authenticated request loads the user up to four times: global `optionalAuth` (`index.js:74`), `verifyToken`, `checkRole`, then the engine.
- `GET /entities` runs an extra `entityType.findFirst('Civic Campaign')` on every call.
- `reportEngine.js:149` and `governanceIntelligence.js:62` load every entity of a type with all parameter values into memory.
- The director dashboard gets three counts by calling the full list endpoint three times (`dashboard.js:1307`).
- No index on `Entity.entity_type_id`, `WorkflowMaster.entity_type_id` or `EntityRelationshipRule(source_entity_type_id, event)`.

With demo-sized data these are noticeable only because every query is a round trip to a remote Supabase database.

### 2.4 Error handling
The central handler hides 5xx details (`middleware/errorHandler.js`). Weak spots: the swallowed rule-engine error, and AI calls with no timeout that hang the request when the network is poor.

### 2.5 Tests
11 Jest suites, about 5,000 lines, mostly integration tests against a live database. `.github/workflows/ci.yml` stops after `setup-node`, so CI installs nothing and runs nothing. No frontend tests. No concurrency test for approvals.

### 2.6 Demo readiness
- No one-command setup; the root `package.json` has no scripts and `README.md` is two lines.
- Demo accounts for all five roles exist in `backend/scripts/seed-demo-users.js` (shared password in the file). `backend/scripts/cleanAndSeedDemoData.js` cleans by name pattern but is not a full reset.
- Network dependencies at the venue: the Supabase database, Gemini, OpenStreetMap tiles (`frontend/.env.example`) and the translation service. Any of them failing on poor Wi-Fi breaks part of the demo; the database failing breaks all of it.

## 3. Stack review — default keep

| Layer | Verdict | Note |
|---|---|---|
| Frontend (vanilla JS + Vite) | Keep | No deliverable is blocked by it; a framework migration would touch about 12,000 lines. |
| 3D and visualization | Add `3d-force-graph` (brings three.js); keep Chart.js and Leaflet | Tier 3 only. |
| Backend (Express 5) | Keep | |
| ORM and database (Prisma 6, Postgres) | Keep | Same schema and seed run on Supabase or a local Postgres. |
| AI (Gemini) | Keep provider; change the call path | Change 1. |
| Runtime | Runs locally | Local disk uploads and in-memory sessions are acceptable for a local demo. |
| Testing (Jest + Supertest) | Keep; CI comes after Tier 2 | Change 2. |

**Change 1 — one `backend/services/aiClient.js` wrapper.**
Why: six services each build their own client with no timeout, and model names disagree. Evidence: `aiSuggestion.js:8`, `agentIntentRouter.js:123`, `governanceIntelligence.js:333`. Alternatives: patch a timeout into each file; migrate SDK now. Effort S. Migration risk low, since tests mock the SDK module the wrapper still imports. Rollback: revert the imports. Unlocks: a predictable AI-down path in the demo and one place to change model.

**Change 2 — CI that runs (after Tier 2).**
Why: nothing guards "existing tests keep passing" except running them by hand. Evidence: `ci.yml` ends at `setup-node`. Alternatives: pre-push hook only; unit-only CI with a mocked database. Effort S. Risk: needs a Postgres service container. Rollback: delete the job. Unlocks: safe changes after the demo. Until then, tests are run locally before each commit.

**Change 3 — local Postgres as a demo fallback.**
Why: a remote database on venue Wi-Fi is a single point of failure. Evidence: `backend/.env.example` points only at the Supabase pooler; `backend/db.js` sets 30 s connect and pool timeouts, so a bad network shows as long hangs. Alternatives: phone hotspot as the only backup; a recorded video of the flow. Effort S (a compose file with Postgres, an env example, the existing migrations and seed). Risk: Supabase-specific behaviour not reproduced locally; none was found in the schema or migrations read. Rollback: point `DATABASE_URL` back at Supabase. Unlocks: a demo that needs no network except for AI and map tiles.

## 4. Frontend findings

- All 18 pages are imported eagerly in `frontend/src/main.js`; the committed build is a single 640 KB script and 128 KB stylesheet. This does not matter on localhost.
- `style.css` has 67 token lines, but pages carry about 750 inline `style=` attributes (146 in `dashboard.js`, 125 in `governanceIntelligence.js`).
- `escapeHtml` is redefined per file and applied inconsistently across pages that build HTML strings.
- No `prefers-reduced-motion` rule.
- `backend/index.js` and `backend/services/governanceIntelligence.js` have encoding damage in comments (mojibake, BOM).

## 5. Could not verify

- Whether the tests pass today: this session had no `node_modules` and no database.
- Whether `gemini-1.5-flash` and `gemini-3.5-flash-lite` are still served, and the support status of `@google/generative-ai`.
- Whether any existing test relies on the unauthenticated routes in 2.2.
- Whether `frontend/dist` matches current source.
- Whether ward geometry exists; `JurisdictionMaster` has no coordinates.
- How `entityDetail.js:651` is labelled on screen.
- Anything measured: latency, query counts and frame rates are estimates from reading code.
