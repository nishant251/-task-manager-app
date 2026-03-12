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

## Authors

Nishant Srivastava- Web Development Course
