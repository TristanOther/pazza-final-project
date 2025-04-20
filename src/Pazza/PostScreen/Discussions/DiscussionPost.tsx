import DOMPurify from 'dompurify';
import { useState } from 'react';
import ReplyCreator from '../ReplyCreator';
import ActionsDropdown from '../ActionsDropdown';

export default function DiscussionPost({ discussionPost, deleteDiscussionPost, editDiscussionPost }: { 
    discussionPost: any,
    deleteDiscussionPost: (dpid: string) => void,
    editDiscussionPost: (dp: any) => void,
}) {
    const [editing, setEditing] = useState<boolean>(false);

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
                <ActionsDropdown object={discussionPost} deleteObject={deleteDiscussionPost} setEditing={setEditing} />
            </div>
            {/* Content */}
            {!editing && (
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(discussionPost.content) }} />
            )}
            {/* Editor */}
            {editing && (
                <ReplyCreator 
                    onCancel={() => setEditing(false)} 
                    onSubmit={(content) => {
                        editDiscussionPost({...discussionPost, content});
                        setEditing(false);
                    }}
                    object={discussionPost}
                />
            )}
        </div>
    )
}