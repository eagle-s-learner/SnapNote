import { useContext, useEffect, useState } from "react";
import NavBar from "../navBar-functionality/NavBar";
import axios from "axios";
import { AuthContext } from "../../UserContext";
import PopUpNotification from "../popupNotificationHandler/PopUpNotification";

export default function RequestsPage() {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [errorOccure, setErrorOccure] = useState({
        error: false,
        message: "",
    });

    const userCtx = useContext(AuthContext);

    useEffect(() => {
        async function checkRequests() {
            let response = null;
            try {
                response = await axios.get(
                    "http://localhost:3020/api/getallrequests/",
                    {
                        withCredentials: true,
                    }
                );

                if (response.status == 200) {
                    setPendingRequests(response.data.requests);
                }
            } catch (error) {
                console.log(error);
            }
        }

        checkRequests();
    }, []);

    async function handleAcceptRequest(follower_email, user_email) {
        // console.log(follower_email, user_email);
        let response = null;
        try {
            response = await axios.post(
                "http://localhost:3020/api/acceptrequest/",
                {
                    follower_email,
                    user_email,
                },
                {
                    withCredentials: true,
                }
            );

            if (response.status == 200) {
                setPendingRequests(response.data.requests);
            }
        } catch (error) {
            // console.log(error);
            setErrorOccure({
                error: true,
                message: error.message,
            });
        }
    }

    function handlePopClose() {
        setErrorOccure({
            error: false,
            message: "",
        });
    }

    return (
        <div className="bg-black min-w-fit min-h-screen">
            <NavBar />
            {errorOccure.error && (
                <PopUpNotification
                    automaticCloseNotification={setErrorOccure}
                    message={errorOccure.message}
                    onClose={handlePopClose}
                />
            )}
            <div className="items-center p-3 mt-4 lg:w-2/3 mx-auto">
                {pendingRequests.length == 0 ? (
                    <h1 className="text-slate-400">No Request Found ...</h1>
                ) : (
                    pendingRequests.map((request, index) => (
                        <div
                            key={index}
                            className="bg-gray-600 mb-2 rounded-md shadow-md items-center flex justify-between"
                        >
                            <div className="p-2 flex items-center gap-2">
                                <img
                                    src={request.profilePic}
                                    alt="Profile Picture"
                                    className="rounded-md"
                                />
                                <h1 className="text-2xl sm:text-xl text-slate-300 font-semibold">
                                    {request.name}
                                </h1>
                            </div>
                            <button
                                onClick={() =>
                                    handleAcceptRequest(
                                        request.followers_email,
                                        userCtx.userInfo.email
                                    )
                                }
                                className="py-2 bg-blue-600 hover:bg-blue-500 px-6 mr-2 rounded-md font-semibold text-white"
                            >
                                Accept
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
