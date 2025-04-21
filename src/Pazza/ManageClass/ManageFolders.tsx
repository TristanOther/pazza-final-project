import { useState } from "react"
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setTags } from "../TagsReducer";
import { useParams } from "react-router-dom";
import * as TagsClient from "../TagsClient.ts";

export default function ManageFolders() {
    const dispatch = useDispatch();
    const { cid } = useParams();
    const [newFolder, setNewFolder] = useState<string>("");
    const [editingFolder, setEditingFolder] = useState<string>("");

    const fetchTags = async () => {
        const tags = await TagsClient.fetchTags(cid ? cid : "");
        dispatch(setTags(tags));
    };
    const folders = [...useSelector((state: any) => state.tagsReducer.tags)].sort((a: any, b: any) => a.priority - b.priority);
    const updateButtonState = () => {
        const button = document.getElementById("pazza-folder-deleter-button") as HTMLButtonElement;
        const checked = folders.some((folder: any) => {
            const checkbox = document.getElementById(`pazza-folder-deleter-${folder.name}`) as HTMLInputElement;
            return checkbox?.checked;
        });
        if (!checked) {
            button.disabled = true;
            button.classList.add("btn-secondary");
            button.classList.remove("btn-danger");
        } else {
            button.disabled = false;
            button.classList.remove("btn-secondary");
            button.classList.add("btn-danger");
        }
    };
    const renameFolder = (old_name: string, new_name: string) => {
        if (new_name == "") {
            return;
        } else {
            const old_tag = folders.find((folder: any) => folder.name == old_name);
            TagsClient.updateTag({ ...old_tag, name: new_name }).then(() => {
                fetchTags();
                setEditingFolder("");
            })
        }
    }

    return (
        <div className="pazza-grey-background py-1" style={{ width: "100%" }}>
            {/* <hr style={{ height: "5px", backgroundColor: "black", border: "none", width: "100%" }} /> */}
            <h3 className="ms-3 mt-3"><strong>Configure Class Folders</strong></h3>
            <span className="ms-3">
                Folders allow you to organize your classes into different categories.
                You can create, edit, and delete folders as needed.
            </span>
            <div className="d-flex justify-content-left align-items-center mt-3">
                <h5 className="ms-3 mb-3 mt-3"><strong>Add Folder</strong></h5>
                <input
                    className="ms-3"
                    id="pazza-add-folder"
                    placeholder={"folder name"}
                    onChange={(e) => setNewFolder(e.target.value)}
                />
                <Button className="ms-3" variant={newFolder == "" ? "secondary" : "primary"}
                    onClick={() => {
                        if (newFolder == "") {
                            return;
                        } else {
                            const maxPriority = folders.length > 0 ? Math.max(...folders.map((f: any) => f.priority)) : 0;
                            TagsClient.createTag({ name: newFolder, priority: maxPriority + 1 }, cid ? cid : "").then(() => {
                                fetchTags();
                                setNewFolder("");
                            });
                            const new_folder_input = document.getElementById("pazza-add-folder") as HTMLButtonElement;
                            new_folder_input.value = ""; // Clear the input field after adding the folder
                        }
                    }}>
                    Add Folder
                </Button>
            </div>
            <hr style={{ height: "5px", backgroundColor: "black", border: "none", width: "100%" }} />
            <h3 className="ms-3 mt-3"><strong>Manage Folders</strong></h3>
            <span className="ms-3">You can edit or delete existing folders below.</span>
            <hr style={{ height: "5px", backgroundColor: "black", border: "none", width: "100%" }} />

            <Button className="ms-3 btn-secondary" id="pazza-folder-deleter-button"
                onClick={() => {
                    folders.forEach((folder: any) => {
                        const checkbox = document.getElementById(`pazza-folder-deleter-${folder.name}`) as HTMLInputElement;
                        if (checkbox.checked) {
                            TagsClient.deleteTag(folder._id).then(() => {
                                fetchTags();
                            });
                        }
                    });
                    const button = document.getElementById("pazza-folder-deleter-button") as HTMLButtonElement;
                    button.disabled = true;
                    button.classList.add("btn-secondary");
                    button.classList.remove("btn-danger");
                }} >
                Delete Selected Folder(s)
            </Button>
            <div className="d-flex flex-column align-items-start mt-3 ms-3 mb-2">
                {folders.map((folder: any) => (
                    <div className="d-flex justify-content-left align-items-center mb-2" key={folder.name}>
                        <input
                            type="checkbox"
                            id={`pazza-folder-deleter-${folder.name}`}
                            className="me-3"
                            onChange={() => {
                                updateButtonState();
                            }}
                        />
                        {editingFolder == folder.name ?
                            <input id="pazza-folder-new-name" className="ms-3" defaultValue={folder.name} />
                            : folder.name}
                        {editingFolder == folder.name ?
                            <div>
                                <Button className="ms-3" variant="primary" onClick={() => {
                                    const newName = (document.getElementById("pazza-folder-new-name") as HTMLInputElement)?.value || "";
                                    renameFolder(folder.name, newName);
                                }}>
                                    Save
                                </Button>
                                <Button className="ms-3" variant="primary" onClick={() => setEditingFolder("")}>
                                    Cancel
                                </Button>
                            </div> :
                            <Button className="ms-3 p-1"
                                id="pazza-edit-folder"
                                value={folder.name}
                                onClick={() => setEditingFolder(editingFolder == folder.name ? "" : folder.name)}>
                                Edit
                            </Button>
                        }
                    </div>
                ))}
                {folders.length == 0 && (
                    <div className="d-flex justify-content-start align-items-start mt-2" style={{ width: "100%", height: "100%" }}>
                        <h5 className="text-center"><strong>No folders available</strong></h5>
                    </div>
                )}
            </div>
        </div>
    )
};