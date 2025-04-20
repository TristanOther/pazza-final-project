import { Route, Routes, useParams } from "react-router-dom";
import FileFolderNavigation from "../FileFolder/FileFolderNavigation"
import ListOfPostsSidebar from "../ListOfPosts/ListOfPostsSidebar"
import ClassAtAGlance from "./ClassAtAGlance";
import PostScreen from "./PostScreen"
import { useSelector } from "react-redux";
import CreatePostScreen from "./CreatePostScreen";
import { useEffect, useState } from "react";
import * as postClient from './PostClient.ts';
import { Button } from "react-bootstrap";

export default function Posts() {
    const { cid } = useParams();
    const [posts, setPosts] = useState<any[]>();
    const [showLops, setShowLops] = useState(true);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const fetchPosts = async () => {
        try {
            const posts = await postClient.fetchPosts(cid as string);
            if (!posts) {
                return setPosts([]);
            } else {
                // filter out posts that are not visible to the current user
                const filtered_posts = posts.filter((post: any) => {
                    return post.viewableBy.includes("ALL") || post.viewableBy.includes(currentUser._id + "") || (post.viewableBy.includes("INSTRUCTORS") && (currentUser.role === "FACULTY" || currentUser.role === "TA"));
                });
                filtered_posts.sort(
                    (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setPosts(filtered_posts);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (cid) {
            fetchPosts();
        }
    }, [cid]);

    const markPostRead = async (pid: string, uid: string) => {
        const post = posts?.find((p) => p._id === pid);
        if (!post) return;
        try {
            const postUpdates = {
                _id: pid,
                readBy: post.readBy.includes(uid) ? post.readBy : [...post.readBy, uid],
                viewedBy: post.viewedBy.includes(uid) ? post.viewedBy : [...post.viewedBy, uid],
            };
            await postClient.updatePost(postUpdates);
            await fetchPosts();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="pazza-grey-background">
            {/* File Folder Navigation Bar (FFNB) */}
            <div style={{ width: "100%", border: "1px solid #aaa" }}>
                <FileFolderNavigation />
            </div>
            <div className="d-flex" style={{ width: "100%", height: "90vh"}}>
                {!showLops && (
                    <Button
                        variant="outline-secondary"
                        style={{
                            width: "25px",
                            height: "25px",
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 0,
                        }}
                        onClick={() => setShowLops(!showLops)}
                    >
                        {showLops ? "◄" : "►"}
                    </Button>
                )}
                {showLops && (
                    <div className="flex-fill pazza-grey-background" style={{ width: "30%", height: "90vh" }}>
                        <div className="p-2 pazza-dark-grey-background" style={{ width: "100%", border: "1px solid #aaa" }}>
                            <Button
                                variant="outline-secondary"
                                style={{
                                    width: "25px",
                                    height: "25px",
                                    padding: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 0,
                                }}
                                onClick={() => setShowLops(!showLops)}
                            >
                                {showLops ? "◄" : "►"}
                            </Button>
                        </div>
                        {/* List of Posts Sidebar (LOPS) */}
                        <div>
                            <ListOfPostsSidebar posts={posts} />
                        </div>
                    </div>
                )}
                {/* Post routes */}
                <div className="flex-fill" style={{ width: "70%" }}>
                    <Routes>
                        <Route index element={<ClassAtAGlance posts={posts} />} />
                        <Route path="/" element={<ClassAtAGlance posts={posts} />} />
                        <Route path="/posts/:postId/edit" element={<CreatePostScreen fetchPosts={fetchPosts} posts={posts} />} />
                        <Route path="/posts/:postId" element={<PostScreen fetchPosts={fetchPosts} markPostRead={markPostRead} />} />
                        <Route path="/posts/create" element={<CreatePostScreen fetchPosts={fetchPosts} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}