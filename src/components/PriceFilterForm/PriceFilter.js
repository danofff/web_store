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
            <div className={classes.typeLine}>
                <div className={classes.horizontalLine}></div>
                <p className={classes.textDescriptor}>Sort By</p>
                <div className={classes.horizontalLine}></div>
            </div>
            <div className={classes.radioButtonLine}>
                <div>
                    <label className={classes.label}>Highest Price: </label>
                    <input type="radio" name="price" value="high" className="PriceSortOptions"></input> 
                </div>
                <div>
                    <label className={classes.label}>Lowest Price: </label>
                    <input type="radio" name="price" value="low" className="PriceSortOptions"></input>
                </div>
            </div>
            <div className={classes.buttonContainer}>
                <div className={classes.button} onClick={handleSubmit} >apply</div><div className={classes.divider}></div> <div className={classes.button} onClick={resetButton}>reset</div>
            </div>
        </form>
    )
}

export default PriceFilterForm;