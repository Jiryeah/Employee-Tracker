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
  .then(answers => {
    switch(answers) {
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
        addEmployee();
        initialPrompt();
        break;
      
      case `Add Role`:
        addRole();
        initialPrompt();
        break;

      case `Add Department`:
        addDepartment();
        initialPrompt();
      
      case `End`:
        db.end();
        break;
    }
  })        
}
