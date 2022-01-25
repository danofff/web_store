const apiRouter = require("express").Router();

apiRouter.use("/order", require("./order.js"));
apiRouter.use("/review", require("./review"));

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

module.exports = apiRouter;
