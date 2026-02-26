# Postman API Testing Guide

This guide provides all the endpoints and example data for testing the MeroPaalo backend in Postman.

**Base URL:** `https://clashathon-thefrictionfixers-meropaalo.onrender.com/api`

---

## 🔐 Authentication
*All protected routes require you to login first. Postman will handle cookies automatically if `withCredentials` behavior is mimicked.*

| Name | Method | Path | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **Register** | `POST` | `/auth/register` | `{ "name": "Test User", "email": "test@example.com", "password": "password123" }` |
| **Login** | `POST` | `/auth/login` | `{ "email": "test@example.com", "password": "password123" }` |
| **Logout** | `POST` | `/auth/logout` | `{}` |
| **Forgot Password** | `POST` | `/auth/forgot-password` | `{ "email": "test@example.com" }` |

---

## 🎫 Token Management (Public)
*Used by customers to join the queue and check status.*

| Name | Method | Path | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **Issue Token** | `POST` | `/tokens/issue` | `{ "department": "DEPARTMENT_ID_HERE" }` |
| **Get Token Status** | `GET` | `/tokens/{tokenId}/status` | *None* |

---

## 🛠️ Token Management (Staff/Admin)
*Used by staff to manage the queue flow.*

| Name | Method | Path | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **List All Tokens** | `GET` | `/tokens?department={id}&status={status}`| *None* |
| **Serve Next** | `POST` | `/tokens/serve-next` | `{ "department": "DEPT_ID", "counterId": "COUNTER_ID" }` |
| **Call Token** | `PATCH` | `/tokens/{tokenId}/call` | `{ "counterId": "COUNTER_ID" }` |
| **Start Serving** | `PATCH` | `/tokens/{tokenId}/serve` | `{ "counterId": "COUNTER_ID" }` |
| **Complete Token** | `PATCH` | `/tokens/{tokenId}/complete` | `{ "counterId": "COUNTER_ID" }` |
| **Mark as Missed** | `PATCH` | `/tokens/{tokenId}/miss` | `{ "counterId": "COUNTER_ID" }` |
| **Cancel Token** | `PATCH` | `/tokens/{tokenId}/cancel` | `{ "counterId": "COUNTER_ID" }` |

---

## 🏢 Department & Counter Management
*Mostly Admin tasks.*

| Name | Method | Path | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **List Departments** | `GET` | `/departments` | *None* |
| **Create Department** | `POST` | `/departments` | `{ "name": "Cardiology" }` |
| **List Counters** | `GET` | `/counters` | *None* |
| **Create Counter** | `POST` | `/counters` | `{ "name": "Counter 1", "department": "DEPT_ID" }` |

---

## ⚙️ Admin Dashboard
| Name | Method | Path | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **Get Dashboard** | `GET` | `/admin/dashboard` | *None* |

---

### 💡 Pro Tip for Postman:
1. Create a **Postman Environment**.
2. Set a variable `baseUrl` to `https://clashathon-thefrictionfixers-meropaalo.onrender.com/api`.
3. Use `{{baseUrl}}` in your request URLs for easy switching between local and hosted backends.

