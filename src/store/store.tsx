import {configureStore} from "@reduxjs/toolkit";
import employeeSlice from "../slice/EmployeeSlice.ts";
import supplierSlice from "../slice/SupplierSlice.ts";
import rawMaterialSlice from "../slice/RawMaterialSlice.ts";
import productionSlice from "../slice/ProductionSlice.ts";
import productSlice from "../slice/ProductSlice.ts";
import userSlice from "../slice/user-slice.ts";

export const store = configureStore({
    reducer: {
        userReducer: userSlice,
        employee: employeeSlice,
        supplier: supplierSlice,
        rawMaterial: rawMaterialSlice,
        production: productionSlice,
        product: productSlice,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});

export type RootState = ReturnType<typeof store.getState>;