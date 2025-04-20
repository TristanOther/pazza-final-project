import { useState } from "react";
import DOMPurify from 'dompurify';
import AnswerCreator from "./AnswerCreator";
import ActionsDropdown from "../ActionsDropdown";

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function Answer({ answer, deleteAnswer, editAnswer }: { 
    answer: any,
    deleteAnswer: (dpid: string) => void,
    editAnswer: (dp: any) => void,
}) {
    const [editing, setEditing] = useState<boolean>(false);
    
    return (
        <div>
            {/* Content */}
            <div className="m-3">
                {!editing && (
                    <div className="d-flex justify-content-between align-items-start">
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer?.content) }} />
                        {/* Actions dropdown */}
                        <ActionsDropdown object={answer} deleteObject={deleteAnswer} setEditing={setEditing} />
                    </div>
                )}
                {editing && (
                    <AnswerCreator 
                        onCancel={() => setEditing(false)} 
                        onSubmit={(content) => {
                            editAnswer({...answer, content});
                            setEditing(false);
                        }}
                        answer={answer}
                    />
                )}
            </div>
            {/* Bottom bar */}
            <div
                style={{
                    width: "100%",
                    borderTop: "1px solid darkGrey",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                className="pazza-dark-grey-background px-3 py-1"
            >
                <div
                    className="pazza-blue-background text-white px-3 py-2 rounded text-nowrap"
                    style={{ cursor: "pointer" }}
                    onClick={() => setEditing(true)}
                >
                    Edit
                </div>
                <div>
                    <div>
                        <span>posted by {answer.author.username} @</span>
                        <span className="text-muted ms-1">
                            {new Date(answer.createdAt).toLocaleString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
};