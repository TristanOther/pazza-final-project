import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import Select from 'react-select';
import * as client from "../../Kambaz/Courses/client";
import { Jodit } from "jodit";

export default function CreatePostScreen() {
    const options = [
        { label: "Question", id: "questionPost", description: "If you need an answer" },
        { label: "Note", id: "notePost", description: "If you don't need an answer" },
    ];

    let folders: string[] = [];
    const [postType, setPostType] = useState("textPost");
    const [postTo, setPostTo] = useState("");
    const [summary, setSummary] = useState("");
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const { cid } = useParams();

    const fetchUsersForCourse = async () => {
        const users = await client.findUsersForCourse(cid ? cid : "");
        const new_users = users.map((user: any) => ({ value: user._id, label: `${user.firstName} ${user.lastName} (${user.role})` }));
        setUsers(new_users);
    };
    const updateSelectedFolders = (folder: string) => {
        setSelectedFolders((prevSelectedFolders) => {
            if (prevSelectedFolders.includes(folder)) {
                console.log("removed!");
                return prevSelectedFolders.filter((f) => f !== folder);
            } else {
                console.log("added!");
                return [...prevSelectedFolders, folder];
            }
        });
    };
    useEffect(() => {
        fetchUsersForCourse();
    }, []);
    useEffect(() => {
        const fetchFolders = async () => {
            // Simulate fetching folders from the DB until the dao does it
            folders = [
                "Hw1",
                "Hw2",
                "Hw3",
                "Hw4",
                "Hw5",
                "Project1",
                "Project2",
                "Office_Hours"
            ];
            fetchFolders();
        };
    }, []);
    // should be replaced with a call to the DB to get the folders for the course later
    folders = [
        "Hw1",
        "Hw2",
        "Hw3",
        "Hw4",
        "Hw5",
        "Project1",
        "Project2",
        "Office_Hours"
    ];

    return (
        <div style={{ width: "100%" }}>
            <div className="d-flex ms-3 mt-2 mb-1" style={{ width: "100%" }}>
                <h6 className="me-3 mt-4 text-nowrap pazza-create-text" style={{ fontWeight: "bolder", }}>
                    Post Type*
                </h6>
                <div className="d-flex justify-content-left">
                    {options.map(option => (
                        <div className="d-flex p-2" style={{ width: "200px" }} >
                            <label key={option.id} className={`border-none ${postType === option.id ? 'pazza-light-blue text-dark' : ''}`} htmlFor={option.id} style={{ borderRadius: "5px", padding: "2px" }}>
                                <div className="d-flex p-1 align-items-center">
                                    <input
                                        type="radio"
                                        id={option.id}
                                        name="cardOption"
                                        value={option.id}
                                        checked={postType === option.id}
                                        onChange={() => setPostType(option.id)} />
                                    <h6 className="ms-2 mt-2" style={{ color: postType === option.id ? "black" : "gray", fontWeight: "initial", fontStyle: "italic" }}>
                                        {option.label}
                                    </h6>
                                </div>
                                <span className="ms-2 mb-1 me-1" style={{ fontSize: "small", fontWeight: "initial", fontStyle: "italic", color: postType === option.id ? "black" : "gray" }}>
                                    {option.description}
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-2 pazza-light-blue width-100">
                <div className="d-flex">
                    <h6 className="ms-2 mt-2 text-nowrap pazza-create-text" style={{ fontWeight: "bolder" }}>
                        Post To*
                    </h6>
                    <div className="d-flex ms-5 align-items-center" style={{ width: "100%" }}>
                        <label className="d-flex me-3 align-items-center" htmlFor="postToAll">
                            <input type="radio" id="postToAll" name="postTo" value="all" className="p-2" onClick={() => setPostTo("ALL")} />
                            <h6 className="ms-2 mt-1 pazza-create-text">Entire Class</h6>
                        </label>
                        <label className="d-flex me-3 align-items-center" htmlFor="postToIndv">
                            <input type="radio" id="postToIndv" name="postTo" value="all" className="p-2" onClick={() => setPostTo("INDV")} />
                            <h6 className="ms-2 mt-1 text-center pazza-create-text">Individual Students/Instructors</h6>
                        </label>
                    </div>
                </div>
                <br />
                {postTo == "INDV" && (
                    <div>
                        <span className="pazza-create-text me-3 ms-2" style={{ fontWeight: "bolder" }}>Enter 1 or more people</span>
                        <Select options={users} isMulti />
                    </div>
                )}
                <br />
                <div className="d-flex justify-content-left mb-1">
                    <span className="ms-2 me-2 pazza-create-text" style={{ fontWeight: "bolder" }}>Select Folders</span>
                    {folders.map((folder: string) =>
                        <button className={`me-2 border-0 ${selectedFolders.includes(folder) ? "bg-primary" : "bg-light"}`} style={{ borderRadius: "5px" }}
                            onClick={() => updateSelectedFolders(folder)}>
                            {folder}
                        </button>
                    )}
                </div>
                <a className="me-2 ms-5 ps-5" href={"/#" + useLocation().pathname.split("/").slice(0, -2).join("/") + "/Manage"}>
                    Manage and reorder folders
                </a>
                <br />
                <br />
                <span className="ms-2 me-2 pazza-create-text" style={{ fontWeight: "bolder" }}>Summary*</span>
                <input className="ms-2" style={{ borderRadius: "3px", border: "2px", width: "35%" }} type="text" placeholder="Enter a one line summary less than 100 characters"
                    onChange={(e) => setSummary(e.target.value)} maxLength={100} />
                <br />
                <br />
                <span className="ms-3 me-5 pazza-create-text align-items-start" style={{ fontWeight: "bolder", verticalAlign: "top" }}>Details</span>
                <textarea id="editor"></textarea>
                <script>
                    Jodit.make('#jodit-editor');
                    {/* Jodit.make('#editor', {
                        buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol']
                    }); */}
                </script>
            </div>
        </div>
    );
}