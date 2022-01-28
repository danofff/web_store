import * as productPageMenuBarStyles from './ProductPageMenuBar.module.css'
const ProductPageMenuBar = () =>{
    return(
        <form className="MenuBar">
            {/* Planning to make these modals i think */}
            <span>CATEGORY</span>
                {/* load options */}
            <span>PRICE</span>
                {/* high to low or low to high */}
                {/*add ability to serch by range 100-200 200-300 */}
                {/* have them type in a number to serach by */}                
            <span>RATING</span>
                {/* high to low and by range */}
        </form>
    )
}

export default ProductPageMenuBar;