import { cartActions } from "../../store/cartState/cartSlice";
import { useDispatch } from "react-redux";
import Button from "../ui/Button/Button";
import StarRating from "../ui/StarRating/StarRating"
import classes from "./ProductCard.module.css";

const ProductCard = (props) => {
  let { product , border } = props;
  const dispatch = useDispatch();
  const handleAddClick = () => {
    dispatch(
      cartActions.changeProduct({
        product: {
          productId: product.id,
          price: product.price,
          title: product.title,
          maxQuantity: product.quantity,
        },
        newQuantity: 1,
        mode: "button",
      })
    );
  };
  let priceToFix= parseFloat(product.price);
  let fixedPrice= priceToFix.toFixed(2);
  return (
    <div id={product.id} className={`${classes.productCard} ${classes[border]}`}>
      {/* if image url is an array of images this might need to be changed */}
      <img className={classes.productImage} src={product.imageURL} />
      <p className={classes.title}>{product.title}</p>
      <div className={classes.infoBox}>
        <div className={classes.priceLine}>
          {/* add to fixed to this line */}
          <p className={classes.price}>${fixedPrice}</p>
          <StarRating rating={product.rating} className={classes.StarRating}></StarRating>
        </div>
        <div className={classes.buttonLine}>
          <div className={classes.learnMoreButtonBox}>
            <Button style="outlined" size="medium" className={classes.learnMoreButton}>Learn More</Button>
          </div>
          <div className={classes.addToCartButtonBox}>
          <Button style="plain" size="medium" onClickHandler={handleAddClick} >Add To Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductCard;

