const { createOrderProductMultiple } = require("./order_products");
const { getProductById } = require("./products");
const client = require("./client");

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
        SELECT * FROM orders;
      `);
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByUserId(userId) {
  try {
    const { rows: orders } = await client.query(
      `
        SELECT * 
        FROM orders 
        WHERE "userId" = $1;
      `,
      [userId]
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        SELECT *
        FROM orders
        WHERE id=$1
       `,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function createOrder(cart, userId, phone, address, fullname) {
  //retrieve product price from DB and recreate our cart based on DB price data
  // console.log("this is cart", cart);
  const productsPromise = cart.map(async (prod) => {
    const product = await getProductById(prod.productId);
    if (!product) {
      throw new Error(
        `Product with product id ${prod.productId} does not exist`
      );
    }

    //checking if enough product quantity left
    if (product.quantity < prod.quantity) {
      throw new Error(
        "Dude, dont be greedy! We dont have that many products in stock"
      );
    }
    const mappedProduct = {
      productId: product.productId,
      price: product.price,
      quantity: prod.quantity,
    };
    return mappedProduct;
  });
  const checkedCart = await Promise.all(productsPromise);
  const sum = checkedCart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  //calculate sum of order and add sum of order to order table
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders("userId", "orderSum", phone, "deliveryAddress", fullname)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `,
      [userId, sum, phone, address, fullname]
    );

    const orderProducts = await createOrderProductMultiple(cart, order.id);

    //update product in products table, for every product in cart substract this quantity from producs table quantity
    return orderProducts;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllOrders,
  createOrder,
  getOrdersByUserId,
  getOrderById,
};
