import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingDesign from "../Loader-Spinner/LoadingDesign";
import EmailVerify from "./EmailVerifiy";
import PopUpNotification from "../popupNotificationHandler/PopUpNotification";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [verifyingCode, setVerifyingCode] = useState({
        code: "",
        verified: false,
    });
    const [isReadyForVErification, setIsReadyForVerification] = useState(false);
    const [errorOccure, setErrorOccure] = useState({
        error: false,
        message: "",
    });
    const userCtx = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (userCtx.login) {
            navigate("/:userName");
        }
    }, [userCtx.login, navigate]);

    function handleQuiteButton() {
        navigate("/");
    }

    async function handleEmailVerify(ev) {
        ev.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email.toLowerCase());

        let response = null;

        try {
            if (name.length > 50) {
                throw Error(
                    "Name should be of length less than of 50 Characters"
                );
            }
            response = await axios.post(
                "http://localhost:3020/api/emailverify/",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            setIsReadyForVerification(true);
        } catch (err) {
            if (err.response && err.response.data) {
                setErrorOccure({ message: err.response.data.message, error: true });
            }
            // setErrorOccure({ message: response.data.message, error: true });
        } finally {
            setIsLoading(false);
            if(response.status === 400){
                navigate("/")
            }
        }
    }

    function handleClose() {
        setErrorOccure({ error: false, message: "" });
    }

    return (
        <div className="bg-black min-h-screen p-5">
            <div className="md:w-1/2 mx-auto">
                <div className="flex justify-between">
                    <button onClick={handleQuiteButton}>
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
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <img
                        src="/snapNoteLogo.png"
                        className="w-20 h-20 rounded-full object-contain"
                        alt="website logo"
                    />
                </div>
                {errorOccure.error && (
                    <PopUpNotification
                        message={errorOccure.message}
                        onClose={handleClose}
                        automaticCloseNotification={setErrorOccure}
                    />
                )}
                <h1 className="text-white font-mono text-2xl font-bold text-center">
                    Create an Account
                </h1>
                {!isReadyForVErification && (
                    <form onSubmit={handleEmailVerify}>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                            placeholder="Name"
                            className="py-3 px-2 bg-black border-2 text-white rounded-md my-4 border-slate-400 w-full"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            placeholder="Email"
                            className="py-3 px-2 bg-black border-2 text-white rounded-md border-slate-400 w-full"
                            required
                        />
                        <button
                            className="w-72 mt-5 text-center mx-auto block bg-white text-slate-500 font-bold py-5 px-3 rounded-full"
                            type="submit"
                        >
                            {!isLoading ? "Next" : <LoadingDesign />}
                        </button>
                    </form>
                )}
                {isReadyForVErification && (
                    <EmailVerify
                        handleEmailVerify={handleEmailVerify}
                        name={name}
                        email={email}
                        setVerifyingCode={setVerifyingCode}
                        verifyingCode={verifyingCode}
                    />
                )}
            </div>
        </div>
    );
}
