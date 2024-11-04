import { createContext, useState } from "react";

export const AuthContext = createContext({
    userInfo: {},
    login: false,
    setLogin: () => {},
    setUserInfo: () => {},
})

export function AuthProvider({children}) {
    const [login, setLogin] = useState(false)
    const [userInfo, setUserInfo] = useState({});

    return <AuthContext.Provider value={{userInfo, login, setLogin, setUserInfo}}>
        {children}
    </AuthContext.Provider>
}