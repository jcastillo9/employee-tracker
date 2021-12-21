const mysql = require('mysql2');
const graphic = require('asciiart-logo');
const connectgraphic = require('./package.json');
const inquirer = require('inquirer');
const table = require('console.table');

console.log(graphic(connectgraphic).render());

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'password1',
        database: 'management_db'
    },
    console.log('Connected to the management_db database.')
);

const firstQuestion = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Update Employee Role",
                "Add Employee",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department"
            ]
        }
    ])
        .then(result => {
            console.log("You selected to " + result.option);
            switch (result.option) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Update Employee Role":
                    updateEmployee();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    viewDepartment();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                default:
                    quit();
            }
        })
}

const viewEmployees = () => {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ' , manager.last_name) AS manager FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id", function (err, result) {
        if (err) throw err;
        console.table(result);
        firstQuestion();
    });
}

const updateEmployee = () => {
    inquirer.prompt ([
        {
            type: "input",
            name: "updateEmployeeRole",
            message: "Which is the first name of the employee would you like to update?"
        },

        {
            type: "input",
            name: "updateRole",
            message: "What is the role ID of the role do you want to update to?"
        }
    ])
    .then(result => {
        db.query("UPDATE employee SET role_id=? WHERE first_name= ?", [result.updateRole, result.updateEmployeeRole], function(err, result) {
            if (err) throw err;
            console.table(result);
            firstQuestion();
        })
    })
}

const viewRoles = () => {
    db.query("SELECT roles.title, roles.id, department.name AS department, roles.salary FROM roles JOIN department ON roles.department_id = department.id", function (err, result) {
        if (err) throw err;
        console.table(result);
        firstQuestion();
    });
}

const addEmployee = () => {
    inquirer.prompt ([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },

        {
            type: "input",
            name: "lastName",
            message: "What s the employee's last name?"
        },

        {
            type: "input",
            name: "roleID",
            message: "What is the employee's role ID number?"
        },

        {
            type: "input",
            name: "managerID",
            message: "What is the manager's ID number?"
        }
    ])

    .then(result => {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [result.firstName, result.lastName, result.roleID, result.managerID], function(err, result) {
            if (err) throw err;
            console.table(result)
                firstQuestion();    
        })
    })

}

const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What role would you like to add?"
        },

        {
            type: "input",
            name: "salaryAmount",
            message: "What is the salary for this role?"
        },

        {
            type: "input",
            name: "deptID",
            message: "What is the department ID number?"
        }
    ])

    .then(result => {
        db.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [result.roleName, result.salaryAmount, result.deptID], function (err, result) {
            if (err) throw err;
            console.table(result);
            firstQuestion();
        })
    })

}

const viewDepartment = () => {
    db.query("SELECT * FROM department", function (err, result) {
        console.table(result);
        firstQuestion();
    })
}

const addDepartment = () => {
    inquirer.prompt ([
        {
            type: "input",
            name: "deptName",
            message: "What department would you like to add?"
        }
    ])

    .then(result => {
        db.query("INSERT INTO department (name) VALUES (?)", [result.deptName], function(err, result) {
            if (err) throw err;
            console.table(result);
            firstQuestion();
        })
    })
}

firstQuestion();


