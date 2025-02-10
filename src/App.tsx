

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootLayout} from "./component/RootLayout.tsx";
import {Toaster} from "react-hot-toast";
import {Error} from "./component/Error.tsx";
import {Home} from "./pages/Home.tsx";
import {EmployeePage} from "./pages/EmployeePage.tsx";
import {SupplierPage} from "./pages/SupplierPage.tsx";
import {CategoryPage} from "./pages/CategoryPage.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.tsx";



function App() {
    const routes = createBrowserRouter([
        {
            path: '',
            element: <RootLayout/>,
            children: [
                {path: '', element: <Home/>},
                {path: '/employee', element: <EmployeePage/>},
                {path: '/supplier', element: <SupplierPage/>},
                {path: '/category', element: <CategoryPage/>},
                {path: '*', element: <Error/>}

            ]
        }
    ]);

    return (
        <>
        <Provider store={store}>
                <Toaster position={"top-center"}/>
                <RouterProvider router={routes}/>
        </Provider>
            </>
    );


}

export default App

