// code to build and initialize DB goes here
const { createCategory } = require("./categories");
const client = require("./client");
const {
  // other db methods
  createProduct,
  createUser,
  createOrder,
  createReview,
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
      address varchar(255),
      zip varchar(10),
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
      rating decimal DEFAULT 0,
      "isActive" boolean DEFAULT true,
      created_at timestamp DEFAULT now(),
      updated_at timestamp DEFAULT now()
    );

    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "isComplete" boolean DEFAULT false,
      email varchar(255) NOT NULL,
      phone varchar(255) NOT NULL,
      "deliveryAddress" varchar(255) NOT NULL,
      fullname varchar(255) NOT NULL,
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
    const u0 = await createUser(
      "nobody@noemail.com",
      "nopassword",
      "nowhere",
      "nozip",
      false,
      true
    );
    const u1 = await createUser(
      "test@test.com",
      "testtest",
      "3355 Test St Testerville, TS",
      "00000",
      true
    );
    const u2 = await createUser(
      "collin@test.com",
      "collintest",
      "33 Elm st Collin City, CF",
      "66600"
    );
    const u3 = await createUser(
      "danylo@test.com",
      "danylotest",
      "44 Marple st Danylo City, DV",
      "99900"
    );
    const u4 = await createUser(
      "thomas@test.com",
      "thomastest",
      "55 Oak st Thomas City, TK",
      "33300"
    );
    console.log("created users ------->", u1, u2, u3, u4);
    console.log("finished creating users");

    //creating categories
    console.log("starting create categories");
    const c1 = await createCategory("hoodies");
    const c2 = await createCategory("t-shirts");
    const c3 = await createCategory("long sleeves");
    console.log("created categories------->", c1, c2, c3);
    console.log("finished creating categories");

    const productsToCreate = [
      {
        categoryId: 1,
        title: "Super cool red hoodie",
        description:
          "This is super cool red hoodie will make you as cool as possible",
        price: 29,
        quantity: 100,
        imageUrl:
          "https://res.cloudinary.com/drwgcj7gc/image/upload/v1647461000/data-ts/red_hbhivr.webp",
      },
      {
        categoryId: 1,
        title: "Super cool yellow hoodie",
        description:
          "This is super cool eyes melting hoodie will make you the most hated person around",
        price: 21.99,
        quantity: 100,
        imageUrl:
          "https://res.cloudinary.com/drwgcj7gc/image/upload/v1647461140/data-ts/yellow_vhuuzc.webp",
      },
      {
        categoryId: 2,
        title: "Super cool black t-shirt",
        description:
          "Wanna be mysterious as a shadow? You know where to click (little tip - add to cart button)",
        price: 18.99,
        quantity: 100,
        imageUrl:
          "https://res.cloudinary.com/drwgcj7gc/image/upload/v1647461000/data-ts/black_j1evpz.webp",
      },
      {
        categoryId: 2,
        title: "Super cool green t-shirt",
        description:
          "If you are person of nature? So, dont't hesited byu this t-shirt",
        price: 18.99,
        quantity: 100,
        imageUrl:
          "https://res.cloudinary.com/drwgcj7gc/image/upload/v1647461000/data-ts/green_aah0u0.webp",
      },
      {
        categoryId: 3,
        title: "Super cool blue long sleeve",
        description:
          "What can we add in description? Nothing! Title tells by itself. Ladies and gentlements - blue long sleeve",
        price: 23.99,
        quantity: 100,
        imageUrl:
          "https://res.cloudinary.com/drwgcj7gc/image/upload/v1647461000/data-ts/blue_wbpafh.webp",
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
    console.log("created products------->", createdProducts);
    console.log("finished creating products");

    //creating orders
    console.log("starting to create order");
    const order1 = {
      userId: 1,
      email: "test1@test.com",
      address: "Super cool address to deliver 77777",
      phone: "312 312 3121",
      fullname: "Test Testerson",
      cart: [
        {
          productId: 1,
          price: 29.99,
          quantity: 2,
        },
        {
          productId: 3,
          price: 18.99,
          quantity: 1,
        },
      ],
    };
    const order2 = {
      userId: 2,
      email: "test2@test.com",
      address: "bum f* Oklahoma 00000",
      phone: "312 312 3112",
      fullname: "Easy Peazy",
      cart: [
        {
          userId: 2,
          productId: 2,
          price: 21.99,
          quantity: 1,
        },
        {
          productId: 4,
          price: 23.99,
          quantity: 1,
        },
      ],
    };
    const createdOrder1 = await createOrder(
      order1.cart,
      order1.userId,
      order1.email,
      order1.phone,
      order1.address,
      order1.fullname
    );
    const createdOrder2 = await createOrder(
      order2.cart,
      order2.userId,
      order2.email,
      order2.phone,
      order2.address,
      order2.fullname
    );
    console.log("order 1------->", createdOrder1);
    console.log("order 2------->", createdOrder2);
    console.log("finished to create order");

    //creating reviews
    console.log("starting to create reviews");
    const r1 = await createReview(
      1,
      1,
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, incidunt.",
      3
    );
    const r2 = await createReview(
      2,
      2,
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, incidunt.",
      4
    );
    const r3 = await createReview(
      3,
      1,
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, incidunt.",
      2
    );
    const r4 = await createReview(
      4,
      2,
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, incidunt.",
      5
    );
    console.log("created reviews------->", r1, r2, r3, r4);
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
