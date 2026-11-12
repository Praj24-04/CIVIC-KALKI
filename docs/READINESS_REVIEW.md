# CIVIC-KALKI — Product-readiness review

Date: 12 Nov 2026. Branch `claude/beautiful-shannon-docbgm` at `1eb2a67`. Demo: Sat 14 Nov 2026.

No code was changed for this review. Nothing was fixed; every bug found is listed here.

## How it was tested

- The app was run with `npm run dev` on a local Postgres, after `npm run demo:reset`, with no Gemini key.
- Every journey was driven through the real pages in a headless Chromium browser: typing into forms, clicking buttons, confirming dialogs, reading what the page showed.
- Access rules were also probed directly against the running API as seven callers: anonymous, the citizen who owns the records, a second citizen created through the signup page, and the four staff roles.
- The Docker path was run for real in a fresh clone, with the local Postgres stopped.
- A result is PASS only where the browser showed the expected behaviour. Passing unit or integration tests were not counted.

## Summary

| # | Journey | Result | Blocker for Saturday? |
|---|---|---|---|
| 1 | Citizen complaint, submission to final approval | **PASS**, with gaps | No, if the demo follows the script |
| 2a | Area coordinator approval | **PASS** | No |
| 2b | General coordinator approval | **FAIL** as a product journey; the approval itself works | No, if the general coordinator is left out of the demo |
| 3 | Director dashboard, ward activity, reports, exports | **PASS**, two reports are wrong | No, if those two reports are not opened |
| 4 | Admin Module Builder, rule, graph, citizen form | **PASS** | No |
| 5 | Notifications per role, links to records | **PASS**, noisy for director and admin | No |
| 6 | Privacy and role-based access | **FAIL** on privacy; **PASS** on who may change what | No for the demo; yes before any real use |
| 7 | GitHub Actions | **NOT VERIFIED** — no run exists | No |
| 8 | Docker setup | **PASS** on Linux; **NOT VERIFIED** on the demo laptop | Rehearse once on the laptop |
| 9 | Real Gemini integration | **NOT VERIFIED** — no key available; fallbacks **PASS** | **Yes, until tested with a real key** |

**The one item that can break the demo is 9.** Every AI feature has only ever been exercised here with no key or an invalid key. Whether the configured model name is accepted by Google is unknown.

## 1. Citizen complaint journey — PASS, with gaps

**Tested.** As `citizen@example.com`: opened *Start a Civic Initiative*, chose *Report a Civic Problem*, tried to submit the empty form, then filled title, details, category, severity, reporter name, attached a photo, picked India → Maharashtra → Pune → Kothrud, added an address and submitted. Opened the record, then followed it as the area coordinator and the director, and came back as the citizen.

**Expected.** The empty form is refused; the complaint is saved as submitted with all values and the photo; it moves submitted → coordinator approved → approved; each step is in the activity log; the citizen is told of each change.

**Result.** All of that happened. The empty form did not submit. The record page showed every value, the attachment name, area and address. The coordinator saw *Verify & Recommend Approval* and *Reject Request*, a confirmation dialog appeared, and the status changed. The director saw *Executive Approval (Director)* and approved. The activity log listed three steps with the right actor names and times. The citizen's bell listed both changes and the record showed *Approved & Active*.

**Bugs and gaps.**

| Finding | Blocker? |
|---|---|
| **There is no resolution step.** A complaint ends at "Approved & Active". Nothing records that the problem was fixed, by whom, or when; no role has any further action. "Final resolution" today means "approved". | No. Say "approved" in the demo, not "resolved". |
| **A complaint can get stuck for ever.** Only *Country* is required in the location picker. A complaint submitted with only "India" selected gets area "India". The area coordinator is refused (wrong area), the general coordinator is refused (area is not empty), and the director cannot act on a submitted record. No role had any action on it. | No, if the demo always picks a ward. Real bug. |
| **A rejected complaint is a dead end.** The citizen has no action to correct and resubmit, and the rejection reason is shown only inside the activity log tab, not on the page. | No. |
| The empty-form refusal relies on the browser's own "fill in this field" bubble; the page shows no message of its own. | No. |
| The page header reads "Start a Civic Initiative" while filing a complaint, and the record page says "My Requests" to staff. | No. Cosmetic. |

## 2. Coordinator journeys

### 2a. Area coordinator — PASS

**Tested.** As `coordinator_area@example.com` (assigned to Kothrud): opened the new complaint from the bell, approved it; opened a Shivajinagar complaint; rejected a Kothrud complaint first with no reason and then with one.

