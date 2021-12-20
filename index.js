const mysql = require('mysql2');
const inquirer = require('inquirer');
const Sequelize = require('sequelize');
const table = require('console.table');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
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
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Quit"
            ]
        }
    ])
        .then(result => {
            console.log("You selected to" + result.option);
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
    db.query("SELECT * FROM employee", function (err, result) {
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
            message: "Which employee would you like to update?"
        },

        {
            type: "input",
            name: "updateRole",
            message: "What role do you want to update to?"
        }
    ])
    .then(result => {
        db.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [result.updateRole, result.updateEmployeeRole], function(err, result) {
            if (err) throw err;
            console.table(result);
            firstQuestion();
        })
    })
}

const viewRoles = () => {
    db.query("SELECT * FROM roles", function (err, result) {
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
            name: "role",
            message: "What is the employee's role ID number?"
        },

        {
            type: "input",
            name: "manager",
            message: "What is the manager's ID number?"
        }
    ])

    .then(result => {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [result.firstName, result.lastName, result.role, result.manager], function(err, result) {
            if (err) throw err;
            console.table(result)
        })
    })

}

const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the role?"
        },

        {
            type: "input",
            name: "salaryAmount",
            message: "What is the salary for this role?"
        },

        {
            type: "input",
            name: "departmentID",
            message: "What is the department ID number?"
        }
    ])

    .then(result => {
        db.query("INSERT INTO role (title, salary, department_id VALUES (?, ?, ?)", [result.roleName, result.salaryAmount, result.departmentID], function (err, result) {
            if (err) throw err;
            console.table(result);
            firstQuestion();
        })
    })

}

const viewDepartment = () => {
    db.query("SELECT * FROM department", function (err, result) {
        if (err) throw err;
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
        db.query("INSERT INTO department (name VALUES ?)", (result.deptName), function(err, result) {
            if (err) throw err;
            console.table(result)
        })
    })
}


module.exports = sequelize

