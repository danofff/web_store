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
  //retrive product price from DB and recreate our cart based on DB price data

  //calculate sum of order and add sum of order to order table
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders("userId")
        VALUES ($1)
        RETURNING *
      `,
      [userId]
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
