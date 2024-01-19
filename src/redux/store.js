import { configureStore } from "@reduxjs/toolkit";
import ProductListSlice from "./productSlice/ProductListSlice";
import CategoryListSlice from "./categorySlice/CategoryListSlice";
import CartSlice from "./cartSlice/CartSlice";

export const store = configureStore({
    reducer:{
        productListReducer:ProductListSlice,
        categoryListReducer:CategoryListSlice,
        cartReducer:CartSlice
    }
});