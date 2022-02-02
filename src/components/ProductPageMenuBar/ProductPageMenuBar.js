import {useSelector, useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import { getCategoriesAct } from "../../store/dataSlice/dataActions";
import Button from "../ui/Button/Button";
import classes from './ProductPageMenuBar.module.css'
const ProductPageMenuBar = () =>{
    const [displayCategoryOptions,setDisplayCategoryOptions] = useState(false);
    const [displayPriceOptions,setDisplayPriceOptions] = useState(false);
    const [displayRatingOptions, setDisplayRatingOptions] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCategoriesAct())
    },[])
    function handleCategoryClick(e){
        e.preventDefault();
        if (displayCategoryOptions)
            setDisplayCategoryOptions(false);
        else
            setDisplayCategoryOptions(true);
    }
    function handlePriceClick(e){
        e.preventDefault();
        if (displayPriceOptions)
            setDisplayPriceOptions(false);
        else
            setDisplayPriceOptions(true);
    }
    function handleRatingClick(e){
        e.preventDefault();
        if (displayRatingOptions)
            setDisplayRatingOptions(false);
        else
            setDisplayRatingOptions(true);
    }
    const categories = useSelector(state=>state.data.categories);
    console.log(categories);
    return(
        <div className="AdditionalHeaderBar">
            <form className={classes.bar}>
                <div className={classes.optionsContiner}>
                    <button className={classes.titles} onMouseOver={handleCategoryClick}>CATEGORY</button>
                    <span className={classes.titles} onMouseOver={handlePriceClick}>PRICE</span>
                        {/* high to low or low to high */}
                        {/*add ability to serch by range 100-200 200-300 */}
                        {/* have them type in a number to serach by */}                
                    <span className={classes.titles} onMouseOver={handleRatingClick}>RATING</span>
                        {/* high to low and by range */}
                </div>
            </form>
            {/* This will be moved out to its own component optional renders for category price and rating  */}
            {displayCategoryOptions ? 
            <div className={classes.categoriesOptions} onMouseLeave={handleCategoryClick}>
            {categories.map(category =>{
                return(
                    <div id={category.id}>
                        <label>{category.title}</label>
                        <input type="checkbox"></input>
                    </div>
                )})}
            </div>
            : null}

            {displayPriceOptions ? 
            <div className={classes.priceOptions} onMouseLeave={handlePriceClick}> 
                <label>High to Low:</label>
                <input type="checkbox"></input> 
                <label>Low to High</label>
                <input type="checkbox"></input>
            </div>
            :null}

            {displayRatingOptions ? 
            <div className={classes.priceOptions} onMouseLeave={handleRatingClick}>
                <label>High to Low:</label>
            </div>
            :null}

        </div>
    )
}

export default ProductPageMenuBar;