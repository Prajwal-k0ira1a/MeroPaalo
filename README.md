# 1. MeroPaalo – Smart Queue Management System

A real-time, department-based digital queue management system built to reduce physical waiting and improve service efficiency.

---

# 2. Problem Statement

Many service-based institutions still rely on manual token systems, leading to long waiting times, overcrowding, and lack of transparency. Customers often do not know their queue position or estimated waiting time, resulting in frustration and inefficiency.

---

# 3. Solution Overview

MeroPaalo provides a digital queue management platform where users can join a queue via QR code and track their token status in real time. Administrators and staff can manage departments, counters, and live queue operations through an interactive dashboard with real-time updates powered by Socket.IO.

---

# 4. Unique Selling Proposition

Unlike traditional token systems, MeroPaalo offers real-time queue tracking, QR-based token issuance, and a live administrative dashboard within a single lightweight web platform. It is designed to be scalable, simple, and easily deployable for institutions of any size.

---

# 5. Tech Stack

## Frontend

- React (Vite)
- Axios
- Socket.IO Client

## Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.IO

## Tools

- Git & GitHub
- MongoDB Atlas (optional cloud database)

---

# 6. Setup Instructions

## Prerequisites

- Node.js (v16 or later)
- npm
- MongoDB (local installation or MongoDB Atlas)
- Git

---

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd MeroPaalo
```

## Step 2: Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:
http://localhost:5000/api

## Step 3: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
http://localhost:5173

# 7. Environment Variables

Create a .env file inside the backend folder with the following:
PORT=5000

DB_HOST=your_database_host
DB_USER=your_database_username
DB_PASS=your_database_password
DB_NAME=your_database_name

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

CLIENT_URL=http://localhost:5173

# 8. Deployment Link

Live Deployment:
https://meropaalo-queue-frontend.vercel.app/

# 9. Team Members

Susant Lamsal – Backend Developer (Logic Layer)
Responsible for core system logic, API development, token generation, and authentication implementation.

Subin Shrestha – Backend Developer (Logic Layer)
Implemented queue algorithms, business rules, API security, and backend optimization.

Sujal Shrestha – Frontend Developer (Interface Layer)
Developed the React.js user interface including QR token screens, live queue dashboard, and public display interface.

Prajwal Koirala – Database & Frontend Developer (Storage Layer)
Designed database schema, ensured data consistency, and handled real-time synchronization between frontend and backend.

Grace Gautam – UI/UX Designer & Business Strategist (Cross-Layer Coordination)
Managed wireframing, usability design, documentation, and overall team coordination.
