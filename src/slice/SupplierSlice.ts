import {Supplier} from "../model/Supplier.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";



const  initialState: Supplier[]=[];

const api = axios.create({
    baseURL: "http://localhost:3000/supplier"
});

export const saveSupplier = createAsyncThunk(

);


export const updateSupplier = createAsyncThunk(
    'supplier/updateSupplier',
    async (supplier:Supplier)=>{
        try {
            const response = await api.put(`/update/${supplier.supplierID}`,supplier);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const deleteSupplier = createAsyncThunk(
    'supplier/removeSupplier',
    async (id:string)=>{
        try {
            const response = await api.delete(`/remove/${id}`);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const getAllSuppliers = createAsyncThunk(
    'supplier/getAllSuppliers',
    async ()=>{
        try {
            const response = await api.get('/all');
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
)

const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(saveSupplier.fulfilled, (state, action) => {
                state.push(action.payload);
                alert("Supplier Added Successfully");
            })
            .addCase(saveSupplier.rejected, (state, action) => {
                alert("Supplier Added Failed");
            })
            .addCase(saveSupplier.pending, (state, action) => {
                alert("Supplier Adding...");
            });
        builder
            .addCase(updateSupplier.fulfilled, (state, action) => {
            const index = state.findIndex((supplier:Supplier) => supplier.supplierID === action.payload.supplierID);
            state[index] = action.payload;
            alert("Supplier Updated Successfully");
            })
            .addCase(updateSupplier.rejected, (state, action) => {
                alert("Supplier Update Failed");
            })
            .addCase(updateSupplier.pending, (state, action) => {
                alert("Supplier Updating...");
            });
        builder
            .addCase(deleteSupplier.fulfilled, (state, action) => {
                const index = state.findIndex((supplier: Supplier) => supplier.supplierID === action.payload);
                state.splice(index, 1);
                alert("Supplier Deleted Successfully");
            })
            .addCase(deleteSupplier.rejected, (state, action) => {
                alert("Supplier Delete Failed");
            })
            .addCase(deleteSupplier.pending, (state, action) => {
                alert("Supplier Deleting...");
            });
        builder
            .addCase(getAllSuppliers.fulfilled, (state, action) => {
                action.payload.forEach((supplier: Supplier) => {
                    state.push(supplier);
                    alert("Supplier Loaded Successfully");
                });
            })
            .addCase(getAllSuppliers.rejected, (state, action) => {
                    alert("Supplier Loading Failed");
            })
            .addCase(getAllSuppliers.pending, (state, action) => {
                    alert("Supplier Loading...");
            });
    }
});

export default supplierSlice.reducer;
