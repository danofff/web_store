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
            <p>Sort By</p>
                <div>
                    <label>Highest Reviewed: </label>
                    <input type="radio" name="price" value="high" id="ratingOptions"></input> 
                </div>
            <div className="Buttons container">
                <button onClick={handleSubmit}>apply</button> <button onClick={resetButton}>reset</button>
            </div>
        </form>
    )
}

export default RatingFilterForm;