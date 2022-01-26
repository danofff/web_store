// code to build and initialize DB goes here
const { createCategory } = require("./categories");
const {
  client,
  // other db methods
  createProduct,
  createUser,
} = require("./");

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
      "isAdmin" boolean DEFAULT false,
      created_at timestamp DEFAULT now()
    );

    CREATE TABLE categories(
      id SERIAL PRIMARY KEY,
      title varchar(255) UNIQUE NOT NULL,
      "isActive" boolean DEFAULT true,
      created_at timestamp DEFAULT now(),
      updated_at timestamp DEFAULT now()
    );

    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      "categoryId" INTEGER REFERENCES categories(id),
      title varchar(255) UNIQUE,
      description text,
      price decimal NOT NULL,
      quantity integer,
      "imageURL" text,
      "isActive" boolean DEFAULT true,
      created_at timestamp DEFAULT now(),
      updated_at timestamp DEFAULT now()
    );

    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "isComplete" boolean DEFAULT false,
      "orderSum" decimal,
      created_at timestamp DEFAULT now(),
      updated_at timestamp DEFAULT now()
    );

    CREATE TABLE order_products(
      id SERIAL PRIMARY KEY,
      "orderId" INTEGER REFERENCES orders(id),
      "productId" INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL,
      price decimal,
      sum decimal,
      created_at timestamp DEFAULT now(),
      updated_at timestamp DEFAULT now()
    );

    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "reviewText" text,
      "userId" INTEGER REFERENCES users(id),
      "starRating" INTEGER,
      created_at timestamp DEFAULT now(),
      updated_at timestamp DEFAULT now(),
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
    //creating users
    console.log("starting to create users");
    await createUser("test@test.com", "testtest");
    await createUser("collin@test.com", "collintest");
    await createUser("danylo@test.com", "danylotest");
    await createUser("thomas@test.com", "thomastest");
    console.log("finished creating users");

    //creating categories
    console.log("starting create categories");
    await createCategory("hoodies");
    await createCategory("t-shirts");
    await createCategory("long sleevs");
    console.log("finished creating categories");

    const productsToCreate = [
      {
        categoryId: 1,
        title: "Super cool red hoodie",
        description:
          "This is super cool red hoodie will make you as cool as possible",
        price: 29.99,
        quantity: 100,
        imageUrl:
          "https://www.gapfactory.com/webcontent/0017/282/914/cn17282914.jpg",
      },
      {
        categoryId: 1,
        title: "Super cool yellow hoodie",
        description:
          "This is super cool eyes melting hoodie will make you the most hated person around",
        price: 24.99,
        quantity: 100,
        imageUrl:
          "http://cdn.shopify.com/s/files/1/0035/1309/0115/products/Heavyweight-Recycled-Cotton-Hoodie-Saffron-Yellow-1.jpg?v=1627551660",
      },
      {
        categoryId: 2,
        title: "Super cool black t-shirt",
        description:
          "Wanna be misterious as a shadow? You know where to click (little tip - add to cart button)",
        price: 24.99,
        quantity: 100,
        imageUrl:
          "https://pyxis.nymag.com/v1/imgs/8f2/9c4/c95d85e1b7750cee91df7a7d5db3e355a9-13-black-tshirt-jcrew.2x.rhorizontal.w600.jpg",
      },
      {
        categoryId: 3,
        title: "Super cool blue long sleeve",
        description:
          "What can we add in description? Nothing! Title tells by itself. Ladies and gentlements - blue long sleeve",
        price: 24.99,
        quantity: 100,
        imageUrl:
          "https://cdn.hanes.com/catalog/product/H/N/HNS_5546/HNS_5546_DeepRoyal_Front.jpg?optimize=high&auto=webp&quality=85,65&fit=cover&width=700",
      },
    ];

    //creating products
    console.log("starting to create products");
    const createdProducts = await Promise.all(
      productsToCreate.map((product) =>
        createProduct(
          product.categoryId,
          product.title,
          product.description,
          product.price,
          product.quantity,
          product.imageUrl
        )
      )
    );
    console.log("finished creating products");
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
