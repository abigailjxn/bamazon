const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "bootcamp_hw",
  password: "bopbop",
  database: "bamazon"
});

function displayInventory() {
  connection.query("SELECT * FROM products", function(error, result) {
    if (error) {
      throw error;
    }
    result.forEach(product => {
      let productValues = [
        [
          product.item_id,
          product.product_name,
          product.department_name,
          product.price,
          product.stock_quantity
        ]
      ];
      console.table(
        ["ID", "Product Name", "Department", "Price", "Stock"],
        productValues
      );
    });
  });
}

connection.connect(err => {
  if (err) {
    throw err;
  }
  displayInventory();
  connection.end;
});

// CLI begin
// display inventory
// choose item by ID (?)
// choose number of items
// if sufficient number
// add to cart
// deplete from inventory, reflect in database
// show total cost of purchase
// display inventory remaining
// begin input again

// else error message of insufficient number, return to item list
