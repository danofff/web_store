import classes from "./ProductReview.module.css";
import Button from "../ui/Button/Button";

const ProductPage = (props) => {
  let {product} = props;
  return (
    <div>
      <img className={classes.productImage} src={product.imageURL} />
      <h4 className={classes.title}>{product.title}</h4>
      <div className={classes.description} >
        <p className={classes.productDescription}>{product.description}</p>
        <div className={classes.priceline}>
          <p className={classes.price}>{product.price}</p>
          <p className={classes.rating}>{product.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;