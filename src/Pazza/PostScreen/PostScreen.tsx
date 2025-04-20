import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsFillExclamationSquareFill, BsQuestionSquareFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import DOMPurify from 'dompurify';
import FollowUpDiscussion from "./Discussions/FollowUpDiscussion.tsx";

import * as postClient from './PostClient.ts';
import * as userClient from '../../Kambaz/Account/client.ts';
import StudentIcon from "./StudentIcon.tsx";
import { current } from "@reduxjs/toolkit";

export default function PostScreen({ fetchPosts, markPostRead }: { fetchPosts: () => Promise<void>, markPostRead: (pid: string, uid: string) => void }) {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { tags } = useSelector((state: any) => state.tagsReducer);
    const [currentPost, setCurrentPost] = useState<any>({});
    const [postCreator, setPostCreator] = useState<any>({});
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [postTags, setPostTags] = useState<any>([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await postClient.getPost(postId as string);
                setCurrentPost(post);
                const creator = await userClient.findUserById(post.createdBy);
                setPostCreator(creator);
            } catch (err) {
                console.log(err);
            }
        }
        fetchPost();

        const postRead = currentPost?.readBy?.includes(currentUser._id);
        if (postId && !postRead) {
            markPostRead(postId, currentUser._id);
        }
    }, [currentUser._id, markPostRead, postId]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const postTags = tags.filter((t: any) => currentPost.tags.includes(t._id));
                setPostTags(postTags);
            } catch (err) {
                console.log(err);
            }
        }
        fetchTags();
    }, [tags, currentPost.tags]);


    var actions_dd = document.getElementById("pazza-post-actions-dd") as HTMLSelectElement;
    actions_dd?.addEventListener("change", (e) => {
        // the interpreter hates this, but it seems to work, so.....

        if (document.activeElement !== actions_dd) return;
        const target = e.target as HTMLSelectElement;
        if (target?.value === "Actions") return;
        if (target?.value === "Edit") {
            editPost(currentPost);
            e.preventDefault();
        } else if (target?.value === "Delete") {
            deletePost(postId);
            e.preventDefault();
        }
    });

    const deletePost = async (post_id: string | undefined) => {
        await postClient.deletePost(post_id ? post_id : "");
        const actions_dd = document.getElementById("pazza-post-actions-dd") as HTMLSelectElement;
        if (actions_dd) {
            actions_dd.value = "Actions";
        }
        fetchPosts();
        navigate("../../");
    }

    const editPost = (post: any) => {
        if (currentUser._id !== post.createdBy && !["FACULTY", "TA", "ADMIN"].includes(currentUser.role + "")) {
            return;
        }
        const actions_dd = document.getElementById("pazza-post-actions-dd") as HTMLSelectElement;
        if (actions_dd) {
            actions_dd.value = "Actions";
        }
        navigate("edit");
    }

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
                    style={{
                        width: "100%",
                        borderBottom: "1px solid darkGrey",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    className="p-1"
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <BsQuestionSquareFill className="fs-2 ms-1" />
                        <span className="fw-bold fs-5 ms-2">{currentPost.postType === "questionPost" ? "question" : "note"} @{postId}</span>
                    </div>
                    <div
                        style={{
                            borderRadius: "5px",
                            backgroundColor: "#333333",
                            color: "white",
                            padding: "2px 10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <span className="fs-5 me-1">{currentPost?.viewedBy?.length}</span>
                        <span style={{ fontWeight: "bold" }}>views</span>
                    </div>
                </div>
                {(currentUser._id === currentPost.createdBy || ["FACULTY", "TA", "ADMIN"].includes(currentUser.role + "")) &&
                    <div className="d-flex justify-content-end me-2">
                        <select id="pazza-post-actions-dd" name="Actions"
                            defaultValue={"Actions"}>
                            <option>Actions</option>
                            <option>Edit</option>
                            <option>Delete</option>
                        </select>
                    </div>
                }
                {/* Post body */}
                <div className="px-3 py-3">
                    <h1>{currentPost.title}</h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentPost.content) }}
                        style={{ maxWidth: "800px", wordWrap: "break-word", whiteSpace: "pre-wrap" }}
                    />
                </div>
                {/* Post tags */}
                <div className="m-3" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {postTags.map((t: any) => {
                        return (
                            <div
                                key={t._id}
                                className="pazza-light-blue pazza-blue-text"
                                style={{
                                    padding: "4px 10px",
                                    borderRadius: "20px",
                                    fontSize: "0.9rem",
                                    fontWeight: "500",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {t.name}
                            </div>
                        );
                    })}
                </div>
                {/* Bottom bar */}
                <div
                    style={{
                        width: "100%",
                        borderTop: "1px solid darkGrey",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    className="pazza-dark-grey-background px-3 py-1"
                >
                    <div
                        className="pazza-blue-background text-white px-3 py-2 rounded text-nowrap"
                        style={{ cursor: "pointer" }}
                        onClick={() => editPost(currentPost)}
                    >
                        Edit
                    </div>
                    <div>
                        <span>posted by {postCreator.username} @</span>
                        <span className="text-muted ms-1">
                            {new Date(currentPost.createdAt).toLocaleString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </span>
                    </div>
                </div>
            </div>
            {/* Bottom bar */}
            {currentPost.postType === "questionPost" && (
                <>
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
                            className="pazza-blue-background text-white px-3 py-2 rounded text-nowrap"
                            style={{ cursor: "pointer" }}
                            onClick={() => editPost(currentPost)}
                        >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div className="ms-2"><StudentIcon /></div>
                                <span className="fw-bold fs-5 mx-2">the students' answer,</span>
                                <span className="fst-italic fs-7">where students collectively construct a single answer</span>
                            </div>
                        </div>
                        {/* Body */}
                        Placeholder
                    </div>
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
                            style={{
                                width: "100%",
                                borderBottom: "1px solid darkGrey",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                            className="p-1"
                        >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <BsFillExclamationSquareFill style={{ transform: "scaleY(-1)" }} className="pazza-instructor-text fs-2 ms-3" />
                                <span className="fw-bold fs-5 mx-2">the instructors' answer,</span>
                                <span className="fst-italic fs-7">where instructors collectively construct a single answer</span>
                            </div>
                        </div>
                        {/* Body */}
                        Placeholder
                    </div>
                </>)}
            {/* TODO: followup discussion section component goes here */}
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
                    style={{
                        width: "100%",
                        borderBottom: "1px solid darkGrey",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    className="p-1"
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span className="fw-bold fs-5 mx-2">followup discussions</span>
                        <span className="fst-italic fs-7">for lingering questions and comments</span>
                    </div>
                </div>
                {/* Body */}
                <FollowUpDiscussion post={currentPost} />
            </div>
        </div>
    );
}