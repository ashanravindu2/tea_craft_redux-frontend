import {Production} from "../model/Production.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store/store.tsx";

const initialState : Production[] = [];

const  api = axios.create({
    baseURL: "http://localhost:3000/production"
});

export const saveProduction = createAsyncThunk(
    'production/saveProduction',
    async (production: Production, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token

            if (!token) {
                alert("Please log in to save production");
                return rejectWithValue("Please log in to save production");
            }

            const response = await api.post('/add', production, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the header
                },
            });

            return response.data;
        } catch (error: any) {
            console.log('error', error);
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

export const updateProduction = createAsyncThunk(
    'production/updateProduction',
    async (production: Production, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token

            if (!token) {
                alert("Please log in to update production");
                return rejectWithValue("Please log in to update production");
            }

            const response = await api.put(`/update/${production.productionID}`, production, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the header
                },
            });

            return response.data;
        } catch (error: any) {
            console.log('error', error);
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

export const deleteProduction = createAsyncThunk(
    'production/removeProduction',
    async (id: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token

            if (!token) {
                alert("Please log in to delete production");
                return rejectWithValue("Please log in to delete production");
            }

            const response = await api.delete(`/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the header
                },
            });

            return response.data;
        } catch (error: any) {
            console.log('error', error);
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

export const getAllProductions = createAsyncThunk(
    'production/getAllProductions',
    async (_, {  rejectWithValue,getState, }) => {
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token

            if (!token) {
                alert("Please log in to view productions");
                return rejectWithValue("Please log in to view productions");
            }

            const response = await api.get('/all', {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the header
                },
            });

            return response.data;
        } catch (error: any) {
            console.log('error', error);
            return rejectWithValue(error.response?.data || "An error occurred");
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