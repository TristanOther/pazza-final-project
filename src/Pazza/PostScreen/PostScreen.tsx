import { useParams } from "react-router-dom";

import * as postClient from './PostClient.ts';
import { useEffect, useState } from "react";
import { BsQuestionSquareFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import DOMPurify from 'dompurify';

export default function PostScreen({ markPostRead }: { markPostRead: (pid: string, uid: string) => void }) {
    const { postId } = useParams();
    const [currentPost, setCurrentPost] = useState<any>({});
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await postClient.getPost(postId as string);
                setCurrentPost(post);
            } catch (err) {
                console.log(err);
            }
        }
        fetchPost();
        if (postId) markPostRead(postId, currentUser._id);
    }, [currentUser._id, markPostRead, postId]);

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
            <div className="px-3 py-3">
                <h1>{currentPost.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentPost.content) }} />
            </div>
            {/* TODO: map tags here */}
            {/* TODO: Bottom bar/edit */}
            {/* TODO: student answer section component goes here */}
            {/* TODO: instructor answer section component goes here */}
            {/* TODO: followup discussion section component goes here */}
        </div>
    );
}