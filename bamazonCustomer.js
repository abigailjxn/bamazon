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

// display inventory
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

// Connect to database
connection.connect(err => {
  if (err) {
    throw err;
  }
  //   displayInventory();
  purchase();
  connection.end;
});

// CLI begin
function purchase() {
  connection.query("SELECT * FROM products", function(error, results) {
    if (error) throw error;
    inquirer
      .prompt([
        // choose item by ID (?)
        {
          name: "productChoice",
          type: "list",
          message:
            "Welcome to Bamazon (aka the Moogle Shop)! What would you like to buy?",
          choices: results.map(product => {
            return `Item ID: ${product.item_id}    ${
              product.product_name
            }     Price: ${product.price}     Stock: ${product.stock_quantity}`;
          })
        },

        // choose number of items to purchase
        {
          name: "stockChoice",
          type: "input",
          message: "How many would you like?",
          filter: function(userInput) {
            return parseInt(userInput);
          },
          validate: function(userInput) {
            if (isNaN(userInput) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        console.log(answer);
        insufficientStock(answer);
      });
  });
}

// if sufficient number
// deplete from inventory, reflect in database
// show total cost of purchase
// display inventory remaining
// begin input again

// else error message of insufficient number, return to item list
function insufficientStock(answer) {
    let productStr = answer.productChoice;
    // console.log(productStr);
    productStr.split(":");
    console.log(productStr[1]);
    connection.query("SELECT products.stock_quantity FROM products", function(error, res) {
        if (error) throw error;
        // console.log(res);
        let stockArr = res.map(product => {return product.stock_quantity});
        // console.log(stockArr);
        // if (
        //     product.stock_quantity <= 0 ||
        //     answer.stockChoice > product.stock_quantity
        //   ) {
        //     console.log(
        //       "Ack, kupo! I don't have that many! Please choose something else."
        //     );
        //     purchase();
        //   }
    })
  
}
