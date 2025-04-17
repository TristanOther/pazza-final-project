import { useNavigate, useParams } from "react-router-dom";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { useState } from "react";

interface props {
    section?: string;
    posts?: any[];
}

export default function PostGroup({ section, posts }: props) {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [ minimized, setMinimized ] = useState<boolean>(false);
    const navigate = useNavigate();
    
    return (
        <div style={{ width: "100%" }}>
            <div 
                onClick={() => setMinimized(!minimized)}
                className="pazza-dark-grey-background pazza-grey-border" 
                style={{ 
                    borderWidth: "1px",
                    borderStyle: "solid",
                    boxShadow: "none",
                    overflow: "hidden",
                }}
            >
                <span>{minimized ? '▸' : '▾'}{section}</span>
            </div>
            {!minimized && posts?.map((post) => (
                <div 
                    onClick={() => {
                        navigate(`/Kambaz/Courses/${cid}/Piazza/posts/${post._id}`);
                    }}
                    className="pazza-grey-border"
                    style={{ 
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderTop: "none",
                        boxShadow: "none",
                        overflow: "hidden",
                        cursor: "pointer",
                    }}
                >
                    <PostCard
                        id={post._id}
                        title={post.title}
                        content={post.content}
                        createdAt={post.createdAt}
                        instructor={post.instructor}
                        readBy={!post.readBy.includes(currentUser._id)}
                    />
                </div> 
            ))}
        </div>
    );
}
