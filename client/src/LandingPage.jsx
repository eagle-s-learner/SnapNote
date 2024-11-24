// import { useContext } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "./UserContext";

export default function LandingPage() {
    // const userCtx = useContext(AuthContext);

    return (
        <div className="bg-black items-center p-6 min-h-screen max-w-full">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between md:items-start">
                <img
                    className="md:w-1/2 object-contain"
                    src={"/snapNoteLogo.png"}
                    alt="website logo"
                />
                <div className="items-center justify-center md:mt-24">
                    <h1 className="text-white font-bold md:text-8xl text-5xl p-4">
                        Share views
                    </h1>
                    <h1 className="text-white text-2xl md:mt-6 text-center">
                        Connect now...
                    </h1>
                    <div className="w-full h-full mt-8">
                        <Link
                            to={"/signup"}
                            className="text-slate-200 block text-center md:w-1/2 w-full hover:bg-blue-500 bg-blue-400 rounded-2xl items-center p-3 md:mx-40 text-3xl"
                        >
                            Create Account
                        </Link>
                        <div className="flex items-center my-4">
                            <hr className="w-full border-gray-600" />
                            <span className="px-4 text-gray-400">or</span>
                            <hr className="w-full border-gray-600" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-center">
                            Already have an account?
                        </h1>
                        <Link
                            to={"/login"}
                            className="text-blue-500 block text-center w-full hover:underline border-2 mt-3 p-5 rounded-full"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
