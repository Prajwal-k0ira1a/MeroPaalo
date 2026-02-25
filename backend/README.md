# MeroPaalo Backend

Backend API for queue management, token flow, display boards, and admin/staff operations.

## Full-Stack Setup (Frontend + Backend)

This repository has both apps:

- `frontend/` (React + Vite)
- `backend/` (Node.js + Express + MongoDB)

### Project Structure

```text
MeroPaalo/
  frontend/
  backend/
```

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB running locally or a cloud connection string

### Backend Configuration

Create `backend/.env`:

```env
PORT=5000
MONGODB_URL=your_mongo_connection_string
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend Configuration

Create `frontend/.env` (optional but recommended):

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Notes:

- Some frontend files already default to `http://localhost:5000/api`.
- Frontend shared API client: `frontend/src/lib/apiClient.js`.

### Run Frontend + Backend Together

Open two terminals from repo root:

1. Backend

```bash
cd backend
npm install
npm run dev
```

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

### Local URLs

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`
- Backend health check: `http://localhost:5000/`

### Integration Notes

- Backend CORS allows `CLIENT_URL` and credentials.
- Login/register set auth cookie `token` (httpOnly).
- Protected APIs accept either bearer token or `token` cookie.
- QR endpoint uses `CLIENT_URL` to generate join links.

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

## Standard Response Shapes

Most success responses:

```json
{
  "success": true,
  "data": {}
}
```

Most errors:

```json
{
  "success": false,
  "message": "Something went wrong",
  "stack": "..."
}
```

`stack` is hidden in production (`NODE_ENV=production`).

---

## Complete API Endpoints

All paths below are relative to `/api`.

### Auth

#### `POST /auth/register`
Auth: Public

Takes (JSON body):

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9812345678",
  "password": "secret123",
  "institution": "ignored_by_current_code",
  "department": "ignored_by_current_code"
}
```

Validation/notes:

- Required: `name`, `password`, and at least one of `email` or `phone`.
- Creates user with role `customer`.
- `institution` and `department` from request are currently ignored and stored as `null`.

Gets (201):

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "userObjectId",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "9812345678",
      "role": "customer",
      "institution": null,
      "department": null
    }
  }
}
```

Common errors:

- `400`: missing required fields
- `409`: user already exists

#### `POST /auth/login`
Auth: Public

Takes (JSON body):

```json
{
  "email": "jane@example.com",
  "phone": "9812345678",
  "password": "secret123"
}
```

Validation/notes:

- Required: `password` and one of `email` or `phone`.

