import { useState } from "react";
import NavBar from "../navBar-functionality/NavBar";

export default function CreatePost() {
    const [imagePost, setImagePost] = useState(null);
    const [textPost, setTextPost] = useState("");
    const maxChars = 250;

    function handleImageUpload(ev) {
        setImagePost(ev.target.files[0]);
    }

    function handleAddPost() {
        console.log("add post")
    }
    return (
        <div className="bg-black min-w-full min-h-screen overflow-hidden">
            <NavBar />
            {imagePost && (
                <div className="mt-4 inset-x-auto mx-auto w-fit relative">
                    <img
                        src={URL.createObjectURL(imagePost)}
                        alt="Preview"
                        className="max-w-96 max-h-96 object-cover border-red-300 border-2 rounded-md"
                    />
                    <button
                        className="absolute top-0 right-0"
                        onClick={() => setImagePost(null)}
                    >
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
                </div>
            )}
            <div className="w-full mx-2 mt-4 relative lg:w-1/3 lg:mx-auto">
                <textarea
                    className="bg-black p-3 h-32 resize-none w-screen text-white focus:outline-none caret-blue-500"
                    type="text"
                    value={textPost}
                    placeholder="Do you have someting to share? Type here..."
                    maxLength={maxChars} // Limit to 250 characters
                    onChange={(e) => setTextPost(e.target.value)}
                />
                <div className="absolute -top-2 left-3 text-gray-400 text-sm mt-1">
                    {textPost.length}/{maxChars} characters
                </div>
            </div>
            {imagePost === null && (
                <div className="lg:mx-auto lg:w-fit">
                    <button
                        onClick={() =>
                            document.getElementById("imageUpload").click()
                        }
                    >
                        <div className="mx-5 relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-16 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="5"
                                stroke="currentColor"
                                className="size-6 text-white absolute -top-2 left-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        </div>
                    </button>
                    <input
                        type="file"
                        id="imageUpload"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                    />
                </div>
            )}
            <div className="w-fit mx-auto">
                <button
                    onClick={handleAddPost}
                    className={`py-3 px-7 rounded-lg font-semibold text-white ${
                        textPost || imagePost
                            ? "bg-blue-600"
                            : "bg-blue-400 cursor-not-allowed"
                    }`}
                    disabled={!textPost && !imagePost}
                >
                    Add Post
                </button>
            </div>
        </div>
    );
}
