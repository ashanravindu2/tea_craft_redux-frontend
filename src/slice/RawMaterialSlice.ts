import {RawMaterial} from "../model/RawMaterial.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store/store.tsx";

const initialState:RawMaterial[]=[];

const  api = axios.create({
    baseURL: "http://localhost:3000/rawMaterial"
});

export const saveRawMaterial = createAsyncThunk(
    'rawMaterial/saveRawMaterial',
    async (rawMaterial: RawMaterial, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token

            if (!token) {
                alert("Please log in to save raw material");
                return rejectWithValue("Please log in to save raw material");
            }

            const response = await api.post('/add', rawMaterial, {
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

export const updateRawMaterial = createAsyncThunk(
    'rawMaterial/updateRawMaterial',
    async (rawMaterial: RawMaterial, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token

            if (!token) {
                alert("Please log in to update raw material");
                return rejectWithValue("Please log in to update raw material");
            }

            const response = await api.put(`/update/${rawMaterial.stockID}`, rawMaterial, {
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

export const deleteRawMaterial = createAsyncThunk(
    'rawMaterial/removeRawMaterial',
    async (id: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token

            if (!token) {
                alert("Please log in to delete raw material");
                return rejectWithValue("Please log in to delete raw material");
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

export const getAllRawMaterials = createAsyncThunk(
    'rawMaterial/getAllRawMaterials',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token

            if (!token) {
                alert("Please log in to view raw materials");
                return rejectWithValue("Please log in to view raw materials");
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

export const getAlLStockifDate = createAsyncThunk(
    'rawMaterial/getAllStockifDate',
    async (date: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token

            if (!token) {
                alert("Please log in to view stock");
                return rejectWithValue("Please log in to view stock");
            }

            const response = await api.get(`/getStock/${date}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the header
                },
            });

            console.log("Slice", response.data, "date", date);
            return response.data;
        } catch (error: any) {
            console.log('error', error);
            return rejectWithValue(error.response?.data || "An error occurred");
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
                return state.filter((rawMaterial)=>rawMaterial.stockID !== action.payload.stockID);
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
            builder
                .addCase(getAlLStockifDate.fulfilled, (state, action) => {
                    action.payload.catch((rawMaterial:RawMaterial)=>{
                        state.push(rawMaterial);
                        alert("Raw Material Loaded Successfully");
                    });
                })
                .addCase(getAlLStockifDate.rejected, (state, action) => {
                    alert("Raw Material Load Failed");
                })
                .addCase(getAlLStockifDate.pending, (state, action) => {
                    alert("Raw Material Loading...");
            });
    }
});

export default rawMaterialSlice.reducer;
