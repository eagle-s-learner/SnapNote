// import { useParams } from "react-router-dom"
import { useContext } from "react";
import NavBar from "../navBar-functionality/NavBar";
import { AuthContext } from "../../UserContext";
import HomePageMiddlePart from "./HomePageMiddlePart";

export default function HomePage() {
    // const params = useParams();
    const userCtx = useContext(AuthContext);

    const userName = userCtx.userInfo.email.substring(
        0,
        userCtx.userInfo.email.lastIndexOf("@")
    );

    return (
        <div className="bg-black min-w-fit min-h-screen">
            <NavBar />
            <div className="flex h-screen">
                <div className="hidden lg:block lg:w-1/4 bg-black border-r-4 border-black text-white p-4 overflow-y-auto">
                    <div className="mx-auto w-fit items-center h-screen">
                        <img
                            src={userCtx.userInfo.profilePic}
                            alt="Profile Picture"
                            className="w-56 h-56 object-cover rounded-full"
                        />
                        <h1 className="w-fit mx-auto mt-2 font-semibold text-xl">
                            {userCtx.userInfo.name}
                        </h1>
                        <h1 className="w-fit mx-auto mt-2 font-semibold text-slate-400 text-xl">
                            username: {userName}
                        </h1>
                    </div>
                    <div className="mt-auto">
                        <button
                            onClick={() =>
                                document.getElementById("logoutId").click()
                            }
                            className="w-full bg-red-600 text-white py-2 rounded-lg"
                        >
                            Logout Your Account
                        </button>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 bg-black p-4 overflow-auto">
                    <HomePageMiddlePart />
                </div>

                <div className="hidden lg:block lg:w-1/4 bg-gray-800 text-white p-4 overflow-y-auto">
                    Last Column exercitationem minus dignissimos quasi. Libero
                    maiores maxime vitae, voluptatum ut facere in est tempora
                    placeat.
                </div>
            </div>
        </div>
    );
}
