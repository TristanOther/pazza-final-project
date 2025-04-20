import { useParams, useNavigate } from "react-router-dom";
import * as postClient from './PostClient.ts';
import * as userClient from '../../Kambaz/Account/client.ts';
import { useEffect, useState } from "react";
import { BsQuestionSquareFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import DOMPurify from 'dompurify';
import FollowUpDiscussion from "./FollowUpDiscussion.tsx";

export default function PostScreen({ fetchPosts, markPostRead }: { fetchPosts: any, markPostRead: (pid: string, uid: string) => void }) {
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
                // console.log(err);
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
                // console.log(err);
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
            deletePost(currentPost);
            e.preventDefault();
        }
    });

    const deletePost = async (post: any) => {
        await postClient.deletePost(post._id + "");
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
        <div
            className="pazza-white-background my-1 mx-1"
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
                    <BsQuestionSquareFill className="fs-2" />
                    <span className="fw-bold ms-2">question @{postId}</span>
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
            {/* Post body */}
            {/* TODO: actually make this work */}
            {(currentUser._id === currentPost.createdBy || ["FACULTY", "TA", "ADMIN"].includes(currentUser.role + "")) &&
                <div className="d-flex justify-content-end me-2">
                    <select id="pazza-post-actions-dd" name="Actions"
                        defaultValue={"Actions"}>
                        <option>Actions</option>
                        <option>Edit</option>
                        <option onClick={() => console.log("Deleting")}>Delete</option>
                    </select>
                </div>
            }
            <div className="px-3 py-3">
                <h1>{currentPost.title}</h1>
                <div style={{ wordWrap: "break-word", whiteSpace: "pre-wrap", maxWidth: "800px"}}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentPost.content) }} />
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
                <span>posted by {postCreator.username}</span>
            </div>
            {/* TODO: student answer section component goes here */}
            {/* TODO: instructor answer section component goes here */}
            {/* TODO: followup discussion section component goes here */}
            <FollowUpDiscussion post={currentPost} />
        </div>
    );
}