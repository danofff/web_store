import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { cartActions } from "../../store/cartState/cartSlice";
import Button from "../ui/Button/Button";
import StyledInput from "../ui/StyledInput/StyledInput";
import StarRating from "../ui/StarRating/StarRating";

import classes from "./ProductPage.module.css";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const prod = products.find((prod) => prod.id === +productId);
    if (prod) {
      setProduct(prod);
    }
  }, [products]);

  const onAddHandler = (event) => {
    dispatch(
      cartActions.addProduct({
        productId: product.id,
        price: product.price,
        title: product.title,
        maxQuantity: product.quantity,
      })
    );
  };

  return (
    <React.Fragment>
      {product ? (
        <div>
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
                <StarRating
                  rating={product.rating}
                  disabled={userId ? false : true}
                />
                <p className={classes.quantity}>
                  Left in Stock: {product.quantity}
                </p>
                <div className={classes.quantity_inp}>
                  <StyledInput type="number" value={1} />
                </div>
                <Button
                  type="button"
                  style="plain"
                  width="120px"
                  onClickHandler={onAddHandler}
                >
                  Add to Cart!
                </Button>
              </div>
            </div>
            <div className={classes.review}>
              <p>Reviews will go here</p>
              <div>review1</div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </React.Fragment>
  );
};

export default ProductPage;
