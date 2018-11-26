DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE	bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR(255) NOT NULL,
price INT NOT NULL,
stock_quantity INT NOT NULL,
primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Potion', 'Healing', 100, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Phoenix Down', 'Healing', 300, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Tent', 'Healing', 600, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Ether', 'Healing', 500, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Excalibur', 'Weapons', 50000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Gunblade', 'Weapons', 70000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Chocobo Shield', 'Armor', 5000, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Une's Mirror", 'Special', 10000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Ribbon', 'Armor', 35000, 1);


SELECT * FROM products;