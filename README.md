# 🧾 NestJS Task Management API

## 📦 Features

### 🧑 Authentication
- `POST /auth/login` — User login, returns JWT access token

### ✅ Protected User Task API (JWT Required)
- `GET /tasks` — Get all tasks for authenticated user
- `POST /tasks` — Create new task
- `PUT /tasks/:id` — Update task
- `DELETE /tasks/:id` — Permanently delete task

Each task includes:
- `id` (number)
- `title` (string)
- `due_date` (ISO string)
- `user` (object: `id`, `username`)
- `is_active` (boolean, optional use)

> ⚠️ Deletion is **permanent** and removes the record from the database.

---

## 🧰 Tech Stack

| Tech             | Description                     |
|------------------|---------------------------------|
| NestJS           | Backend framework               |
| TypeORM          | ORM for PostgreSQL              |
| PostgreSQL       | Database                        |
| Passport + JWT   | Authentication                  |
| class-transformer| Serialization with snake_case   |
| Swagger          | API documentation               |

---

## 🚀 Getting Started

### 1. Clone and Install
```bash
git clone https://github.com/your-username/task-api.git
cd task-api
npm install
```

### 2. Set Environment Variables

Create a `.env` file:

```env
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=taskdb
```

### 3. Run the App
```bash
npm run start:dev
```

---

## 🔐 Example Login

```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}
```

Response:
```json
{
  "status_code": 200,
  "message": { "id": "Login berhasil", "en": "Login successful" },
  "data": {
    "access_token": "..."
  }
}
```

---

## 📘 API Docs

Swagger is available at:

```
http://localhost:3000/api
```

---

## 🧹 Standard Response Format

```json
{
  "status_code": 200,
  "message": {
    "id": "Berhasil mengambil data",
    "en": "Successfully retrieved data"
  },
  "data": [ ... ]
}
```

---

## ✍ License

MIT License — free to use, modify, and share.

---

## 🌱 Seeding Initial User with NPX

1. Run the seed with NPX:
```bash
npx ts-node src/seed.ts
```

This will create a default admin user with the provided credentials with username admin and password password.
