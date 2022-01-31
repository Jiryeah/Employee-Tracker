// importing mysql that is available globally
const db = require(`./config/connection`);
const fs = require(`fs`);
const inquirer = require(`inquirer`);
require(`console.table`);

function initialPrompt() {
  inquirer
  .prompt({
    type:`list`,
    name: `action`,
    message: `What would you like to do?`,
    choice: [
      `View Employees`,
      `View Employees by Department`,
      `View Employees by Manager`,
      `Add Employee`,
      `Add Department`,
      `Add Role`,
      `End`
    ]
  })
  .then(responses => {
    switch(responses) {
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
            name: `eFirstName`,
            message: `What is the employee's first name?`,
            validate: firstName => {
              if(firstName) {
                return true;
              } else {
                console.log(`Please enter a first name!`);
                return false;
              }
            }
          },
          {
            type: `input`,
            name: `eLastName`,
            message: `What is the employee's last name?`,
            validate: lastName => {
              if(lastName) {
                return true;
              } else {
                console.log(`Please enter a last name!`);
                return false;
              }
            }
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
          }
        ])
        .then(responses => {
          newEmployee(responses.eFirstName, responses.eLastName, responses.department, responses.manager);
          initialPrompt();
        })
        break;
      
      case `Add Role`:
        inqui

      case `Add Department`:
        addDepartment();
        initialPrompt();

      case `Update Employee Role`:
        updateRole();
        initialPrompt();
      
      case `End`:
        db.end();
        break;
    };
  });      
};

