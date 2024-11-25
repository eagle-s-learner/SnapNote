import { useContext } from "react";
import { AuthContext } from "./UserContext";
import { Navigate } from "react-router-dom";

export default function CheckLogin({children}){
    const userCtx = useContext(AuthContext)

    if(!userCtx.login){
        return <Navigate to={'/'} replace/>
    }

    return children
}