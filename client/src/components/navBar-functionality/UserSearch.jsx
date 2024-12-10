import axios from "axios";
import PopUpNotification from "../popupNotificationHandler/PopUpNotification";

export default function UserSearch({ userNameSearchData, setErrorOccure, errorOccure }) {
    async function handleFollow(email) {
        let response = null;
        try{
            response = await axios.post("http://localhost:3020/api/sendrequest/",
                {
                    following_email : email
                },
                {
                    withCredentials: true
                }
            )

            if(response.status == 200){
                setErrorOccure({
                    error: true,
                    message: "Request sent successfully"
                })
                document.getElementById("b2").click();
                document.getElementById("b1").click();
            }
        }catch(error){
            setErrorOccure({
                error: true,
                message: error.response?.data?.message
            })
        }
    }

    function handlePopUpClose() {
        setErrorOccure({
            error: false,
            message: ""
        })
    }
    
    return (
        <div className="absolute mt-3 w-80 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {errorOccure.error && (
                <PopUpNotification
                    message={errorOccure.message}
                    automaticCloseNotification={setErrorOccure}
                    onClose={handlePopUpClose}
                />
            )}
            {userNameSearchData.map((user, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between p-3 border-b border-gray-700"
                >
                    <div className="flex items-center space-x-3">
                        <img
                            src={user.profilePic}
                            alt="Profile Picture"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-white font-medium">
                                {user.name}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleFollow(user.email)}
                        disabled={
                            user.is_following !== null
                        }
                        className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                        user.is_following === null
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : user.is_following
                            ? "bg-slate-500 text-white cursor-not-allowed"
                            : "bg-slate-500 text-white cursor-not-allowed"
                    }
                `}
                    >
                        {user.is_following === null
                            ? "Follow"
                            : user.is_following
                            ? "Following"
                            : "Requested"}
                    </button>
                </div>
            ))}
        </div>
    );
}
