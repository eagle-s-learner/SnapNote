import { useContext, useState } from "react";
import { AuthContext } from "../../UserContext";
import Logout from "../logout-functionality/Logout";
import { Link, useLocation } from "react-router-dom";
import ToggleMenu from "./ToggleMenu";

export default function NavBar() {
    const userCtx = useContext(AuthContext);
    const [logoutAcc, setLogoutAcc] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [userNameSerach, setUserNameSearch] = useState(false);

    const location = useLocation();

    const userName = userCtx.userInfo.email.substring(
        0,
        userCtx.userInfo.email.lastIndexOf("@")
    );

    function handleLogoutDisplay() {
        setLogoutAcc((prev) => !prev);
    }

    function handleToggleMenu() {
        setToggleMenu((prev) => !prev);
    }

    function handleDisplaySearchBar() {
        setUserNameSearch((prev) => !prev);
        setToggleMenu(false);
    }

    return (
        <div className="relative flex px-1 w-full justify-between items-center">
            <img
                className="w-20 h-20 rounded-full object-contain"
                src="/snapNoteLogo.png"
                alt="web site logo"
            />
            <div className="flex lg:gap-12 gap-2 items-center">
                <button>
                    <Link
                        to={`/${userName}`}
                        className={
                            location.pathname === `/${userName}`
                                ? "text-white border-b-2 hover:border-blue-400 hover:border-b-2 border-blue-600 p-3"
                                : "text-white hover:border-blue-400 hover:border-b-2 p-3"
                        }
                    >
                        Profile
                    </Link>
                </button>
                <button>
                    <Link
                        to={`/${userName}/home`}
                        className={
                            location.pathname === `/${userName}/home`
                                ? "text-white border-b-2 hover:border-blue-400 hover:border-b-2 border-blue-600 p-3"
                                : "text-white hover:border-blue-400 hover:border-b-2 p-3"
                        }
                    >
                        Home
                    </Link>
                </button>
                {
                    <div className="hidden md:inline-flex lg:gap-12 gap-2">
                        <button onClick={handleDisplaySearchBar}>
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
                        <button>
                            <Link
                                to={`/${userName}/createpost`}
                                className={
                                    location.pathname ===
                                    `/${userName}/createpost`
                                        ? "text-white border-b-2 hover:border-blue-400 hover:border-b-2 border-blue-600 p-3"
                                        : "text-white hover:border-blue-400 hover:border-b-2 p-3"
                                }
                            >
                                Create Post
                            </Link>
                        </button>
                        <button>
                            <Link
                                to={`/${userName}/requests`}
                                className={
                                    location.pathname ===
                                    `/${userName}/requests`
                                        ? "text-white border-b-2 hover:border-blue-400 hover:border-b-2 border-blue-600 p-3"
                                        : "text-white hover:border-blue-400 hover:border-b-2 p-3"
                                }
                            >
                                Requests
                            </Link>
                        </button>
                    </div>
                }
                {<ToggleMenu handleToggleMenu={handleToggleMenu} />}
                {toggleMenu && (
                    <div className="absolute z-50 top-16  mt-3 items-center bg-gray-800 rounded-md shadow-lg p-3 flex flex-col gap-2 text-white">
                        <button onClick={handleDisplaySearchBar}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                        </button>
                        <button>
                            <Link
                                to={`/${userName}/createpost`}
                                className={
                                    location.pathname ===
                                    `/${userName}/createpost`
                                        ? "hover:border-blue-400 border-blue-600 border-b-2 hover:border-b-2 p-1 w-fit"
                                        : "hover:border-blue-400 hover:border-b-2 p-1 w-fit"
                                }
                            >
                                Create Post
                            </Link>
                        </button>
                        <button>
                            <Link
                                to={`/${userName}/requests`}
                                className={
                                    location.pathname ===
                                    `/${userName}/requests`
                                        ? "hover:border-blue-400 border-blue-600 border-b-2 hover:border-b-2 p-1 w-fit"
                                        : "hover:border-blue-400 hover:border-b-2 p-1 w-fit"
                                }
                            >
                                Requests
                            </Link>
                        </button>
                    </div>
                )}
            </div>
            <button onClick={() => handleLogoutDisplay()} id="logoutId">
                <img
                    className="rounded-full border-2 p-1 bg-slate-300 border-blue-400 hover:border-blue-600"
                    src={userCtx.userInfo.profilePic}
                    alt="user profile photo"
                />
            </button>
            {logoutAcc && <Logout handleLogoutDisplay={handleLogoutDisplay} />}

            {userNameSerach && (
                <div className="absolute top-20 z-50 p-3 rounded-full w-fit lg:right-1/2 mx-12 bg-slate-400">
                    <input
                        type="text"
                        placeholder="Search username..."
                        className="bg-slate-100 p-2 rounded-full text-black"
                    />

                    <button
                        className="absolute right-4 top-5"
                        onClick={handleDisplaySearchBar}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 font-semibold hover:rotate-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
