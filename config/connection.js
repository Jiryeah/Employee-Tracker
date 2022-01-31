// Initializing mysql from npm
const mysql = require(`mysql2`);

// connect to MySql database
const db = mysql.createConnection(
  {
    host: `localhost`,
    user: `root`,
    password: ``,
    database: `employee_tracker`
  },
  console.log(`Connected to the Employee Tracker database.`)
);

// exporting it so it can be used by the code base
module.exports = db;