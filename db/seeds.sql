INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
        ("Senior-Engineer", 125000, 2),
        ("Junior-Engineer", 100000, 2),
        ("Accountant", 120000, 3),
        ("Lawyer", 190000, 4);
        

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Fred", "Kamm", 1, NULL),
        ("Stacy", "Jones", 2, NULL),
        ("John", "Smith", 3, 2),
        ("Steph", "Curry", 4, 3);