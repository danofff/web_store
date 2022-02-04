import {useSelector} from "react-redux";
import {useState } from "react";
import Button from "../ui/Button/Button";
import classes from './ProductPageMenuBar.module.css'
import CategoryFilterForm from "../CategoryFilterForm/CategoryFilter";
import PriceFilterForm from "../PriceFilterForm/PriceFilter";
import RatingFilterForm from "../RatingFilterForm/RatingForm";
const ProductPageMenuBar = (props) =>{
    let {sortCategories, setSortCategories, sortPriority, setSortPriority} = props;
    const [displayCategoryOptions,setDisplayCategoryOptions] = useState(false);
    const [displayPriceOptions,setDisplayPriceOptions] = useState(false);
    const [displayRatingOptions, setDisplayRatingOptions] = useState(false);
    function handleCategoryClick(e){
        e.preventDefault();
        if (displayPriceOptions)
            setDisplayPriceOptions(false);
        if (displayRatingOptions)
            setDisplayRatingOptions(false);
        if (displayCategoryOptions)
            setDisplayCategoryOptions(false);
        else
            setDisplayCategoryOptions(true);
    }
    function handlePriceClick(e){
        if (displayCategoryOptions)
            setDisplayCategoryOptions(false);
        if (displayRatingOptions)
            setDisplayRatingOptions(false);
        e.preventDefault();
        if (displayPriceOptions)
            setDisplayPriceOptions(false);
        else
            setDisplayPriceOptions(true);
    }
    function handleRatingClick(e){
        if (displayPriceOptions)
            setDisplayPriceOptions(false);
        if (displayCategoryOptions)
            setDisplayCategoryOptions(false);
        e.preventDefault();
        if (displayRatingOptions)
            setDisplayRatingOptions(false);
        else
            setDisplayRatingOptions(true);
    }
    function resetButton(e){
        e.preventDefault();
        setSortCategories({categories: null});
        setSortPriority({category: null, order: null});
    }
    return(
        <div className="AdditionalHeaderBar">
            <form className={classes.bar}>
                <div className={classes.optionsContiner}>
                    <div>
                        <span className={classes.titles} onClick={handleCategoryClick}>CATEGORY</span>
                        {sortCategories.categories ? <span>*</span> : null}
                    </div>
                    <div>
                    <span className={classes.titles} onClick={handlePriceClick}>PRICE</span>
                        {sortPriority.category === "price" ? <span>*</span> : null}
                    </div>
                        {/* high to low or low to high */}
                        {/*add ability to serch by range 100-200 200-300 */}
                        {/* have them type in a number to serach by */}
                    <div>
                        <span className={classes.titles} onClick={handleRatingClick}>RATING</span>
                        {sortPriority.category === "rating" ? <span>*</span> : null}
                    </div>
                        {/* make an excludes */}
                </div>
            </form>
            {displayCategoryOptions ? 
                <CategoryFilterForm 
                    handleCategoryClick={handleCategoryClick} sortCategories={sortCategories} 
                    setSortCategories={setSortCategories} resetButton={resetButton}
                ></CategoryFilterForm>: null}
            {displayPriceOptions ? 
            <PriceFilterForm
                handlePriceClick={handlePriceClick}  resetButton={resetButton}
                sortPriority={sortPriority}  setSortPriority={setSortPriority}
            ></PriceFilterForm>
            :null}
            {displayRatingOptions ? 
                <RatingFilterForm
                    handleRatingClick={handleRatingClick}  resetButton={resetButton}
                    sortPriority={sortPriority}  setSortPriority={setSortPriority}
                ></RatingFilterForm>
            :null}

        </div>
    )
}

export default ProductPageMenuBar;