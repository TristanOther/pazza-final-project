import { BsFillExclamationSquareFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as courseClient from "../../Kambaz/Courses/client";
import { useEffect, useState } from "react";
import React from "react";

export default function ClassAtAGlance({ posts }: {posts: any}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid } = useParams();
    const [enrollments, setEnrollments] = useState<any>([]);
    const unreadPosts = posts ? posts.filter((p: any) => !p.readBy.includes(currentUser._id)).length : 0;

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                if (!cid) return;
                const enrollments = await courseClient.findUsersForCourse(cid);
                setEnrollments(enrollments);
            } catch (err) {
                console.log(err);
            }
        }
        fetchEnrollments();
    }, [cid]);

    return (
        <div
        style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "2rem",
            boxSizing: "border-box",
        }}
        >
            <h1 className="pazza-grey-text">Class at a Glance</h1>
            
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "60%",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                }}
                className="p-4"
            >
                {/* Left stats column */}
                <div className="flex-start">
                    <div className="mb-2" style={{ display: "flex", alignItems: "center" }}>
                        <BsFillExclamationSquareFill  className="pazza-crimson-text me-2 fs-2" />
                        <span className="fw-bold">{unreadPosts} Unread Post{unreadPosts == 1? '' : 's'}</span>
                    </div>
                    <div className="mb-2" style={{ display: "flex", alignItems: "center" }}>
                        <BsFillExclamationSquareFill  className="pazza-crimson-text me-2 fs-2" />
                        <span className="fw-bold">PLACEHOLDER Unanswered Posts</span>
                    </div>
                </div>

                {/* Right: General Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "max-content 1fr", rowGap: "0.5rem", columnGap: "1rem" }}>
                    {[
                        [posts.length, "Total Posts"],
                        ["PLACEHOLDER", "Instructor Responses"],
                        ["PLACEHOLDER", "Student Responses"],
                        [enrollments.length, "Enrolled Students"],
                    ].map(([value, description], index) => (
                        <React.Fragment key={index}>
                            <div style={{ textAlign: "right", fontWeight: "bold", whiteSpace: "nowrap" }}>{value}</div>
                            <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{description}</div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
