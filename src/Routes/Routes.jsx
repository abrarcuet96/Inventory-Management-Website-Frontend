import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import CreateShop from "../pages/CreateShop/CreateShop";
import Dashboard from "../layouts/DashboardLayout/Dashboard";
import ManagerHome from "../pages/Dashboard/ManagerHome/ManagerHome";
import AddProduct from "../pages/AddProduct/AddProduct";
import Subscription from "../pages/Subscription/Subscription";
import ProductsSection from "../pages/ProductsSection/ProductsSection";
import UpdateProduct from "../pages/UpdateProductDetails/UpdateProduct";
import AllProducts from "../pages/AllProducts/AllProducts";
import CheckOutCart from "../pages/CheckOutCart/CheckOutCart";
import SaleSummary from "../pages/SaleSummary/SaleSummary";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import ManageShop from "../pages/ManageShop/ManageShop";
import AdminSaleSummary from "../pages/AdminSaleSummary/AdminSaleSummary";

const myRoutes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/createStore',
                element: <CreateShop></CreateShop>
            }
        ]
    },
    {
        path: 'register',
        element: <Register></Register>
    },
    {
        path: 'login',
        element: <Login></Login>
    },
    {
        path:'dashboard',
        element: <Dashboard></Dashboard>,
        children:[
            {
                path:'managerHome',
                element: <ManagerHome></ManagerHome>
            },
            {
                path:'adminHome',
                element: <AdminHome></AdminHome>
            },
            {
                path:'addProduct',
                element: <AddProduct></AddProduct>
            },
            {
                path:'subscription',
                element: <Subscription></Subscription>
            },
            {
                path:'productsSection',
                element: <ProductsSection></ProductsSection>
            },
            {
                path:'allProductsSection',
                element: <AllProducts></AllProducts>
            },
            {
                path:'checkOutCart',
                element: <CheckOutCart></CheckOutCart>
            },
            {
                path:'saleSummary',
                element: <SaleSummary></SaleSummary>
            },
            {
                path:'manageShop',
                element: <ManageShop></ManageShop>
            },
            {
                path:'adminSaleSummary',
                element: <AdminSaleSummary></AdminSaleSummary>
            },
            {
                path:'updateProductDetails/:email/:id',
                element: <UpdateProduct></UpdateProduct>,
                loader: ({params})=> fetch(`http://localhost:5000/products/email/${params.id}`)
            },
        ]
    }
])
export default myRoutes;