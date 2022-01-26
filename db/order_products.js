const client = require("./client");

async function getOrderProductById(id) {
  try {
    const { rows: orderProduct } = await client.query(
      `
        SELECT * FROM order_products
        WHERE id=$1;
          `,
      [id]
    );
    return orderProduct;
  } catch (error) {
    throw error;
  }
}
async function getOrderProductsByOrderId(id) {
  try {
    const { rows: orderProducts } = await client.query(
      `
        SELECT order_products.id as id, “orderId”, “productId”, order_products.price as price, order_products.quantity as quantity, sum, title, description
        FROM order_products JOIN products ON order_products."productId"=products.id
        WHERE "orderId"=$1;
            `,
      [id]
    );
    return orderProducts;
  } catch (error) {
    throw error;
  }
}

async function createOrderProduct(orderId, productId, quantity, price) {
  try {
    let sum = price * quantity;
    const { rows: orderProducts } = await client.query(
      `
            INSERT INTO order_products("orderId","productId",quantity,sum,price)
            VALUES($1,$2,$3,$4,$5)
            RETURNING *;
                `,
      [orderId, productId, quantity, sum, price]
    );
    return orderProducts;
  } catch (error) {
    throw error;
  }
}
async function createOrderProductMultiple(cart, orderId) {
  try {
    let orderProductsProm = await cart.map((product) => {
      return createOrderProduct(
        orderId,
        product.productId,
        product.quantity,
        product.price
      );
    });
    let orderProducts = await Promise.all(orderProductsProm);
    return orderProducts;
  } catch (err) {
    throw err;
  }
}
module.exports = {
  getOrderProductById,
  getOrderProductsByOrderId,
  createOrderProductMultiple,
};
