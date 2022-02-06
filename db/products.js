const client = require("./client");

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
          SELECT products.*
          FROM products
          JOIN categories on products."categoryId" = categories.id
          WHERE products."isActive"=TRUE AND categories."isActive"=TRUE;
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
    const {
      rows: [product],
    } = await client.query(
      `
          INSERT INTO products("categoryId", title, description, price, quantity, "imageURL")
          VALUES($1, $2, $3, $4, $5, $6)
          RETURNING *;
              `,
      [categoryId, title, description, price, quantity, imageURL]
    );
    return product;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateProduct(productData) {
  //should contain id of product and some update Data
  try {
    const productId = productData.id;
    delete productData.id;
    let updateStr = Object.keys(productData)
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(", ");

    const {
      rows: [product],
    } = await client.query(
      `
          UPDATE products
          SET ${updateStr}, updated_at=now()
          WHERE id = $1
          RETURNING *;
         `,
      [productId, ...Object.values(productData)]
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
        SET "isActive"=false, updated_at=now()
        WHERE id = $1
        RETURNING *;
        `,
      [id]
    );
    return product;
  } catch (error) {
    console.log(error);
    throw error;
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
