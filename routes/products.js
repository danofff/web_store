const express = require("express");
const checkIsUserAdmin = require("../middleware/checkIsUserAdmin");
const productsRouter = express.Router();
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
} = require("../db");

productsRouter.get("/", async (req, res, next) => {
  try {
    let activeProducts = await getAllProducts();
    res.status(200).json(activeProducts);
  } catch (error) {
    console.log(error);
    error.message = "Sorry, but we cannot get the products";
    return next(error);
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const singleProduct = await getProductById(productId);
    res.status(200).json(singleProduct);
  } catch (error) {
    console.log(error);
    error.message = "Sorry, but we cannot get the products";
    return next(error);
  }
});

productsRouter.get("/categories/:categoryId", async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const products = await getProductsByCategoryId(categoryId);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    error.message = "Sorry, but we cannot get the products";
    return next(error);
  }
});

productsRouter.post("/", checkIsUserAdmin, async (req, res, next) => {
  const { title, description, price, quantity, imageURL } = req.body;
  try {
    let product = await createProduct({
      title,
      description,
      price,
      quantity,
      imageURL,
    });
    res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
});

productsRouter.patch(
  "/:productId",
  checkIsUserAdmin,
  async (req, res, next) => {
    const { productId } = req.params;
    const { title, description, price, quantity, imageURL } = req.body;
    try {
      const product = await getProductById(productId);
      if (!product) {
        throw new Error(`Product with ${productId} doest not exist`);
      }
      const updatingProduct = await updateProduct({
        title,
        description,
        price,
        quantity,
        imageURL,
      });
      res.status(200).json(updatingProduct);
    } catch (error) {
      return next(error);
    }
  }
);

productsRouter.delete(
  "/:productId",
  checkIsUserAdmin,
  async (req, res, next) => {
    const { productId } = req.params;
    try {
      const product = await getProductById(productId);
      if (!product) {
        throw new Error(`Sorry, product with id ${productId} does not exist`);
      }
      const deletedProduct = await deleteProduct(productId);
      res.status(200).json(deletedProduct);
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = productsRouter;
