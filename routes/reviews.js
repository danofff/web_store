const reviewRouter = require("express").Router();
const { getProductById } = require("../db/products");
const {
  getAllReviews,
  getReviewsByProductId,
  getReviewsByUserId,
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../db/reviews");
const checkUser = require("../middleware/checkUser");

reviewRouter.get("/", async (req, res, next) => {
  try {
    const allReviews = await getAllReviews();
    res.status(200).json(allReviews);
  } catch (error) {
    next(error);
  }
});

reviewRouter.get("/users", checkUser, async (req, res, next) => {
  try {
    const allReviewsByUser = await getReviewsByUserId(req.user.id);
    const reviewsToSend = allReviewsByUser.map((review) => {
      const username = review.userEmail.split("@")[0];
      delete review.userEmail;
      return {
        ...review,
        username,
      };
    });
    res.status(200).json(reviewsToSend);
  } catch (error) {
    next(error);
  }
});

reviewRouter.get("/:productId", async (req, res, next) => {
  try {
    //check if that product exists first?
    const allReviewsOfProduct = await getReviewsByProductId(
      req.params.productId
    );

    const reviewsToSend = allReviewsOfProduct.map((review) => {
      const username = review.userEmail.split("@")[0];
      delete review.userEmail;
      return {
        ...review,
        username,
      };
    });
    res.status(200).json(reviewsToSend);
  } catch (error) {
    next(error);
  }
});

reviewRouter.post("/", checkUser, async (req, res, next) => {
  try {
    //createReview needs productId,userId,reviewText,and starRating
    let userId = req.user.id;
    let productId = req.body.productId;
    let reviewText = req.body.reviewText;
    let starRating = req.body.starRating || 0;

    //optional - verify user has purchased product before review?
    if (!productId) throw new Error("productId must be submitted!");
    if (!reviewText) throw new Error("userId must be submitted!");

    const product = await getProductById(productId);

    if (!product.isActive) {
      throw new Error("You can not add review to not active product");
    }

    let createdReview = await createReview(
      productId,
      userId,
      reviewText,
      starRating
    );
    res.status(200).json({ review: createdReview });
  } catch (error) {
    next(error);
  }
});

reviewRouter.patch("/", checkUser, async (req, res, next) => {
  try {
    let reviewDataToUpdate = {};
    //verify review Id submitted in body
    reviewDataToUpdate.id = req.body.reviewId;
    if (!reviewDataToUpdate.id) throw new Error("Review Id must be submitted");
    let reviewToEdit = await getReviewById(reviewDataToUpdate.id);
    //check if review even exits that they are trying to edit
    if (!reviewToEdit) throw new Error("No review with that review id exits!");
    //checks if user owns review they are attempting to edit
    if (reviewToEdit.userId !== req.user.id)
      throw new Error("You must own a review to edit it!");
    //updateReview needs reviewId optional reviewText,and starRating
    reviewDataToUpdate.starRating = req.body.starRating;
    reviewDataToUpdate.reviewText = req.body.reviewText;
    //check that there is some data to edit
    if (!reviewDataToUpdate.starRating && !reviewDataToUpdate.reviewText)
      throw new Error("You must submit some data to update!");
    let updatedReview = await updateReview(reviewDataToUpdate);
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
});

reviewRouter.delete("/", checkUser, async (req, res, next) => {
  try {
    if (!req.body.reviewId) throw new Error("Review Id must be submitted");
    //check if they own the review they are trying to delete
    let reviewToDelete = await getReviewById(req.body.reviewId);
    if (reviewToDelete.userId != req.user.id)
      throw new Error("You must own a review to delete it!");
    let deletedReview = await deleteReview(req.body.reviewId);
    res.status(200).json(deletedReview);
  } catch (err) {
    next(err);
  }
});

module.exports = reviewRouter;
