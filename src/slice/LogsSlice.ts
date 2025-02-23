
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Logs} from "../model/Logs.ts";
import toast from "react-hot-toast";
import {RootState} from "../store/store.tsx";


const initialState:Logs[]=[];

const  api = axios.create({
    baseURL: "http://localhost:3000/log"
});

export const saveLog = createAsyncThunk(
    'log/saveLog',
    async (logs: Logs, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token

            if (!token) {
                alert("Please log in to save log");
                return rejectWithValue("Please log in to save log");
            }

            const response = await api.post('/add', logs, {
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

export const updateLog = createAsyncThunk(
    'log/updateLog',
    async (logs: Logs, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token

            if (!token) {
                alert("Please log in to update log");
                return rejectWithValue("Please log in to update log");
            }

            const response = await api.put(`/update/${logs.logCode}`, logs, {
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

export const deleteLog = createAsyncThunk(
    'log/removeLog',
    async (logCode: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token

            if (!token) {
                alert("Please log in to delete log");
                return rejectWithValue("Please log in to delete log");
            }

            console.log("Log Code", logCode);
            const response = await api.delete(`/remove/${logCode}`, {
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

export const getAllLogs = createAsyncThunk(
    'log/getAllLogs',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token

            if (!token) {
                alert("Please log in to view logs");
                return rejectWithValue("Please log in to view logs");
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




const logsSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveLog.fulfilled, (state, action) => {
                state.push(action.payload);
                alert("Logs Added Successfully");
            })
            .addCase(saveLog.rejected, (state, action) => {
                alert("Logs Added Failed");
            })
            .addCase(saveLog.pending, (state, action) => {
                alert("Logs Added Failed");
            });
        builder
            .addCase(updateLog.fulfilled, (state, action) => {
                const index = state.findIndex((logs: Logs) => logs.logCode === action.payload.logCode);
                state[index] = action.payload;
                alert("Log Updated Successfully");
            })
            .addCase(updateLog.rejected, (state, action) => {
                alert("Log Update Failed");
            })
            .addCase(updateLog.pending, (state, action) => {

                toast.success('Log Updated Successfully');


            });
        builder
            .addCase(deleteLog.fulfilled, (state, action) => {
                return state.filter((log) => log.logCode !== action.payload.logCode);
            })
            .addCase(deleteLog.rejected, (state, action) => {
                alert("Log to fetch Logs");
            })
            .addCase(deleteLog.pending, (state, action) => {
                alert("Fetching Log");
            });
        builder
            .addCase(getAllLogs.fulfilled, (state, action) => {
                action.payload.forEach((logs: Logs) => {
                    state.push(logs);
                    alert("Log Fetched Successfully");
                });
            })
            .addCase(getAllLogs.rejected, (state, action) => {
                alert("Failed to fetch Logs");
            })
            .addCase(getAllLogs.pending, (state, action) => {
                alert("Fetching Logs");
            });
    }
});

export default logsSlice.reducer;