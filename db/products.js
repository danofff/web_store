const { client } = require("./index");
async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
        SELECT * FROM products
        WHERE "isActive"=true;
      `);
    return products;
  } catch (error) {
    throw error;
  }
}
async function getAllProductsAdmin() {
  try {
    const { rows: products } = await client.query(`
          SELECT * FROM products;
        `);
    return products;
  } catch (error) {
    throw error;
  }
}
async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
              SELECT * FROM products
              WHERE id=$1;
          `,
      [id]
    );
    return product;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function getProductsByCategoryId(id) {
  try {
    const { rows: products } = await client.query(
      `
                SELECT * FROM products
                WHERE "categoryId"=$1
                AND "isActive"=true;
            `,
      [id]
    );
    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function createProduct(
  categoryId,
  title,
  description,
  price,
  quantity,
  imageURL
) {
  try {
    const { rows: products } = await client.query(
      `
                  INSERT INTO products("categoryId",title,description,price,quantity,"imageURL")
                  VALUES($1,$2,$3,$4,$5);
              `,
      [categoryId, title, description, price, quantity, imageURL]
    );
    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function updateProduct(updateData) {
  try {
    let updateStr = Object.keys(updateData)
      .filter((key) => key !== "id")
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(", ");

    const {
      rows: [product],
    } = await client.query(
      `
          UPDATE products
          SET ${updateStr}
          WHERE id = $1
          RETURNING *;
         `,
      Object.values(updateData)
    );

    return product;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function deleteProduct(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
                UPDATE products
                SET "isActive"=false
                WHERE id = $1
                RETURNING *;
               `,
      [id]
    );
    return product;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  getAllProducts,
  getAllProductsAdmin,
  getProductById,
  getProductsByCategoryId,
  createProduct,
  updateProduct,
  deleteProduct,
};
