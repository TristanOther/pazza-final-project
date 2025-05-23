import ListOfPostsToolbar from "./ListOfPostsToolbar";
import PostGroup from "./PostGroup";
import { useState } from "react";
import { useSelector } from "react-redux";

interface props {
    posts?: any[]; // ideally replace `any` with a proper type
}

// This function groups posts by the date they were made, and gives them the appropriate key to then be used for the categories.
function groupPostsByDate(posts: any[]) {
    const groups: Record<string, any[]> = {};

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const thisMonday = new Date(today);
    thisMonday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    const lastMonday = new Date(thisMonday);
    lastMonday.setDate(thisMonday.getDate() - 7);

    for (const post of posts) {
        const postDate = new Date(post.createdAt);
        const postDay = new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate());

        let groupLabel = "";

        if (postDay.getTime() === today.getTime()) {
            groupLabel = "Today";
        } else if (postDay.getTime() === yesterday.getTime()) {
            groupLabel = "Yesterday";
        } else if (postDay >= lastMonday && postDay < today) {
            groupLabel = "Last Week";
        } else {
            const start = new Date(postDay);
            const day = start.getDay();
            const diffToMonday = (day + 6) % 7;
            start.setDate(start.getDate() - diffToMonday);
            const end = new Date(start);
            end.setDate(start.getDate() + 6);

            const formatDate = (d: Date) => `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
            groupLabel = `${formatDate(start)} - ${formatDate(end)}`;
        }

        if (!groups[groupLabel]) {
            groups[groupLabel] = [];
        }
        groups[groupLabel].push(post);
    }

    return groups;
}

export default function ListOfPostsSidebar({ posts }: props) {
    if (!posts) posts = [];

    const [searchTerm, setSearchTerm] = useState<string>("");
    const selected_folder = useSelector((state: any) => state.tagsReducer.selectedTag)

    // Filter posts based on the search term and selected folder, if any.
    const filteredPosts = posts.filter((post) => {
        // Check if the post has a title and content before accessing them.
        if (!post.title || !post.content) return false;

        const title = post.title.toLowerCase();
        const body = post.content.toLowerCase();
        const search = searchTerm.toLowerCase();

        if (selected_folder) {
            return (title.includes(search) || body.includes(search)) && post.tags.includes(selected_folder._id);
        } else {
            return (title.includes(search) || body.includes(search));
        }
    });

    // Group posts by their creation date.
    const groupedPosts = groupPostsByDate(filteredPosts);
    // Sort the keyed groups in reverse chronological order so they can be displayed.
    const sortedKeys = Object.keys(groupedPosts).sort((a, b) => {
        const labelWeight = (label: string): number => {
            if (label === "Today") return Date.now();
            if (label === "Yesterday") return Date.now() - 1000 * 60 * 60 * 24;
            if (label === "Last Week") return Date.now() - 1000 * 60 * 60 * 24 * 7;

            const [start] = label.split(" - ");
            const [month, day] = start.split("/").map(Number);
            const date = new Date(new Date().getFullYear(), month - 1, day);
            return date.getTime();
        };

        return labelWeight(b) - labelWeight(a);
    });

    return (
        <div style={{ width: "100%" }}>
            <ListOfPostsToolbar setSearchTerm={setSearchTerm} />
            {sortedKeys.map((key) => (
                <PostGroup section={key} posts={groupedPosts[key]} />
            ))}
        </div>
    );
}