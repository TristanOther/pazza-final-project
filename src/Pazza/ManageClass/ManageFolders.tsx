import { useState } from "react"
import { Button } from "react-bootstrap";

export default function ManageFolders() {

    const [newFolder, setNewFolder] = useState<string>("");
    const [editingFolder, setEditingFolder] = useState<string>("");

    const renameFolder = (old_name: string, new_name: string) => {
        if (new_name == "") {
            return;
        } else {
            console.log("Adding folder:", new_name);
            //TODO: Add folder to reducer by replacing old name with new name
        }
    }

    const folders = [
        "Hw1",
        "Hw2",
        "Hw3",
        "Hw4",
        "Hw5",
        "Project1",
        "Project2",
        "Office_Hours"
    ];

    const updateButtonState = () => {
        const button = document.getElementById("pazza-folder-deleter-button") as HTMLButtonElement;
        const checked = folders.some(folder => {
            const checkbox = document.getElementById(`pazza-folder-deleter-${folder}`) as HTMLInputElement;
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

    return (
        <div className="pazza-grey-background" style={{ width: "100%" }}>
            <hr style={{ height: "5px", backgroundColor: "black", border: "none", width: "100%" }} />
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
                            console.log("Adding folder:", newFolder); //TODO: Add folder to reducer
                            setNewFolder("");
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
                    folders.forEach((folder) => {
                        const checkbox = document.getElementById(`pazza-folder-deleter-${folder}`) as HTMLInputElement;
                        if (checkbox.checked) {
                            console.log("Deleting folder:", folder); //TODO: Delete folder from reducer
                        }
                    });
                }} >
                Delete Selected Folders
            </Button>
            <div className="d-flex flex-column align-items-start mt-3 ms-3 mb-3">
                {folders.map((folder: string) => (
                    <div className="d-flex justify-content-left align-items-center" key={folder}>
                        <input
                            type="checkbox"
                            id={`pazza-folder-deleter-${folder}`}
                            className="me-3"
                            onChange={() => {
                                updateButtonState();
                            }}
                        />
                        {editingFolder == folder ?
                            <input id="pazza-folder-new-name" className="ms-3" defaultValue={folder} />
                            : folder}
                        {editingFolder == folder ?
                            <div>
                                <Button className="ms-3" variant="primary" onClick={() => {
                                    const newName = (document.getElementById("pazza-folder-new-name") as HTMLInputElement)?.value || "";
                                    renameFolder(folder, newName);
                                    setEditingFolder("");
                                }}>
                                    Save
                                </Button>
                                <Button className="ms-3" variant="primary" onClick={() => setEditingFolder("")}>
                                    Cancel
                                </Button>
                            </div> :
                            <Button className="ms-3"
                                id="pazza-edit-folder"
                                value={folder}
                                onClick={() => setEditingFolder(editingFolder == folder ? "" : folder)}>
                                Edit
                            </Button>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
};