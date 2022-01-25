const { client } = require("./");

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
            SELECT *
            FROM reviews
            WHERE "productId" = $1;
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
            WHERE "userId" = $1;
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
    return review;
  } catch (error) {
    throw error;
  }
}
async function updateReview(reviewData) {
  //should contain id of review and some update Data
  try {
    let updateStr = Object.keys(reviewData)
      .filter((key) => key !== "id")
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(", ");
    const {
      rows: [review],
    } = await client.query(
      `
            UPDATE  reviews
            SET ${updateStr}
            WHERE id = $1
            RETURNING *;
          `,
      Object.values(reviewData)
    );
    return review;
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
            DELETE FROM routines
            WHERE id = $1
            RETURNING *
      `,
      [reviewId]
    );
    return review;
  } catch (error) {
    console.log(error);
    throw error;
  }
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
