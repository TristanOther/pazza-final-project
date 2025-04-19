import { Button } from "react-bootstrap";
import { FaFolder } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTag } from "../TagsReducer";

export default function FileFolderNavigation() {
    const dispatch = useDispatch();
    const folders: any[] = useSelector((state: any) => state.tagsReducer.tags);
    const selected_folder = useSelector((state: any) => state.tagsReducer.selectedTag)

    const selectFolder = (folder: any) => {
        if (selected_folder && selected_folder._id === folder._id) {
            dispatch(setSelectedTag(null));
        } else {
            dispatch(setSelectedTag(folder));
        }
    }

    return (
        <div className="d-flex pazza-grey-background" style={{ width: "100%" }}>
            {folders.map((folder: any) => (
                <div>
                    <FaFolder className="fs-5 ms-3" key={folder.name} />
                    <Button type="button" variant="link" style={{ textDecoration: selected_folder?._id == folder._id ? "underline" : "none", color: "black"}}
                        onClick={() => selectFolder(folder)}>
                        {folder.name}
                    </Button>
                </div>
            ))}
            {folders.length == 0 && (
                <div className="d-flex justify-content-start align-items-start mt-2 ms-2" style={{ width: "100%", height: "100%" }}>
                    <h6 className="text-center pazza-create-text">No folders available</h6>
                </div>
            )}
        </div>
    );
}
