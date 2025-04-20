// DiscussionPostCreator.tsx
import { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Button } from "react-bootstrap";

export default function DiscussionPostCreator({
    onCancel,
    onSubmit,
    discussionPost,
}: {
    onCancel: () => void;
    onSubmit: (content: string) => void;
    discussionPost?: any,
}) {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillInstance = useRef<Quill | null>(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (editorRef.current && !editorRef.current.firstChild) {
            quillInstance.current = new Quill(editorRef.current, {
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline"],
                        ["link", "image", "code-block"],
                    ],
                },
                placeholder: "Write your reply...",
                theme: "snow",
            });

            quillInstance.current?.on("text-change", () => {
                setContent(quillInstance.current?.getText() ?? "");
            });

            if (quillInstance.current && discussionPost) {
                quillInstance.current?.clipboard.dangerouslyPasteHTML(discussionPost.content);
            }
        }
    }, []);

    const handleSubmit = () => {
        const html = quillInstance.current?.getSemanticHTML() ?? "";
        if (html.trim() !== "" && content.trim() !== "") {
            onSubmit(html);
            quillInstance.current?.setText("");
        }
    };

    return (
        <div className="mt-3 p-3 bg-light rounded" style={{ width: "100%" }}>
            <div ref={editorRef} style={{ height: "150px", backgroundColor: "white" }} />
            <div className="mt-2 d-flex">
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button variant="secondary" className="ms-2" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
