const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const { result } = require('lodash');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    // password: '',
    // add name of db
    database: 'employees_db'
  },
  console.log(`Connected to database.`)
);

const startInquirer = () => {
  inquirer
  .prompt({
    name: 'options',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update employee role",
      "Quit"
      // "Update employee manager",
      // "View employees by manager",
      // "View employees by department",
      // "Delete departments",
      // "Delete roles",
      // "Delete employees",
      // "View the total utilized budget"
    ]
  })

  .then((response) => {
    switch (response.options) {
      case "View all departments":
        viewAllDepartments();
        break;
      
      case "View all roles":
        viewAllRoles();
        break;

      case "View all employees":
        viewAllEmployees();
        break;

      case 'Add a department':
        addDepartment();
        break;

      case 'Add a role':
        addRole();
        break;

      case 'Add an employee':
        addEmployee();
        break;

      case 'Update employee Role':
        updateEmployeeRole();
        break;

      case 'Quit':
        db.end();
        break;
    }
  });
}

// When choosing to view all departments, table displays showing department names and department ids
const viewAllDepartments = () =>{
  db.query(`SELECT * FROM department;`,(err, res) => {
    if (err) throw err;
    console.table(res)
  });
  startInquirer();
};

// When choosing to view all roles, table displays with job title, role id, department the role belongs to and salary for that role
const viewAllRoles = () =>{
  db.query(`SELECT * FROM role;`,(err, res) => {
    if (err) throw err;
    console.table(res)
  });
  startInquirer();
};

// When choosing to view all employees, table displays showing employee ids, first names, last names, job titles, 
const viewAllEmployees = () => {
  db.query(`SELECT * FROM employee;`,(err, res) => {
    if (err) throw err;
    console.table(res)
  });
  startInquirer();
};

// When choosing to add department, inquirer prompts to enter the name of the department and that department is added to the database
const addDepartment = () =>{
  inquirer.prompt({
    name: 'deptName',
    type: 'input',
    message: 'Enter name of the new department: '
  })
  .then((response) => {
    db.query(`INSERT INTO department (name) VALUES (${response.deptName});`, (err, res) => {
        if (err) throw err;
        console.log('Department added')
        startInquirer();
      });
  });
};

// When choosing to add a role, inquirer prompts to enter the name, salary, and department for the role and that role is added to the database
const addRole = () => {
  inquirer.prompt([
  {
    name: 'roleTitle',
    type: 'input',
    message: 'Enter role title: '
  },
  {
    name: 'roleSalary',
    type: 'number',
    message: 'Enter salary for this role: '
  },
  // NEED TO FIGURE OUT HOW TO ADD roleDepartmentID to query
  // {
  //   name: 'departmentID',
  //   type: 'list',
  //   message: 'Enter name of the new role: '
  // }

])
// need to add department_id once after figuring out above syntax
  .then((response) => {
    db.query(`INSERT INTO role (title, salary) VALUES (${response.roleTitle}), ${response.roleSalary});`, (err, res) => {
        if (err) throw err;
        console.log('Role added')
        startInquirer();
      });
  });
};

// When choosing to add an employee, inquirer prompts to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const addEmployee = () => {
  inquirer.prompt[(
  {
    name: 'firstName',
    type: 'input',
    message: 'Enter the first name of the new employee: '
  },
  {
    name: 'lastName',
    type: 'input',
    message: 'Enter the last name of the new employee: '
  }
  // NEED TO FIGURE OUT HOW TO ADD THIS AS A LIST
  // {
  //   name: 'roleID',
  //   type: 'input',
  //   message: 'Enter the role ID: '
  // },
  // {
  //   name: 'managerID',
  //   type: 'input',
  //   message: 'Enter the manager ID: '
  // }

  )]
  .then((response) => {
    db.query(`INSERT INTO employee (first_name, last_name) VALUES (${response.firstName}, ${response.lastName});`, (err, res) => {
        if (err) throw err;
        console.log('Employee added')
        startInquirer();
      });
  });
};

const updateEmployeeRole = () => {

};



// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



// ---- ADD INQUIRER QUERIES ----
// VIEW ALL DEPARTMENT IS A QUERY
// VIEW ALL ROLES IS A QUERY
// VIEW ALL EMPLOYEES IS A QUERY
// ADD A DEPARTMENT INCLUDES INQUIRY AND "INSERT INTO" QUERY
// UPDATE EMPLOYEE ROLE INCLUDES INQUIRY AND QUERY TO CHANGE DATA






// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
