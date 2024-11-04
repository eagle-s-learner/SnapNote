import axios from "axios";
import PopUpNotification from "../popupNotificationHandler/PopUpNotification";
import { useState } from "react";
import LoadingDesign from "../Loader-Spinner/LoadingDesign";
import { useNavigate } from "react-router-dom";

export default function EmailVerify({
    handleEmailVerify,
    name,
    email,
    verifyingCode,
    setVerifyingCode,
}) {
    const [errorOccure, setErrorOccure] = useState({
        error: false,
        message: "",
    });
    const [verified, setVerified] = useState(false);
    const [isInProcess, setIsInProcess] = useState(false);

    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState(null);

    async function handleCodeVerifyEmail(ev) {
        ev.preventDefault();
        setIsInProcess(true);

        const formData = new FormData();
        formData.append("email", email);
        formData.append("verifyingCode", verifyingCode.code);
        try {
            const response = await axios.post(
                "http://localhost:3020/api/codeforemailverify/",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.data.alreadyVerified) {
                setErrorOccure({
                    error: true,
                    message: response.data.message,
                });
                setVerified(true);
                return;
            }

            if (response.status === 200) {
                setErrorOccure({
                    error: true,
                    message: response.data.message,
                });
                setVerified(true);
            }
        } catch (error) {
            // console.log(error);
            setErrorOccure({
                error: true,
                message: error.response.data.message,
            });
        } finally {
            setIsInProcess(false);
        }
    }

    function handlePopUpClose() {
        setErrorOccure({ error: false, message: "" });
    }

    const navigate = useNavigate();
    async function handleConfirmAccount(ev){
        ev.preventDefault();
        setIsInProcess(true)
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profilePic", profilePic);

        let response = null;
        
        try{
            response = await axios.post('http://localhost:3020/api/confirmaccountcreation/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            if(response.status === 200){
                setErrorOccure({
                    error: true,
                    message: response.data.message,
                });
            }
        }catch(error){
            console.log(error);
            setErrorOccure({
                error: true,
                message: error.response.data.message,
            });
        }finally{
            setIsInProcess(false);
            if(response.status === 200){
                navigate('/login/');
            }
        }
    }

    return (
        <form onSubmit={!verified ? handleCodeVerifyEmail : handleConfirmAccount}>
            {errorOccure.error && errorOccure.message.length > 0 && (
                <PopUpNotification
                    message={errorOccure.message}
                    automaticCloseNotification={setErrorOccure}
                    onClose={handlePopUpClose}
                />
            )}
            <input
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                disabled
                className="py-3 px-2 cursor-not-allowed bg-black border-2 text-slate-400 rounded-md my-4 border-slate-400 w-full"
                required
            />
            <input
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                className="py-3 px-2 cursor-not-allowed bg-black border-2 text-slate-400 rounded-md border-slate-400 w-full"
                disabled
                required
            />
            {!verified && (
                <div>
                    <label
                        htmlFor="verifyingCode"
                        className="text-white font-thin block mr-1 mt-4"
                    >
                        Verification Code has been sent to your email
                    </label>
                    <input
                        type="text"
                        name="verifyingCode"
                        value={verifyingCode.code}
                        onChange={(ev) =>
                            setVerifyingCode({
                                ...verifyingCode,
                                code: ev.target.value,
                            })
                        }
                        className="text-white bg-black py-1 px-2 border-2"
                        placeholder="Verifying Code"
                    />
                    <button
                        type="submit"
                        onClick={handleEmailVerify}
                        className="text-red-500 block text-xs hover:underline"
                    >
                        resend code
                    </button>
                </div>
            )}
            {!verified && (
                <button
                    className="w-72 mt-5 text-center mx-auto block bg-white text-slate-500 hover:text-slate-700 font-bold py-5 px-3 rounded-full"
                    type="submit"
                >
                    {!isInProcess ? "Next" : <LoadingDesign />}
                </button>
            )}
            {verified && (
                <div>
                    <label className="text-slate-400 my-4 block mx-auto font-semibold w-fit">
                        Fill all the Details for successful Login
                    </label>
                    <label className="text-slate-400 my-4 block font-semibold">
                        Your USERNAME is:{" "}
                        <span className="text-blue-500 font-bold">
                            {email.slice(0, email.lastIndexOf("@"))}
                        </span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(ev) => setPassword(ev.target.value)}
                        className="py-3 px-2 bg-black border-2 text-slate-400 rounded-md border-slate-400 w-1/2"
                        required
                    />
                    <label className="text-slate-400 my-4 mx-auto w-fit block font-semibold">
                        Set Your Profile Picture
                    </label>
                    <div className="relative w-48 h-48 mx-auto rounded-full">
                        <img
                            src={!profilePic ? "/user.png" : URL.createObjectURL(profilePic)}
                            className="w-48 h-48 rounded-full"
                            alt="Profile"
                        />

                        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold cursor-pointer">
                            Choose Image
                            <input
                                type="file"
                                onChange={(ev) => setProfilePic(ev.target.files[0])}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </label>
                    </div>
                    <button
                        className="w-72 mt-5 text-center mx-auto block bg-white text-slate-500 hover:text-slate-700 font-bold py-5 px-3 rounded-full"
                        type="submit"
                    >
                        {!isInProcess ? "Confirm" : <LoadingDesign />}
                    </button>
                </div>
            )}
        </form>
    );
}
