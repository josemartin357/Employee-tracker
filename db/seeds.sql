USE employees_DB;

INSERT INTO department (name)
VALUES ('Sales'), ('Human Resources'), ('Legal'), ('IT');

INSERT role (title, salary, department_id)
VALUES ('Sales Manager', 110000, 1), ('Sales Rep', 70000, 1), ('HR Manager', 150000, 2), ('HR assistant', 70000, 2), ('Lawyer', 125000, 3), ('Engineering Lead', 150000, 4), ('Web Developer', 120000, 4);

INSERT employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Stone', 1, null), ('Patrick', 'Randolph', 3, null), ('Jackie', 'Haidar', 5, null), ('Lizbeth', 'Licon', 2,null), ('Jerry', 'Vazquez', 4, 4), ('Melissa', 'Land', 6, 5), ('Tim', 'Curtis', 7, 3), ('Manuel', 'Moreno', 6, 2);






