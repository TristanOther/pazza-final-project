import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import Select from 'react-select';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import * as client from "../../Kambaz/Courses/client";
import * as postClient from "./PostClient"

export default function CreatePostScreen({ fetchPosts, posts }: { fetchPosts: any, posts?: any[] }) {
    const { cid, postId } = useParams();

    if (!posts) {
        posts = [];
    }
    const folders = useSelector((state: any) => state.tagsReducer.tags)
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const newPost = posts.length === 0;
    const options = [
        { label: "Question", id: "questionPost", description: "If you need an answer" },
        { label: "Note", id: "notePost", description: "If you don't need an answer" },
    ];
    const [postType, setPostType] = useState("questionPost");
    const [postTo, setPostTo] = useState("ALL");
    const [summary, setSummary] = useState("");
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [_, setQuillText] = useState("");

    const fetchUsersForCourse = async () => {
        const users = await client.findUsersForCourse(cid + "");
        const new_users = users.map((user: any) => ({ id: user._id, name: `${user.firstName} ${user.lastName} (${user.role})` }));
        new_users.push({ id: -1, name: `All Instructors` });
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

    quillInstance.current?.on('text-change', () => {
        // used to trigger a state update when the text changes in the editor
        setQuillText(quillInstance.current?.getText() || "");
    });

    useEffect(() => {
        if (!newPost) {
            const post = posts.find((p: any) => p._id === postId);
            if (!post) return;

            setPostType(post.postType);

            const postToVal = post.viewableBy[0] === "ALL" ? "ALL" : "INDV";
            setPostTo(postToVal);
            if (postToVal === "INDV") {
                document.getElementById("postToIndv")?.click();
            } else {
                document.getElementById("postToAll")?.click();
            }

            setSummary(post.title);
            setSelectedFolders(post.tags.map((tag_id: any) => (folders.find((folder: any) => folder._id === tag_id))?.name));
            if (postToVal === "INDV") {
                const selectedUsers = post.viewableBy.map((userID: string) => {
                    if (userID === "INSTRUCTORS") {
                        return "INSTRUCTORS";
                    } else {
                        const user = users.find((user: any) => user.id === userID);
                        return user ? user : null;
                    }
                });
                setSelectedUsers(selectedUsers.filter((user: any) => user));
            }
            quillInstance.current?.clipboard.dangerouslyPasteHTML(post.content);
        }
    }, [users]);


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
                            <input type="radio" id="postToAll" name="postTo" value="all" className="p-2" defaultChecked={true} onClick={() => setPostTo("ALL")} />
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
                            id="select-viewable-by"
                            options={users.map((user: any) => ({ label: user.name, value: user.id })).sort((a, b) => a.label.localeCompare(b.label))}
                            isMulti
                            value={selectedUsers.filter((user: any) => user).map((user: any) => {
                                if (user == "INSTRUCTORS") {
                                    return { value: -1, label: "All Instructors" }
                                } else {
                                    return { label: user.name, value: user.id };
                                }
                            })}
                            onChange={(selectedOptions) => {
                                setSelectedUsers(selectedOptions.map((option: any) => ({ name: option.label, id: option.value })));
                            }}
                        />
                    </div>
                )}
                <br />
                <div className="d-flex justify-content-left mb-1">
                    <span className="ms-2 me-2 pazza-create-text" style={{ fontWeight: "bolder" }}>Select Folder(s)* </span>
                    {folders.map((folder: any) =>
                        <button className={`me-2 border-0 ${selectedFolders.includes(folder.name) ? "bg-primary" : "bg-light"}`} style={{ borderRadius: "5px" }}
                            onClick={() => updateSelectedFolders(folder.name)}>
                            {folder.name}
                        </button>
                    )}
                </div>
                {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") &&
                    <a className="me-2 ms-5 ps-5" href={"/#" + useLocation().pathname.split("/").slice(0, -2).join("/") + "/Manage/Folders"}>
                        Manage and reorder folders
                    </a>}
                <br />
                <br />
                <span className="ms-2 me-2 pazza-create-text" style={{ fontWeight: "bolder" }}>Summary*</span>
                <input className="ms-2" defaultValue={summary} style={{ borderRadius: "3px", border: "2px", width: "35%" }} type="text"
                    placeholder="Enter a one line summary less than 100 characters"
                    onChange={(e) => setSummary(e.target.value)} maxLength={100} />
                <br />
                <br />
                <span className="ms-2 me-5 pazza-create-text align-items-start" style={{ fontWeight: "bolder", verticalAlign: "top" }}>
                    Details
                </span>
            </div>
            <div id="editor" style={{ height: "200px", backgroundColor: "white" }} ref={quillRef} />
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
            <div className="mt-3 mb-3 d-flex justify-content-start" style={{ width: "100%" }}>
                <Button onClick={() => {
                    if (summary.length != 0 && selectedFolders.length > 0 && postTo != "" && (postTo != "INDV" || selectedUsers.length > 0) && quillInstance.current?.getText() != "\n") {
                        // add the current user to the list of users if the post is not to the entire class and the user is not already in the list of users
                        if (postTo != "ALL" && !selectedUsers.map((user: any) => user.id).includes(currentUser._id)) {
                            selectedUsers.push({ name: currentUser.firstName + " " + currentUser.lastName, id: currentUser._id });
                        }
                        const post = {
                            postType: postType,
                            title: summary,
                            tags: selectedFolders.map((folder_name: string) => folders.find((folder: any) => folder.name === folder_name)._id + ""),
                            content: quillInstance.current?.getSemanticHTML(),
                            createdBy: currentUser._id,
                            viewableBy: postTo != "ALL" ? selectedUsers.filter((user: any) => user).map((user: any) => user.id != -1 ? user.id + "" : "INSTRUCTORS") : ["ALL"],
                            instructor: ["FACULTY", "TA", "ADMIN"].includes(currentUser.role),
                        };

                        const post_promise = newPost ?
                            postClient.createPost(post, cid ? cid : "") :
                            postClient.updatePost({
                                _id: postId,
                                title: post.title,
                                tags: post.tags,
                                content: post.content,
                                postType: post.postType,
                                viewableBy: post.viewableBy,
                            });
                        post_promise.then((res) => {
                            // set all states to default
                            setPostType("questionPost")
                            setPostTo("");
                            setSummary("");
                            setSelectedFolders([]);
                            setSelectedUsers([]);
                            quillInstance.current?.setText("");

                            // fetch posts again to update the list of posts outside of this component
                            fetchPosts();

                            // redirect to the new post
                            if (newPost) {
                                const post_redirect = window.location.href.split("/").slice(0, -1);
                                post_redirect.push(res._id + "");
                                window.location.href = post_redirect.join("/");
                            } else {
                                window.location.href = window.location.href.split("/").slice(0, -1).join("/");
                            }
                        }).catch((err) => {
                            // if post fails, redirect to default post screen
                            console.error(err);
                            window.location.href = window.location.href.split("/").slice(0, -2).join("/");
                        });
                    }
                }}>
                    {newPost ? "Create" : "Update"} {postType === "questionPost" ? "Question" : "Note"}
                </Button>
                <Button className="ms-3" onClick={() => {
                    // set all states to default
                    setPostType("questionPost");
                    setPostTo("");
                    setSummary("");
                    setSelectedFolders([]);
                    setSelectedUsers([]);
                    quillInstance.current?.setText("");

                    if (newPost) {
                        window.location.href = window.location.href.split("/").slice(0, -2).join("/");
                    } else {
                        window.location.href = window.location.href.split("/").slice(0, -1).join("/");
                    }
                }}>Cancel</Button>
            </div>
        </div>
    );
}