**Expected.** Can act only on Kothrud records; a rejection needs a reason; the citizen sees the outcome.

**Result.** As expected. The Shivajinagar record showed no approve or reject button, and the API also refuses it. Rejecting with no reason gave "Reason is required for rejection" and changed nothing. With a reason the status became *Rejected* and the citizen's bell said so.

**Bugs and gaps.**

| Finding | Blocker? |
|---|---|
| **The "Cases Queue" is not a queue.** It listed all 20 records in the system, including other wards and the 18 simulated donation transactions, not the records waiting for this coordinator. The dashboard and the bell are correctly scoped; the list page is not. | No. Use the bell or the dashboard in the demo. |
| The coordinator can open and read records of every other ward (see 6). | No. |

### 2b. General coordinator — FAIL as a journey

**Tested.** As `coordinator_general@example.com`: dashboard, bell, queue, and every record created through the form. Then a complaint with no area was inserted directly into the database (the form cannot produce one) and approved through the page.

**Expected.** The general coordinator handles complaints that have no ward.

**Result.** With that prepared record the journey works: it appeared in the bell as "waiting for your review", the link opened it, *Verify & Recommend Approval* worked, and the area coordinator had no action on it.

**Bug.** **Nothing a citizen can do in the app produces a record for the general coordinator.** The form always sets an area (at least the country name), and "India" is not "unassigned". After a normal demo the general coordinator's bell is empty and no record offers them an action. Blocker: no, provided this role is not part of the demo. It is the same root cause as the stuck complaint in section 1.

## 3. Director dashboard, ward activity, reports, exports — PASS, two reports wrong

**Tested.** As `director@example.com`: the dashboard figure and queue; the ward widget for both reports, checked against the database; selecting a ward; all eight reports on *Civic Reports*, each exported to PDF and Excel and the files opened; the report button on a record page; the Governance Intelligence page.

**Expected.** Figures match the data; a ward opens its records; every report shows correct rows; both files open with the rows on screen.

**Result.** The pending-approval figure (3) matched the database. Ward totals and "waiting" counts matched the database for both reports. Selecting a ward opened a list filtered to it. Six reports were correct and exported correctly (PDF text and Excel cells matched the screen; numbers are numeric in Excel). Governance Intelligence loaded with the label "DETERMINISTIC ENGINE ONLY".

**Bugs.**

| Finding | Blocker? |
|---|---|
| **"Unreconciled Transactions" is wrong.** It showed 18 rows, each "Zone … / 0". The database has 8 unresolved transactions. The report engine ignores this report's filter, and the page can only draw grouped counts, so a list-type report comes out as nonsense. | No, if it is not opened. Do not run it in the demo. |
| **"Governance Exception Config" is listed as a report.** It is a configuration row, not a report; running it shows the same 18 meaningless rows. | No, if it is not opened. |
| The filtered record list does not say which ward it is filtered to. | No. |
| The ward widget has no 3D columns (planned as part of V2) and is not on the Governance page. | No. |

## 4. Admin Module Builder — PASS

**Tested.** As `admin@example.com`, entirely through the six-step wizard:

1. Deployed "Streetlight Audit" with a rule "on approved → create a Grievance".
2. Opened *Modules & Capabilities*: the diagram went from 9 boxes and 1 arrow to 10 boxes and 2 arrows, and the rule appeared in the table.
3. As the citizen, the new module was in the form's list; submitted a record in it.
4. Approved it as coordinator and director. The rule fired: the record page showed "triggered 1 related civic record", linking to "… - Grievance".
5. Deployed a second module, "Tree Planting Request", with an added number field "Number of saplings"; the citizen form showed that field.

**Expected.** A module, its form, workflow, rule and report exist and work with no code change.

**Result.** As expected. The new module also got its own report ("Streetlight Audits by Area") on the record page.

**Bugs and gaps.**

| Finding | Blocker? |
|---|---|
| **A record created by a rule cannot be acted on by anyone.** It is created with status "pending", which no workflow has a step for. Citizen, both coordinators, director and admin all had no action on it. The headline automation produces a record that then sits there. | No for showing that it is created. Do not try to process the created record in the demo. Real gap. |
| The wizard's default "Area" field offers fixed choices ("Sector 5", "Pune North" …) that are not the real localities; the citizen form ignores it and uses the location picker, so it has no effect. | No. |
| Deployed modules cannot be edited or removed from the app. A test module deployed during rehearsal stays in the module list and the diagram until the database is rebuilt (`npm run demo:reset` keeps modules). | No. Rehearse on a database you will rebuild, or accept the extra module. |

