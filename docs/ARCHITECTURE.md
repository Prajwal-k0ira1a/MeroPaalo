# MeroPaalo – System Architecture Documentation

This document explains the high-level and detailed system architecture of the MeroPaalo Smart Queue Management System.

---

# 1. Architectural Overview

MeroPaalo follows a **Client–Server Architecture** using a layered design pattern:

- **Presentation Layer (Frontend – React)**
- **Application/Logic Layer (Backend – Express.js)**
- **Data Layer (MongoDB – Mongoose)**
- **Real-Time Communication Layer (Socket.IO)**

The system is department-based and operates as a single-organization queue management platform.

---

# 2. High-Level Architecture

Client (Browser)
│
▼
Frontend (React + Vite)
│ REST API + WebSockets
▼
Backend (Node.js + Express)
│
▼
MongoDB Database

### Communication Flow

1. User interacts with React frontend.
2. Frontend sends REST API request to backend.
3. Backend processes business logic.
4. Database stores/retrieves data.
5. Backend emits real-time updates via Socket.IO.
6. Frontend updates UI instantly.

---

# 3. System Layers

## 3.1 Presentation Layer (Frontend)

Technology: React (Vite)

Responsibilities:

- QR generation page
- Public queue joining interface
- Token status tracking
- Admin dashboard
- Counter management
- Live display screen

The frontend communicates with backend through:

- REST APIs (`/api/...`)
- Socket.IO for real-time updates

---

## 3.2 Application / Logic Layer (Backend)

Technology: Node.js + Express

Responsibilities:

- Token issuance logic
- Queue lifecycle management
- Counter management
- Authentication (JWT-based)
- Role-based access control
- Real-time event broadcasting

Backend follows MVC structure:

controllers/
models/
routes/
middlewares/

Core Controllers:

- auth.controller.js
- token.controller.js
- queueDay.controller.js
- admin.controller.js
- counter.controller.js
- department.controller.js

---

## 3.3 Data Layer (MongoDB)

Technology: MongoDB with Mongoose ODM

### Core Entities

### 1️ Department

- Represents a queue category
- Core organizational unit

### 2️ QueueDay

- Tracks queue state (active/paused/closed)
- Linked to department
- Date-specific queue session

### 3️ Token

- Represents customer queue position
- Linked to QueueDay and Department
- Status lifecycle:
  - waiting
  - called
  - serving
  - completed
  - missed
  - cancelled

### 4️ Counter

- Represents physical service desk
- Linked to department
- Can be assigned to staff user

### 5️ User

- Roles:
  - customer
  - staff
  - admin

---

# 4. Queue Processing Workflow

## Step 1: Queue Activation

Admin activates queue:

POST /api/queue-days/open

QueueDay document is created or updated.

---

## Step 2: Token Issuance

Customer joins queue:

POST /api/tokens/issue

System:

- Validates active QueueDay
- Generates next token number
- Stores token in database
- Emits `token:issued` event

---

## Step 3: Serving Token

Staff clicks "Serve Next":

POST /api/tokens/serve-next

System:

- Finds next waiting token
- Updates status to "called" or "serving"
- Updates display
- Emits:
  - `token:updated`
  - `display:updated`
  - `dashboard:changed`

---

# 5. Real-Time Architecture (Socket.IO)

Socket.IO enables instant UI updates.

## Rooms

- Department Room → `dept:<departmentId>`
- Token Room → `token:<tokenId>`

## Events Emitted

- `queue:statusChanged`
- `token:issued`
- `token:updated`
- `display:updated`
- `dashboard:changed`

This ensures:

- Live dashboard updates
- Instant display screen updates
- Real-time token tracking

---

# 6. Security Architecture

Authentication:

- JWT-based authentication
- Token stored via HttpOnly cookie or Bearer token

Authorization:

- Role-based access control
  - Admin
  - Staff
  - Customer

Protected Routes:

- Admin APIs
- Counter management
- Dashboard endpoints

---

# 7. Data Flow Summary

1. Client sends request
2. Backend validates user and role
3. Business logic executes
4. Database is updated
5. Real-time event emitted
6. All connected clients update automatically

---

# 8. Scalability Considerations

Current Design:

- Single organization
- Department-based queues
- Centralized backend

Scalability Enhancements (Future Scope):

- Multi-organization support
- Redis for caching
- Horizontal scaling with load balancer
- Microservice-based separation
- SMS/Email notification integration

---

# 9. Deployment Architecture

Production Setup:

Frontend → Hosted on Vercel/Netlify  
Backend → Hosted on Render/AWS  
Database → MongoDB Atlas

HTTPS enabled  
Secure environment variables configured

---

# 10. Architectural Strengths

- Clean MVC structure
- Real-time synchronization
- Modular and scalable design
- Clear separation of concerns
- Lightweight and deployment-ready

---

# 11. Limitations

- Single-organization model
- No microservice separation
- No SMS notification integration (yet)

---

# Conclusion

MeroPaalo follows a structured client-server architecture with real-time capabilities. The layered design ensures maintainability, scalability, and clear separation of concerns. The system is optimized for department-based queue management and is ready for production-level enhancements.
