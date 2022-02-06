import { createSlice, current } from "@reduxjs/toolkit";
const dataSlice = createSlice({
  name: "data",
  initialState: { categories: [], products: [], orders: [], reviews: [] },
  reducers: {
    //categories
    setCategories(state, action) {
      state.categories = action.payload.sort((a, b) => a.id - b.id);
    },
    editCategory(state, action) {
      const newCat = action.payload;
      const allCat = current(state.categories).slice();
      const editedCatIdx = allCat.findIndex((cat) => newCat.id === cat.id);
      allCat.splice(editedCatIdx, 1, newCat);
      state.categories = allCat;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
    },

    //products
    setProducts(state, action) {
      state.products = action.payload.sort((a, b) => a.id - b.id);
    },
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    editProduct(state, action) {
      const newProd = action.payload;
      const allProd = current(state.categories).slice();
      const editedProdIdx = allProd.findIndex((prod) => prod.id === newProd.id);
      allProd.splice(editedProdIdx, 1, newProd);
      state.products = allProd;
    },

    //orders
    setAllOrders(state, action) {
      state.orders = action.payload;
    },
    editOrder(state, action) {
      const order = action.payload;
      const editedOrderIdx = state.orders.findIndex(
        (ord) => ord.id === +order.id
      );
      state.orders[editedOrderIdx].isComplete = order.isComplete;
    },

    //reviews
    setAllReviews(state, action) {
      state.reviews = action.payload;
    },
    addReview(state, action) {
      console.log("should be", current(state).reviews[0]);
      const reviewSended = action.payload;
      const review = {
        created_at: reviewSended.review.created_at,
        updated_at: reviewSended.review.updated_at,
        reviewText: reviewSended.review.reviewText,
        starRating: reviewSended.review.starRating,
        userId: reviewSended.review.userId,
        productId: reviewSended.review.productId,
        username: reviewSended.username,
      };
      state.reviews.unshift(review);
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice;
