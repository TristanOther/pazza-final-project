import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import Select from 'react-select';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import * as client from "../../Kambaz/Courses/client";
import * as postClient from "./PostClient"

export default function CreatePostScreen() {
    const options = [
        { label: "Question", id: "questionPost", description: "If you need an answer" },
        { label: "Note", id: "notePost", description: "If you don't need an answer" },
    ];

    let folders: string[] = [];
    const [postType, setPostType] = useState("questionPost");
    const [postTo, setPostTo] = useState("");
    const [summary, setSummary] = useState("");
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [validPost, setValidPost] = useState(false);
    const { cid } = useParams();

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const fetchUsersForCourse = async () => {
        const users = await client.findUsersForCourse(cid ? cid : "");
        const new_users = users.map((user: any) => ({ value: user._id, label: `${user.firstName} ${user.lastName} (${user.role})` }));
        new_users.push({ value: -1, label: `All Instructors` });
        setUsers(new_users);
    };
    const updateSelectedFolders = (folder: string) => {
        setSelectedFolders((prevSelectedFolders) => {
            if (prevSelectedFolders.includes(folder)) {
                return prevSelectedFolders.filter((f) => f !== folder);
            } else {
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


    // for the rich text editor, Quill
    const quillRef = useRef<HTMLDivElement | null>(null);
    const quillInstance = useRef<Quill | null>(null);
    useEffect(() => {
        if (quillRef.current && !quillRef.current.firstChild) {
            quillInstance.current = new Quill(quillRef.current, {
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block'],
                    ],
                },
                placeholder: 'Write your post here...',
                theme: 'snow',
            });
        }
    }, []);


    // Leaving this commented out, but this is how you would get the contents of the quill editor, from the Delta object returned by getContents()
    // console.log(quillInstance.current.getContents());

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
                {postTo == "INDV" && (
                    <div>
                        <span className="pazza-create-text me-3 ms-2" style={{ fontWeight: "bolder" }}>Enter 1 or more people</span>
                        <Select
                            options={users.sort((a, b) => a.label.localeCompare(b.label))}
                            isMulti
                            onChange={(selectedOptions) => {
                                setSelectedUsers(selectedOptions.map((option: any) => ({ name: option.label, id: option.value })));
                            }}
                        />
                    </div>
                )}
                <br />
                <div className="d-flex justify-content-left mb-1">
                    <span className="ms-2 me-2 pazza-create-text" style={{ fontWeight: "bolder" }}>Select Folder(s)* </span>
                    {folders.map((folder: string) =>
                        <button className={`me-2 border-0 ${selectedFolders.includes(folder) ? "bg-primary" : "bg-light"}`} style={{ borderRadius: "5px" }}
                            onClick={() => updateSelectedFolders(folder)}>
                            {folder}
                        </button>
                    )}
                </div>
                {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") &&
                    <a className="me-2 ms-5 ps-5" href={"/#" + useLocation().pathname.split("/").slice(0, -2).join("/") + "/Manage"}>
                        Manage and reorder folders
                    </a>}
                <br />
                <br />
                <span className="ms-2 me-2 pazza-create-text" style={{ fontWeight: "bolder" }}>Summary*</span>
                <input className="ms-2" style={{ borderRadius: "3px", border: "2px", width: "35%" }} type="text"
                    placeholder="Enter a one line summary less than 100 characters"
                    onChange={(e) => setSummary(e.target.value)} maxLength={100} />
                <br />
                <br />
                <span className="ms-2 me-5 pazza-create-text align-items-start" style={{ fontWeight: "bolder", verticalAlign: "top" }}>
                    Details
                </span>
            </div>

            <div id="editor" style={{ height: "200px", backgroundColor: "white" }} ref={quillRef}></div>
            {!validPost && (
                <div>
                    {(selectedFolders.length == 0) && (
                        <>
                            <span className="text-danger">Please select at least one folder.</span>
                            <br />
                        </>
                    )}
                    {(postTo == "") && (
                        <>
                            <span className="text-danger">Please set the post's visibility.</span>
                            <br />
                        </>
                    )}
                    {(postTo == "INDV" && selectedUsers.length == 0) && (
                        <>
                            <span className="text-danger">Please provide at least one person to share the post with.</span>
                            <br />
                        </>
                    )}
                    {(summary.length == 0) && (
                        <>
                            <span className="text-danger">Please provide a summary.</span>
                            <br />
                        </>
                    )}
                    {(quillInstance.current?.getText() == "\n") && (
                        <>
                            <span className="text-danger">Please provide a post body.</span>
                            <br />
                        </>
                    )}
                </div>
            )}
            <div className="mt-3 mb-3 d-flex justify-content-start" style={{ width: "100%" }}>
                <Button onClick={() => {
                    setValidPost(summary.length != 0 && selectedFolders.length > 0 && postTo != "" && (postTo != "INDV" || selectedUsers.length > 0) && quillInstance.current?.getText() != "\n")
                    if (validPost) {
                        // add the current user to the list of users if the post is not to the entire class
                        if (postTo != "ALL") {
                            selectedUsers.push({ name: currentUser.firstName + " " + currentUser.lastName, id: currentUser._id });
                        }
                        const post = {
                            postType: postType,
                            title: summary,
                            tags: selectedFolders,
                            content: quillInstance.current?.getSemanticHTML(),
                            createdBy: currentUser._id,
                            viewableBy: selectedUsers.length != 0 ? selectedUsers.map((user: any) => user.id != -1 ? user._id : "INSTRUCTORS") : ["ALL"],
                        };

                        postClient.createPost(post, cid ? cid : "").then((res) => {
                            // set all states to default
                            setValidPost(false);
                            setPostType("questionPost");
                            setPostTo("");
                            setSummary("");
                            setSelectedFolders([]);
                            setSelectedUsers([]);
                            quillInstance.current?.setText("");

                            // redirect to the new post
                            var post_redirect = window.location.href.split("/").slice(0, -1);
                            post_redirect.push(res._id + "");
                            window.location.href = post_redirect.join("/");
                        }).catch((err) => {
                            // if post fails, redirect to default post screen
                            console.error(err);
                            window.location.href = window.location.href.split("/").slice(0, -2).join("/");
                        });
                    }
                }}>
                    Create {postType === "questionPost" ? "Question" : "Note"}
                </Button>
                <Button className="ms-3" onClick={() => {
                    // set all states to default
                    setValidPost(false);
                    setPostType("questionPost");
                    setPostTo("");
                    setSummary("");
                    setSelectedFolders([]);
                    setSelectedUsers([]);
                    quillInstance.current?.setText("");

                    window.location.href = window.location.href.split("/").slice(0, -2).join("/");
                }}>Cancel</Button>
            </div>
        </div>
    );
}
