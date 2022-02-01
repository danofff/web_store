import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProductsAct } from '../store/dataSlice/dataActions';

const SingleProductPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector(state=>state.data.products)
  console.log(useSelector(state=>state.data.products))
  useEffect(() => {
    dispatch(getProductsAct())
  }, [])


  return 
  <div>

  </div>;
}

export default SingleProductPage;
