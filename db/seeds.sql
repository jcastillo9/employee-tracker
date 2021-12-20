INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO roles (title, salary, department)
VALUES  ("Sales Person", 80000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Accountant", 125000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
        ("Mike", "Chan", 1, 8),
        ("Kevin", "Tupuk", 3, 4),
        ("Tom", "Allen", 7, 4)
        ("Ashley", "Rodriguez", 2, null),
        ("Sarah", "Lourd", 6, null),
        ("Malia", "Brown", 5, 7),
        ("Kunal", "Singh", 4, null)
        ("John", "Doe", 1, null);