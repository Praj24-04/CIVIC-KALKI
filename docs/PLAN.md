# CIVIC-KALKI — Plan

Date: 11 Nov 2026. Deadline: **Sat 14 Nov 2026**. Evidence for every item is in `docs/ASSESSMENT.md`.

## Non-negotiables

- The metadata-driven thesis stays: new capabilities must not need new tables, pages or controllers.
- Existing tests keep passing. Tests are run locally before each commit.
- **Runs locally.** The project is demoed on one machine and is not deployed.
- Small reversible slices; no rewrite, no change of framework or language.

`CLAUDE.md` now says "Runs locally" (changed 11 Nov 2026).

## Status

| Tier | Slices | Status |
|---|---|---|
| 1 | DR1 | **Done** 11 Nov (see "DR1 notes") |
| 1 | B1 | **Done** 11 Nov: compare-and-set on status inside the transaction, 409 for the loser |
| 1 | B2 | **Done** 11 Nov: rules fire inside the approval transaction; children carry `source_entity_id` and `source_rule_id` (unique together) |
| 1 | S1 | **Done** 11 Nov |
| 1 | S2 | **Done** 11 Nov |
| 1 | A1 | **Done** 11 Nov: `services/aiClient.js`, 15 s timeout, retry on parse failure only, model from `GEMINI_MODEL` |
| 1 | A2 | **Done** 11 Nov: the client-built report is labelled "Deterministic summary — not AI output"; real reports are labelled "AI-generated". The no-key fallback now lists only the record's own fields (decision 7). **Tier 1 complete.** |
| 2 | R1 | **Done** 11 Nov: PDF and Excel built in the browser from the on-screen table, libraries loaded on click |
| 2 | N1, V1 (2D diagram and table) | Not started |
| — | T1 (CI) | Not started; after Tier 2 |
| 3 | V1 3D toggle, V2, everything else | Not started |

## Tier 1 — correctness and a demo that cannot fail

Recommended order: DR1 first (it gives every later slice a working local test loop), then B1, B2, S1, S2, A1, A2.

| ID | Slice | Depends on | Effort | Done when |
|---|---|---|---|---|
| DR1 | **Demo readiness** (below) | — | M | A fresh clone reaches a logged-in dashboard with one command |
| B1 | Idempotent approval: validate inside the transaction, write with `updateMany where {entity_id, status: previous}`, return 409 when nothing changed | DR1 | S | 20 parallel approvals give exactly 1 success and 1 `ApprovalHistory` row |
| B2 | Atomic, idempotent rule firing: pass the transaction into `checkAndFireRules`; link each child to its source and rule with a unique pair | B1, decision 1 | M | Re-firing 10 times creates no extra entity; a forced rule failure leaves the status unchanged |
| S1 | Require login and role on metadata mutations (entity types, rules, forms), ownership on values and files, login on translate; ignore client `status` on create | DR1, decision 2 | M | New tests: anonymous and citizen callers get 401/403 on each route; existing suites pass |
| S2 | Anonymous reads return only public approved items without emails; audit requires login; cap `limit` at 100 | S1 | S | No `email` key in any anonymous response |
| A1 | `services/aiClient.js`: 15 s timeout, one retry on parse failure only, model name from env | — | S | With the network off, every AI action returns its labeled fallback within 20 s |
| A2 | Confirm how the client-side templated report at `entityDetail.js:651` is labelled; label it "Deterministic summary" or remove it | — | S | No non-AI text appears under an AI label |

### DR1 — Demo readiness

1. **One-command setup from a fresh clone.** Root `package.json` scripts: `setup` (install backend and frontend, `prisma migrate deploy`, `seed`, demo users) and `dev` (backend and frontend together).
2. **Seeded demo accounts** for citizen, area coordinator, director and admin, reusing `backend/scripts/seed-demo-users.js`. The coordinator's `assignedArea` must match the area of the seeded demo entities so the approval chain works on the first try.
3. **Reset script** `npm run demo:reset`: removes all entities, values, audit, approval history, AI logs and Buzz rows, keeps metadata, then reseeds. Replaces the name-pattern cleanup in `cleanAndSeedDemoData.js`.
4. **README "Run locally"** section: prerequisites, the two commands, accounts, reset, switching database.
5. **`docs/DEMO_SCRIPT.md`**: the click path for each deliverable, with an **AI-down path** (unset the key or disconnect: the assistant points to the manual form, the director report shows the deterministic label, governance runs in deterministic-only mode).
6. **Verify in a fresh clone** in an empty directory, following only the README.

