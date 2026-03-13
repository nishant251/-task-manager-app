const express = require("express");
const { getTasks, createTask, updateTask, deleteTask, searchTask } = require("../controllers/taskController");

const router = express.Router();

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.get("/tasks/search", searchTask);

module.exports = router;