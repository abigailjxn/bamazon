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
  purchase();
  connection.end;
});

// CLI begin
function purchase() {
    displayInventory();
  connection.query("SELECT * FROM products", function(error, results) {
    if (error) throw error;
    inquirer
      .prompt([
        // choose item to purchase
        {
          name: "productChoice",
          type: "list",
          message:
            "Welcome to Bamazon (aka the Moogle Shop)! What would you like to buy?",
          choices: results.map(product => {
            return product.product_name;
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

        compareStock(answer);
      });
  });
}

function compareStock(answer) {
  connection.query("SELECT * FROM products", function(error, results) {
    let chosenItem;
    if (error) throw error;

    for (let i = 0; i < results.length; i++) {
      if (results[i].product_name === answer.productChoice) {
        chosenItem = results[i];
      }
    }
    let databaseStock = chosenItem.stock_quantity;
    console.log(chosenItem);
    console.log(databaseStock);

    // if insufficient number in stock , error message and return to item list
    if (databaseStock <= 0 || answer.stockChoice > databaseStock) {
      console.log(`
             ●
         ʕo⌒ᴥ⌒ʔ ✎
        ===================
            MOOGLE STORE


        Ack, kupo! I don't have that many! Please choose something else.
        
        `);
    // begin input again
    purchase();
    }

    //   if sufficient number
    else {
      let newDatabaseStock = databaseStock - answer.stockChoice;
      let totalCost = answer.stockChoice * chosenItem.price;
      // deplete from inventory, reflect in database
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newDatabaseStock
          },
          {
              item_id: chosenItem.item_id
          }
        ],
        // show total cost of purchase
        function(error) {
          if (error) throw error;
          console.log(`
                        ●
                    ʕo⌒ᴥ⌒ʔ ✎
                    ===================
                        MOOGLE STORE
       
       
                    Thank you for your purchase, kupo!
               
                    Your total is: ${totalCost}
               `);
               console.log(`
                    Store Stock Remaining: ${newDatabaseStock}


                `)
        // begin input again
        purchase();
        }
      );
    }
  });
}
