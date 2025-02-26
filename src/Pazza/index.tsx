import PazzaNavigation from "./PazzaNavigation.tsx";
import FileFolderNavigation from "./FileFolder/FileFolderNavigation.tsx";
import ListOfPostsSidebar from "./ListOfPosts/ListOfPostsSidebar.tsx";
import PostScreen from "./PostScreen/PostScreen.tsx";

export default function Modules() {
  return (
    <div id="wd-pazza-q-and-a">
        <div className="me-3 mt-2">
            <PazzaNavigation />
        </div>
        <div className="me-3">
            <FileFolderNavigation/>
        </div>
        <div className="d-flex mt-2" id="wd-pazza-q-and-a">
            <div className="flex-fill me-3">
                <ListOfPostsSidebar />
            </div>
            <div className="flex-fill me-3" style={{ width: "75%" }}>
                <PostScreen />
            </div>
        </div>
    </div>
  );
}