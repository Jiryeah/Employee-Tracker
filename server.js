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
          initialPrompt();
          break;

        case `View all Departments`:
          viewDepartments();
          initialPrompt();
          break;

        case `View all Roles`:
          viewRoles();
          initialPrompt();
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
              initialPrompt();
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
              initialPrompt();
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
              initialPrompt();
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
              updateRole(
                responses.employeeId,
                responses.roleId
              );
              initialPrompt();
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
  let query = 
    `SELECT employee.id, employee.first_name, 
    employee.last_name, role.title, department.department_name 
    AS department, role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) 
    AS manager 
    FROM employee 
    LEFT JOIN role on employee.role_id = role.id 
    LEFT JOIN department on role.department_id = department.id 
    LEFT JOIN employee manager on manager.id = employee.manager_id`
  
  db.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);
    console.log(`Our Wonderful Employees!`)
  });
}

const viewDepartments = () => {
  let query = 
  `SELECT department_name FROM department`

  db.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);
    console.log(`The Departments.`)
  });
}

const viewRoles = () => {
  let query = 
  `SELECT title, salary, department_id FROM role`

  db.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);
    console.log(`The Roles!`)
  });
}

module.exports = initialPrompt;