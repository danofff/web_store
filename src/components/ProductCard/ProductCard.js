import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { cartActions } from "../../store/cartState/cartSlice";
import Button from "../ui/Button/Button";
import StarRating from "../ui/StarRating/StarRating";
import classes from "./ProductCard.module.css";

const ProductCard = (props) => {
  let { product, border } = props;
  const { isAdmin } = useSelector((state) => state.user);
  const navigate = useNavigate();
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

  const handleMoreClick = () => {
    navigate(`/products/${product.id}`);
  };

  let fixedPrice = parseFloat(product.price).toFixed(2) || 2;

  return (
    <div
      id={product.id}
      className={`${classes.productCard} ${classes[border]}`}
    >
      {/* if image url is an array of images this might need to be changed */}
      {isAdmin && (
        <div className={classes.edit}>
          <Link to={`/admin/products/edit/${product.id}`}>
            <i className="fas fa-edit"></i>
          </Link>
        </div>
      )}
      {isAdmin && (
        <div className={classes.is_active}>
          {product.isActive ? "Active" : "Not Active"}
        </div>
      )}
      <div className={classes.image__container}>
        <img className={classes.productImage} src={product.imageURL} />
      </div>
      <p className={classes.title}>{product.title}</p>
      <div className={classes.infoBox}>
        <div className={classes.priceLine}>
          {/* add to fixed to this line */}
          <p className={classes.price}>{`\$${fixedPrice}`}</p>
          <div className={classes.starRating}>
            <StarRating
              rating={product.rating}
              className={classes.StarRating}
            ></StarRating>
          </div>
        </div>
        <div className={classes.buttonLine}>
          <div className={classes.learnMoreButtonBox}>
            <Button
              style="outlined"
              size="medium"
              className={classes.learnMoreButton}
              onClickHandler={handleMoreClick}
            >
              Learn More
            </Button>
          </div>
          <div className={classes.addToCartButtonBox}>
            <Button style="plain" size="medium" onClickHandler={handleAddClick}>
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
