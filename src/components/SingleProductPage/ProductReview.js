import classes from "./ProductReview.module.css";
import Button from "../ui/Button/Button";

const ReviewPage = () => {
  const review = useSelector(state=>state.data.reviews[0]);
  return (
    <div>
      <h4 className={classes.title}>Reviews</h4>
      <div className={classes.description} >
        <p className={classes.reviewStarRating}>{review.starRating}</p>
        <div className={classes.reviewDescription}>
          <p className={classes.userId}>{review.userId}</p>
          <p className={classes.reviewStarRating}>{review.starRating}</p>
          <p className={classes.description}>{review.reviewText}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;