# MeroPaalo – Full Stack Queue Management

This project is a complete queue management system with:

- **Backend**: Node.js + Express + MongoDB + Socket.IO (`backend/`)
- **Frontend**: React + Vite (`frontend/`)

The system is now **single-organization and department-based only** – there is no Institution model.

---

## 1. Running the App

### Backend

```bash
cd backend
npm install
npm run dev
```

The API will be available at `http://localhost:5000/api`.

Make sure `backend/.env` exists as described in `backend/README.md`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and talks to the backend via `VITE_API_BASE_URL` (defaults to `http://localhost:5000/api`).

---

## 2. Main Flows (Frontend + Backend Together)

### 2.1 Public Join & Token Tracking

1. **Generate a QR code**
   - Go to `http://localhost:5173/qr-generator`.
   - Enter a **Department ID** (Mongo `_id` of a Department).
   - A QR is rendered by `frontend/src/Join/QRGeneratorPage.jsx`, loading from:
     - `GET /api/qr?department=<departmentId>` → `backend/src/controllers/qr.controller.js`.

2. **Customer joins the queue**
   - Scan the QR or visit:  
     `http://localhost:5173/join?department=<departmentId>`
   - `JoinPage` (`frontend/src/Join/JoinPage.jsx`) calls:
     - `GET /api/public/queue/:departmentId/info` for live queue status.
     - `POST /api/tokens/issue` with body `{ department }` to issue a token.

3. **Customer views live token status**
   - After joining, the success card (`TokenSuccessCard`) links to:
     - `/token-status?tokenId=<id>&department=<departmentId>&tokenNumber=<num>`
   - `TokenPage` (`frontend/src/Token/TokenPage.jsx`) calls:
     - `GET /api/tokens/:tokenId/status`
     - `GET /api/public/queue/:departmentId/info` for queue info.

### 2.2 Admin Console (Queues & Dashboard)

The admin console UI is in `frontend/src/AdminConsole`:

- Main shell: `AdminConsolePage.jsx`
- Dashboard page: `pages/Dashboard/index.jsx`
- Header: `pages/Dashboard/DashboardHeader.jsx`
- API client: `api/adminApi.js`

Key interactions:

- On load, `DashboardPage`:
  - Fetches departments: `GET /api/departments`.
  - For the selected department, loads:
    - `GET /api/admin/dashboard?department=<id>`
    - `GET /api/tokens?department=<id>`
    - `GET /api/counters?department=<id>`

- **Activate Queue** button in `DashboardHeader` triggers:
  - `adminApi.openQueueDay(...)` → `POST /api/queue-days/open` with body:
    - `{ department, date, startTime, endTime }`
  - Backend handler: `backend/src/controllers/queueDay.controller.js`.

- **Issue Token** button in the Admin console triggers:
  - `adminApi.issueToken(...)` → `POST /api/tokens/issue` with body `{ department }`.

- **Serve Next** button in the Live Queue Table triggers:
  - `adminApi.serveNext(...)` → `POST /api/tokens/serve-next` with body:
    - `{ department, counterId }`.

The dashboard displays stats returned by `GET /api/admin/dashboard` (`backend/src/controllers/admin.controller.js`), including:

- `queueStatus` (`active | paused | closed`)
- `currentServingNumber`
- `totalWaitingTokens`
- `tokensToday`
- `averageWaitTimeMinutes`
- `totalCompletedToday`

### 2.3 Staff Admin – Counters

The staff/admin counters management UI is in:

- `frontend/src/AdminConsole/pages/Counters/index.jsx`

It uses `adminApi` to call:

- `GET /api/departments`
- `GET /api/counters?department=<id>`
- `GET /api/users?role=staff` and `role=admin`
- `POST /api/counters` to create counters
- `PATCH /api/counters/:id` to toggle status
- `PATCH /api/counters/:id/assign-staff` to assign/unassign a staff user

Backend handlers live in:

- `backend/src/controllers/department.controller.js`
- `backend/src/controllers/counter.controller.js`
- `backend/src/controllers/user.controller.js`

---

## 3. How Things Are Wired (Simplified)

- **Departments** are the core unit (queues). Everything else references a department.
- **QueueDay** tracks the open/closed state for a department on a specific date.
- **Token** links to a `QueueDay` and `Department` and represents a customer’s place in line.
- **Counter** is a physical service point, optionally linked to a staff user.
- **Display** rows show what token is currently being served on which counter.

Real-time updates use Socket.IO rooms:

- Department room: `dept:<departmentId>`
- Token room: `token:<tokenId>`

The backend emits events like `queue:statusChanged`, `token:issued`, `token:updated`, `display:updated`, and `dashboard:changed` which the frontend listens to (where implemented) for live UI updates.

For detailed per-endpoint shapes (all request/response JSON), see `backend/README.md`.

