const client = require("./client");

async function getAllCategories() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM categories
      WHERE "isActive" = TRUE;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllCategoriesAdmin() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM categories;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getCategoryById(id) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
      SELECT * FROM categories
      WHERE id=$1
    `,
      [id]
    );
    return category;
  } catch (error) {
    throw error;
  }
}

async function createCategory(title) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
      INSERT INTO categories(title)
      VALUES ($1)
      RETURNING *;
      `,
      [title]
    );
    return category;
  } catch (error) {
    console.log(error);
    throw err;
  }
}

async function editCategory(id, title) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
        UPDATE categories
        SET title=$2, updated_at=now()
        WHERE id=$1
        RETURNING *;
        `,
      [id, title]
    );
    return category;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteCategory(id) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
          UPDATE categories
          SET "isActive"=false, updated_at=now()
          WHERE id=$1
          RETURNING *;
          `,
      [id]
    );
    return category;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  getAllCategories,
  getAllCategoriesAdmin,
  getCategoryById,
  createCategory,
  editCategory,
  deleteCategory,
};
