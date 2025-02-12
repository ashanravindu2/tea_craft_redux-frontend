import {configureStore} from "@reduxjs/toolkit";
import employeeSlice from "../slice/EmployeeSlice.ts";
import supplierSlice from "../slice/SupplierSlice.ts";
import rawMaterialSlice from "../slice/RawMaterialSlice.ts";
import productionSlice from "../slice/ProductionSlice.ts";
import productSlice from "../slice/ProductSlice.ts";

export const store = configureStore({
    reducer: {
        employee: employeeSlice,
        supplier: supplierSlice,
        rawMaterial: rawMaterialSlice,
        production: productionSlice,
        product: productSlice,

    },

});

export type AppDispatch = typeof store.dispatch;