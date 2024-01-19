import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: "CartSlice",
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const new_product = action.payload;
            const cartItem = state.cart.find(
                (item) => item.id === new_product.id
            );
            if (!cartItem) {
                const newObj = {
                    id: new_product.id,
                    name: new_product.title,
                    price: new_product.price,
                    catId: new_product.category.id,
                    catname: new_product.category.name,
                    image: new_product.images[0],
                    quantity: 1,
                };
                state.cart.push(newObj);
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item.id !== action.payload.id
            );
        },
        incrementCartItem: (state, action) => {
            const cartItem = state.cart.find(
                (item) => item.id === action.payload.id
            );
            if (cartItem) {
                cartItem.quantity += 1;
            }
        },
        decrementCartItem: (state, action) => {
            const cartItem = state.cart.find(
                (item) => item.id === action.payload.id
            );
            if (cartItem) {
                if(cartItem.quantity === 1){
                    state.cart = state.cart.filter(
                        (item) => item.id !== action.payload.id
                    );
                }else{
                    cartItem.quantity -= 1;
                }
            }
        },
    },
});

export default CartSlice.reducer;
export const { addToCart,removeFromCart,incrementCartItem,decrementCartItem } = CartSlice.actions;
