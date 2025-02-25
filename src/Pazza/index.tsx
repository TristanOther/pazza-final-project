import PazzaNavigation from "./PazzaNavigation.tsx";
import FileFolderNavigation from "./FileFolder/FileFolderNavigation.tsx";
import ListOfPostsSidebar from "./ListOfPosts/ListOfPostsSidebar.tsx";
import PostScreen from "./PostScreen/PostScreen.tsx";

export default function Modules() {
  return (
    <div>
      <PazzaNavigation />
      <FileFolderNavigation/>
      <ListOfPostsSidebar />
      <PostScreen />
    </div>
  );
}