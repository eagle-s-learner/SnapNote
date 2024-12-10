import axios from "axios";
import { useEffect, useState } from "react";

export default function FollowsPage({
    followerOrFollowingPage,
    setFollowerOrFollowingPage,
}) {
    const [followersOrFollowing, setFollowersOrFollowing] = useState([]);

    useEffect(() => {
        async function gettingList() {
            let response = null;
            try {
                if (followerOrFollowingPage.whichList == "Followers") {
                    response = await axios.get(
                        "http://localhost:3020/api/followers/",
                        {
                            withCredentials: true,
                        }
                    );
                } else {
                    response = await axios.get(
                        "http://localhost:3020/api/following/",
                        {
                            withCredentials: true,
                        }
                    );
                }

                if (response.status == 200) {
                    setFollowersOrFollowing(response.data.lists);
                }
            } catch (error) {
                console.log(error);
            }
        }

        gettingList();
    }, [followerOrFollowingPage]);

    async function handleRmoveFOrF(whichList, email) {
        let response = null;
            try {
                if (whichList == "Followers") {
                    response = await axios.post(
                        "http://localhost:3020/api/removefollower/",
                        {
                            followers_email: email
                        },
                        {
                            withCredentials: true,
                        }
                    );
                } else {
                    response = await axios.post(
                        "http://localhost:3020/api/removefollowing/",
                        {
                            following_email: email
                        },
                        {
                            withCredentials: true,
                        }
                    );
                }

                if (response.status == 200) {
                    setFollowerOrFollowingPage({
                        showList: false,
                        whichList: ""
                    });
                }
            } catch (error) {
                console.log(error);
            }
    }

    return (
        <div
            className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() =>
                setFollowerOrFollowingPage({
                    showList: false,
                    whichList: "",
                })
            }
        >
            <div
                className="w-96 bg-black rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold text-white">
                        {followerOrFollowingPage.whichList}
                    </h3>
                    <button
                        onClick={() =>
                            setFollowerOrFollowingPage({
                                showList: false,
                                whichList: "",
                            })
                        }
                        className="text-gray-200 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                {/*  List */}
                <div className="p-4 max-h-96 overflow-y-auto text-white">
                    {followersOrFollowing.length > 0 &&
                        followersOrFollowing.map((list, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between mb-2"
                            >
                                <div className="flex items-center gap-2">
                                    <img
                                        className="rounded-full w-14 h-14"
                                        src={list.profilePic}
                                        alt="Profile Picture"
                                    />
                                    <h1 className="font-medium">{list.name}</h1>
                                </div>

                                <button
                                    className="font-bold bg-slate-400 px-4 h-10 rounded-lg hover:bg-slate-500"
                                    onClick={() =>
                                        handleRmoveFOrF(
                                            followerOrFollowingPage.whichList,
                                            list.email
                                        )
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

/* {followers.map((follower, index) => (
<div
key={index}
className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md"
>
<div className="flex items-center space-x-3">
<div className="w-10 h-10 rounded-full bg-gray-300"></div>
<div>
<p className="font-medium">{follower.username}</p>
<p className="text-sm text-gray-500">{follower.name}</p>
</div>
</div>
<button className="px-4 py-2 text-white bg-blue-500 rounded-md">
Follow
</button>
</div>
))} */
