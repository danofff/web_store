import classes from "./ProductPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button/Button";

const ProductPage = () => {
  
  // const dispatch = useDispatch();
  const product = useSelector(state=>state.data.products[0]);
 
  console.log('This is my product', product)


  return (
    <div>
      <div className={classes.container} >
        <div className={classes.imgContainer}>
          <h4 className={classes.title}>{product.title}</h4>
          <div className={classes.img}>
            <img className={classes.productImage} src={product.imageURL} />
          </div>
        </div>
          <div className={classes.description} >
            <p className={classes.productDescription}>Product Description: {product.description}</p>
            <div className={classes.priceline}>
              <p className={classes.price}>Price: {product.price}</p>
              <p className={classes.rating}>Star Rating 1-5: {product.rating}</p>
              <p className={classes.quantity}>Left in Stock: {product.quantity}</p>
              <input type="number" value='1'/>
            <Button type='submit' text='Add to Cart'></Button>
            </div>
          </div>
          <div className={classes.review}>
            <p>Reviews will go here</p>
            <div>review1</div>
          </div>
      </div>
    </div>
  );
};

export default ProductPage;