**DR1 notes (done 11 Nov 2026).** Test baseline before any change: 185 of 198 passing; after DR1: 198 of 198, with no Gemini key. Corrections to this plan found while doing it:

- The migrations did not reproduce the schema (`JurisdictionMaster`, `Entity` coordinates and jurisdiction, `EntityType.location_visibility`, `AIExecutionLog.analysis_type` had been applied with `db push`). Added `20261111000000_schema_catch_up`, written so it is a no-op where the change already exists.
- `npm ci` failed in `backend/` (lockfile out of sync) and `npm test` never exited (agent session timer). Both fixed.
- The tests depended on things only the shared database had: a Gemini key in the environment (Buzz suite now sets a dummy one; the SDK is mocked), the Civic Campaign module (`seedMeme.js`, now part of `seed:all`) and a "Kothrud" locality (now in `seedDemoData.js`). Test 3.13 read campaign impact anonymously although the route requires a moderator; it now signs in as admin.
- "Park Renovation Request" exists only in the shared database, not in `seed.js`; the demo records use Movement and Grievance.
- `seed.js` rebuilds the forms of the seven core modules on every run, which deletes the field values of existing records in those modules. It must not be run against a database whose records matter. The README says so; the reset script refuses Supabase hosts.
- AI-down today: the assistant does not point to the manual form (it answers "I'm not sure I understood that"). A1 must add that. The director report shows a client-built summary under an AI heading, which is A2.
- Not verified: the Docker path of `npm run setup` (no Docker daemon in the session that built it; the compose file passes `docker compose config`). Setup was verified against a Postgres already listening on localhost:5432.
- Tests leave behind entity types they create (for example `loc-auth-…-PublicType`); harmless, visible in the module list until the database is recreated.

**S1 notes (done 11 Nov 2026).** Metadata mutations (entity types, rules, forms, sections, subsections, parameters) need admin or director. Entity create, update and delete, values and file upload and delete need a signed-in caller; values and files also need the owner or a staff role, and an entity with no owner (for example one created by a rule) can be changed by staff only. No existing test relied on anonymous writes.

- Client `status` on create: the manual form sends `status: 'submitted'`, so ignoring it outright would leave every form submission as a draft. The server now starts every entity as `draft` and honours a requested status only if the module's workflow lets the caller move their own draft there. `approved` and the like are ignored.
- **`POST /translate` stays anonymous (decision 4).** The language selector is on the home, login and signup pages, so requiring login would silently switch off translation before sign-in. It changes no data.
- **View and click counters stay anonymous (decision 5):** (`POST /buzz/:id/event`, `POST /meme/campaigns/:id/event`) are anonymous by design, deduplicated, and covered by existing tests. They are the one exception to "every write requires login".
- For S2: uploaded files are readable by anyone through `GET /files/entity/:id`, `GET /files/:fileId` and the static `/uploads` path.

**S2 notes (done 11 Nov 2026).** Anonymous `GET /entities` returns approved records only, whatever filter is sent. Owner email goes only to staff and to the owner. Audit and lineage need login. Anonymous reads of values and files work only for approved records. `limit` is capped at 100. A test walks the public read endpoints and fails on any `email` key.

- Anonymous `GET /entities/:id` on a record that is not approved returns 404, the same answer as a missing record (decision 6). The two assertions in `locationAndAuth.test.js` that expected 200 were updated.
- Not changed: files under the static `/uploads` path are readable by anyone who has the file name (names carry a random suffix). Any signed-in citizen can still read any other citizen's record by id; the plan only scopes anonymous reads.

**Database and venue network.** If the database stays on Supabase, every request depends on venue Wi-Fi, and `backend/db.js` waits up to 30 s before failing. Smallest fallback: a `docker-compose.yml` with Postgres and a `backend/.env.local.example` whose `DATABASE_URL` points at it; the same migrations and seed run unchanged. Gemini, map tiles and translation still need a network, so the demo script covers them: AI-down path above, and the map shown only if tiles load.

