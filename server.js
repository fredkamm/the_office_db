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
                console.log('Viewing current employees');
                viewEmployees();
            }

            if (choices === 'Add employee') {
                addEmployee();
            }

            if (choices === 'Update employee role') {
                console.log((choices));
            }

            if (choices === 'View all roles') {
                console.log('Viewing current roles');
                viewRoles();
            }

            if (choices === 'Add role') {
                addRole();
            }

            if (choices === 'View all departments') {
                console.log('Viewing current departments');
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

    db.query('SELECT * FROM employee', function (err, choices) {
        console.table(choices);
        userPrompt();
    });
}

// function to view the roles table
const viewRoles = () => {

    db.query('SELECT * FROM roles', function (err, choices) {
        console.table(choices);
        userPrompt();
    });
}

// function to view the roles table
const viewDepartment = () => {

    db.query('SELECT * FROM department', function (err, choices) {
        console.table(choices);
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
        db.query('INSERT INTO department(name) VALUES(?)', response.newDepartment, function (err, results) {
            console.log('Added ' + response.newDepartment + ' to the department database')
            userPrompt();
        });
    })
}

// function to add a new role
const addRole = () => {

    const departments = [];
    // retrieving the data for the departments table to use in the prompt
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;

        res.forEach(dep => {
            let depo = {
                name: dep.name,
                value: dep.id
            }
            departments.push(depo)
        })

    });

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
            name: 'newSalary',
            message: 'What is their salery?',
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return 'Input is required!'
                }
            },
        },
        {
            type: 'list',
            name: 'selectDepo',
            message: 'What department is this role in?',
            choices: departments,
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return 'Input is required!'
                }
            },
        },
    ]).then((response) => {

        db.query('INSERT INTO roles(title, salary, department_id) VALUES(?)', 
        [[response.newRole, response.newSalary, response.selectDepo]],            function (err, response) {
            if (err) throw err;
            console.log(`Successfully added ${response.newRole} to the database`);
            userPrompt();
            });
    })
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

