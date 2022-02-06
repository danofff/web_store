const { createOrderProductMultiple } = require("./order_products");
const { getProductById, updateProduct } = require("./products");
const client = require("./client");

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
        SELECT * FROM orders
        ORDER BY created_at ASC
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

async function createOrder(cart, userId, email, phone, address, fullname) {
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

    //update quantity of product in storage
    await updateProduct({
      id: prod.productId,
      quantity: product.quantity - prod.quantity,
    });

    //create mapped object
    const mappedProduct = {
      productId: product.productId,
      price: product.price,
      quantity: prod.quantity,
    };
    return mappedProduct;
  });
  const checkedCart = await Promise.all(productsPromise);
  const sum =
    Math.round(
      checkedCart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0) * 100
    ) / 100;

  //calculate sum of order and add sum of order to order table
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders("userId", "orderSum", email, phone, "deliveryAddress", fullname)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `,
      [userId, sum, email, phone, address, fullname]
    );

    const orderProducts = await createOrderProductMultiple(cart, order.id);

    //update product in products table, for every product in cart substract this quantity from producs table quantity
    return orderProducts;
  } catch (error) {
    throw error;
  }
}

async function updateOrder(orderId, status) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
    UPDATE orders
    SET "isComplete" = $1
    WHERE id = $2
    RETURNING*
  `,
      [status, orderId]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllOrders,
  createOrder,
  getOrdersByUserId,
  getOrderById,
  updateOrder,
};
