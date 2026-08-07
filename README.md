# PeerLink – Skill Exchange Platform for Students

> **Learn. Teach. Grow Together.**

PeerLink is a full-stack web application that enables students to **learn and exchange skills with their peers**. Students can discover skills, find suitable mentors, send learning requests, and participate in scheduled learning sessions.

The platform provides a structured environment where students can act as both **learners and skill providers**, encouraging peer-to-peer learning and collaboration within a student community.

---

## 📌 Project Overview

Many students possess valuable technical and non-technical skills but do not have an easy platform to share those skills with others. At the same time, students often struggle to find suitable peers who can guide them in learning a particular skill.

**PeerLink** solves this problem by connecting students who want to learn with students who are willing to teach.

The platform manages the complete learning-request workflow:

```text
Student
   ↓
Browse Skills
   ↓
Find Mentor
   ↓
Send Learning Request
   ↓
Mentor Accepts / Rejects
   ↓
Session Scheduled
   ↓
Student Attends Session
   ↓
Session Completed
   ↓
Rating & Feedback
```

---

## 🎯 Objectives

* Create a platform for peer-to-peer skill exchange.
* Help students discover mentors based on their skills.
* Allow students to share their own knowledge and expertise.
* Simplify the process of sending and managing learning requests.
* Provide dashboards for learners and mentors.
* Enable mentors to schedule learning sessions.
* Track learning progress and completed sessions.
* Encourage collaboration and knowledge sharing among students.

---

## ✨ Key Features

### 🔐 Authentication

* Student registration
* Secure login
* Logout
* Password hashing
* JWT-based authentication
* Protected routes

### 🔎 Skill Discovery

Students can:

* Browse available skills.
* Search for skills.
* Filter skills based on categories or levels.
* View detailed skill information.
* View mentor information.

Example skills:

* Python
* Java
* Web Development
* Data Structures
* UI/UX Design
* Data Science
* Public Speaking
* Aptitude
* Communication Skills
* Resume Building

---

### 👨‍🎓 Student Features

Students can:

* Create and manage their profile.
* Browse available skills.
* View mentor profiles.
* Send learning requests.
* Track request status.
* View accepted learning requests.
* View upcoming sessions.
* Join scheduled sessions using the provided meeting link.
* View completed learning sessions.
* Provide ratings and feedback.
* View learning history.

---

### 👨‍🏫 Mentor / Skill Provider Features

A student can also act as a mentor by offering their skills.

Mentors can:

* Create skill listings.
* Edit skill listings.
* Delete skill listings.
* View incoming learning requests.
* Accept or reject requests.
* Schedule learning sessions.
* Provide meeting details.
* Mark sessions as completed.
* Manage learners.
* Receive ratings and feedback.

---

### 📅 Learning Sessions

Once a mentor accepts a student's request, the mentor can schedule a learning session.

A session can contain:

* Session title
* Skill
* Date
* Time
* Duration
* Online / Offline mode
* Meeting link or venue
* Session status

For online sessions, PeerLink can store an external meeting link such as a Google Meet link.

> PeerLink does not require built-in video conferencing for the current version. In-app video calling and real-time communication are planned as future enhancements.

---

### ⭐ Ratings & Feedback

After completing a learning session, students can:

* Rate the mentor.
* Provide feedback.
* Help future learners identify reliable mentors.

Mentor ratings can be displayed on skill and mentor profiles.

---

### 📊 Dashboards

#### Student Dashboard

Displays information such as:

* Enrolled skills
* Pending requests
* Accepted requests
* Upcoming sessions
* Completed sessions
* Learning progress

#### Mentor Dashboard

Displays:

* Skills offered
* Total learners
* Pending requests
* Accepted requests
* Scheduled sessions
* Completed sessions
* Average rating

#### Admin Dashboard

Administrators can monitor:

* Registered users
* Skill listings
* Learning requests
* Platform activity
* Reports

---

## 🏗️ System Architecture

```text
                   ┌──────────────────────┐
                   │      User / Student  │
                   └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │ React + TypeScript   │
                   │      Frontend        │
                   └──────────┬───────────┘
                              │
                         REST APIs
                              │
                              ▼
                   ┌──────────────────────┐
                   │ Node.js + Express    │
                   │      Backend         │
                   └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │ MongoDB + Mongoose   │
                   │      Database        │
                   └──────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

* React
* **TypeScript**
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* **TypeScript**
* JWT
* bcrypt

### Database

* MongoDB
* Mongoose

### Development & Version Control

* Git
* GitHub
* VS Code
* npm

---

## 💻 Why TypeScript?

TypeScript is used throughout the frontend and backend to provide:

* Static type checking
* Better code reliability
* Improved developer experience
* Easier debugging
* Better maintainability
* Stronger API and data-model definitions
* Better scalability for a multi-member project

---

## 📂 Project Structure

```text
PeerLink/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── assets/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── interfaces/
│   │   ├── config/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
│
├── .gitignore
├── README.md
└── package.json
```

---

## 🗄️ Main Database Collections

### Users

Stores registered user information.

```text
userId
name
email
password
role
bio
skills
profileImage
createdAt
```

### Skills

Stores skills offered by mentors.

```text
skillId
title
description
category
level
duration
mentorId
rating
createdAt
```

### Requests

Stores student learning requests.

```text
requestId
studentId
mentorId
skillId
status
message
createdAt
```

Possible request statuses:

```text
Pending
Accepted
Rejected
Completed
```

### Sessions

Stores scheduled learning sessions.

```text
sessionId
studentId
mentorId
skillId
title
date
time
duration
meetingMode
meetingLink
status
```

Possible session statuses:

```text
Scheduled
Completed
Cancelled
```

### Reviews

Stores ratings and feedback.

```text
reviewId
studentId
mentorId
skillId
rating
comment
createdAt
```

---

## 🔄 Core Application Workflow

### 1. Student Registration

The student creates an account and completes their profile.

### 2. Browse Skills

The student searches for a skill they want to learn.

### 3. Select Mentor

The student views the skill details and mentor information.

### 4. Send Request

The student sends a learning request to the mentor.

### 5. Mentor Reviews Request

The mentor receives the request in their dashboard.

### 6. Accept / Reject

The mentor can accept or reject the request.

### 7. Schedule Session

If accepted, the mentor can schedule a learning session.

### 8. Attend Session

The student receives the session details and can join using the provided meeting link or attend at the specified offline venue.

### 9. Complete Session

The mentor marks the session as completed.

### 10. Feedback

The student can provide a rating and review.

---

## 🔌 Backend API Overview

Example API structure:

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
```

