use the_office_db;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Accounting'),
    ('Operations');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Branch Manager', 80000, 1),
    ('Salesperson', 62500, 1),
    ('Customer Service Specialist', 30000, 1),
    ('Supply Relations', 37000, 1),
    ('Senior Accountant', 64000, 2),
    ('Accountant', 51000, 2),
    ('Quality Assurance Director', 40000, 3),
    ('Human Resource Representative', 60000, 3),
    ('Receptionist', 25000, 3),
    ('Warehouse Foreman', 60000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Scott', 1, NULL),
    ('Jim', 'Halpert', 2, 1),
    ('Dwight', 'Schrute', 2, 1),
    ('Pam', 'Beesly', 2, 1),
    ('Phyllis', 'Lapin', 2, 1),
    ('Andy', 'Bernard', 2, 1),
    ('Stanley', 'Hudson', 2, 1),
    ('Ryan', 'Howard', 2, 1),
    ('Kelly', 'Kapoor', 3, 1),
    ('Meredith', 'Palmer', 4, 1),
    ('Angela', 'Martin', 5, 1),
    ('Kevin', 'Malone', 6, 1),
    ('Oscar', 'Martinez', 6, 1),
    ('Creed', 'Bratton', 7, 1),
    ('Toby', 'Flenderson', 8, 1),
    ('Erin', 'Hannon', 9, 1),
    ('Darryl', 'Philbin', 10, 17);
