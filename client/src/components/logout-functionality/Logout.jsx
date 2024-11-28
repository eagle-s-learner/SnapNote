import { useContext, useState } from "react";
import { AuthContext } from "../../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopUpNotification from "../popupNotificationHandler/PopUpNotification";

export default function Logout({ handleLogoutDisplay }) {
    const userCtx = useContext(AuthContext);
    const [errorOccure, setErrorOccure] = useState({
        error: false,
        message: "",
    });

    const navigate = useNavigate();

    async function handleLogout() {
        let response = null;
        try {
            response = await axios.post(
                "http://localhost:3020/api/logout/",
                {},
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                // setTimeout(() => {
                //     setErrorOccure({
                //         error: true,

                //     })
                // }, 3000);
                userCtx.setLogin(false);
                userCtx.setUserInfo({});
                navigate("/");
            }
        } catch (error) {
            setErrorOccure({ error: true, message: error.message });
        }
    }

    function handlePopUpClose() {
        setErrorOccure({ error: false, message: "" });
    }

    return (
        <div className="absolute right-4 bg-slate-600 rounded-md shadow-lg p-3 z-10 top-20">
            {errorOccure.error && errorOccure.message.length > 0 && (
                <PopUpNotification
                    message={errorOccure.message}
                    automaticCloseNotification={setErrorOccure}
                    onClose={handlePopUpClose}
                />
            )}
            <img
                className="mx-auto w-24 h-24 rounded-full"
                src={userCtx.userInfo.profilePic}
            />
            <h1 className="text-white font-semibold w-fit mx-auto">
                {userCtx.userInfo.name}
            </h1>
            <h1 className="text-white">
                username:{" "}
                <span className="text-black font-bold">
                    {userCtx.userInfo.email.substring(
                        0,
                        userCtx.userInfo.email.lastIndexOf("@")
                    )}
                </span>
            </h1>
            <button
                onClick={handleLogout}
                className="mx-auto w-full my-4 bg-slate-100 text-slate-700 hover:text-slate-800 rounded-md p-2 font-bold text-lg"
            >
                Logout
            </button>
            <button
                className="absolute top-1 right-2"
                onClick={handleLogoutDisplay}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 font-semibold text-white hover:rotate-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
}