### Users

```text
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/:id
```

### Skills

```text
GET    /api/skills
GET    /api/skills/:id
POST   /api/skills
PUT    /api/skills/:id
DELETE /api/skills/:id
```

### Learning Requests

```text
POST   /api/requests
GET    /api/requests
PUT    /api/requests/:id
DELETE /api/requests/:id
```

### Sessions

```text
POST   /api/sessions
GET    /api/sessions
GET    /api/sessions/:id
PUT    /api/sessions/:id
```

### Reviews

```text
POST   /api/reviews
GET    /api/reviews/:mentorId
```

> API routes may be adjusted during implementation according to the final backend architecture.

---

## 🔒 Security

PeerLink follows basic web application security practices including:

* Password hashing using bcrypt.
* JWT-based authentication.
* Protected API routes.
* Role-based authorization.
* Environment variables for sensitive configuration.
* Input validation.
* Secure handling of authentication data.

---

## 🎨 User Interface

The interface is designed to be:

* Clean
* Modern
* Responsive
* Student-friendly
* Mobile compatible
* Easy to navigate

Major interface sections include:

* Landing Page
* Login / Registration
* Student Dashboard
* Browse Skills
* Skill Details
* Mentor Profile
* My Requests
* My Learning
* Session Management
* Mentor Dashboard
* Admin Dashboard
* Profile
* Settings

---

## 👥 User Roles

### Student

A student can search for skills and request to learn from another student.

### Mentor / Skill Provider

A student with a particular skill can become a mentor and teach other students.

### Admin

The administrator manages users, skills, reports, and overall platform activity.

> A user can potentially act as both a learner and a mentor depending on the skills they want to learn or teach.

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB
* Git

### Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd PeerLink
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Backend Dependencies

```bash
cd ../backend
npm install
```

### Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Do not commit the `.env` file to GitHub.

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The application will be available on the local Vite development URL.

---

## 🧪 Testing

The project can be tested for:

* User registration and login
* Authentication
* Skill creation and management
* Skill search
* Learning requests
* Request acceptance/rejection
* Session scheduling
* Session completion
* Ratings and feedback
* Role-based access
* Responsive UI

---

## 🔮 Future Enhancements

The following features can be added in future versions:

### 💬 Real-Time Chat

Students and mentors can communicate through an integrated real-time messaging system.

### 🎥 Built-in Video Classes

Video sessions can be integrated directly into PeerLink using technologies such as WebRTC.

### 🤖 AI-Based Mentor Recommendation

AI can recommend suitable mentors based on:

* Student interests
* Skills
* Learning goals
* Experience level
* Previous learning history

### 📱 Mobile Application

A dedicated Android/iOS application can be developed.

### 🔔 Notifications

Real-time notifications can be added for:

* New requests
* Request acceptance
* Upcoming sessions
* Session reminders
* Messages

### 📜 Certificates

Students could receive certificates after completing structured learning programs.

### 📅 Calendar Integration

Sessions can be synchronized with external calendar services.

---

## 🌟 Why PeerLink?

Unlike a conventional learning platform where students only consume courses, PeerLink promotes **two-way knowledge exchange**.

A student can be:

```text
Learner in one skill
        +
Mentor in another skill
        =
Active Knowledge-Sharing Community
```

This creates a collaborative learning ecosystem where students can both **learn and teach**.

---

## 📈 Project Impact

PeerLink aims to:

* Encourage peer-to-peer learning.
* Improve accessibility to student mentors.
* Help students discover new skills.
* Promote collaborative learning.
* Build stronger student communities.
* Provide students with opportunities to share their expertise.

---

## 👨‍💻 Project Team

**Project:** PeerLink
**Type:** Full-Stack Development Project
**Domain:** Education / Student Collaboration
**Architecture:** Client–Server Architecture
**Frontend:** React + TypeScript
**Backend:** Node.js + Express + TypeScript
**Database:** MongoDB

---

## 📄 License

This project is developed for educational and academic purposes.
