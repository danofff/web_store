import classes from "./PriceFilterForm.module.css";

const PriceFilterForm = (props) => {
    let {handlePriceClick, resetButton, setPriority, setSortPriority} = props;
    function handleSubmit(e) {
        e.preventDefault();
        let returnObj={"category": "price"}
        let formData = document.getElementsByClassName("PriceSortOptions");
        let formDataArray=[...formData];
        formDataArray.forEach(option=>{
            if(option.checked)
                returnObj.order = option.value
                })
        setSortPriority(returnObj);
        
    }
    return (
        <form className={classes.priceForm} onMouseLeave={handlePriceClick}>
            <p>Sort By</p>
                <div>
                    <label>Highest Price: </label>
                    <input type="radio" name="price" value="high" className="PriceSortOptions"></input> 
                </div>
                <div>
                    <label>Lowest Price: </label>
                    <input type="radio" name="price" value="low" className="PriceSortOptions"></input>
                </div>
            <div className="Buttons container">
                <button onClick={handleSubmit}>apply</button> <button onClick={resetButton}>reset</button>
            </div>
        </form>
    )
}

export default PriceFilterForm;