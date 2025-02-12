import {RawMaterial} from "../model/RawMaterial.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState:RawMaterial[]=[];

const  api = axios.create({
    baseURL: "http://localhost:3000/rawMaterial"
});

export const saveRawMaterial = createAsyncThunk(
    'rawMaterial/saveRawMaterial',
    async (rawMaterial:RawMaterial)=>{
        console.log("Slice",rawMaterial);
        try {
            const response = await api.post('/add',rawMaterial);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const updateRawMaterial = createAsyncThunk(
    'rawMaterial/updateRawMaterial',
    async (rawMaterial:RawMaterial)=>{
        try {
            const response = await api.put(`/update/${rawMaterial.stockID}`,rawMaterial);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const deleteRawMaterial = createAsyncThunk(
    'rawMaterial/removeRawMaterial',
    async (id:string)=>{
        try {
            const response = await api.delete(`/remove/${id}`);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const getAllRawMaterials = createAsyncThunk(
    'rawMaterial/getAllRawMaterials',
    async ()=>{
        try {
            const response = await api.get('/all');
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);


const rawMaterialSlice = createSlice({
    name: 'rawMaterial',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveRawMaterial.fulfilled, (state, action) => {
                state.push(action.payload);
                alert("Raw Material Added Successfully");
            })
            .addCase(saveRawMaterial.rejected, (state, action) => {
                alert("Raw Material Update Failed");
            })
            .addCase(saveRawMaterial.pending, (state, action) => {
                alert("Raw Material Delete Failed");
            });
        builder
            .addCase(updateRawMaterial.fulfilled, (state, action) => {
                const index = state.findIndex((rawMaterial:RawMaterial) => rawMaterial.stockID === action.payload.stockID);
                state[index] = action.payload;
                alert("Raw Material Updated Successfully");
            })
            .addCase(updateRawMaterial.rejected, (state, action) => {
                alert("Raw Material Updated Failed");
            })
            .addCase(updateRawMaterial.pending, (state, action) => {
                alert("Raw Material Updated...");
            });
        builder
            .addCase(deleteRawMaterial.fulfilled, (state, action) => {
                const index = state.findIndex((rawMaterial:RawMaterial) => rawMaterial.stockID === action.payload.stockID);
                state.splice(index,1);
                alert("Raw Material Deleted Successfully");
            })
            .addCase(deleteRawMaterial.rejected, (state, action) => {
                alert("Raw Material Delete Failed");
            })
            .addCase(deleteRawMaterial.pending, (state, action) => {
                alert("Raw Material Deleting...");
            });
            builder
                .addCase(getAllRawMaterials.fulfilled, (state, action) => {
                    action.payload.forEach((rawMaterial:RawMaterial)=>{
                        state.push(rawMaterial);
                        alert("Raw Material Loaded Successfully");
                    });
                })
                .addCase(getAllRawMaterials.rejected, (state, action) => {
                    alert("Raw Material Load Failed");
                })
                .addCase(getAllRawMaterials.pending, (state, action) => {
                    alert("Raw Material Loading...");
            });
    }
});

export default rawMaterialSlice.reducer;
