INSERT INTO department (name)
VALUES ("sales"),
       ("engineering"),
       ("finance"),
       ("legal");

INSERT INTO emp_role (title, salary, department_id)
VALUES ("salesperson", 80000, 1),
       ("lead engineer", 150000, 2),
       ("software engineer", 120000, 2),
       ("account manager", 160000, 1),
       ("accountant", 125000, 3),
       ("legal team lead", 250000, 4),
       ("lawyer", 190000, 4),
       ("sales manager", 125000, 1),
       ("engineering manager", 200000, 2),
       ("finance manager", 150000, 3),
       ("legal manager", 225000, 4);

INSERT INTO employee (first_name, last_name, emp_role_id, manager_id)
VALUES ("mike", "chan", 8, null),
       ("ashley", "rodriguez", 9, null),
        ("jim", "bohanan", 10, null),
        ("kevin", "cuene", 11, null),
        ("tom", "kaps", 5, 3),
        ("jessica", "smith", 6, 4),
        ("george", "alto", 7, 4),
         ("jeff", "borowitz", 1, 1),
        ("damon", "schneider", 2, 2),
        ("tyler", "regal", 3, 2),
        ("sarah", "gallow", 4, 1)
       