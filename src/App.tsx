

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootLayout} from "./component/RootLayout.tsx";
import {Toaster} from "react-hot-toast";
import {Error} from "./component/Error.tsx";
import {Home} from "./pages/Home.tsx";
import {EmployeePage} from "./pages/EmployeePage.tsx";
import {SupplierPage} from "./pages/SupplierPage.tsx";
import {RowMaterialPage} from "./pages/RowMaterialPage.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.tsx";
import {ProductionPage} from "./pages/ProductionPage.tsx";
import {ProductPage} from "./pages/ProductPage.tsx";



function App() {
    const routes = createBrowserRouter([
        {
            path: '',
            element: <RootLayout/>,
            children: [
                {path: '', element: <Home/>},
                {path: '/employee', element: <EmployeePage/>},
                {path: '/supplier', element: <SupplierPage/>},
                {path: '/rowMaterial', element: <RowMaterialPage/>},
                {path: '/production', element: <ProductionPage/>},
                {path: '/product', element: <ProductPage/>},

                {path: '*', element: <Error/>}

            ]
        }
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

