import React from 'react';
import ReactDOM from 'react-dom/client.js';
import Navbar from './src/components/Navbar';
import Register from './src/components/Register';
import Login from './src/components/Login';
import ForgotPassword from './src/components/ForgotPassword';
import VerifyMail from './src/components/VerifyMail';
import NotFound from './src/components/NotFound';
import Footer from './src/components/Footer';
import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom';
import Home from './src/components/Home';
import OtpVerifyForgotPassword from './src/components/OtpVerifyForgotPassword';
import RenewPassword from './src/components/RenewPassword';

const AppLayout = ()=>{
    return(
        <div className='app'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

const AppRoute = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/user/verification/:email",
                element:<VerifyMail/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/forgotPassword",
                element:<ForgotPassword/>
            },
            {
                path:"/otpVerification_for_forgotPassword/:email",
                element:<OtpVerifyForgotPassword/>
            },
            {
                path:"/user/renewPassword/:email",
                element:<RenewPassword/>
            },
            {
                path:"*",
                element:<NotFound/>
            },
        ]
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={AppRoute}/>);