## Tier 2 — the visible missing deliverables

| ID | Slice | Depends on | Effort | Done when |
|---|---|---|---|---|
| R1 | PDF and Excel export of any report, generated in the browser from the result already on the page (`jspdf` + `jspdf-autotable`, `write-excel-file`), loaded on click | — | S | Both files open with the same rows as the on-screen table |
| N1 | In-app notifications as a derived feed from `AuditLog` and `ApprovalHistory`, matched to `NotificationRule.notify_role`, shown in a header bell in `components/layout.js`; no new table | B1 | M | Citizen sees each status change; coordinator and director see items entering their queue |
| V1 (2D) | Rule and dependency graph as a layered SVG diagram plus a table of rules, from `GET /forms/metadata`, mounted in the Modules page | — | M | Deploying a module with a rule in Module Builder adds a node and an edge without a code change |

Alternatives considered for R1: server-side `pdfkit`/`exceljs` (needs a new controller); print stylesheet plus CSV (not a real Excel file).

**Then T1 — CI:** install, run backend tests against a Postgres service container, build the frontend. Effort S.

## Tier 3 — after the above is solid

| ID | Slice | Depends on | Effort | Priority |
|---|---|---|---|---|
| V1 (3D) | "View in 3D" toggle on the rule graph | V1 (2D) | M | Should |
| V2 | Civic activity across wards: chart and table first, then 3D columns | V1 (3D) | M | Should |
| B3 | One user lookup per request instead of up to four | — | S | Should if the database is remote, otherwise Could |
| B4 | Indexes on `Entity(entity_type_id, status)`, `WorkflowMaster(entity_type_id)`, rule `(source_entity_type_id, event)`; cache the campaign type id | — | S | Could |
| B7 | Lineage from the B2 source link instead of string matching | B2 | S | Should |
| F2 | Shared `escapeHtml`, utility classes replacing inline styles on the three heaviest pages, one loading/empty/error component | — | M | Should |
| F3 | Reduced-motion block, focus-visible styles, encoding cleanup | — | S | Should |
| B6 | Short in-process cache for form and module metadata | — | S | Could (only helps with a remote database) |
| B5 | Reports and governance: aggregate in the database instead of loading every row | — | M | Could (demo data is small; the benefit was memory on a small host) |
| F1 | Route-level code splitting | — | S | Could (no benefit on localhost; the 3D and export libraries are already loaded on demand inside V1 and R1) |
| M1 | Move the `'Civic Campaign'` and `linked_movement_id` special cases into metadata | B2 | M | Could |
| G2 | N-level approvals from `ApprovalMatrix` | B1 | M | Could |

### 3D design (V1 3D, V2)

No new pages: both are widgets declared by `DashboardMaster.display_type` and mounted in existing pages.

| | Rule and dependency graph | Civic activity across wards |
|---|---|---|
| Shows | Entity types as nodes (size = entity count, colour = domain); rules as directed edges (solid = auto-approve, dashed = pending); click opens the module | One column per ward: height = open items, colour = share awaiting approval; click filters the list |
| Data | Existing `GET /forms/metadata` | A `ReportMaster` row (group by area, count) through existing `/reports/:id/execute` |
| Lives in | Modules page | Director dashboard and Governance page |
| 2D fallback | The Tier 2 SVG diagram | Chart.js bar chart; Leaflet circles where coordinates exist |
| Accessible equivalent | Table of rules | Sortable table of wards and counts |

- **Library:** `3d-force-graph` for the graph (layout, picking and camera controls included), plain three.js, which it already brings, for the ward columns. Alternatives: deck.gl (needs a basemap and ward geometry the data does not have); react-three-fiber (would force a framework change).
- **Loading:** the 2D view always renders first. The toggle dynamically imports the 3D chunk.
- **Fallbacks:** 3D is offered only with WebGL available, viewport ≥ 768 px and reduced-motion off. Rendering pauses when the widget is off screen. The table stays in the DOM for screen readers.
- **Budget on the demo laptop:** 3D chunk loads in under 1 s, holds ≥ 30 fps, otherwise the toggle is hidden. Page interactions respond in under 200 ms.

## Dropped