## 5. Notifications — PASS

**Tested.** The bell for all five seeded roles and for a brand-new citizen, after the journeys above. For each role, one entry of each kind was clicked and the page it opened was compared with the record named in the message.

**Expected.** Each role sees only what concerns it; every entry opens the right record.

**Result.**

| Role | What the bell showed | Links |
|---|---|---|
| Citizen (owner) | Every status change on their own records, and the record created by the rule | Correct |
| New citizen | Nothing | — |
| Area coordinator | Only Kothrud records waiting for review; entries disappeared once acted on | Correct |
| General coordinator | Nothing, until an unassigned record existed (see 2b) | Correct |
| Director | Records waiting for final approval; linked records | Correct |
| Admin | Same as director | Correct |

**Bugs and gaps.**

| Finding | Blocker? |
|---|---|
| **Director and admin bells are noisy.** 14 "needs your review" entries, most of them the simulated donation transactions, so the badge always reads "9+". | No. Cosmetic in the demo. |
| "Read" state is kept in the browser only, so the count resets on another device or browser. | No. By design (nothing is stored). |
| No email or push delivery. | No. Out of scope by decision. |

## 6. Privacy and role-based access

### Who may change what — PASS

Checked for all seven callers against the running API. Anonymous callers got 401 on every write. Citizens got 403 on every admin action, on other citizens' records, and on rule firing. Only the matching coordinator could approve a submitted record; only director and admin could give final approval. Only admin could list users, change roles or add localities; only admin and director could create modules, rules, forms and reports or read the governance configuration. In the browser, a citizen who typed `/admin`, `/module-builder` or `/governance` was sent back to the dashboard.

### Privacy — FAIL

| Finding | Seen how | Blocker? |
|---|---|---|
| **Any signed-in citizen can read any other citizen's complaint.** A second citizen, created through the signup page, opened complaint #28 by its address and saw the description, the reporter's name and the attachment. The API also returned the values and audit trail of a complaint that was still only submitted. | Browser and API | No for the demo. **Yes before real citizens use it.** |
| **Approval makes a complaint's contents public.** Once approved, anyone who is not signed in can read its field values (which include reporter name, phone and email when filled in), list its files and download them. | API, anonymous | No for the demo. Yes before real use. |
| **Uploaded files are public by file name** through `/uploads/…`, for any record in any status. | API, anonymous | No for the demo. |
| **The audit trail shows staff email addresses** to the citizen who owns the record, and to any other signed-in citizen. | API | No. |
| **Coordinators see every ward.** Both coordinators could list all 32 records and read any of them, with the owner's email. | Browser and API | No. |
| Staff of any ward can rename any record. | API | No. |

What does hold: anonymous visitors get approved records only, never an email address, and 404 for anything not approved; a citizen's own list shows only their own records; owner email goes only to staff and the owner.

## 7. GitHub Actions — NOT VERIFIED

**Investigated.** The workflow file is on both `main` and the working branch, and commits have been pushed since it was rewritten. The repository's Actions API returns **no workflows at all** and **no runs, ever**; asking for `ci.yml` by name returns 404.

**What that means.** A workflow file that exists but is not registered, on a fork that has never had a run, is what GitHub shows when **Actions has not been enabled on the fork**. GitHub disables workflows on a fork until its owner allows them.

**What needs enabling** (the repository owner, in the browser):

1. Open the fork → **Actions** tab. If there is a banner "Workflows aren't being run on this forked repository", choose **I understand my workflows, go ahead and enable them**.
2. If there is no banner: **Settings → Actions → General → Actions permissions → Allow all actions and reusable workflows**, then save.
3. Push any commit to the branch. The workflow runs on every push; commits pushed before enabling do not run retroactively.

This could not be done or confirmed from this session, which has no access to repository settings. The same steps the workflow runs (clean install, migrate, schema check, seed, tests) were run locally on an empty database: 242 of 242 tests passed. Blocker: no.

## 8. Docker setup — PASS on Linux

**Tested.** With the local Postgres stopped and nothing on port 5432: a fresh clone into an empty directory, then `npm run setup` and `npm run dev`, following only the README.

**Expected.** Setup creates `.env`, starts Postgres in Docker, installs, migrates and seeds; the app runs.

**Result.** Setup finished in 27 seconds with the image already downloaded. It created `backend/.env`, reported nothing listening, started the `postgres:16` container and waited until it was healthy, then installed, migrated and seeded. All five roles logged in through the browser. On that database: 242 of 242 tests passed, `npm run demo:reset` worked, and the data was still there after `npm run db:down` and `npm run db:up`.

