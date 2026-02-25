# MeroPaalo Backend

Backend API for queue management, token flow, display boards, and admin/staff operations.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT auth
- Socket.IO (real-time events)

## Run Locally

1. Install dependencies

```bash
npm install
```

2. Create `.env` in `backend/` with:

```env
PORT=5000
MONGODB_URL=your_mongo_connection_string
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

3. Start server

```bash
npm run dev
```

## Base URL

- API: `http://localhost:5000/api`
- Health check: `GET http://localhost:5000/`

## Auth and Authorization

Protected routes use `protect` middleware and support:

- `Authorization: Bearer <token>`
- or `token` cookie (set during login/register)

Role checks are handled by `authorize(...)` middleware.

Roles used in the system:

- `admin`
- `staff`
- `customer`

## Response Format

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Something went wrong",
  "stack": "..."
}
```

`stack` is hidden in production.

---

## API Endpoints

### Auth

#### `POST /auth/register`
Register a new user.

Body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123"
}
```

Notes:

- `name`, `password`, and one of (`email`, `phone`) are required.
- Current logic creates users as `customer` by default.

#### `POST /auth/login`
Login by email or phone.

Body (email):

```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

Body (phone):

```json
{
  "phone": "98xxxxxxxx",
  "password": "secret123"
}
```

#### `POST /auth/logout`
Clears auth cookie.

---

### Admin

#### `GET /admin/dashboard` (admin)
Dashboard stats for one department on a given date.

Query params:

- `department` (required)
- `date` (optional, ISO date)

---

### Departments

#### `GET /departments` (admin, staff)
List departments for the current institution.

Optional query:

- `institution` (mostly for fallback/internal use)

#### `POST /departments` (admin)
Create a department.

Body:

```json
{
  "name": "Account Services",
  "description": "General account operations",
  "avgServiceTime": 5,
  "isActive": true
}
```

#### `GET /departments/:id` (admin, staff)
Get one department.

#### `PATCH /departments/:id` (admin)
Update department.

#### `DELETE /departments/:id` (admin)
Delete department.

---

### Counters

#### `GET /counters` (admin, staff)
List counters.

Optional query:

- `department`

#### `POST /counters` (admin)
Create a counter.

Body:

```json
{
  "counterName": "Counter 1",
  "department": "departmentObjectId",
  "status": "open"
}
```

#### `PATCH /counters/:id` (admin)
Update counter.

#### `PATCH /counters/:id/assign-staff` (admin)
Assign or unassign staff/admin to counter.

Body:

```json
{
  "staffId": "userObjectId"
}
```

Set `staffId` to `null` to unassign.

---

### Queue Days

#### `GET /queue-days` (admin, staff)
List queue-day records.

Optional query:

- `department`

#### `POST /queue-days/open` (admin)
Open queue for a department/date (upsert behavior).

Body:

```json
{
  "department": "departmentObjectId",
  "date": "2026-02-25",
  "startTime": "09:00",
  "endTime": "17:00"
}
```

#### `PATCH /queue-days/:id/close` (admin)
Close queue day.

#### `PATCH /queue-days/:id/pause` (admin)
Pause queue day.

#### `PATCH /queue-days/:id/resume` (admin)
Resume queue day.

#### `POST /queue-days/:id/reset` (admin)
Reset current queue state for the day.

---

### Tokens

#### `POST /tokens/issue` (public)
Issue a token for an institution + department.

Body:

```json
{
  "institution": "institutionObjectId",
  "department": "departmentObjectId"
}
```

Optional:

- `date`

#### `GET /tokens/:id/status` (public)
Get token status, position, and estimate.

#### `GET /tokens` (admin, staff)
List tokens for current institution.

Optional query:

- `department`
- `queueDay`
- `status`

#### `POST /tokens/serve-next` (admin, staff)
Call next waiting token.

Body:

```json
{
  "department": "departmentObjectId",
  "counterId": "counterObjectId"
}
```

#### `PATCH /tokens/:id/call` (admin, staff)
Mark token as called.

#### `PATCH /tokens/:id/serve` (admin, staff)
Mark token as serving.

#### `PATCH /tokens/:id/complete` (admin, staff)
Mark token as completed.

#### `PATCH /tokens/:id/miss` (admin, staff)
Mark token as missed.

#### `PATCH /tokens/:id/cancel` (admin, staff)
Cancel token.

For status change endpoints, request body can include:

```json
{
  "counterId": "counterObjectId"
}
```

---

### Display

#### `GET /display` (public)
Public display board payload.

Query params:

- `institution` (required)
- `department` (required)
- `counter` (optional)

#### `GET /display/rows` (admin, staff)
List display rows.

Optional query:

- `department`
- `counter`

---

### Public Queue Info

#### `GET /public/queue/:departmentId/info` (public)
Queue status/info for customer-side join flow.

Query params:

- `institution` (required)

---

### Users

#### `GET /users` (admin)
List users (can filter by role).

Optional query:

- `role`

#### `PATCH /users/:userId/role` (admin)
Assign role.

Body:

```json
{
  "role": "staff"
}
```

Allowed roles:

- `staff`
- `customer`
- `admin`

---

### QR

#### `GET /qr` (public)
Generate PNG QR for join URL.

Query params:

- `institution` (required)
- `department` (required)

Response: image/png

---

## Socket.IO Rooms and Events

Namespace: default Socket.IO server

Join/leave room events from client:

- `joinDepartment` with `{ institutionId, departmentId }`
- `leaveDepartment` with `{ institutionId, departmentId }`
- `joinToken` with `{ institutionId, tokenId }`
- `leaveToken` with `{ institutionId, tokenId }`

Server emits (examples):

- `token:issued`
- `token:updated`
- `display:updated`
- `dashboard:changed`
- `queue:statusChanged`
- `queue:reset`
- `token:selfUpdated`
- `token:turnArrived`

---

## Important Behavior Notes

- Admin and staff flows depend on user institution linkage.
- If an admin has `institution: null`, institution-scoped endpoints will fail.
- Register currently creates only `customer` users by design.
- CORS is configured with credentials enabled (`CLIENT_URL`).
