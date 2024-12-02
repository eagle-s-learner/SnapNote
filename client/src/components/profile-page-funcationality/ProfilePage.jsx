import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../UserContext";
import NavBar from "../navBar-functionality/NavBar";
import FollowsPage from "./FollowsPage";

export default function HomePage() {
    const { userName } = useParams();
    const [followerOrFollowingPage, setFollowerOrFollowingPage] = useState({
        showList: false,
        whichList: "",
    });

    const userCtx = useContext(AuthContext);

    // const userName = userCtx.userInfo.email.substring(
    //     0,
    //     userCtx.userInfo.email.lastIndexOf("@")
    // );

    return (
        <div className="bg-black min-w-fit min-h-screen">
            <NavBar />
            <div className="mx-auto w-fit mt-7 items-center">
                <img
                    className="w-40 h-40 rounded-full border-4 border-blue-600"
                    src={userCtx.userInfo.profilePic}
                    alt="Your profile photo"
                />
                <h1 className="font-semibold text-white  mt-2 text-2xl">
                    {userCtx.userInfo.name}
                </h1>
            </div>
            <h1 className="font-semibold w-fit mx-auto text-slate-400">
                username: {userName}
            </h1>
            <div className="gap-24 mt-4 md:gap-96 flex w-fit mx-auto">
                <button
                    onClick={() =>
                        setFollowerOrFollowingPage({
                            showList: true,
                            whichList: "Followers",
                        })
                    }
                    className="text-white block underline text-xl"
                >
                    Followers
                </button>
                <button
                    onClick={() =>
                        setFollowerOrFollowingPage({
                            showList: true,
                            whichList: "Following",
                        })
                    }
                    className="text-white block underline text-xl"
                >
                    Following
                </button>
            </div>
            {followerOrFollowingPage.showList && (
                <FollowsPage
                    followerOrFollowingPage={followerOrFollowingPage}
                    setFollowerOrFollowingPage={setFollowerOrFollowingPage}
                />
            )}
            <hr className="mt-3 mx-auto w-full border-gray-600 border-2" />
            <h1 className="text-white">hello</h1>
        </div>
    );
}
