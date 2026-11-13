# Role matrix

Who may do what, for the rules that are enforced per role. Every rule here is enforced on the backend; the UI only hides what the backend would refuse.

Roles: `citizen`, `coordinator_area`, `coordinator_general`, `director`, `admin`.

## Civic Reports card on the record page

| Action | Citizen | Area coordinator | General coordinator | Director | Admin |
|---|---|---|---|---|---|
| See the "Civic Reports" card and its Execute buttons on a record | No | No | No | Yes | Yes |

The card is rendered by `frontend/src/pages/entityDetail.js` only for director and admin.

## Governance Intelligence

| Action | Citizen | Area coordinator | General coordinator | Director | Admin |
|---|---|---|---|---|---|
| Nav item "Governance Intelligence" | No | No | No | Yes | Yes |
| Open `/governance` | Sent to dashboard | Sent to dashboard | Sent to dashboard | Yes | Yes |
| `GET /governance/config` | 403 | 403 | 403 | 200 | 200 |
| `POST /governance/analyze` | 403 | 403 | 403 | 200 | 200 |

Signed-out requests get 401. Backend: `checkRole(['director','admin'])` in `backend/routes/governance.js`. Frontend: `requireRole(['director','admin'])` in `pages/governanceIntelligence.js`; the nav item exists only in the director and admin menus in `components/layout.js`.

## Civic Buzz

| Action | Citizen | Area coordinator | General coordinator | Director | Admin |
|---|---|---|---|---|---|
| Read the feed and posts | Yes | Yes | Yes | Yes | Yes |
| Create a post (`POST /buzz`, `/buzz/upload-image`, `/buzz/captions`) | Yes | 403 | 403 | 403 | 403 |
| Upvote (`POST /buzz/:id/vote`) | Yes | 403 | 403 | 403 | 403 |
| Follow (`POST /buzz/:id/follow`) | Yes | 403 | 403 | 403 | 403 |
| Report a post (`POST /buzz/:id/report`) | Yes | Yes | Yes | Yes | Yes |
| Impact view (`GET /buzz/:id/stats`) | Own posts | Yes | Yes | Yes | Yes |

- Backend: `checkRole(['citizen'])` on the create, vote and follow routes in `backend/routes/buzz.js`.
- Frontend: Create, Upvote and Follow controls are hidden for every signed-in non-citizen (`canBuzzParticipate()` in `frontend/src/auth.js`). Signed-out visitors still see them and are asked to sign in.
- Moderation of a Buzz post is the Report action: a post is hidden once three different users have reported it. There is no separate approve/reject queue for Buzz posts.

Tests: `backend/tests/buzz.test.js` ("Role gating"), `backend/tests/governanceIntelligence.test.js` ("Security & Access Control").
