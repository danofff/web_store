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
  getCategoryById,
} = require("../db");

productsRouter.get("/", async (req, res, next) => {
  try {
    let activeProducts = await getAllProducts();
    res.status(200).json({ products: activeProducts });
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
    res.status(200).json({ product: singleProduct });
  } catch (error) {
    console.log(error);
    error.message = "Sorry, but we cannot get this product";
    return next(error);
  }
});

productsRouter.get("/categories/:categoryId", async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const products = await getProductsByCategoryId(categoryId);
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    error.message = "Sorry, but we cannot get the products";
    return next(error);
  }
});

productsRouter.post("/", checkIsUserAdmin, async (req, res, next) => {
  const { categoryId, title, description, price, quantity, imageURL } =
    req.body;

  try {
    //check if category is active
    const category = await getCategoryById(categoryId);

    if (!(category && category.isActive)) {
      throw new Error("You can't use this category to add the product");
    }

    const product = await createProduct(
      categoryId,
      title,
      description,
      price,
      quantity,
      imageURL
    );
    res.status(200).json({ product });
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
      const updatedProduct = await updateProduct({
        id: productId,
        title,
        description,
        price,
        quantity,
        imageURL,
      });
      res.status(200).json({ product: updatedProduct });
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
      res.status(200).json({ product: deletedProduct });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = productsRouter;


