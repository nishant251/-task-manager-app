const mysql = require("mysql2");

const db = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "n1i2s3h4",

  database: "taskmanager"

});

db.connect((err) => {

  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("MySQL Connected");
  }

});

module.exports = db;