

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootLayout} from "./component/RootLayout.tsx";
import {Toaster} from "react-hot-toast";
import {Error} from "./component/Error.tsx";

import {EmployeePage} from "./pages/EmployeePage.tsx";
import {SupplierPage} from "./pages/SupplierPage.tsx";
import {RowMaterialPage} from "./pages/RowMaterialPage.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.tsx";
import {ProductionPage} from "./pages/ProductionPage.tsx";

import {Login} from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";

import LogPage from "./pages/LogPage.tsx";





function App() {


    const routes = createBrowserRouter([
        // {
        //     path: '/signIn',
        //     element: <SignIn/>, // Set SignIn as the default page
        // },
        {
            path: '/login',
            element:<Login/>
        },


        {
            path: '',
            element: <RootLayout/>,
            children: [
                {path: '/home', element: <Home/>},
                {path: '/employee', element: <EmployeePage/>},
                {path: '/supplier', element: <SupplierPage/>},
                {path: '/rawMaterial', element: <RowMaterialPage/>},
                {path: '/production', element: <ProductionPage/>},
                {path: '/log', element: <LogPage/>},

                {path: '*', element: <Error/>}

            ]
        },

    ]);

    return (
        <>
            <Toaster position={"top-center"}/>
        <Provider store={store}>
                <RouterProvider router={routes}/>
        </Provider>
            </>
    );


}

export default App

