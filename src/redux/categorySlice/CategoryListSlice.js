import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = "https://api.escuelajs.co/api/v1/categories";
export const fetchCategory = createAsyncThunk(
    "category/fetchCategory",
    async () => {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        return jsonData;
    }
);

const CategoryListSlice = createSlice({
    name:'CategoryListSlice',
    initialState:{
        category:[],
        status:'idle',
        error:null,
    },
    reducer:{

    },
    extraReducers: function(builder){
        builder.addCase(fetchCategory.pending, (state, action)=>{
            state.status = 'loading'
        }).addCase(fetchCategory.fulfilled, (state, action)=>{
            state.status = "success";
            state.category = action.payload.slice(0, 6);
        }).addCase(fetchCategory.rejected, (state,action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})
export default CategoryListSlice.reducer;