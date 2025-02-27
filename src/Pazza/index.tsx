import PazzaNavigation from "./PazzaNavigation.tsx";
import FileFolderNavigation from "./FileFolder/FileFolderNavigation.tsx";
import ListOfPostsSidebar from "./ListOfPosts/ListOfPostsSidebar.tsx";
import PostScreen from "./PostScreen/PostScreen.tsx";

export default function Modules() {
  return (
    <div id="wd-pazza-q-and-a">
        <div className="mx-3 my-3">
            <div style={{ width: "100%" }}>
                <PazzaNavigation />
            </div>
            <div style={{ width: "100%" }}>
                <FileFolderNavigation/>
            </div>
            <div className="d-flex" style={{ width: "100%" }}>
                <div className="flex-fill" style={{ width: "30%" }}>
                    <ListOfPostsSidebar />
                </div>
                <div className="flex-fill" style={{ width: "70%" }}>
                    <PostScreen />
                </div>
            </div>
        </div>
    </div>
  );
}