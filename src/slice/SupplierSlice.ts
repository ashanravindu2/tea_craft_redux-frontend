import {Supplier} from "../model/Supplier.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store/store.tsx";



const  initialState: Supplier[]=[];

const api = axios.create({
    baseURL: "http://localhost:3000/supplier"
});

export const saveSupplier = createAsyncThunk(
    'supplier/saveSupplier',
  async (supplier: Supplier, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState// ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token correctly


            const response = await api.post('/add', supplier, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                },
            });

            alert("3  "+ response.data);
            return response.data;
        } catch (error: any) {
            return console.log('error',error)
        }
    }
);

export const updateSupplier = createAsyncThunk(
    'supplier/updateSupplier',
    async (supplier: Supplier, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("4");
                return rejectWithValue("5");
            }

            const response = await api.put(`/update/${supplier.supplierID}`, supplier, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('6:', error);
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

export const deleteSupplier = createAsyncThunk(
    'supplier/removeSupplier',
    async (id: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("7");
                return rejectWithValue("8");
            }

            const response = await api.delete(`/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            console.error('9:', error);
            return rejectWithValue(error.response?.data || "10");
        }
    }
);

export const getAllSuppliers = createAsyncThunk(
    'supplier/getAllSuppliers',
    async (_, { getState, rejectWithValue ,}) => {
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("12");
                return rejectWithValue("11");
            }

            const response = await api.get('/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                alert("13");
            }
        }
    }
);


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
