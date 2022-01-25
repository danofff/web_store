const express = require("express");
const checkIsUserAdmin = require("../middleware/checkIsUserAdmin");
const categoriesRouter = express.Router();
const {
  getAllCategories,
  createCategory,
  deleteCategory,
} = require("../db/categories");

categoriesRouter.get("/", checkIsUserAdmin, async (req, res, next) => {
  try {
    const gettingCategories = getAllCategories();
    res.status(200).json(gettingCategories);
  } catch (error) {
    return next(error);
  }
});

categoriesRouter.post("/", checkIsUserAdmin, async (req, res, next) => {
  const { title } = req.params;
  try {
    const creatingCategory = await createCategory(title);
    res.status(200).json(creatingCategory);
  } catch (error) {
    return next(error);
  }
});

categoriesRouter.patch(
  "/:categoryId",
  checkIsUserAdmin,
  async (req, res, next) => {
    const { categoryId } = req.params;
    const { title } = req.body;
    try {
      const editCategory = await editCategories(categoryId, title);
      res.status(200).json(editCategory);
    } catch (error) {
      return next(error);
    }
  }
);
categoriesRouter.delete(
  "/:categoryId",
  checkIsUserAdmin,
  async (req, res, next) => {
    const { categoryId } = req.params;
    try {
      const deletedCategory = await deleteCategory(categoryId);
      res.status(200).json(deletedCategory);
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = categoriesRouter;
