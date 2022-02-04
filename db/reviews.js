const client = require("./client");
const { updateProduct } = require("./products");

async function getAllReviews() {
  try {
    const { rows: reviews } = await client.query(
      `
            SELECT *
            FROM reviews;
          `,
      [id]
    );
    return reviews;
  } catch (error) {
    throw error;
  }
}

async function getReviewsByProductId(productId) {
  try {
    const { rows: reviews } = await client.query(
      `
            SELECT reviews.*, users.email as "userEmail"
            FROM reviews
            JOIN users ON users.id = reviews."userId"
            WHERE "productId" = $1
            ORDER BY reviews.updated_at DESC;
          `,
      [productId]
    );
    return reviews;
  } catch (error) {
    throw error;
  }
}

async function getReviewsByUserId(userId) {
  try {
    const { rows: reviews } = await client.query(
      `
            SELECT *
            FROM reviews
            WHERE "userId" = $1
            SORT BY updated_at ASC;
          `,
      [userId]
    );
    return reviews;
  } catch (error) {
    throw error;
  }
}

async function getReviewById(reviewId) {
  try {
    const { rows: review } = await client.query(
      `
            SELECT *
            FROM reviews
            WHERE id = $1;
          `,
      [reviewId]
    );
    return review;
  } catch (error) {
    throw error;
  }
}

async function createReview(productId, userId, reviewText, starRating) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            INSERT INTO reviews ("productId", "userId", "reviewText", "starRating")
            VAlUES ($1, $2, $3, $4) 
            RETURNING *;
          `,
      [productId, userId, reviewText, starRating]
    );
    const product = await _recalculateProductRate(review.productId);
    return { review, product };
  } catch (error) {
    throw error;
  }
}
async function updateReview(reviewData) {
  //should contain id of review and some update Data
  try {
    const reviewId = reviewData.id;
    delete reviewData.id;
    let updateStr = Object.keys(reviewData)
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(", ");

    const {
      rows: [review],
    } = await client.query(
      `
            UPDATE reviews
            SET ${updateStr}
            WHERE id = $1
            RETURNING *;
          `,
      [reviewId, ...Object.values(reviewData)]
    );

    const product = await _recalculateProductRate(review.productId);
    return { review, product };
  } catch (error) {
    throw error;
  }
}

async function deleteReview(reviewId) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            DELETE FROM reviews
            WHERE id = $1
            RETURNING *
      `,
      [reviewId]
    );
    const product = await _recalculateProductRate(review.productId);
    return { review, product };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function _recalculateProductRate(productId) {
  const {
    rows: [ratingData],
  } = await client.query(
    `
            SELECT sum("starRating") as sum, count(id) as count
            FROM reviews
            WHERE "productId" = $1
            GROUP BY "productId"
      `,
    [productId]
  );
  const avgRating = ratingData.sum / ratingData.count;
  const updatedProduct = await updateProduct({
    id: productId,
    rating: avgRating,
  });
  return updatedProduct;
}
module.exports = {
  getAllReviews,
  getReviewsByProductId,
  getReviewsByUserId,
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
};
