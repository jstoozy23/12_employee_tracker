-- SELECT *
-- FROM department
-- JOIN emp_role 
-- ON emp_role.department_id = department.id;

SELECT *
FROM emp_role
JOIN employee
ON employee.emp_role_ = emp_role.id

-- SELECT id, manager_id
-- FROM employee;

-- SELECT * 
-- FROM departments

-- SELECT *
-- FROM emp_role

SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, department.name, emp_role.salary, employee.manager_id 
AS manager 
FROM employees 
JOIN emp_role 
ON emp_role.id = employee.emp_role_id 
JOIN department 
ON department.id = emp_role.department_id 
JOIN employee manager 
ON manager.id = employee.manager_id;

SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, department.name, emp_role.salary, employee.manager_id AS manager FROM employee JOIN emp_role ON emp_role.id = employee.emp_role_id JOIN department ON department.id = emp_role.department_id JOIN employee manager ON manager.id = employee.manager_id