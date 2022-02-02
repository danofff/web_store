import classes from "./ProductCard.module.css";
import Button from "../ui/Button/Button";

const ProductCard = (props) => {
    let {product, border} = props;
    console.log(border)
    return(
        <div id={product.id} className={`${classes.productCard} ${classes[border]}`}>
            <img className={classes.productImage} src={product.imageURL}/>
            <p className={classes.title}>{product.title}</p>
            <div className={classes.infoBox}>
                <p className={classes.description}>{product.description}</p>
                <div className={classes.priceLine}>
                    {/* add to fixed to this line */}
                    <p className={classes.price}>${product.price}</p>
                    <p className={classes.starRating}>{product.rating} Stars</p>
                </div>
                <div className={classes.buttonLine}>
                    {/* need to make this button link to a single product display form */}
                    <Button style="outlined" text="learn more"></Button>
                    {/* need to make this button actually add to cart */}
                    <Button style="plain" text='add to cart'></Button>
                </div>
            </div>
        </div>
    )
 }
 export default ProductCard;