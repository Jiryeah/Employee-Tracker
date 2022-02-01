// importing mysql that is available globally
const db = require(`./config/connection`);
const fs = require(`fs`);
const inquirer = require(`inquirer`);
require(`console.table`);

initialPrompt = () => {
  inquirer
    .prompt({
      type: `list`,
      name: `choices`,
      message: `What would you like to do?`,
      choice: [
        `View Employees`,
        `View Employees by Department`,
        `View Employees by Manager`,
        `Add Employee`,
        `Add Department`,
        `Add Role`,
        `Update Employee Role`,
        `End`,
      ],
    })
    .then((responses) => {
      switch (responses.choices) {
        case `View Employees`:
          employeesOnly();
          initialPrompt();
          break;

        case `View Employees by Department`:
          departmentOnly();
          initialPrompt();
          break;

        case `View Employees by Role`:
          employeeRoles();
          initialPrompt();
          break;

        case `Add new Employee`:
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

        case `Add Role`:
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

        case `Add Department`:
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
          
        case `End`:
          db.end();
          break;
      }
    });
};
