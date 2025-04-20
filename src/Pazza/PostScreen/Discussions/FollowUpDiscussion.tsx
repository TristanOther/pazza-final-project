import { useEffect, useState } from "react";

import * as discussionPostClient from "./DiscussionPostClient.ts";
import * as userClient from '../../../Kambaz/Account/client.ts';
import DiscussionPost from "./DiscussionPost.tsx";
import DiscussionPostCreator from "./DiscussionPostCreator.tsx";
import { useSelector } from "react-redux";

export default function FollowUpDiscussion({ post }: { post: any }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [discussionPosts, setDiscussionPosts] = useState<any>([]);
    const [currentReplyField, setCurrentReplyField] = useState<string>('');

    const fetchDiscussionPosts = async (pid: string): Promise<any[]> => {
        const discussionPosts = await discussionPostClient.fetchDiscussionPosts(pid);
        return Promise.all(
            discussionPosts.map(async (dp: any) => {
                dp.author = await userClient.findUserById(dp.createdBy);
                dp.children = await fetchDiscussionPosts(dp._id);
                return dp;
            })
        );
    };

    const loadDiscussion = async () => {
        const posts = await fetchDiscussionPosts(post._id);
        setDiscussionPosts(posts);
    };

    useEffect(() => {
        if (!post._id) return;
        loadDiscussion();
    }, [post]);

    const createDiscussionPost = async (content: any, parentId: string, resolved: boolean) => {
        const newDiscussionPost = {
            content,
            createdBy: currentUser._id,
            resolved,
        };
        await discussionPostClient.createDiscussionPost(newDiscussionPost, parentId);
        await loadDiscussion();
        setCurrentReplyField('');
    }

    const deleteDiscussionPost = async (dpid: string) => {
        await discussionPostClient.deleteDiscussionPost(dpid);
        await loadDiscussion();
    }

    const editDiscussionPost = async (dp: string) => {
        await discussionPostClient.updateDiscussionPost(dp);
        await loadDiscussion();
    }

    const setDiscussionPostResolvedStatus = async (status: boolean, dpid: string) => {
        await discussionPostClient.updateDiscussionPost({_id: dpid, resolved: status});

        setDiscussionPosts((prev: any[]) =>
            prev.map((dp: any) =>
                dp._id === dpid ? { ...dp, resolved: status } : dp
            )
        );
    }

    return (
        <div className="m-2">
            {/* Discussions */}
            {discussionPosts && discussionPosts.length > 0 && (
                discussionPosts.map((dp: any) => {
                    return (
                        <div className="pazza-grey-background">
                            <div className="pb-3">
                                {/* Resolved bar */}
                                <div className={`${dp.resolved ? "pazza-darkest-grey-background" : "pazza-crimson-background"} pazza-white-text border rounded px-2 py-1 m-2 d-inline-flex align-items-center gap-3`}>
                                    <div className="d-flex">
                                        <label className="me-4 d-flex align-items-center">
                                        <input
                                            type="radio"
                                            name={`resolved-status-${dp._id}`}
                                            value="resolved"
                                            defaultChecked={dp.resolved}
                                            onChange={() => setDiscussionPostResolvedStatus(true, dp._id)}
                                            className="me-2"
                                        />
                                        Resolved
                                        </label>
                                        <label className="d-flex align-items-center">
                                        <input
                                            type="radio"
                                            name={`resolved-status-${dp._id}`}
                                            value="unresolved"
                                            defaultChecked={!dp.resolved}
                                            onChange={() => setDiscussionPostResolvedStatus(false, dp._id)}
                                            className="me-2"
                                        />
                                        Unresolved
                                        </label>
                                    </div>
                                </div>
                                {/* Body */}
                                {<DiscussionPost 
                                    discussionPost={dp} 
                                    deleteDiscussionPost={deleteDiscussionPost} 
                                    editDiscussionPost={editDiscussionPost}
                                />}
                                {/* Replies */}
                                {dp.children.length > 0 && (
                                    <div className="ms-5 me-2">
                                        {dp.children.map((dr: any) => {
                                            return(
                                                <div className="pazza-dark-grey-background mt-2">
                                                    {<DiscussionPost 
                                                        discussionPost={dr} 
                                                        deleteDiscussionPost={deleteDiscussionPost} 
                                                        editDiscussionPost={editDiscussionPost}
                                                    />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                {/* Reply field */}
                                {currentReplyField === '' && (
                                    <div
                                        className="bg-white rounded px-2 py-1 mt-2 ms-5 me-2"
                                        style={{ cursor: "pointer", border: "1px solid #ccc" }}
                                        onClick={() => setCurrentReplyField(dp._id)}
                                    >
                                        Reply to this followup discussion
                                    </div>
                                )}
                                {currentReplyField === dp._id && (
                                    <div className="mt-2 mx-2">
                                        <DiscussionPostCreator 
                                            onCancel={() => setCurrentReplyField('')}
                                            onSubmit={(content) => createDiscussionPost(content, dp._id, false)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
            {/* New discussion area */}
            <div className="mt-1">
                <div>Start a new followup discussion</div>
                {currentReplyField === '' && (
                    <div
                        className="bg-white rounded px-2 py-1 mt-2 me-2"
                        style={{ cursor: "pointer", border: "1px solid #ccc" }}
                        onClick={() => setCurrentReplyField(post._id)}
                    >
                        Compose a new followup discussion
                    </div>
                )}
                {currentReplyField === post._id && (
                    <div className="mt-2 mx-2">
                        <DiscussionPostCreator 
                            onCancel={() => setCurrentReplyField('')}
                            onSubmit={(content) => createDiscussionPost(content ? content : "", post._id, false)}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}