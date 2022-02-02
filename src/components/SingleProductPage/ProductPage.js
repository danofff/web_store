import classes from "./ProductPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button/Button";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  // const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products);
  useEffect(() => {
    const prod = products.find((prod) => prod.id == productId);
    if (prod) {
      setProduct(product);
    }
  }, [products]);
  console.log("This is my product", product);

  console.log("tghis is product", product);
  
  return ({product ? <div> 
      <div className={classes.container}>
        <div className={classes.imgContainer}>
          <h4 className={classes.title}>{product.title}</h4>
          <div className={classes.img}>
            <img className={classes.productImage} src={product.imageURL} />
          </div>
        </div>
        <div className={classes.description}>
          <p className={classes.productDescription}>
            Product Description: {product.description}
          </p>
          <div className={classes.priceline}>
            <p className={classes.price}>Price: {product.price}</p>
            <p className={classes.rating}>Star Rating 1-5: {product.rating}</p>
            <p className={classes.quantity}>
              Left in Stock: {product.quantity}
            </p>
            <input type="number" value="1" />
            <Button type="button" style="plain">
              Add to Cart!
            </Button>
          </div>
        </div>
        <div className={classes.review}>
          <p>Reviews will go here</p>
          <div>review1</div>
        </div>
      </div>
    </div> : 
  <p>Loading</p>} 
  );
};

export default ProductPage;
