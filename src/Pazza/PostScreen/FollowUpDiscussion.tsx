import { useEffect, useState } from "react";

import * as DiscussionPostClient from "./DiscussionPostClient.ts";

export default function FollowUpDiscussion({ post }: { post: any }) {
    const [discussionPosts, setDiscussionPosts] = useState<any>([]);

    useEffect(() => {
        const fetchDiscussionPosts = async () => {
            if (!post._id) return;
            const discussionPosts = await DiscussionPostClient.fetchDiscussionPosts(post._id);
            setDiscussionPosts(discussionPosts);
        };
        fetchDiscussionPosts();
        console.log(`DPs: ${discussionPosts}`);
    }, [post]);

    return (
        <div>test</div>
    )
}