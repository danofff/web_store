const { getAllOrders, createOrder } = require("../db/orders");
const { getOrderProductsByOrderId } = require("../db/order_products");
const orderRouter = require("express").Router();
const checkUser = require("../middleware/checkUser");

orderRouter.get("/", async (req, res, next) => {
  try {
    const allOrders = await getAllOrders();
    res.status(200).json(allOrders);
  } catch (error) {
    next(error);
  }
});
orderRouter.get("/:userId", checkUser, async (req, res, next) => {
  try {
    let orders = await getOrdersByUserId(req.params.userId);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});
orderRouter.get("/:orderId", checkUser, async (req, res, next) => {
  try {
    let orders = await getOrderProductsByOrderId(req.params.orderId);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});
orderRouter.post("/", checkUser, async (req, res, next) => {
  try {
    //Check that every item in cart has Prouduct.id,product.quantity, and product.price
    //order id is created in the first step of creatOrder function
    //the req.body should be a cart of items assuming cart will be an array
    let errorMessage = "";
    let cart = req.body;
    cart.forEach((orderItem, index) => {
      if (!orderItem.product.id)
        errorMessage =
          errorMessage + `Cart Item ${index} is Mising product id, `;
      if (!orderItem.product.quantity)
        errorMessage = errorMessage + `Cart Item ${index} is Mising quantity, `;
      if (!orderItem.product.price)
        errorMessage = errorMessage + `Cart Item ${index} is Mising price, `;
    });
    if (errorMessage.length) throw new Error(errorMessage);
    const createdOrder = await createOrder(req.body, req.user.id);
    res.status(200).json(createdOrder);
  } catch (error) {
    next(error);
  }
});
//need a delete and update order router?

module.exports = orderRouter;
