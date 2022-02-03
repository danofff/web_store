const orderRouter = require("express").Router();
const {
  getAllOrders,
  createOrder,
  getOrderProductsByOrderId,
  getOrdersByUserId,
  getOrderById,
} = require("../db/");
const checkUser = require("../middleware/checkUser");
const checkIsUserAdmin = require("../middleware/checkIsUserAdmin");

orderRouter.get("/", checkIsUserAdmin, async (req, res, next) => {
  try {
    const allOrders = await getAllOrders();
    res.status(200).json({ orders: allOrders });
  } catch (error) {
    next(error);
  }
});

orderRouter.get("/users/:userId", checkUser, async (req, res, next) => {
  const { userId } = req.params;
  try {
    if (req.user.id !== +userId && !req.user.isAdmin) {
      throw new Error("You are not allowed to check not yours orders");
    }
    let orders = await getOrdersByUserId(userId);
    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
});

orderRouter.get("/:orderId", checkUser, async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const order = await getOrderById(orderId);
    if (!order) {
      throw new Error("No such order");
    }
    if (order.userId !== req.user.id && !req.user.isAdmin) {
      throw new Error("You are not allowed check not yours order");
    }
    let orderProd = await getOrderProductsByOrderId(orderId);
    res.status(200).json({ order: { ...order, products: orderProd } });
  } catch (error) {
    next(error);
  }
});

orderRouter.post("/", async (req, res, next) => {
  try {
    //Check that every item in cart has Prouduct.id,product.quantity, and product.price
    //order id is created in the first step of creatOrder function
    //the req.body should be a cart of items assuming cart will be an array
    let errorMessage = "";
    const { cart, address, email, phone, fullname } = req.body;
    cart.forEach((orderItem, index) => {
      if (!orderItem.productId)
        errorMessage =
          errorMessage + `Cart Item ${index} is Mising product id, `;
      if (!orderItem.quantity)
        errorMessage = errorMessage + `Cart Item ${index} is Mising quantity, `;
      if (!orderItem.price)
        errorMessage = errorMessage + `Cart Item ${index} is Mising price, `;
    });
    if (errorMessage.length) throw new Error(errorMessage);

    //don't check if user authenticated, if it's a guest, so use dummy user id instead
    let userId = req.user && req.user.id ? req.user.id : 0;

    const createdOrder = await createOrder(
      cart,
      userId,
      email,
      phone,
      address,
      fullname
    );
    res.status(200).json({ order: createdOrder });
  } catch (error) {
    next(error);
  }
});
//need a delete and update order routes?

module.exports = orderRouter;
