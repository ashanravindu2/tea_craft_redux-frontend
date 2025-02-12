import {Product} from "../model/Product.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState:Product[]=[];

const  api = axios.create({
    baseURL: "http://localhost:3000/product"
});


export const saveProduct = createAsyncThunk(
    'product/saveProduct',
    async (product:Product)=>{
        console.log("Slice",product);
        try {
            const response = await api.post('/add',product);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (product:Product)=>{
        try {
            const response = await api.put(`/update/${product.productID}`,product);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'product/removeProduct',
    async (id:string)=>{
        try {
            const response = await api.delete(`/remove/${id}`);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const getAllProducts = createAsyncThunk(
    'product/getAllProducts',
    async ()=>{
        try {
            const response = await api.get('/all');
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
)
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveProduct.fulfilled, (state, action) => {
                state.push(action.payload);
                alert("Product Added Successfully");
            })
            .addCase(saveProduct.rejected, (state, action) => {
                alert("Product Update Failed");
            })
            .addCase(saveProduct.pending, (state, action) => {
                alert("Product Update Failed");
            });
        builder
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.findIndex((product: Product) => product.productID === action.payload.productID);
                state[index] = action.payload;
                alert("Employee Updated Successfully");
            })
            .addCase(updateProduct.rejected, (state, action) => {
                alert("Employee Update Failed");
            })
            .addCase(updateProduct.pending, (state, action) => {
                alert("Employee Update Failed");
            });
        builder
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const index = state.findIndex((product: Product)=>product.productID === action.payload);
                state.slice(index,1);
                alert("Product Deleted Successfully")
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                alert("Failed to fetch Employees");
            })
            .addCase(deleteProduct.pending, (state, action) => {
                alert("Fetching Employees");
            });
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                action.payload.forEach((product: Product) => {
                    state.push(product);
                    alert("Employees Fetched Successfully");
                });
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                alert("Failed to fetch Employees");
            })
            .addCase(getAllProducts.pending, (state, action) => {
                alert("Fetching Employees");
            });
    }
});

export default productSlice.reducer;