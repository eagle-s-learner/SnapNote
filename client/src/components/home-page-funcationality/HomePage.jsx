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
                    An aspiring software engineer with a B.Tech in Information
                    Technology. I am passionate about leveraging technology to
                    solve real-world problems. Currently looking for
                    opporitunities to apply my lerning.
                    <br />
                    <div className="items-center">
                        <span>Connect with me: </span>
                        <a
                            href="https://linkedin.com/in/satyam-kr-1a3394244"
                            target="_blank"
                            className="w-fit inline-block"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="30"
                                height="30"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="#0078d4"
                                    d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
                                ></path>
                                <path
                                    d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z"
                                    opacity=".05"
                                ></path>
                                <path
                                    d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
                                    opacity=".07"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
                                ></path>
                            </svg>
                        </a>
                        <a
                            href="https://github.com/eagle-s-learner"
                            className="w-fit inline-block"
                            target="_blank"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="30"
                                height="30"
                                viewBox="0 0 32 32"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
