const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer')


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

// THE MAIN PROMPT
const userPrompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'Add employee',
                'Update employee role',
                'View all roles',
                'Add role',
                'View all departments',
                'Add department',
                'Quit'
            ]
        }
    ])
        .then((results) => {
            const { choices } = results;

            if (choices === 'View all employees') {
                viewEmployees();
            }

            if (choices === 'Add employee') {
                addEmployee();
            }

            if (choices === 'Update employee role') {
                console.log((choices));
            }

            if (choices === 'View all roles') {
                viewRoles();
            }

            if (choices === 'Add role') {
                addRole();
            }

            if (choices === 'View all departments') {
                viewDepartment();
            }

            if (choices === 'Add department') {
                addDepartment();
            }

            if (choices === 'Quit') {
                console.log((choices));
            }

        })
}

// function to view the employees table
const viewEmployees = () => {
    // Query database
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        userPrompt();
    });
}

// function to view the roles table
const viewRoles = () => {
    // Query database
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
        userPrompt();
    });
}

// function to view the roles table
const viewDepartment = () => {
    // Query database
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        userPrompt();
    });
}

// Function to add a new department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'What is the department name?',
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return 'Input is required!'
                }
            },
        }
    ]).then((response) => {
        const { results } = response
        db.query('INSERT INTO department(name) VALUES (result)', function (err, results) {
            console.log(results);
            userPrompt();
        });
    })
}

// function to add a new role
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the name of the role?',
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return 'Input is required!'
                }
            },
        },
        {
            type: 'input',
            name: 'newSalery',
            message: 'What is their salery?',
            validate: (value) => {
                if (value === num) {
                    return true
                } else {
                    return 'Input is required!'
                }
            },
        }
    ])
}

// function to add a new employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the department name?',
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return 'Input is required!'
                }
            },
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the department name?',
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return 'Input is required!'
                }
            },
        },
    ])
}

userPrompt();

