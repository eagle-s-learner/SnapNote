import axios from "axios";
import { useState, useEffect } from "react";
import CommentPage from "../commnet-page/CommentPage";
import PopUpNotification from "../popupNotificationHandler/PopUpNotification";

export default function HomePageMiddlePart() {
    const [wantToComment, setWantToComment] = useState({
        openComment: false,
        postId: -1,
    });

    const [errorOccure, setErrorOccure] = useState({
        error: false,
        message: "",
    });

    const [allPost, setAllPost] = useState([]);

    useEffect(() => {
        const getAllPost = async () => {
            let response = null;

            try {
                response = await axios.get(
                    "http://localhost:3020/api/getallpostforhomepage/",
                    {
                        withCredentials: true,
                    }
                );

                if (response.status == 200) {
                    // console.log(response.data);
                    setAllPost(response.data.posts);
                }
            } catch (error) {
                setErrorOccure({
                    error: true,
                    message: error.response.data.message,
                });
            } finally {
                setErrorOccure({
                    error: false,
                    message: "",
                });
            }
        };

        getAllPost();
    }, []);

    // to get total number of comments after each comment post
    const getAllPost = async () => {
        let response = null;

        try {
            response = await axios.get(
                "http://localhost:3020/api/getallpostforhomepage/",
                {
                    withCredentials: true,
                }
            );

            if (response.status == 200) {
                // console.log(response.data);
                setAllPost(response.data.posts);
            }
        } catch (error) {
            setErrorOccure({
                error: true,
                message: error.response.data.message,
            });
        } finally {
            setErrorOccure({
                error: false,
                message: "",
            });
        }
    };

    function handlePopUpClose() {
        setErrorOccure({
            error: false,
            message: "",
        });
    }

    async function handleLikeButton(index) {
        let idx = index;

        let response = null;
        try {
            if (allPost[idx].user_has_liked) {
                response = await axios.post(
                    "http://localhost:3020/api/userunlikeathomepage",
                    {
                        post_id: allPost[idx].post_id,
                        user_id: allPost[idx].post_user_id,
                    },
                    { withCredentials: true }
                );
            } else {
                // console.log(allPost[idx].post_user_id)
                response = await axios.post(
                    "http://localhost:3020/api/userlikeathomepage/",
                    {
                        post_id: allPost[idx].post_id,
                        user_id: allPost[idx].post_user_id,
                    },
                    { withCredentials: true }
                );
            }

            if (response.status == 200) {
                setAllPost(response.data.posts);
            }
        } catch (error) {
            setErrorOccure({
                error: true,
                message: error.response.data.message,
            });
        } finally {
            setErrorOccure({
                error: false,
                message: "",
            });
        }
    }

    return (
        <div className="w-64 lg:w-96 mx-auto pb-2">
            {errorOccure.error && (
                <PopUpNotification
                    message={errorOccure.message}
                    automaticCloseNotification={setErrorOccure}
                    onClose={handlePopUpClose}
                />
            )}
            {allPost.length === 0 ? (
                <h1 className="text-slate-400 mt-4 text-xl w-fit mx-auto font-semibold">
                    No Post Yet ...
                </h1>
            ) : (
                allPost.map((post, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 p-4 mb-4 rounded-lg text-white"
                    >
                        <div className="flex border-2 rounded-md p-1 gap-3 items-center justify-around">
                            <h1 className="text-slate-400">{post.name}</h1>
                            <img
                                className="w-6 h-6 rounded-full"
                                src={post.profilePic}
                                alt={`Profile picture of ${post.name}`}
                            />
                        </div>
                        {/* <h2 className="font-bold">{post.title}</h2> */}
                        {post.image_url && (
                            <img
                                src={post.image_url}
                                alt="Post"
                                className="w-full h-auto mt-2 rounded-lg"
                            />
                        )}
                        <p>{post.text_content}</p>
                        <div className="flex justify-between mt-2">
                            <button
                                className="flex"
                                onClick={() => handleLikeButton(index)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={post.user_has_liked ? "red" : "none"}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                    />
                                </svg>
                                <span>{post.total_likes} likes</span>
                            </button>

                            <button
                                className="flex"
                                onClick={() =>
                                    setWantToComment({
                                        openComment: true,
                                        postId: post.post_id,
                                    })
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                    />
                                </svg>
                                <span>{post.total_comments} comments</span>
                            </button>
                        </div>
                        {wantToComment.openComment &&
                            post.post_id == wantToComment.postId && (
                                <CommentPage
                                    post={post}
                                    setWantToComment={setWantToComment}
                                    getAllPost={getAllPost}
                                />
                            )}
                    </div>
                ))
            )}
        </div>
    );
}
