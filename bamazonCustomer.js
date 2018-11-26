const mysql = require("mysql");
const inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "bootcamp_hw",
  password: "bopbop",
  database: "bamazon"
});

connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log("connected!");
  function displayInventory() {
    connection.query("SELECT * FROM products", function (error, result){
        if (error){
            throw error;
        }
        result.forEach(product => {
            console.log(product.product_name);
        });
    })
}
  displayInventory();
  connection.end;
});

// function displayInventory() {
//     connection.query("SELECT * FROM products", function (error, result){
//         if (error){
//             throw error;
//             console.log(result);
//         }
//     })
// }

// displayInventory();

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
