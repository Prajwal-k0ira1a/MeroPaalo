# MeroPaalo – Live Deployment Guide

This document explains how to access and use the live deployed version of the MeroPaalo Smart Queue Management System.

---

# Live Application URLs

## Frontend (User Interface)

https://meropaalo-queue-frontend.vercel.app/

This is the main entry point for all users:

- Public users (queue joining)
- Staff members
- Administrators

---

## Backend (API Server)

https://clashathon-thefrictionfixers-meropaalo.onrender.com/

API Base URL:

https://clashathon-thefrictionfixers-meropaalo.onrender.com/api

The backend is hosted on **Render** and handles:

- Token issuance
- Queue management
- Authentication
- Dashboard analytics
- Real-time updates (Socket.IO)

---

# How to Access the Live Version

## 1️ Public Users – Join Queue

1. Open the frontend:
   https://meropaalo-queue-frontend.vercel.app/

2. Navigate to:
   - QR Generator (if available)
   - Or `/join?department=<departmentId>`

3. Join the queue and receive a digital token.

4. Track token status via:
   - `/token-status?tokenId=<id>`

---

## 2️ Admin Access

1. Visit:
   https://meropaalo-queue-frontend.vercel.app/

2. Login with admin credentials.

3. Access:
   - Dashboard
   - Open/Close Queue
   - Serve Next Token
   - View Analytics

Admin dashboard communicates with:

https://clashathon-thefrictionfixers-meropaalo.onrender.com/api

---

## 3️ Staff Access

Staff users can:

- Log in
- Manage assigned counters
- Serve next token
- Update token status

All actions are synchronized in real time.

---

# Real-Time Functionality

The live system uses **Socket.IO** for:

- Live token updates
- Dashboard refresh
- Display updates
- Queue status changes

If the backend goes idle (Render free tier), the first request may take a few seconds to wake up.

---

# Deployment Architecture

### Frontend Hosting

- Platform: **Vercel**
- URL: https://meropaalo-queue-frontend.vercel.app/

### Backend Hosting

- Platform: **Render**
- URL: https://clashathon-thefrictionfixers-meropaalo.onrender.com/

### Database

- MongoDB Atlas (Cloud Database)

---

# Security

- JWT-based authentication
- HTTPS enabled on both frontend and backend
- Secure environment variables configured on hosting platforms

---

# API Testing

You can test API endpoints directly via browser or tools like Postman:

Example:

GET https://clashathon-thefrictionfixers-meropaalo.onrender.com/api/departments

---

# Important Notes

- If the backend is inactive (Render free tier), it may take 10–30 seconds to start.
- Ensure valid Department IDs are used for joining queues.
- Admin and staff credentials are required for dashboard access.

---

# Live Version Summary

Frontend:  
https://meropaalo-queue-frontend.vercel.app/

Backend API:  
https://clashathon-thefrictionfixers-meropaalo.onrender.com/api

The system is fully deployed and accessible online.
