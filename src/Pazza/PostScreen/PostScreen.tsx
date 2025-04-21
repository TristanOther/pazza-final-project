import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsFillExclamationSquareFill, BsQuestionSquareFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";

import FollowUpDiscussion from "./Discussions/FollowUpDiscussion";
import Answer from "./Answers/AnswerSection";
import StudentIcon from "./StudentIcon";
import ActionsDropdown from "./ActionsDropdown";

import * as postClient from "./PostClient";
import * as userClient from "../../Kambaz/Account/client";

export default function PostScreen({
    fetchPosts,
    markPostRead,
}: {
    fetchPosts: () => Promise<void>;
    markPostRead: (pid: string, uid: string) => void;
}) {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const { tags } = useSelector((state: any) => state.tagsReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [currentPost, setCurrentPost] = useState<any>({});
    const [postCreator, setPostCreator] = useState<any>({});
    const [postTags, setPostTags] = useState<any[]>([]);

    useEffect(() => {
        async function load() {
            if (!postId) return;
            const post = await postClient.getPost(postId);
            setCurrentPost(post);

            const creator = await userClient.findUserById(post.createdBy);
            setPostCreator(creator);

            // mark as read if needed
            if (!post.readBy.includes(currentUser._id)) {
                markPostRead(postId, currentUser._id);
            }
        }
        load();
    }, [postId, currentUser._id, markPostRead]);

    useEffect(() => {
        // whenever tags or currentPost change, recompute tag labels
        setPostTags(
            tags.filter((t: any) => currentPost.tags?.includes(t._id))
        );
    }, [tags, currentPost.tags]);

    const deletePost = async (pid?: string) => {
        if (!pid) return;
        await postClient.deletePost(pid);
        await fetchPosts();
        navigate("../../");
    };

    const editPost = (post: any) => {
        if (post.createdBy !== currentUser._id && !["FACULTY", "TA", "ADMIN"].includes(currentUser.role)) return;
        navigate("edit");
    };

    return (
        <div>
            {/* Main post body */}
            <div
                className="pazza-white-background my-2 mx-2"
                style={{
                    border: "1px solid darkGrey",
                    borderRadius: "5px",
                    boxSizing: "border-box",
                }}
            >
                {/* Top bar */}
                <div
                    className="p-1"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid darkGrey",
                    }}
                >
                    <div className="d-flex align-items-center">
                        {currentPost.postType === "questionPost" ? (
                            <BsQuestionSquareFill className="fs-2 ms-1" />
                        ) : (
                            <BsFillExclamationSquareFill className="fs-2 ms-1" />
                        )}
                        <span className="fw-bold fs-5 ms-2">
                            {currentPost.postType === "questionPost"
                                ? "question"
                                : "note"}{" "}
                            @{postId}
                        </span>
                    </div>
                <div
                    className="d-flex align-items-center"
                    style={{
                        backgroundColor: "#333",
                        color: "white",
                        padding: "2px 10px",
                        borderRadius: "5px",
                        whiteSpace: "nowrap",
                    }}
                >
                    <span className="fs-5 me-1">
                        {currentPost?.viewedBy?.length || 0}
                    </span>
                    <span style={{ fontWeight: "bold" }}>views</span>
                </div>
            </div>
                {/* Actions (Edit/Delete) */}
                {(currentPost.createdBy === currentUser._id || ["FACULTY", "TA", "ADMIN"].includes(currentUser.role)) && (
                    <div className="d-flex justify-content-end me-2 mt-1">
                        <ActionsDropdown
                            object={currentPost}
                            deleteObject={deletePost}
                            setEditing={() => editPost(currentPost)}
                        />
                    </div>
                )}

                {/* Body */}
                <div className="px-3 pb-3">
                    <h1>{currentPost.title}</h1>
                    <div
                        className="p-1"
                        style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(currentPost.content)}}
                    />
                </div>

                {/* Tags */}
                <div className="m-3 d-flex flex-wrap gap-2">
                    {postTags.map((t: any) => (
                        <div
                            key={t._id}
                            className="pazza-light-blue-background pazza-blue-text"
                            style={{
                                padding: "4px 10px",
                                borderRadius: "20px",
                                fontSize: "0.9rem",
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                            }}
                        >
                            {t.name}
                        </div>
                    ))}
                </div>

                {/* Footer bar */}
                <div
                    className="pazza-dark-grey-background px-3 py-1 d-flex justify-content-between align-items-center"
                    style={{ borderTop: "1px solid darkGrey" }}
                >
                    <div>
                        posted by {postCreator.username} @{" "}
                        {new Date(currentPost.createdAt).toLocaleString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </div>
                </div>
            </div>

            {/* Student & Instructor Answers */}
            {currentPost.postType === "questionPost" && (
                <>
                    <div className="pazza-white-background my-2 mx-2" style={{ border: "1px solid darkGrey", borderRadius: 5 }}>
                        <div className="p-1 d-flex align-items-center" style={{ borderBottom: "1px solid darkGrey" }}>
                            <div className="d-flex align-items-center">
                                <div className="ms-2"><StudentIcon /></div>
                                <span className="fw-bold fs-5 mx-2">the students’ answer,</span>
                                <span className="fst-italic fs-7">where students collectively construct a single answer</span>
                            </div>
                        </div>
                        <Answer post={currentPost} instructor={false} />
                    </div>

                    <div className="pazza-white-background my-2 mx-2" style={{ border: "1px solid darkGrey", borderRadius: 5 }}>
                        <div className="p-1 d-flex align-items-center" style={{ borderBottom: "1px solid darkGrey" }}>
                            <div className="d-flex align-items-center">
                                <BsFillExclamationSquareFill style={{ transform: "scaleY(-1)" }} className="pazza-instructor-text fs-2 ms-3" />
                                <span className="fw-bold fs-5 mx-2">the instructors’ answer,</span>
                                <span className="fst-italic fs-7">where instructors collectively construct a single answer</span>
                            </div>
                        </div>
                        <Answer post={currentPost} instructor={true} />
                    </div>
                </>
            )}

            {/* Follow‑up discussions */}
            <div
                className="pazza-white-background my-2 mx-2"
                style={{ border: "1px solid darkGrey", borderRadius: 5 }}
            >
                <div className="p-1 d-flex align-items-center" style={{ borderBottom: "1px solid darkGrey" }}>
                    <div className="d-flex align-items-center">
                        <span className="fw-bold fs-5 mx-2">followup discussions</span>
                        <span className="fst-italic fs-7">for lingering questions and comments</span>
                    </div>
                </div>
                <FollowUpDiscussion post={currentPost} />
            </div>
        </div>
    );
}