import { cartActions } from "../../store/cartState/cartSlice";
import { useDispatch } from "react-redux";
import Button from "../ui/Button/Button";

import classes from "./ProductCard.module.css";
const ProductCard = (props) => {
  let { product , border } = props;
  const dispatch = useDispatch();

  const handleAddClick = () => {
    dispatch(
      cartActions.addProduct({
        id: product.id,
        price: product.price,
        title: product.title,
        categoryId: product.categoryId,
        maxQuantity: product.quantity,
      })
    );
  };
  return (
    <div id={product.id} className={`${classes.productCard} ${classes[border]}`}>
      {/* if image url is an array of images this might need to be changed */}
      <img className={classes.productImage} src={product.imageURL} />
      <p className={classes.title}>{product.title}</p>
      <div className={classes.infoBox}>
        <div className={classes.priceLine}>
          {/* add to fixed to this line */}
          <p className={classes.price}>${product.price}</p>
          <p className={classes.starRating}>{product.rating} Stars</p>
        </div>
        <div className={classes.buttonLine}>
          <div className={classes.learnMoreButtonBox}>
            <Button style="outlined" text="learn more" className={classes.learnMoreButton}></Button>
          </div>
          <div className={classes.addToCartButtonBox}>
          <Button style="plain" text="add to cart" onClickHandler={handleAddClick} ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductCard;

