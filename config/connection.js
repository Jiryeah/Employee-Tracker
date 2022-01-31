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

// error handling
db.connect ((err) => {
  if (err) throw err;
  // run the initial batch of ?'s after successful con
  InitialPrompt();
});

db.query = util.promisify(connection.query);

// exporting it so it can be used by the code base
module.exports = db;