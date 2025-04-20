import DOMPurify from 'dompurify';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import DiscussionPostCreator from './DiscussionPostCreator';

export default function DiscussionPost({ discussionPost, deleteDiscussionPost, editDiscussionPost }: {
    discussionPost: any,
    deleteDiscussionPost: (dpid: string) => void,
    editDiscussionPost: (dp: any) => void,
}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="ms-2">
            {/* Author bar */}
            <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">{discussionPost?.author?.username}</span>
                    <span className="text-muted">
                        {new Date(discussionPost.createdAt).toLocaleString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </span>
                </div>
                {/* Actions dropdown */}
                {(discussionPost.createdBy === currentUser._id || ["ADMIN", "FACULTY", "TA"].includes(currentUser.role)) && (
                    <div ref={dropdownRef} className="position-relative">
                        <div
                            className="pazza-blue-text me-1"
                            onClick={() => setShowDropdown(prev => !prev)}
                        >
                            Actions {showDropdown ? "▴" : "▾"}
                        </div>
                        {showDropdown && (
                            <div
                                className="position-absolute pazza-white-background border shadow-sm"
                                style={{ right: 0, top: '100%', zIndex: 1000 }}
                            >
                                <div
                                    className="px-2 py-1 border-bottom"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setEditing(true)}
                                >
                                    Edit
                                </div>
                                <div
                                    className="px-2 py-1 text-danger"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => deleteDiscussionPost(discussionPost._id)}
                                >
                                    Delete
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* Content */}
            {!editing && (
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(discussionPost.content) }} />
            )}
            {/* Editor */}
            {editing && (
                <DiscussionPostCreator
                    onCancel={() => setEditing(false)}
                    onSubmit={(content) => {
                            editDiscussionPost({ ...discussionPost, content });
                        setEditing(false);
                    }}
                    discussionPost={discussionPost}
                />
            )}
        </div>
    )
}
