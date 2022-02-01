const mysql = require(`mysql2`);

const inquirer = require(`inquirer`);
require(`console.table`);
const utility = require(`util`);

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
  initialPrompt();
});

db.query = utility.promisify(db.query)


initialPrompt = () => {
  inquirer
    .prompt({
      type: `list`,
      name: `choices`,
      message: `What would you like to do?`,
      choices: [
        `View Employees`,
        `View all Departments`,
        `View all Roles`,
        `Add an Employee`,
        `Add a Role`,
        `Add a Department`,
        `Update Employee Role`,
        `Exit`,
      ],
    })
    .then((responses) => {
      switch (responses.choices) {
        case `View Employees`:
          viewEmployees();
          break;

        case `View all Departments`:
          viewDepartments();
          break;

        case `View all Roles`:
          viewRoles();
          break;

        case `Add an Employee`:
          inquirer
            .prompt([
              {
                type: `input`,
                name: `firstName`,
                message: `What is the employee's first name?`,
                validate: (firstNameInput) => {
                  if (firstNameInput) {
                    return true;
                  } else {
                    console.log(`Please enter a first name!`);
                    return false;
                  }
                },
              },
              {
                type: `input`,
                name: `lastName`,
                message: `What is the employee's last name?`,
                validate: (lastNameInput) => {
                  if (lastNameInput) {
                    return true;
                  } else {
                    console.log(`Please enter a last name!`);
                    return false;
                  }
                },
              },
              {
                type: `input`,
                name: `department`,
                message: `Please enter the role id`,
              },
              {
                type: `input`,
                name: `manager`,
                message: `Please enter the manager id`,
              },
            ])
            .then((responses) => {
              newEmployee(
                responses.firstName,
                responses.lastName,
                responses.department,
                responses.manager
              );
            });
          break;

        case `Add a Role`:
          inquirer
            .prompt([
              {
                type: `input`,
                name: `title`,
                message: `Please enter the associated title.`,
                validate: (titleInput) => {
                  if (titleInput) {
                    return true;
                  } else {
                    console.log(`Please enter the role's title.`);
                    return false;
                  }
                },
              },
              {
                type: `input`,
                name: `salary`,
                message: `Please enter the salary.`
              },
              {
                type: `input`,
                name: `department_id`,
                message: `Please enter a department id.`
              },
            ])
            .then((responses) => {
              addRole(
                responses.title,
                responses.salary,
                responses.department_id
              );
            });
          break;

        case `Add a Department`:
          inquirer
            .prompt([
              {
                type: `input`,
                name: `Department`,
                message: `Please enter the new department.`,
                validate: (departmentInput) => {
                  if (departmentInput) {
                    return true;
                  } else {
                    console.log(`Please enter a new department.`)
                    return false;
                  }
                }
              }
            ])
            .then(responses => {
              addDepartment(responses.department);
            })
          break;

        case `Update Employee Role`:
          inquirer
            .prompt([
              {
                type: `input`,
                name: `employeeId`,
                message: `Please enter the employee's corresponding id.`
              },
              {
                type: `input`,
                name: `roleId`,
                message: `Please enter the associated role id for the employee.`
              }
            ])
            .then(responses => {
              updateEmployeeRole(
                responses.employeeId,
                responses.roleId
              );
            })
          break;

        case `Exit`:
          db.end();
          console.log(`Thank you, and Goodbye!`);
          break;
      }
    });
};

// Functions for viewing all: employees, departments, and roles.

const viewEmployees = () => {
  let sql = 
    `SELECT employee.id, employee.first_name, 
    employee.last_name, role.title, department.department_name 
    AS department, role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) 
    AS manager 
    FROM employee 
    LEFT JOIN role on employee.role_id = role.id 
    LEFT JOIN department on role.department_id = department.id 
    LEFT JOIN employee manager on manager.id = employee.manager_id`
  
  db.query(sql, (err, res) => {
    if (err) throw err;

    console.table(res);
    console.log(`Our Wonderful Employees!`);

    initialPrompt();
  });
}

const viewDepartments = () => {
  let sql = 
  `SELECT department_name FROM department`

  db.query(sql, (err, res) => {
    if (err) throw err;

    console.table(res);
    console.log(`The Departments.`);

    initialPrompt();
  });
}

const viewRoles = () => {
  let sql = 
  `SELECT title, salary, department_id FROM role`

  db.query(sql, (err, res) => {
    if (err) throw err;

    console.table(res);
    console.log(`The Roles!`);

    initialPrompt();
  });
}

const newEmployee = (firstName, lastName, department, manager) => {
  let sql =
  `INSERT INTO employee 
  SET first_name = ?, 
  last_name = ?, 
  role_id = ?, 
  manager_id = ?`

  let params = [firstName, lastName, department, manager];

  db.query(sql, params, (err, res) => {
    if (err) throw err;

    console.table(res);
    console.log(`You've added a new employee, congrats!`);
  });
  // So the new employee addition can be viewed.
  viewEmployees();
}

const addRole = (title, salary, department_id) => {
  let sql =
  `INSERT INTO role 
  SET title = ?, 
  salary = ?, 
  department_id = ?`

  let params = [title, salary, department_id];

  db.query(sql, params, (err, res) => {
    if (err) throw err;

    console.table(res);
    console.log(`You've added a new Role, congrats!`);
  });
  // So the role addition can be viewed. 
  viewRoles();
  initialPrompt();
}

const addDepartment = (department) => {
  let sql = `INSERT INTO department SET department_name = ?`
  let params = [department]

  db.query(sql, params, (err, res) => {
    if (err) throw err;

    console.table(res);
    console.log(`You've added a new department, woohoo!`);
  })
  // Show the updated departments list
  viewDepartments();
  initialPrompt();
}

const updateEmployeeRole = (roleId, employeeId) => {
  let sql = `UPDATE employee SET role_id = ? WHERE id = ?`
  let params = [roleId, employeeId]

  db.query(sql, params, (err, res) => {
    if (err) throw err;

    console.table(res);
    console.log(`Employee role update successful!`)
  })
  //Show the updated role change
  viewEmployees();
  initialPrompt();
}