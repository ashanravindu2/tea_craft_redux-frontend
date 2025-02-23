import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Employee} from "../model/Employee.ts";
import  axios from "axios";
import {RootState} from "../store/store.tsx";
import toast from "react-hot-toast";
import {refreshAuthToken} from "./auth-user-slice.ts";



const initialState: Employee[]=[];

const  api = axios.create({
    baseURL: "http://localhost:3000/employee"
});


export const saveEmployee = createAsyncThunk(
    'employee/saveEmployee',
    async (employee: Employee, { getState, rejectWithValue }) => { // ✅ Use getState to access Redux state
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token; // ✅ Access JWT token correctly

            console.log("saveEmployee Token", token);

            if (!token) {
                alert("Please log in to save employee");
                return rejectWithValue("Please log in to save employee");
            }

            const response = await api.post('/add', employee, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                },
            });

            alert("Employee saved successfully  "+ response.data);
            return response.data;

        } catch (error: any) {
          return console.log('error',error)
        }
    }
);

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',
    async (employee:Employee)=>{
        try {
            const response = await api.put(`/update/${employee.employeeID}`,employee);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    'employee/removeEmployee',
    async (id:string)=>{
        try {
            const response = await api.delete(`/remove/${id}`);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const getAllEmployees = createAsyncThunk(
    'employee/getAllEmployees',
    async (_, { rejectWithValue, getState ,}) => { // ✅ Use getState to access Redux store
        try {
            const state = getState() as RootState; // ✅ Get state
            const token = state.userReducer.jwt_token;
            // ✅ Access JWT token correctly

            if (!token) {
                alert("Please log in to view employees");
                return rejectWithValue("Please log in to view employees");
            }

            const response = await api.get('/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error: any){
            if (error.response?.status === 401) {
                alert("Session expired. Please log in again.");
            }


        }
    }
);






const employeeSlice =  createSlice({
    name: 'employee',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveEmployee.fulfilled, (state, action) => {
                state.push(action.payload);
                alert("Employee Added Successfully")
            })
            .addCase(saveEmployee.rejected, (state, action) => {
                alert("Error Occurred")
            })
            .addCase(saveEmployee.pending, (state, action) => {
                alert("Saving Employee")
            });
        builder
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.findIndex(emp => emp.employeeID === action.payload.employeeID);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                alert("Error Occurred")
            })
            .addCase(updateEmployee.pending, (state, action) => {
                alert("Updating Employee")
            });

        builder
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                return state.filter((employee) => employee.employeeID !== action.payload.employeeID);
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                alert("Error Occurred")
            })
            .addCase(deleteEmployee.pending, (state, action) => {
                alert("Deleting Employee")
            });

        builder
            .addCase(getAllEmployees.fulfilled, (state, action) => {
                action.payload.forEach((employee: Employee) => {
                    state.push(employee);
                });
            })
            .addCase(getAllEmployees.rejected, (state, action) => {
                toast.success('Employee saved successfully');
            })
            .addCase(getAllEmployees.pending, (state, action) => {

            });
    }

});

export default employeeSlice.reducer;