import {Production} from "../model/Production.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState : Production[] = [];

const  api = axios.create({
    baseURL: "http://localhost:3000/production"
});

export const saveProduction = createAsyncThunk(
    'production/saveProduction',
    async (production:Production)=>{
        console.log("Slice",production);
        try {
            const response = await api.post('/add',production);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const updateProduction = createAsyncThunk(
    'production/updateProduction',
    async (production:Production)=>{
        try {
            const response = await api.put(`/update/${production.productionID}`,production);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const deleteProduction = createAsyncThunk(
    'production/removeProduction',
    async (id:string)=>{
        try {
            const response = await api.delete(`/remove/${id}`);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const getAllProductions = createAsyncThunk(
    'production/getAllProductions',
    async ()=>{
        try {
            const response = await api.get('/all');
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

const productionSlice = createSlice({
    name: 'production',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveProduction.fulfilled, (state, action) => {
                state.push(action.payload);
                alert("Production saved successfully");
            })
            .addCase(saveProduction.rejected, (state, action) => {
                alert("Failed to save production");
            })
            .addCase(saveProduction.pending, (state, action) => {
                alert("Saving production");
        });
        builder
            .addCase(updateProduction.fulfilled, (state, action) => {
                const index = state.findIndex((production: Production) => production.productionID === action.payload.productionID);
                state[index] = action.payload;
                alert("Production updated successfully");
            })
            .addCase(updateProduction.rejected, (state, action) => {
                alert("Failed to update production");
            })
            .addCase(updateProduction.pending, (state, action) => {
                alert("Updating production");
        });
        builder
            .addCase(deleteProduction.fulfilled, (state, action) => {
           return state.filter((production)=> production.productionID !== action.payload.productionID);
            })
            .addCase(deleteProduction.rejected, (state, action) => {
                alert("Failed to delete production");
            })
            .addCase(deleteProduction.pending, (state, action) => {
                alert("Deleting production");
        });
        builder
            .addCase(getAllProductions.fulfilled, (state, action) => {
                action.payload.forEach((production: Production) => {
                    state.push(production);
                    alert("Production fetched successfully");
                });
            })
            .addCase(getAllProductions.rejected, (state, action) => {
                alert("Failed to fetch production");
            })
            .addCase(getAllProductions.pending, (state, action) => {
                alert("Fetching production");
        });
    }
});

export default productionSlice.reducer;