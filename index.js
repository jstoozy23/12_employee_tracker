const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'your password',
    database: 'bizDatabase_db'
  },
  console.log(`Connected to the bizDatabase_db database.`)
);

const departments = db.query('SELECT * FROM department');
const roles = db.query('SELECT * FROM emp_role');

const question =([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'ALL DONE!'],
      name: "question"
    }
]);

const add_department =([
    {
      type: 'entry',
      message: 'enter the name of the department you would like to add',
      name: "new_department"
    }
]);

const add_role =([
    {
      type: 'entry',
      message: 'enter the name of the role you would like to add',
      name: 'new_role_name'
    },
    {
      type: 'entry',
      message: 'enter the salary of this role',
      name: 'new_role_salary'
    },
    {
      type: 'entry',
      message: 'enter the department ID for this role',
      name: 'new_role_department'
    },
]);

const add_employee =([
    {
      type: 'entry',
      message: 'enter the first name of the employee you would like to add',
      name: 'new_employee_first_name'
    },
    {
      type: 'entry',
      message: 'enter the last name of the employee you would like to add',
      name: 'new_employee_last_name'
    },
    {
      type: 'list',
      message: 'select the role for this employee',
      choices: roles,
      name: 'new_employee_role_id'
    },
    {
      type: 'entry',
      message: 'enter the manager ID for this employee',
      name: 'new_employee_manager_id'
    },
]);



function firstQuestion() {
  inquirer.prompt(question)
    .then((data) => {

      if (data.question === "view all departments") {
        db.query('SELECT name, id FROM department', function (err, results) {
          console.table(results); 
          // console.error(err);   
      })
        firstQuestion();

      } else if (data.question === "view all roles") {
        db.query('SELECT title, id, department_id, salary FROM emp_role', function (err, results) {
          console.table(results); 
      })
        firstQuestion();

      } else if (data.question === "view all employees") {
        db.query('SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, department.name, emp_role.salary, employee.manager_id AS manager FROM employee JOIN emp_role ON emp_role.id = employee.emp_role_id JOIN department ON department.id = emp_role.department_id JOIN employee manager ON manager.id = employee.manager_id', function (err, results) {
          console.table(results);   
      })
        firstQuestion();
        
      } else if (data.question === "add a department") {
          newDepartment();
    
      } else if (data.question === "add a role"){
          newRole();
      
      } else if (data.question === "add an employee") {
          newEmployee();

      } else if (choice === "All DONE!")
        {process.exit();}
    })
};   

function newDepartment(){
  inquirer.prompt(add_department)
    .then((data) => {
      const addedDepartment = JSON.stringify(data.new_department).split('"').join('');

        db.query('INSERT INTO department (name) VALUES (?)', addedDepartment, function (err,results) {

          console.log("Congrats you added" + addedDepartment + " as a new department!");
          firstQuestion();
        })
    })
};

function newRole(){
  inquirer.prompt(add_role)
    .then((data) => {
      const roleName = JSON.stringify(data.new_role_name).split('"').join('');
      const roleSalary = JSON.stringify(data.new_role_salary).split('"').join('');
      const roleDepartment = JSON.stringify(data.new_role_department).split('"').join('');

      // roleName.push(roles);

        db.query('INSERT INTO emp_role (title, salary, departent_id) VALUES (?, ?, ?)', roleName, roleSalary, roleDepartment, function (err,results) {

          console.log("Congrats you added" + roleName + "as a new role!");
        })
    })
};

function newEmployee(){
  inquirer.prompt(add_employee)
    .then((data) => {
      const empFirstName = JSON.stringify(data.new_employee_first_name).split('"').join('');
      const empLastName = JSON.stringify(data.new_employee_last_name).split('"').join('');
      const empDepId = JSON.stringify(data.new_employee_role_id).split('"').join('');
      const empManagerId = JSON.stringify(data.new_employee_manager_id).split('"').join('');
      
        db.query('INSERT INTO employee (first_name, last_name, emp_role_id, manager_id) VALUES (?, ?, ?, ?)', empFirstName, empLastName, empDepId, empManagerId, function (err,results){

          console.log("Congrats you added" + empFirstName + empLastName + "as a new employee!");
        })
    })
};

firstQuestion();