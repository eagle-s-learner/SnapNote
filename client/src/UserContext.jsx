import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    userInfo: {},
    login: false,
    setLogin: () => {},
    setUserInfo: () => {},
})

export function AuthProvider({children}) {
    const [login, setLogin] = useState(false)
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const response = axios.get('/userProfileIfCookieSet/');
        if(response.status === 200){
            setLogin(true)
            setUserInfo(response.data)
        }
    }, [])

    return <AuthContext.Provider value={{userInfo, login, setLogin, setUserInfo}}>
        {children}
    </AuthContext.Provider>
}