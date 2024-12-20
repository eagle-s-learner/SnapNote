import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../UserContext";
import LoadingDesign from "../Loader-Spinner/LoadingDesign";
import PopUpNotification from "../popupNotificationHandler/PopUpNotification";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [loginSuccess, setLoginSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const userCtx = useContext(AuthContext);

    const [errorOccure, setErrorOccure] = useState({
        error: false,
        message: "",
    });

    useEffect(() => {
        // if(userCtx.login){
        //     setLoginSuccess(true);
        // }
        if (userCtx.login) {
            navigate(
                `/${userCtx.userInfo.email.substring(
                    0,
                    userCtx.userInfo.email.lastIndexOf("@")
                )}/home`
            );
            // return;
        }
    }, [userCtx.login, userCtx.userInfo?.email, navigate]);

    function handleQuiteButton() {
        navigate("/");
    }

    async function handleLogIn(ev) {
        ev.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        let response = null;
        try {
            response = await axios.post(
                "http://localhost:3020/api/login/",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                // console.log(response.data)
                // setLoginSuccess(true);
                userCtx.setLogin(true);
                userCtx.setUserInfo(response.data);
                setErrorOccure({
                    error: true,
                    message: "LoggedIn Successfully...",
                });
            }

            if (response.status === 422 || response.status === 400) {
                setErrorOccure({
                    error: true,
                    message: response.data.message,
                });
            }
        } catch (error) {
            // console.log(error)
            setErrorOccure({
                error: true,
                message: error.response.data.message,
            });
        } finally {
            setIsLoading(false);
        }
        // console.log("login")
    }

    function handlePopUpClose() {
        setErrorOccure({
            error: false,
            message: "",
        });
    }

    return (
        <div className="bg-black min-h-screen p-5">
            {errorOccure.error && errorOccure.message.length > 0 && (
                <PopUpNotification
                    message={errorOccure.message}
                    automaticCloseNotification={setErrorOccure}
                    onClose={handlePopUpClose}
                />
            )}
            <div className="md:w-1/2 mx-auto">
                <div className="flex justify-between">
                    <button onClick={handleQuiteButton}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <img
                        src="/snapNoteLogo.png"
                        className="w-20 h-20 rounded-full object-contain"
                        alt="website logo"
                    />
                </div>
                <div className="justify-center">
                    <h1 className="text-white text-2xl font-serif font-bold w-fit mx-auto">
                        Sign in to Your Account
                    </h1>
                </div>

                <form onSubmit={handleLogIn}>
                    <label className="text-slate-400 block mt-3 font-semibold">
                        Enter Your Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        value={email}
                        placeholder="example@gmail.com"
                        onChange={(ev) => setEmail(ev.target.value)}
                        required
                        className="w-full py-3 px-4 rounded-md bg-black text-slate-300 border-2"
                    />
                    <label className="text-slate-400 block mt-3 font-semibold">
                        Enter Your Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={(ev) => setPassword(ev.target.value)}
                        required
                        className="w-full py-3 px-4 rounded-md bg-black text-slate-300 border-2"
                    />

                    <button
                        type="submit"
                        className="bg-slate-200 w-56 mt-4 py-3 px-6 rounded-3xl font-bold text-slate-600 block mx-auto hover:text-slate-800"
                    >
                        {!isLoading ? "Submit" : <LoadingDesign />}
                    </button>
                </form>
            </div>
        </div>
    );
}
