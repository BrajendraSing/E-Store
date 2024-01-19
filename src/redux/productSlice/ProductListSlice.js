import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = "https://api.escuelajs.co/api/v1/products";
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    return jsonData;
});

const ProductListSlice = createSlice({
    name:'ProductListSlice',
    initialState : {
        products : [],
        tmpProducts: [],
        status : 'idle',
        error : null
    },
    reducers:{
        fileterProductsByCategoryName:(state, action)=>{
            const categoryName = action.payload;
            if(categoryName){
                state.products = state.tmpProducts;
                state.products = state.products.filter((item)=>(item.category.name === categoryName))
            }else{
                state.products = state.tmpProducts;
            }
        },
        restoreProductLists : (state, action)=>{
            state.products = state.tmpProducts;
        }
    },
    extraReducers : function (builder){
        builder.addCase(fetchProducts.pending , (state, action) => {
            state.status = 'loading';
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'success';
            state.tmpProducts = action.payload;
            state.products = action.payload;
        }).addCase(fetchProducts.rejected, (state, action) =>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
});

export default ProductListSlice.reducer;

export const {fileterProductsByCategoryName, restoreProductLists} = ProductListSlice.actions;