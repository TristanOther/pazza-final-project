import { Button } from "react-bootstrap";
import { FaFolder } from "react-icons/fa";
import { useState } from "react";

export default function FileFolderNavigation() {

    const [selectedFolder, setSelectedFolder] = useState("");

    // Eventually this comes from backend
    const folders = [
        "Hw1",
        "Hw2",
        "Hw3",
        "Hw4",
        "Hw5",
        "Project1",
        "Project2",
    ]

    return (
        <div className="d-flex" style={{ width: "100%", background: "LightGrey" }}>
            {folders.map((folder) => (
                <div>
                    <FaFolder className="fs-5 ms-3" key={folder} />
                    <Button type="button" variant="link" style={{ textDecoration: "none", color: "black" }}
                        onClick={() => setSelectedFolder(folder)}>
                        {folder}
                        <span className="ms-1 pazza-unread-post-box">0</span>
                    </Button>
                </div>
            ))}
        </div>
    );
}