const { getProductById } = require(".");
const client = require("./client");
const { createOrderProductMultiple } = require("./order_products");

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

async function createOrder(cart, userId) {
  //retrieve product price from DB and recreate our cart based on DB price data
  const productsPromise = cart.map(async (prod) => {
    const product = await getProductById(prod.productId);
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
        INSERT INTO orders("userId", "orderSum")
        VALUES ($1, $2)
        RETURNING *
      `,
      [userId, sum]
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
};