| ID | Item | Reason |
|---|---|---|
| H1 | Uploads to Supabase Storage | Local disk is fine for a local demo |
| G1 | Persisting agent sessions across restarts | Was justified by cold starts |
| B8 | Response compression | No benefit on localhost |
| D1 | Framework or language migration | No deliverable is blocked by the current stack |
| D2 | Redis, job queue, websockets, email delivery | Not needed at demo scale |
| D3 | Server-side PDF/Excel; deck.gl ward map | New controllers or missing geometry |

## Realistic cut for Sat 14 Nov

Tier 1 and Tier 2 are roughly three working days in small slices. If time runs short, the order of sacrifice is: V2, V1 3D, then N1. Tier 1 is not cut.

## Decisions needed

1. **Schema for B2.** Add two nullable columns to `Entity` (`source_entity_id`, `source_rule_id`, unique together), no new table? Recommended: yes. Without it, idempotent rule firing, lineage and the graph all rest on matching text in audit rows.
2. **Anonymous access (S1, S2).** Recommended: every write requires login; anonymous visitors can read only public approved items, without emails. Any test that relied on anonymous writes is updated to log in first.
3. **Demo database.** Recommended: local Postgres as the primary on demo day, Supabase kept as the backup, both seeded from the same scripts.

## Working agreement

Added 11 Nov 2026 so that future sessions inherit it. The repository was checked against the assessed commit `21534dc`: the code is identical, and the Tier 1 file and line references in `docs/ASSESSMENT.md` hold.

### Context

- The project is NOT deployed. It is demoed locally on one laptop.
- Deadline: Saturday 14 November 2026.
- Stack (keep all of it): Express 5, Prisma 6, Postgres, JWT in an httpOnly cookie, Gemini via `@google/generative-ai`, Jest + Supertest; frontend is vanilla JS + Vite 5 with Leaflet, Chart.js and i18next.
- The assessment session ran nothing: no dependencies were installed and there was no database. Install, set up a database, and run the full test suite to get a baseline before the first code change.
- If the environment cannot run Postgres or reach npm, say so and stop. Do not mock the database to get green. Never run reset or destructive scripts against the Supabase database.
- Secrets (`DATABASE_URL`, Gemini key) come from environment variables. Never ask for them in chat and never commit them.

### Non-negotiables

- The metadata-driven thesis stays: new capabilities must not need new tables, pages or controllers unless justified in writing first.
- Existing tests keep passing. Run the tests locally before every commit. Never skip, disable or weaken a test to get green.
- Runs locally.
- No rewrite and no change of framework or language.
- AI output is fail-closed, labeled AI vs deterministic, and humans confirm consequential actions.
- No secrets in the repo.
- Small reversible slices: one slice per commit, pushed after each. Update the status table in this file when a slice is done.
- Do not open a pull request unless asked.

### Do not do

- H1 (uploads to cloud storage), G1 (persisting agent sessions), B8 (response compression): dropped.
- B5, B6 and F1 are Could only; do not start them before Tier 2 is finished.
- No Redis, job queue, websockets, email delivery, server-side PDF/Excel, deck.gl, React or TypeScript.
- Nothing justified only by hosting, cold starts or memory limits.

### Decisions

1. **B2 schema:** add two nullable columns to `Entity` (`source_entity_id`, `source_rule_id`, unique together). No new table. APPROVED.
2. **Anonymous access:** every write requires login; anonymous visitors can read only public approved items, without emails. Tests that relied on anonymous writes are updated to log in first. APPROVED.
3. **Demo database:** local Postgres is the primary for the demo; Supabase is the backup; both use the same migrations and seed. APPROVED.
4. **Translate:** `POST /translate` stays anonymous, because the language selector runs on the home, login and signup pages. APPROVED 11 Nov.
5. **Anonymous counters:** the Buzz and Meme view and click counters stay anonymous; they are the one exception to decision 2. APPROVED 11 Nov.
6. **Anonymous detail read:** `GET /entities/:id` returns 404 to anonymous visitors unless the record is approved. APPROVED 11 Nov.
7. **Deterministic report fallback:** with no AI key the director report lists only the record's own fields; the fixed "root cause", "risk" and "recommendation" text is removed. APPROVED 11 Nov.
