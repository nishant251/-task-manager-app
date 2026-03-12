const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "n1i2s3h4",
  database: "taskmanager"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
    return;
  }
  console.log("MySQL Connected");

  // Check table structure
  db.query("DESCRIBE tasks", (err, result) => {
    if (err) {
      console.error("Error describing table:", err);
    } else {
      console.log("Table structure:");
      console.log(result);
    }

    // Check sample data
    db.query("SELECT * FROM tasks LIMIT 5", (err, result) => {
      if (err) {
        console.error("Error selecting data:", err);
      } else {
        console.log("\nSample data:");
        console.log(result);
      }
      
      db.end();
    });
  });
});
