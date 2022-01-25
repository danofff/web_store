const apiRouter = require("express").Router();


//middleware

//check user authentication via jwt token
const checkAuthUser = require("../middleware/checkAuthUser");
apiRouter.use(checkAuthUser);

//importing routes
const usersRouter = require("./users");
const categoriesRouter = require("./categories");
const productsRouter = require("./products");
const ordersRouter = require("./orders");
const reviewsRouter = require("./reviews");

//attach routes to main apiRouter
apiRouter.use("/users", usersRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/reviws", reviewsRouter);

//temporary dummy route, then should get rid of it
apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

module.exports = apiRouter;