**Remaining manual setup.**

- Docker Desktop (or Docker Engine) must be **installed and running** before `npm run setup`. Setup does not install or start it.
- The first run downloads the `postgres:16` image, so it needs a network once. Do this before the venue.
- Port **5432** must be free, or already be a Postgres the `.env` points at. Another Postgres on that port with different credentials makes the migration step fail.
- Node.js 20 or newer must be installed.
- For AI: put a Gemini key in `backend/.env` by hand (section 9).

**Not verified.** Windows and macOS. The scripts have Windows branches (`npm.cmd`, shell spawning) that have never been run. If the demo laptop is not Linux, run the two commands on it once before Saturday.

## 9. Gemini and fallbacks

### Real integration — NOT VERIFIED

No Gemini key is available in this environment, and none has been at any point in this work. **No AI feature has ever been seen producing a real answer**: not the assistant filling a form, not the director's report, not Civic Buzz captions or its safety check.

One thing was established: with a deliberately invalid key the server does reach Google, which answered "API key not valid". Google rejects the key before it looks at the model name, so **whether `gemini-3.5-flash-lite` is a model Google will serve is still unknown**. If it is not, every AI call fails even with a good key. The model can be changed without code through `GEMINI_MODEL` in `backend/.env`.

**Blocker: yes, until done.** Before Saturday, on the demo laptop: put the real key in `backend/.env`, restart, and try the assistant, the director's report and one Civic Buzz post. If they fail, read the backend log for the model error and set `GEMINI_MODEL`.

### Fallbacks — PASS

**Tested** in the browser, once with no key and once with an invalid key (a real failed call to Google).

| Feature | No key | Invalid key (call fails) |
|---|---|---|
| Assistant | Within 2 s: "The AI assistant is unavailable right now … This is an automatic message, not an AI answer", with directions to the manual form | Same message, within 2 s |
| Director report | Card relabelled "Deterministic summary — not AI output", badge "Not AI", lists the record's own fields | "AI Analysis failed: An unexpected server error occurred." No report, nothing invented |
| Governance Intelligence | "DETERMINISTIC ENGINE ONLY" | Same |

**Gaps.**

| Finding | Blocker? |
|---|---|
| With a key but a failing network, the director sees an error, not the deterministic summary. Fail-closed and honest, but less useful on stage than the no-key behaviour. | No. If the venue network is poor, remove the key and demo the no-key path. |
| Creating a Civic Buzz post was opened but not completed; its refusal without AI is confirmed at the API (422, "Content safety check is temporarily unavailable"), not by clicking through all five steps. | No. |
| Translation and map tiles were not tested. | No. Stay in English; show the map only if tiles load. |

## What to do before Saturday

1. **Test with a real Gemini key on the demo laptop** (section 9). This is the only open item that can stop a planned part of the demo.
2. Run `npm run setup` and `npm run dev` once on the demo laptop, with the network on, so the Postgres image is downloaded.
3. In the demo: always pick a ward (Kothrud); say "approved", not "resolved"; do not open "Unreconciled Transactions" or "Governance Exception Config"; do not try to process the record a rule creates; leave the general coordinator out.
4. Enable Actions on the fork when convenient (section 7).

## Bugs found, in order of importance

| # | Bug | Section |
|---|---|---|
| 1 | Any signed-in citizen can read any other citizen's complaint, values and audit trail | 6 |
| 2 | Approved complaints expose reporter contact fields and attachments to anonymous visitors | 6 |
| 3 | A complaint with only a country (or state, or city) selected can never be approved by anyone | 1, 2b |
| 4 | Records created by a rule have a status no workflow handles; nobody can act on them | 4 |
| 5 | No resolution or closing step after approval | 1 |
| 6 | Nothing reachable in the app gives the general coordinator any work | 2b |
| 7 | "Unreconciled Transactions" shows wrong data; a configuration row is listed as a report | 3 |
| 8 | The coordinators' "Cases Queue" lists every record in the system | 2a |
| 9 | Rejected complaints cannot be corrected and resubmitted; the reason is hard to find | 1 |
| 10 | Director and admin notification bells are flooded by simulated donation records | 5 |
| 11 | Uploaded files are public by file name | 6 |
| 12 | With a key but no network, the director report shows an error instead of the deterministic summary | 9 |

Bugs 10 and 12 come from work on this branch (the notification bell and the AI fallback changes). The others were already in the application; 3, 4, 6 and 7 were not known before this review.
