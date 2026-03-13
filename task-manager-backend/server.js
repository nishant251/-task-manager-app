const express = require("express");
const cors = require("cors");

require("./config/db");   // this loads MySQL connection

const taskRoutes = require("./routes/taskRoutes");

const app = express();

// CORS configuration for production
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-user-name', 'x-user-id'],
  credentials: true
}));

app.use(express.json());

app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Manager Backend Running");
});

app.get("/health", (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});