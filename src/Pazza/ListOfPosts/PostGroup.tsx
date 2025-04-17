import { useNavigate, useParams } from "react-router-dom";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { useState } from "react";

interface props {
    section?: string;
    posts?: any[];
    markPostRead: (pid: string, uid: string) => void;
}

export default function PostGroup({ section, posts, markPostRead }: props) {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [ minimized, setMinimized ] = useState<boolean>(false);
    const navigate = useNavigate();
    
    return (
        <div style={{ width: "100%" }}>
            <div 
                onClick={() => setMinimized(!minimized)}
                className="pazza-background" 
                style={{ 
                    border: "1px solid darkgray",
                    borderTop: "none",
                    boxShadow: "none",
                    boxSizing: "border-box",
                    overflow: "hidden",
                }}
            >
                <span>{minimized ? '▸' : '▾'}{section}</span>
            </div>
            {!minimized && posts?.map((post) => (
                <div 
                    onClick={() => {
                        navigate(`/Kambaz/Courses/${cid}/Piazza/posts/${post._id}`);
                        markPostRead(post._id, currentUser._id);
                    }}
                    style={{ 
                        border: "1px solid darkgray",
                        borderTop: "none",
                        boxShadow: "none",
                        boxSizing: "border-box",
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
