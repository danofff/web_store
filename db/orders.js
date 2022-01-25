const { client } = require("./index");
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

async function getOrdersByUserId(userId){
  try {
    const { rows: orders } = await client.query(`
        SELECT * 
        FROM orders 
        WHERE "userId" = $1;
      `), [userId];
    return orders;
  } catch (error) {
    throw error;
  }
}

async function createOrder(cart, userId) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders("userId")
        VALUES "userId"=$1
      `,
      [userId]
    );
    const orderProducts = await createOrderProductMultiple(cart, order.id);
    return orderProducts;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllOrders,
  createOrder,
  getOrdersByUserId
};
