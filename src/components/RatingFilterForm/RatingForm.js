import classes from "./RatingFilterForm.module.css";

const RatingFilterForm = (props) => {
    let {handleRatingClick, resetButton, setPriority, setSortPriority} = props;
    function handleSubmit(e) {
        e.preventDefault();
        let returnObj={"category": "rating"}
        let formData = document.getElementById("ratingOptions");
        if (formData.checked){
            returnObj.order="high";
            setSortPriority(returnObj);
        }
    }
    return (
        <form className={classes.ratingForm} onMouseLeave={handleRatingClick}>
            <div className={classes.typeLine}>
                <div className={classes.horizontalLine}></div>
                <p className={classes.textDescriptor}>Sort By</p>
                <div className={classes.horizontalLine}></div>
            </div>
                <div className={classes.yourOnlyOption}>
                    <label className={classes.label}>Highest Reviewed: </label>
                    <input type="radio" name="price" value="high" id="ratingOptions"></input> 
                </div>
                <div className={classes.buttonContainer}>
                <div className={classes.button} onClick={handleSubmit} >apply</div><div className={classes.divider}></div> <div className={classes.button} onClick={resetButton}>reset</div>
            </div>
        </form>
    )
}

export default RatingFilterForm;