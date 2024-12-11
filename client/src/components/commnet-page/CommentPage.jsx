import axios from "axios";
import { useEffect, useState } from "react";
import PopUpNotification from "../popupNotificationHandler/PopUpNotification";

export default function CommentPage({ post, setWantToComment, getAllPost }) {
    const [allComments, setAllComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [errorOccure, setErrorOccure] = useState({
        error: false,
        message: "",
    });

    useEffect(() => {
        async function getAllComments() {
            let response = null;
            try {
                response = await axios.post(
                    "http://localhost:3020/api/getcomments/",
                    {
                        post_id: post.post_id,
                    },
                    {
                        withCredentials: true,
                    }
                );

                if (response.status == 200) {
                    setAllComments(response.data.comments);
                }
            } catch (error) {
                setErrorOccure({
                    error: true,
                    message: error.response?.data?.message,
                });
            }
        }

        getAllComments();
    }, [post]);

    async function handlePostComment() {
        let response = null;
        const formData = new FormData();
        try {
            formData.append("comment_text", commentText);
            formData.append("post_id", post.post_id);

            response = await axios.post(
                "http://localhost:3020/api/postcomments/",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (response.status == 200) {
                setAllComments(response.data.comments);
                setCommentText("");
                getAllPost();
            }
        } catch (error) {
            setErrorOccure({
                error: true,
                message: error.response?.data?.message,
            });
        }
    }

    function handleClose() {
        setErrorOccure({
            error: false,
            message: "",
        });
    }

    return (
        <div
            onClick={() =>
                setWantToComment({
                    openCommnet: false,
                    postId: -1,
                })
            }
            className="text-white flex fixed inset-0 items-center justify-center bg-black bg-opacity-60"
        >
            {errorOccure.error && errorOccure.message?.length > 0 && (
                <PopUpNotification
                    message={errorOccure.message}
                    onClose={handleClose}
                    automaticCloseNotification={setErrorOccure}
                />
            )}
            <div
                className="w-96 bg-black rounded-lg max-h-96 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold text-white">
                        Comments
                    </h3>
                    <button
                        onClick={() =>
                            setWantToComment({
                                openComment: false,
                                postId: -1,
                            })
                        }
                        className="text-gray-200 hover:text-white"
                    >
                        ✕
                    </button>
                </div>
                {allComments.length == 0 ? (
                    <div className="h-64 justify-center items-center">
                        <h1 className="text-slate-500 font-semibold mx-auto w-fit">
                            No comment on this post yet
                        </h1>{" "}
                    </div>
                ) : (
                    <div className="h-64 overflow-hidden overflow-y-scroll">
                        {allComments.map((comment, index) => (
                            <div key={index} className="flex gap-3 my-2">
                                <img
                                    src={comment.profilePic}
                                    className="w-14 h-14 rounded-full"
                                    alt={`Profile pic of ${comment.name}`}
                                />
                                <div>
                                    <h1 className="font-semibold text-slate-400">
                                        {comment.name}
                                    </h1>
                                    <p className="text-justify font-light">
                                        {comment.comment_text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="relative border-2 rounded-sm items-center">
                    <input
                        type="text"
                        value={commentText}
                        onChange={(ev) => setCommentText(ev.target.value)}
                        placeholder="  Add Comment..."
                        className={`w-full p-2 bg-black`}
                    />
                    <button
                        className={`absolute font-semibold right-2 top-2 ${
                            commentText.length == 0
                                ? "cursor-not-allowed text-slate-500"
                                : "text-blue-600"
                        }`}
                        disabled={commentText.length == 0}
                        onClick={handlePostComment}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}
