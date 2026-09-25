# PeerLink

> Learn. Teach. Grow Together.

PeerLink is a college-level MERN application for student-to-student skill
exchange. Students can browse skills offered by mentors, send learning
requests, and view scheduled learning sessions. Mentors can publish skills,
manage their own listings, review requests, and schedule sessions for
accepted requests.

## Features

### Authentication

- Student and mentor registration
- JWT login
- bcrypt password hashing
- Protected frontend routes and backend APIs
- Logout through local storage cleanup

### Skills

- Public skill browsing
- Search by title or description
- Category filtering
- Mentor-only skill creation
- Mentor ownership checks for editing and deleting skills
- Skill detail pages with mentor information

### Profiles

- View the authenticated user's profile
- Edit name, bio, and skills
- Email and role are read-only in the profile form

### Learning requests

- Students can request another mentor's skill
- Students can view their own requests
- Mentors can view incoming requests
- Mentors can accept or reject requests
- Duplicate pending requests are prevented

### Learning sessions

- Mentors can schedule sessions only for accepted requests
- Students can view their learning sessions
- Mentors can view their scheduled sessions
- Mentors can mark scheduled sessions as completed or cancelled
- Sessions contain a date, time, duration, and status

Messaging, notifications, reviews, ratings, video calls, social login, and
admin features are not part of the current version.

## Technologies

### Frontend

- React
- Vite
- JavaScript and JSX
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- JavaScript
- Mongoose
- MongoDB
- JWT
- bcryptjs

## Project structure

```text
PeerLink/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Layout.jsx
│       │   └── ProtectedRoute.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Skills.jsx
│       │   ├── SkillDetails.jsx
│       │   ├── AddSkill.jsx
│       │   ├── EditSkill.jsx
│       │   ├── Profile.jsx
│       │   ├── MyRequests.jsx
│       │   ├── IncomingRequests.jsx
│       │   ├── MyLearning.jsx
│       │   └── MySessions.jsx
│       ├── api.js
│       ├── App.jsx
│       ├── App.css
│       └── index.css
└── backend/
    └── src/
        ├── config/
        │   └── db.js
        ├── controllers/
        ├── middleware/
        │   └── authMiddleware.js
        ├── models/
        │   ├── User.js
        │   ├── Skill.js
        │   ├── LearningRequest.js
        │   └── LearningSession.js
        ├── routes/
        └── server.js
```

## MongoDB collections

The application uses these Mongoose models:

- `User`: name, email, password hash, role, bio, and skills
- `Skill`: title, description, category, and mentor
- `LearningRequest`: student, mentor, skill, and pending/accepted/rejected status
- `LearningSession`: student, mentor, skill, request, date, time, duration, and
  scheduled/completed/cancelled status

The existing MongoDB connection is configured in
`backend/src/config/db.js`. Do not commit backend environment variables.

## Main API endpoints

All endpoints use the `http://localhost:5000/api` base URL.

### Authentication

```text
POST /auth/register
POST /auth/login
```

### Users

```text
GET /users/profile
PUT /users/profile
```

### Skills

```text
GET    /skills
GET    /skills/:id
POST   /skills
PUT    /skills/:id
DELETE /skills/:id
```

### Learning requests

```text
POST /requests
GET  /requests/student
GET  /requests/mentor
PUT  /requests/:id/status
```

### Learning sessions

```text
POST /sessions
GET  /sessions/student
GET  /sessions/mentor
PUT  /sessions/:id/status
```

Protected endpoints require:

```text
Authorization: Bearer <jwt-token>
```

## User workflows

### Student workflow

1. Register or log in as a student.
2. Browse and filter available skills.
3. Open a skill detail page.
4. Send a learning request to the mentor.
5. Track the request under **My Requests**.
6. After the mentor accepts and schedules a session, view it under
   **My Learning**.

### Mentor workflow

1. Register or log in as a mentor.
2. Create and manage skill listings.
3. Review incoming learning requests.
4. Accept or reject requests.
5. Schedule a session for an accepted request.
6. Manage sessions under **My Sessions**.
7. Mark sessions completed or cancelled.

## Running the project

### Prerequisites

- Node.js and npm
- MongoDB Atlas or another MongoDB deployment

### Backend

Create or update `backend/.env` with the existing project configuration,
including `PORT`, `MONGODB_URI`, and `JWT_SECRET`. Do not commit this file.

```bash
cd backend
npm install
npm run dev
```

The backend runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite development server normally runs on `http://localhost:5173`.

## Validation

Frontend checks:

```bash
cd frontend
npm run lint
npm run build
```

Backend syntax checks can be run with `node --check` against the files in
`backend/src`.

## Academic scope

PeerLink intentionally remains a simple MERN college project. It demonstrates
CRUD operations, form validation, JWT authentication, MongoDB integration,
Express REST APIs, React pages, role-based access, and basic error handling
without introducing advanced real-time or third-party platform features.
