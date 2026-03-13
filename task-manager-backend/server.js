const express = require("express");
const cors = require("cors");

require("./config/db");   // this loads MySQL connection

const taskRoutes = require("./routes/taskRoutes");

const app = express();

// CORS configuration for production
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allowed origins
    const allowedOrigins = [
      'https://task-manager-frontend-eta.vercel.app',
      'https://task-manager-frontend.vercel.app',
      'http://localhost:3000', 
      'http://localhost:5173'
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      // For development, allow all origins
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-user-name', 'x-user-id', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Handle pre-flight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-user-name, x-user-id, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

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