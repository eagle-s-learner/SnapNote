import { useContext, useState } from "react";
import { AuthContext } from "../UserContext";
import Logout from "./logout-functionality/Logout";

export default function NavBar() {
    const userCtx = useContext(AuthContext);
    const [logoutAcc, setLogoutAcc] = useState(false);

    function handleLogoutDisplay() {
        setLogoutAcc(prev => !prev)
    }
    return (
        <div className="relative flex px-1 w-full justify-between items-center">
            <img
                className="w-20 h-20 rounded-full object-contain"
                src="./snapNoteLogo.png"
                alt="web site logo"
            />
            <div className="flex lg:gap-12 gap-2 items-center">
                <h1 className="text-white border-b-2 border-blue-600 p-3">
                    Profile
                </h1>
                <h1 className="text-white hover:border-blue-400 hover:border-b-2 p-3">
                    Home
                </h1>
                <div className="inline-flex lg:gap-12 gap-2">
                    <button>
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
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                    </button>
                    <h1 className="text-white hover:border-blue-400 hover:border-b-2 p-3">
                        Create Post
                    </h1>
                    <h1 className="text-white hover:border-blue-400 hover:border-b-2 p-3">
                        Requests
                    </h1>
                </div>
            </div>
            <button onClick={handleLogoutDisplay}>
                <img
                    className="rounded-full border-2 p-1 bg-slate-300 border-blue-400 hover:border-blue-600"
                    src={userCtx.userInfo.profilePic}
                    alt="user profile photo"
                />
            </button>
            {logoutAcc && <Logout handleLogoutDisplay={handleLogoutDisplay}/>}
        </div>
    );
}
