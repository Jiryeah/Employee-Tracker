INSERT INTO department (department_name)
VALUES
  (`Sales`),
  (`Engineering`),
  (`Finance`),
  (`Legal`);

INSERT INTO roles (title, salary, department_id)
VALUES
  (`Sales Lead`, 100000, 1),
  (`Lead Engineer`, 150000, 2),
  (`Salesperson`, 80000, 1),
  (`Software Engieer`, 120000, 2),
  (`Account Manager`, 160000, 3),
  (`Accountant`, 125000, 3),
  (`Lawyer`, 190000, 4),
  (`Legal Team Lead`, 250000, 4)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  (`Janis`, `Joplin`, 2, 1),
  (`Ric`, `Ocasek`, 1, NULL),
  (`Ray`, `Manzarek`, 4, 3),
  (`Ann`, `Wilson`, 6, 5),
  (`Ray`, `Charles`, 5, NULL),
  (`Stevie`, `Nicks`, 3, NULL),
  (`Roger`, `Waters`, 8, 7),
  (`Robert`, `Plant`, 7, NULL);