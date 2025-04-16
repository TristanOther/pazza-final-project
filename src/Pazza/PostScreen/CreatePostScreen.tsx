import { useState } from "react";

export default function CreatePostScreen() {
    const options = [
        { label: "Question", id: "questionPost", description: "If you need an answer" },
        { label: "Note", id: "notePost", description: "If you don't need an answer" },
    ];

    const [postType, setPostType] = useState("textPost");


    return (
        <div style={{ width: "100%" }}>
            <div className="d-flex ms-3 mt-2 mb-1" style={{ width: "100%" }}>
                <h6 className="me-3 mt-4 text-nowrap" style={{ color: "GrayText", fontWeight: "bolder", fontStyle: "italic" }}>
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
            <div className="p-2 d-flex pazza-light-blue width-100">
                <div className="d-flex">
                    <h6 className="ms-2 mt-2 text-nowrap" style={{ color: "GrayText", fontWeight: "bolder", fontStyle: "italic" }}>
                       Post To*
                    </h6>
                    // TODO: add state/selectors here
                    <div className="d-flex ms-5 align-items-center" style={{ width: "100%" }}>
                        <label className="d-flex me-3 align-items-center" htmlFor="postTo">
                            <input type="radio" id="postTo" name="postTo" value="all" className="p-2" />
                            <h6 className="ms-2 mt-1" style={{ color: "grey", fontWeight: "initial", fontStyle: "italic" }}>Entire Class</h6>
                        </label>
                        <label className="d-flex me-3 align-items-center" htmlFor="postTo">
                            <input type="radio" id="postTo" name="postTo" value="all" className="p-2" />
                            <h6 className="ms-2 mt-1 text-center" style={{ color: "grey", fontWeight: "initial", fontStyle: "italic" }}>Individual Students/Instructors</h6>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}