const { client } = require("./index");
async function getAllCategories() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM categories;
    `);
    return rows;
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
  } catch (err) {
    console.log(err);
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
        SET title=$2
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
          SET "isActive"=false
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
  createCategory,
  editCategory,
  deleteCategory,
};
