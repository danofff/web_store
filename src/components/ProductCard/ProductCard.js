import classes from "./ProductCard.module.css";
const ProductCard = (props) => {
    let {product} = props;
    return(
        <div id={product.id} className={classes.productCard}>
            {/* if image url is an array of images this might need to be changed */}
            <img className={classes.productImage} src={product.imageURL}/>
            <p className="ProductTitle">{product.title}</p>
            <p className="ProductDescription">{product.description}</p>
            <p className="StarRating">{product.rating}</p>
            {/* add to cart button */}
            {/*add learn more button*/}
        </div>
    )
 }
 export default ProductCard;