Gets (200):

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "userObjectId",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "9812345678",
      "role": "customer",
      "institution": null,
      "department": null
    }
  }
}
```

Common errors:

- `400`: missing credentials
- `401`: invalid credentials

#### `POST /auth/logout`
Auth: Public

Takes: no body required

Gets (200):

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### `POST /auth/forgot-password`
Auth: Public

Takes (JSON body):

```json
{
  "email": "jane@example.com"
}
```

Gets (200):

```json
{
  "success": true,
  "message": "If that email exists, a reset link has been sent."
}
```

Notes:

- Returns the same response even when email is not found.
- Reset link points to `${CLIENT_URL}/reset-password/:token`.

#### `GET /auth/reset-password/:token`
Auth: Public

Takes:

- path param `token`

Gets (200):

```json
{
  "success": true,
  "message": "Valid reset token"
}
```

Common errors:

- `400`: invalid or expired token

#### `POST /auth/reset-password/:token`
Auth: Public

Takes:

- path param `token`
- JSON body:

```json
{
  "password": "newSecurePassword123"
}
```

Gets (200):

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

Common errors:

- `400`: missing password or invalid/expired token
- `500`: internal server error

### Admin

#### `GET /admin/dashboard`
Auth: `admin`

Takes (query params):

- `department` (required, ObjectId)
- `date` (optional, parseable date string)

Gets (200):

```json
{
  "success": true,
  "data": {
    "institution": "institutionObjectId",
    "department": "departmentObjectId",
    "queueStatus": "active",
    "currentServingNumber": "003",
    "totalWaitingTokens": 4,
    "tokensToday": 19,
    "averageWaitTimeMinutes": 8,
    "totalCompletedToday": 12
  }
}
```

Common errors:

- `400`: admin has no institution, or missing `department`

### Institutions

#### `POST /institutions`
Auth: `admin`

Takes (JSON body):

```json
{
  "name": "My Branch",
  "address": "Kathmandu",
  "phone": "9812345678",
  "email": "branch@example.com",
  "status": "active",
  "planType": "basic"
}
```

Validation/notes:

- Required: `name`
- `status`: `active | inactive`
- `planType`: `basic | pro`

Gets (201):

```json
{
  "success": true,
  "data": {
    "_id": "institutionObjectId",
    "name": "My Branch",
    "address": "Kathmandu",
    "phone": "9812345678",
    "email": "branch@example.com",
    "status": "active",
    "planType": "basic",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

#### `GET /institutions`
Auth: `admin`

Takes: no params

Gets (200):

```json
{
  "success": true,
  "data": [
    {
      "_id": "institutionObjectId",
      "name": "My Branch",
      "address": "Kathmandu",
      "phone": "9812345678",
      "email": "branch@example.com",
      "status": "active",
      "planType": "basic",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### Departments

#### `POST /departments`
Auth: `admin`

Takes (JSON body):

```json
{
  "name": "Account Services",
  "institutionId": "institutionObjectId"
}
```

Validation/notes:

- Controller currently expects `institutionId` in body and uses it directly.

Gets (201):

- Raw department object (not wrapped in `{ success, data }`):

```json
{
  "_id": "departmentObjectId",
  "institution": "institutionObjectId",
  "name": "Account Services",
  "description": null,
  "avgServiceTime": 5,
  "isActive": true,
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### `GET /departments`
Auth: `admin | staff`

Takes (query params):

- `institution` (optional fallback; if user has no institution)

Gets (200):

```json
{
  "success": true,
  "data": [
    {
      "_id": "departmentObjectId",
      "institution": "institutionObjectId",
      "name": "Account Services",
      "description": "...",
      "avgServiceTime": 5,
      "isActive": true,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

Common errors:

- `400`: institution missing

#### `GET /departments/:id`
Auth: `admin | staff`

Takes:

- path param `id` (department id)
- query `institution` optional fallback

Gets (200):

```json
{
  "success": true,
  "data": {
    "_id": "departmentObjectId",
    "institution": "institutionObjectId",
    "name": "Account Services",
    "description": "...",
    "avgServiceTime": 5,
    "isActive": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

Common errors:

- `400`: institution missing
- `404`: department not found

#### `PATCH /departments/:id`
Auth: `admin`

Takes:

- path param `id`
- JSON body with updatable department fields (`name`, `description`, `avgServiceTime`, `isActive`, etc.)

Gets (200):

```json
{
  "success": true,
  "data": {
    "_id": "departmentObjectId",
    "name": "Updated Name",
    "description": "Updated",
    "avgServiceTime": 6,
    "isActive": true
  }
}
```

Common errors:

- `404`: department not found

#### `DELETE /departments/:id`
Auth: `admin`

Takes: path param `id`

Gets (200):

```json
{
  "success": true,
  "message": "Department deleted"
}
```

Common errors:

- `404`: department not found

### Counters

#### `POST /counters`
Auth: `admin`

Takes (JSON body):

```json
{
  "counterName": "Counter 1",
  "department": "departmentObjectId",
  "status": "open"
}
```

Validation/notes:

- Required: `department`
- `institution` is injected from authenticated user.

Gets (201):

```json
{
  "success": true,
  "data": {
    "_id": "counterObjectId",
    "institution": "institutionObjectId",
    "counterName": "Counter 1",
    "department": "departmentObjectId",
    "staff": null,
    "status": "open",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

Common errors:

- `400`: admin has no institution or missing `department`
- `404`: department not found in institution

#### `GET /counters`
Auth: `admin | staff`

Takes (query params):

- `department` (optional)
- `institution` (optional fallback only)

Gets (200):

```json
{
  "success": true,
  "data": [
    {
      "_id": "counterObjectId",
      "counterName": "Counter 1",
      "institution": "institutionObjectId",
      "department": {
        "_id": "departmentObjectId",
        "name": "Account Services"
      },
      "staff": {
        "_id": "userObjectId",
        "name": "Staff A",
        "role": "staff"
      },
      "status": "open"
    }
  ]
}
```

Common errors:

- `400`: institution missing

#### `PATCH /counters/:id`
Auth: `admin`

Takes:

- path param `id`
- JSON body with updatable fields (`counterName`, `department`, `status`, `staff`)

Gets (200):

```json
{
  "success": true,
  "data": {
    "_id": "counterObjectId",
    "counterName": "Counter 2",
    "status": "closed"
  }
}
```

Common errors:

- `404`: counter not found

#### `PATCH /counters/:id/assign-staff`
Auth: `admin`

Takes (JSON body):

```json
{
  "staffId": "userObjectId_or_null"
}
```

Validation/notes:

- If provided, user must exist, be `staff` or `admin`, and belong to same institution.
- Set `staffId: null` to unassign.

Gets (200):

```json
{
  "success": true,
  "data": {
    "_id": "counterObjectId",
    "staff": "userObjectId_or_null"
  }
}
```

Common errors:

- `404`: counter or staff user not found
- `400`: invalid staff role/institution mismatch

### Queue Days

#### `GET /queue-days`
Auth: `admin | staff`

Takes (query params):

- `department` (optional)
- `institution` (optional fallback only)

Gets (200):

```json
{
  "success": true,
  "data": [
    {
      "_id": "queueDayObjectId",
      "institution": "institutionObjectId",
      "department": {
        "_id": "departmentObjectId",
        "name": "Account Services"
      },
      "date": "2026-02-25T00:00:00.000Z",
      "startTime": "09:00",
      "endTime": "17:00",
      "status": "active"
    }
  ]
}
```

Common errors:

- `400`: institution missing

#### `POST /queue-days/open`
Auth: `admin`

Takes (JSON body):

```json
{
  "department": "departmentObjectId",
  "date": "2026-02-25",
  "startTime": "09:00",
  "endTime": "17:00"
}
```

Validation/notes:

- Required: `department`, `date`
- Upserts queue day and sets `status` to `active`

Gets (201):

```json
{
  "success": true,
  "data": {
    "_id": "queueDayObjectId",
    "institution": "institutionObjectId",
    "department": "departmentObjectId",
    "date": "2026-02-25T00:00:00.000Z",
    "startTime": "09:00",
    "endTime": "17:00",
    "status": "active"
  }
}
```

Common errors:

- `400`: admin has no institution or missing required fields

#### `PATCH /queue-days/:id/close`
Auth: `admin`

Takes: path param `id`

Gets (200): updated queue-day object with `status: "closed"`.

Common errors:

- `404`: queue day not found
- `403`: institution mismatch

#### `PATCH /queue-days/:id/pause`
Auth: `admin`

Takes: path param `id`

Gets (200): updated queue-day object with `status: "paused"`.

Common errors:

- `404`: queue day not found
- `403`: institution mismatch
- `400`: queue day already closed

#### `PATCH /queue-days/:id/resume`
Auth: `admin`

Takes: path param `id`

Gets (200): updated queue-day object with `status: "active"`.

Common errors:

- `404`: queue day not found
- `403`: institution mismatch
- `400`: queue day already closed

#### `POST /queue-days/:id/reset`
Auth: `admin`

Takes: path param `id`

Behavior:

- Cancels active in-flight tokens (`waiting`, `called`, `serving`) for that queue day.
- Clears `Display.currentToken` for the department.

Gets (200):

```json
{
  "success": true,
  "data": {
    "queueDayId": "queueDayObjectId",
    "cancelledCount": 3
  }
}
```

Common errors:

- `404`: queue day not found
- `403`: institution mismatch

### Tokens

#### `POST /tokens/issue`
Auth: Public (optionally authenticated customer)

Takes (JSON body):

```json
{
  "institution": "institutionObjectId",
  "department": "departmentObjectId",
  "date": "2026-02-25"
}
```

Validation/notes:

- Required: `institution`, `department`
- `date` optional; defaults to current day.
- Queue day must exist and be `active` for that date.

Gets (201):

```json
{
  "success": true,
  "data": {
    "_id": "tokenObjectId",
    "institution": "institutionObjectId",
    "department": "departmentObjectId",
    "queueDay": "queueDayObjectId",
    "customer": "userObjectId_or_null",
    "tokenNumber": "001",
    "status": "waiting",
    "issuedAt": "..."
  }
}
```

Common errors:

- `400`: missing fields or queue not active

#### `GET /tokens/:id/status`
Auth: Public

Takes: path param `id`

Gets (200):

```json
{
  "success": true,
  "data": {
    "tokenId": "tokenObjectId",
    "institution": "institutionObjectId",
    "tokenNumber": "001",
    "status": "waiting",
    "currentServing": {
      "tokenNumber": "003",
      "status": "serving"
    },
    "positionInLine": 4,
    "avgServiceMinutes": 5,
    "estimatedWaitTimeMinutes": 20
  }
}
```

Common errors:

- `404`: token not found

#### `GET /tokens`
Auth: `admin | staff`

Takes (query params):

- `department` (optional)
- `queueDay` (optional)
- `status` (optional: `waiting|called|serving|completed|missed|cancelled`)

Gets (200):

```json
{
  "success": true,
  "data": [
    {
      "_id": "tokenObjectId",
      "tokenNumber": "001",
      "status": "waiting",
      "department": { "_id": "departmentObjectId", "name": "Account Services" },
      "queueDay": { "_id": "queueDayObjectId", "date": "2026-02-25T00:00:00.000Z" },
      "customer": { "_id": "userObjectId", "name": "Jane Doe" }
    }
  ]
}
```

#### `POST /tokens/serve-next`
Auth: `admin | staff`

Takes (JSON body):

```json
{
  "department": "departmentObjectId",
  "counterId": "counterObjectId"
}
```

Validation/notes:

- Both fields required.
- Uses current day and requires queue status `active`.
- Finds earliest waiting token and marks it `called`.

Gets (200):

```json
{
  "success": true,
  "data": {
    "_id": "tokenObjectId",
    "tokenNumber": "001",
    "status": "called",
    "calledAt": "..."
  }
}
```

Common errors:

- `400`: missing fields / queue inactive
- `404`: no waiting tokens

#### `PATCH /tokens/:id/call`
Auth: `admin | staff`

Takes:

- path param `id`
- body (optional):

```json
{
  "counterId": "counterObjectId"
}
```

Gets (200): token object with `status: "called"`.

#### `PATCH /tokens/:id/serve`
Auth: `admin | staff`

Takes: same as above (`counterId` optional)

Gets (200): token object with `status: "serving"`.

#### `PATCH /tokens/:id/complete`
Auth: `admin | staff`

Takes: same as above (`counterId` optional)

Gets (200): token object with `status: "completed"`.

#### `PATCH /tokens/:id/miss`
Auth: `admin | staff`

Takes: same as above (`counterId` optional)

Gets (200): token object with `status: "missed"`.

#### `PATCH /tokens/:id/cancel`
Auth: `admin | staff`

Takes: path param `id` (no body required)

Gets (200): token object with `status: "cancelled"`.

Common errors for status-change endpoints:

- `404`: token not found
- `403`: token institution mismatch (for authenticated users)

### Display

#### `GET /display`
Auth: Public

Takes (query params):

- `institution` (required)
- `department` (required)
- `counter` (optional)

Gets (200):

```json
{
  "success": true,
  "data": {
    "institution": "institutionObjectId",
    "department": "departmentObjectId",
    "queueStatus": "active",
    "nowServing": {
      "tokenNumber": "003",
      "status": "serving",
      "calledAt": "...",
      "issuedAt": "..."
    },
    "nextTwo": [
      { "tokenNumber": "004", "status": "waiting", "issuedAt": "..." },
      { "tokenNumber": "005", "status": "waiting", "issuedAt": "..." }
    ]
  }
}
```

Common errors:

- `400`: missing `institution` or `department`

#### `GET /display/rows`
Auth: `admin | staff`

Takes (query params):

- `department` (optional)
- `counter` (optional)

Gets (200):

```json
{
  "success": true,
  "data": [
    {
      "_id": "displayRowObjectId",
      "institution": "institutionObjectId",
      "department": { "_id": "departmentObjectId", "name": "Account Services" },
      "counter": { "_id": "counterObjectId", "counterName": "Counter 1" },
      "currentToken": {
        "_id": "tokenObjectId",
        "tokenNumber": "003",
        "department": { "_id": "departmentObjectId", "name": "Account Services" },
        "queueDay": { "_id": "queueDayObjectId", "date": "2026-02-25T00:00:00.000Z" }
      },
      "updatedAt": "..."
    }
  ]
}
```

### Public Queue Info

#### `GET /public/queue/:departmentId/info`
Auth: Public

Takes:

- path param `departmentId`
- query param `institution` (required)

Gets (200):

```json
{
  "success": true,
  "data": {
    "institutionId": "institutionObjectId",
    "institutionName": "My Branch",
    "queueName": "Account Services",
    "queueStatus": "active",
    "startTime": "09:00",
    "endTime": "17:00"
  }
}
```

Common errors:

- `400`: missing institution
- `404`: institution or department not found/inactive

### Users

#### `GET /users`
Auth: `admin`

Takes (query params):

- `role` (optional: `admin|staff|customer`)

Gets (200):

```json
{
  "success": true,
  "data": [
    {
      "_id": "userObjectId",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "9812345678",
      "role": "customer",
      "institution": null,
      "department": null,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

Notes:

- If logged-in admin has institution, list is scoped to:
  - users in same institution, OR
  - customer users with `institution: null`.

#### `PATCH /users/:userId/role`
Auth: `admin`

Takes:

- path param `userId`
- JSON body:

```json
{
  "role": "staff"
}
```

Allowed roles: `staff | customer | admin`

Gets (200):

```json
{
  "success": true,
  "data": {
    "id": "userObjectId",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "9812345678",
    "role": "staff",
    "institution": "institutionObjectId"
  }
}
```

Common errors:

- `400`: invalid role, or assigning `staff/admin` without admin institution
- `404`: user not found

### QR

#### `GET /qr`
Auth: Public

Takes (query params):

- `institution` (required)
- `department` (required)

Gets:

- `200` with `Content-Type: image/png` (QR image)
- Encodes this join URL pattern:
  - `${CLIENT_URL}/join?institution=<id>&department=<id>`

Common errors:

- `400`: missing required query params
- `500`: QR generation failed

---

## Socket.IO Rooms and Events

Client join/leave events:

- `joinDepartment` with `{ institutionId, departmentId }`
- `leaveDepartment` with `{ institutionId, departmentId }`
- `joinToken` with `{ institutionId, tokenId }`
- `leaveToken` with `{ institutionId, tokenId }`

Server emits:

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

- Admin/staff flows depend on `req.user.institution` for most scoped routes.
- If an admin has `institution: null`, institution-scoped endpoints fail.
- Register always creates `customer` users.
- CORS is configured with credentials enabled (`CLIENT_URL`).
- `POST /departments` currently uses `institutionId` from request body rather than `req.user.institution`.

