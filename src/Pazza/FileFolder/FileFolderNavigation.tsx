// import { Button } from "react-bootstrap";
// import { FaFolder } from "react-icons/fa";
// import { useEffect, useState} from "react";

export default function FileFolderNavigation() {
    // let folders: string[] = [];
    // const [selectedFolder, setSelectedFolder] = useState("");

    // useEffect(() => {
    //     const fetchFolders = async () => {
    //         // Simulate fetching folders from the DB until the dao does it
    //         folders = [
    //             "Hw1",
    //             "Hw2",
    //             "Hw3",
    //             "Hw4",
    //             "Hw5",
    //             "Project1",
    //             "Project2",
    //             "Office_Hours"
    //         ];
    //     fetchFolders();
    //     };
    // }, []);

    return (
        <div style={{ width: "100%", background: "LightGrey" }}> Temporary Fix </div>
        // <div className="d-flex" style={{ width: "100%", background: "LightGrey" }}>
        //     {folders.map((folder: string) => (
        //         <div>
        //             <FaFolder className="fs-5 ms-3" key={folder} />
        //             <Button type="button" variant="link" style={{ textDecoration: "none", color: "black" }}
        //                 onClick={() => setSelectedFolder(folder)}> 
        //                 {folder}
        //                 <span className="ms-1 pazza-unread-post-box">0</span> {/* This is a placeholder until we get DB connections to the actual posts */}
        //             </Button>
        //         </div>
        //     ))}
        // </div>
    );
}