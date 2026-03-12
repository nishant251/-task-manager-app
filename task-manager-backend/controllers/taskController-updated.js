const db = require("../config/db");

exports.getTasks = (req, res) => {

 db.query("SELECT * FROM tasks",
 (err, result) => {

   if (err) return res.status(500).json(err);

   res.json(result);
 });

};

exports.createTask = (req, res) => {

 const { title, description, due_date, status, remarks } = req.body;

 // Get user info from request headers
 const userName = req.headers['x-user-name'] || 'Unknown User';
 const userId = req.headers['x-user-id'] || 'Unknown';
 const userString = `${userName} (${userId})`;

 const sql =
 "INSERT INTO tasks (title, description, due_date, status, remarks, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?)";

 db.query(sql,
 [title, description, due_date, status, remarks, userString, userString],

 (err, result) => {

   if (err) return res.status(500).json(err);

   res.json({ message: "Task created" });

 });

};

exports.updateTask = (req, res) => {

 const id = req.params.id;

 const { title, description, due_date, status, remarks } = req.body;

 // Get user info from request headers
 const userName = req.headers['x-user-name'] || 'Unknown User';
 const userId = req.headers['x-user-id'] || 'Unknown';
 const userString = `${userName} (${userId})`;

 const sql =
 "UPDATE tasks SET title=?, description=?, due_date=?, status=?, remarks=?, updated_by=? WHERE id=?";

 db.query(sql,
 [title, description, due_date, status, remarks, userString, id],

 (err, result) => {

   if (err) return res.status(500).json(err);

   res.json({ message: "Task updated" });

 });

};

exports.deleteTask = (req, res) => {

 const id = req.params.id;

 db.query("DELETE FROM tasks WHERE id=?",
 [id],

 (err, result) => {

   if (err) return res.status(500).json(err);

   res.json({ message: "Task deleted" });

 });

};

exports.searchTask = (req, res) => {

 const keyword = req.query.q;

 db.query(
 "SELECT * FROM tasks WHERE title LIKE ?",
 [`%${keyword}%`],

 (err, result) => {

   if (err) return res.status(500).json(err);

   res.json(result);
 });

};
