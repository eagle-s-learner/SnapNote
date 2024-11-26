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
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:3020/api/userProfileIfCookieSet/', {
                    withCredentials: true,
                });
                if (response.status === 200) {
                    setLogin(true);
                    setUserInfo(response.data);
                }
            } catch (error) {
                console.error("User not authenticated or error occurred:", error);
                setLogin(false);
            } finally {
                // setLoading(false); // Stop loading once auth is checked
            }
        };

        checkAuth();
    }, [])

    return <AuthContext.Provider value={{userInfo, login, setLogin, setUserInfo}}>
        {children}
    </AuthContext.Provider>
}