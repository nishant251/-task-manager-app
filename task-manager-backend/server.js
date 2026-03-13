const express = require("express");
const cors = require("cors");

require("./config/db");   // this loads MySQL connection

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Manager Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost: ${PORT}`);
});