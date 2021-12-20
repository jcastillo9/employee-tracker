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
            name: "updateEmployee",
            message: "Which employee would you like to update?"
        },

        {
            type: "input",
            name: "updateRole",
            message: "What role do you want to update to?"
        }
    ])
    .then(result => {
        db.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [answer.updateRole, answer.updateEmployee], function(err, result) {
            if (err) throw err;
            console.table(result);
            firstQuestion();
        })
    })
}

module.exports = sequelize

