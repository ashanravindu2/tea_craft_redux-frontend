
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Logs} from "../model/Logs.ts";
import toast from "react-hot-toast";


const initialState:Logs[]=[];

const  api = axios.create({
    baseURL: "http://localhost:3000/log"
});


export const saveLog  = createAsyncThunk(
    'log/saveLog',
    async (logs:Logs)=>{
        console.log("Slice",logs);
        try {
            const response = await api.post('/add',logs);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const updateLog  = createAsyncThunk(
    'log/updateLog',
    async (logs:Logs)=>{
        try {
            const response = await api.put(`/update/${logs.logCode}`,logs);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const deleteLog   = createAsyncThunk(
    'log/removeLog',
    async (logCode:string)=>{
        try {
            const response = await api.delete(`/remove/${logCode}`);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const getAllLogs  = createAsyncThunk(
    'log/getAllLogs',
    async ()=>{
        try {
            const response = await api.get('/all');
            return response.data;
        }catch (error){
            return console.log('error',error)
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
                const index = state.findIndex((logs: Logs)=>logs.logCode === action.payload.logCode);
                state.slice(index,1);
                alert("Logs Deleted Successfully")
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