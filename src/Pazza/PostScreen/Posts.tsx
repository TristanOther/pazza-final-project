import { Route, Routes } from "react-router-dom";
import FileFolderNavigation from "../FileFolder/FileFolderNavigation"
import ListOfPostsSidebar from "../ListOfPosts/ListOfPostsSidebar"
import ClassAtAGlance from "./ClassAtAGlance";
import PostScreen from "./PostScreen"
import CreatePostScreen from "./CreatePostScreen";

export default function Posts() {
    return (
        <div>
            <div style={{ width: "100%" }}>
                <FileFolderNavigation />
            </div>
            <div className="d-flex" style={{ width: "100%" }}>
                <div className="flex-fill" style={{ width: "30%" }}>
                    <ListOfPostsSidebar />
                </div>
                <div className="flex-fill" style={{ width: "70%" }}>
                    <Routes>
                        <Route index element={<ClassAtAGlance />} />
                        <Route path="/" element={<ClassAtAGlance />} />
                        <Route path="/posts/create" element={<CreatePostScreen />} />
                        <Route path="/posts/:postId" element={<PostScreen />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}