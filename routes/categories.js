const express = require("express");
const checkIsUserAdmin = require("../middleware/checkIsUserAdmin");
const categoriesRouter = express.Router();
const {
  getAllCategories,
  createCategory,
  editCategory,
  deleteCategory,
} = require("../db/categories");

categoriesRouter.get("/", checkIsUserAdmin, async (req, res, next) => {
  try {
    const gettingCategories = await getAllCategories();
    res.status(200).json({ categories: gettingCategories });
  } catch (error) {
    return next(error);
  }
});

categoriesRouter.post("/", checkIsUserAdmin, async (req, res, next) => {
  const { title } = req.body;
  try {
    if (!title || title.length < 3) {
      throw new Error("Category title must be at least 3 characters long");
    }
    const creatingCategory = await createCategory(title);
    res.status(200).json({ category: creatingCategory });
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
      const editedCategory = await editCategory(categoryId, title);
      res.status(200).json({ category: editedCategory });
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
      res.status(200).json({ category: deletedCategory });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = categoriesRouter;
