// Connect to DB
const { Client } = require("pg");
const DB_NAME = "change-this-name";
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/GraceShopper`;
const client = new Client(DB_URL);

// export
module.exports = {
  client,
  ...require("./users"),
  ...require("./categories"),
  ...require("./products"),
  ...require("./order_products"),
  ...require("./orders"),
  ...require("./reviews"),
};
