          inquirer
          .prompt([
            {
              type: `input`,
              name: `addFirst`,
              message: `What is the employee's first name?`,
              validate: answer => {
                if (!answer) {
                  return true;
                }
                return `Please enter a first name!`
              }
            },
            {
              type: `input`,
              name: `addLast`,
              message: `What is the employee's last name?`,
              validate: answer => {
                if (!answer) {
                  return true;
                }
                return ` Please enter a last name!`
              }
            },
            {
              type: `input`,
              name: `department`,
              message: `Please enter the role id number!`
            },
            {}
          ])
      }
    })