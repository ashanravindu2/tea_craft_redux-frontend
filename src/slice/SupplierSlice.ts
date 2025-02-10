
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Supplier} from "../model/Supplier.ts";
import supplierDUmmy from "../dummy/SupplierDUmmy.ts";


const initialState: Supplier[] =supplierDUmmy;


const supplierSlice =  createSlice({
    name: 'supplier',
    initialState,
    reducers: {
        addSupplierMember: (state, action: PayloadAction<Supplier>) => {
            state.push(action.payload);
        },
        removeSupplierMember: (state, action: PayloadAction<string>) => {
            return state.filter(supplier => supplier.supplierId !== action.payload);
        },
        updateSupplierMember: (state, action: PayloadAction<Supplier>) => {
            const index = state.findIndex(supplier => supplier.supplierId === action.payload.supplierId);
            if (index !== -1) {
                state[index] = action.payload;
            }
            return state;
        }
    }
});

export const {addSupplierMember,removeSupplierMember,updateSupplierMember} = supplierSlice.actions;
export default supplierSlice.reducer;