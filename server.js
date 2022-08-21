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
        const {choices} = results;

        if(choices === 'View all employees') {
            viewEmployees();
        }

        if(choices === 'Add employee') {
            console.log((choices));
        }
        
        if(choices === 'Update employee role') {
            console.log((choices));
        }

        if(choices === 'View all roles') {
            viewRoles();
        }

        if(choices === 'Add role') {
            console.log((choices));
        }

        if(choices === 'View all departments') {
            viewDepartment();
        }

        if(choices === 'Add department') {
            console.log((choices));
        }

        if(choices === 'Quit') {
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

userPrompt();

  