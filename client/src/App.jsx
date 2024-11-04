// import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./UserContext";
import LandingPage from "./LandingPage";
import HomePage from "./components/HomePage";
import Login from "./components/login-functionality/Login";
import Signup from "./components/signup-functionality/Signup";
import CheckLogin from "./CheckLogin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/:userName",
        element: (
            <CheckLogin>
                <HomePage />
            </CheckLogin>
        ),
    },
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
]);

export default function App() {
    return (
        <>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </>
    );
}
{
    /* <img src="http://localhost:3020/1729771194540-light-image2.jpg" alt="image"/> */
}
