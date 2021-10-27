USE employees_DB;

INSERT INTO department (name)
VALUES ('Sales'), ('Human Resources'), ('Legal'), ('IT');

INSERT role (title, salary, department_id)
VALUES ('Sales Manager', 110000, 1), ('Sales Rep', 70000, 1), ('HR Manager', 150000, 2), ('HR assistant', 70000, 2), ('Lawyer', 125000, 3), ('Engineering Lead', 150000, 4), ('Web Developer', 120000, 4);

INSERT employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Stone', 010, null), ('Patrick', 'Randolph', 030, null), ('Jackie', 'Haidar', 050, null), ('Lizbeth', 'Licon', null), ('Jerry', 'Vazquez', 090, 4), ('Melissa', 'Land', 089, 5), ('Tim', 'Curtis', 078, 3), ('Manuel', 'Moreno', 036, 2);






