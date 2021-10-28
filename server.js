const mysql = require('mysql2');
const inquirer = require("inquirer");
const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
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
    startInquirer();
  });
};

// When choosing to view all roles, table displays with job title, role id, department the role belongs to and salary for that role
const viewAllRoles = () =>{
  db.query(`SELECT * FROM role;`,(err, res) => {
    if (err) throw err;
    console.table(res)
    startInquirer();
  });
};

// When choosing to view all employees, table displays showing employee ids, first names, last names, job titles, 
const viewAllEmployees = () => {
  db.query(`SELECT * FROM employee;`,(err, res) => {
    if (err) throw err;
    console.table(res)
    startInquirer();
  });
};

// When choosing to add department, inquirer prompts to enter the name of the department and that department is added to the database
const addDepartment = () =>{
  inquirer.prompt({
    name: 'deptName',
    type: 'input',
    message: 'Enter name of the new department: '
  })
  .then((response) => {
    db.query(`INSERT INTO department (name) VALUES ('${response.deptName}');`, (err, res) => {
        if (err) throw err;
        console.log('Department added')
        startInquirer();
      });
  });
};

// When choosing to add a role, inquirer prompts to enter the name, salary, and department for the role and that role is added to the database
const addRole = () => {
  db.query(`SELECT * FROM department;`, (err, data)=>{
    if (err) throw err;
    let departmentIDArray = data.map(department=>({
      value: department.id,
      name: department.name,
    }));
    console.log(departmentIDArray);
 
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
  {
    name: 'departmentID',
    type: 'list',
    message: 'Choose department id: ',
    choices: departmentIDArray
  }
])
// need to add department_id once after figuring out above syntax
  .then((response) => {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${response.roleTitle}', ${response.roleSalary}, ${response.departmentID});`, (err, res) => {
        if (err) throw err;
        console.log('Role added')
        startInquirer();
      });
    console.log(response);
  });
})
};


// When choosing to add an employee, inquirer prompts to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const addEmployee = () => {
db.query(`SELECT id, title FROM role`,(err, data)=>{
  // console.log(data);
  let rolesArray = data.map(role =>({
    value: role.id,
    name: role.title,
  }));
  db.query(`SELECT id, first_name, last_name FROM employee`,(err,data)=>{
    // console.log(data);
    let managersArray = data.map(employee =>({
      value: employee.id,
      name: employee.first_name + " " + employee.last_name,
    }))
    // console.log(managersArray);
    managersArray.push({
      value: null,
      name: "No manager",
    })
  inquirer.prompt([
  {
    name: 'firstName',
    type: 'input',
    message: 'Enter the first name of the new employee: '
  },
  {
    name: 'lastName',
    type: 'input',
    message: 'Enter the last name of the new employee: '
  },
  {
    name: 'roleID',
    type: 'list',
    message: 'What\'s the employee\'s role? ',
    choices: rolesArray
  },
  {
    name: 'managerID',
    type: 'list',
    message: 'Choose the employee\'s manager: ',
    choices: managersArray
  }

  ])
  .then((response) => {
    console.log(response);
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.firstName}', '${response.lastName}', ${response.roleID}, ${response.managerID});`, (err, res) => {
        if (err) throw err;
        console.log('Employee has been added')
        startInquirer();
      });
  });
})
})
};


// When updating an employee role, then user is prompted to select an employee to update and their new role and this information is updated in the database 
const updateEmployeeRole = () => {
  // TODO: NEED TO WORK ON HOW TO ESTABLISH ARRAYS HERE
  let employeesArray = [];
  let rolesArray = [];

  inquirer.prompt[(
    {
      name: 'employee',
      type: 'list',
      message: 'Who would you like to edit? ',
      // TODO: NEED TO TELL PROGRAM TO PULL LIST OF EMPLOYEES
      choices: employeesArray
    },
    {
      name: 'role',
      type: 'list',
      message: 'What\'s this employee\'s new role? ',
      // TODO: NEED TO TELL PROGRAM TO PULL LIST OF ROLES
      choices: rolesArray
    }
    )]
    .then((response) => {
      // TODO: NEED TO CONNECT ARRAY... DO I NEED A FOR LOOP?
      db.query(`UPDATE employee SET role_id = ${response.role} WHERE id = ${response.employee});`, (err, res) => {
          if (err) throw err;
          console.log('Employee info updated')
          startInquirer();
        });
    });
};

db.connect((err) => {
  if (err) throw err;
  startInquirer();
});



