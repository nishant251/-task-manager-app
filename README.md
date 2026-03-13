# Task Manager

A simple task management application built with React and Node.js.

## Features

- Add, edit, and delete tasks
- Search tasks by title
- Track task creation and update timestamps
- Simple login system (no authentication required)
- Modern, responsive UI

## Tech Stack

**Frontend:**
- React
- React Router
- Axios
- CSS

**Backend:**
- Node.js
- Express
- MySQL

## Getting Started

### Prerequisites
- Node.js
- MySQL

### Installation

1. **Backend Setup:**
   ```bash
   cd task-manager-backend
   npm install
   npm start
   ```

2. **Frontend Setup:**
   ```bash
   cd task-manager-frontend
   npm install
   npm run dev
   ```

3. **Database Setup:**
   - Create a MySQL database named `taskmanager`
   - Update database credentials in `config/db.js`

## Usage

1. Open the application in your browser
2. Enter any name and password to login
3. Start managing your tasks!

## Project Structure

```
task-manager/
├── task-manager-backend/
│   ├── controllers/
│   ├── routes/
│   ├── config/
│   └── server.js
├── task-manager-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
└── README.md
```


## Database Design 

The application uses a MySQL database to store tasks.

| Field       | Type      | Description               |
| ----------- | --------- | ------------------------- |
| id          | INT       | Unique task ID            |
| title       | VARCHAR   | Task title                |
| description | TEXT      | Task details              |
| due_date    | DATE      | Task deadline             |
| status      | VARCHAR   | Task status               |
| remarks     | TEXT      | Additional notes          |
| created_on  | TIMESTAMP | Task creation time        |
| updated_on  | TIMESTAMP | Last update time          |
| created_by  | VARCHAR   | User who created the task |
| updated_by  | VARCHAR   | User who updated the task |




## Application Architecture

This application follows a MVC style architecture.

Frontend (React)
       ↓
REST API (Node.js + Express)
       ↓
Database (MySQL)



## ER Diagram

+-------------------+
|       TASKS       |
+-------------------+
| id (PK)           |
| title             |
| description       |
| due_date          |
| status            |
| remarks           |
| created_on        |
| updated_on        |
| created_by        |
| updated_by        |
+-------------------+




## live link  
task-manager-app-pied-kappa.vercel.app




## Authors

Nishant Srivastava- Web Development Course
