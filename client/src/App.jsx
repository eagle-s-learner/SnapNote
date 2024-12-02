// import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./UserContext";
import LandingPage from "./LandingPage";
import ProfilePage from "./components/profile-page-funcationality/ProfilePage";
import Login from "./components/login-functionality/Login";
import Signup from "./components/signup-functionality/Signup";
import CheckLogin from "./CheckLogin";
import HomePage from "./components/home-page-funcationality/HomePage";
import CreatePost from "./components/create-post-funcationality/CreatePost";
import RequestsPage from "./components/request-page-funcationality/RequestsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/:userName",
        element: (
            <CheckLogin>
                <ProfilePage />
            </CheckLogin>
        ),
    },
    {
        path: "/:userName/home",
        element: (
            <CheckLogin>
                <HomePage />
            </CheckLogin>
        ),
    },
    {
        path: "/:userName/createpost",
        element: (
            <CheckLogin>
                <CreatePost />
            </CheckLogin>
        ),
    },
    {
        path: "/:userName/requests",
        element: (
            <CheckLogin>
                <RequestsPage />
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
