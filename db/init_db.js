// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    console.log("Starting to drop tables");
    await client.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS categories;
    `);
    console.log("Finished dropping tables");

    console.log("Starting creating tables");
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      email varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL,
      "isAdmin" boolean Default false
    );

    CREATE TABLE categories(
      id SERIAL PRIMARY KEY,
      title varchar(255) UNIQUE NOT NULL,
      "isActive" boolean Default true
    );

    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      "categoryId" INTEGER REFERENCES categories(id),
      title varchar(255) UNIQUE,
      description text,
      price decimal NOT NULL,
      quantity integer,
      "imageURL" text,
      "isActive" boolean DEFAULT true
    );

    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "isComplete" boolean Default false
    );

    CREATE TABLE order_products(
      id SERIAL PRIMARY KEY,
      "orderId" INTEGER REFERENCES orders(id),
      "productId" INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL,
      sum decimal,
      price decimal
    );

    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "reviewText" text,
      "userId" INTEGER REFERENCES users(id),
      "starRating" INTEGER,
      UNIQUE ("productId","userId"),
      CHECK ("starRating" > -1 AND "starRating" < 6)
    );

    `);
    console.log("Finished creating tables");
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
